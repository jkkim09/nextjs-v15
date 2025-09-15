import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import type { IncomingMessage, ServerResponse } from 'http';
import https from 'https';
import { redirect } from 'next/navigation'; // Next.js 13+ App Router에서 리다이렉트를 위해 사용

export interface FetchOptions extends RequestInit {
  retries?: number;
  retryDelay?: number;
  baseUrl?: string;
  /**
   * SSR 환경에서 쿠키를 읽고 쓰기 위한 req, res 객체
   * Next.js App Router의 Server Components/Actions에서는 필요하지 않습니다.
   * `cookies()` 함수를 직접 사용하는 것이 더 권장됩니다.
   * 이 `context`는 주로 Pages Router의 getServerSideProps나 API Routes에서 필요할 수 있습니다.
   */
  context?: { req: IncomingMessage; res: ServerResponse };
}

export interface IReqOptions extends FetchOptions {
  useForm?: boolean; // multipart/form-data 요청 시 사용
}

// 사용자 정의 에러 타입
export interface FetchError extends Error {
  status?: number;
  statusText?: string;
  data?: any;
  response?: Response;
}

// Global HTTPS Agent for SSR to reuse connections
const agent =
  typeof window === 'undefined'
    ? new https.Agent({
        keepAlive: true, // Keep connections alive for better performance
        maxSockets: 100, // Adjust based on your needs
      })
    : undefined;

// 쿠키 처리 헬퍼 함수 (SSR/CSR 통합)
export const getCookieValue = async (name: string, options: IReqOptions) => {
  if (typeof window === 'undefined' && options.context) {
    // Pages Router 또는 API Routes의 SSR (cookies-next 사용)
    return getCookie(name, {
      req: options.context.req,
      res: options.context.res,
    }) as string | undefined;
  } else if (typeof window === 'undefined') {
    // App Router의 Server Components / Server Actions
    try {
      // eslint-disable-next-line global-require
      const { cookies } = require('next/headers'); // 동적 임포트
      const cookieStore = await cookies(); // <--- !!! 이 부분을 await으로 수정합니다 !!!
      return cookieStore.get(name)?.value;
    } catch (e) {
      return undefined;
    }
  } else {
    // CSR 환경
    return getCookie(name) as string | undefined;
  }
};

export const setCookieValue = async (
  name: string,
  value: string,
  options: IReqOptions
) => {
  if (typeof window === 'undefined' && options.context) {
    // Pages Router 또는 API Routes의 SSR
    setCookie(name, value, {
      req: options.context.req,
      res: options.context.res,
    });
  } else if (typeof window === 'undefined') {
    // App Router의 Server Components / Server Actions
    try {
      // eslint-disable-next-line global-require
      const { cookies } = require('next/headers'); // 동적 임포트
      const cookieStore = await cookies(); // <--- !!! 이 부분도 await으로 수정합니다 !!!
      cookieStore.set(name, value);
    } catch (e) {
      // console.warn('cookies() could not set cookie in current SSR context.', e);
    }
  } else {
    // CSR 환경
    setCookie(name, value);
  }
};

export const deleteCookieValue = async (name: string, options: IReqOptions) => {
  if (typeof window === 'undefined' && options.context) {
    deleteCookie(name, { req: options.context.req, res: options.context.res });
  } else if (typeof window === 'undefined') {
    try {
      // eslint-disable-next-line global-require
      const { cookies } = require('next/headers');
      const cookieStore = await cookies(); // <--- !!! 이 부분도 await으로 수정합니다 !!!
      cookieStore.delete(name);
    } catch (e) {
      // console.warn('cookies() could not delete cookie in current SSR context.', e);
    }
  } else {
    deleteCookie(name);
  }
};

export const getFullUrl = (options: IReqOptions) => {
  return (
    options?.baseUrl ||
    process.env.NEXT_PUBLIC_SERVER_URL ||
    'http://localhost:3000'
  );
};

// 요청 인터셉터
export const requestInterceptor = async (
  url: string,
  options: IReqOptions = {}
): Promise<[string, FetchOptions]> => {
  const baseUrl = getFullUrl(options);

  let token: string | undefined;
  let userId: string | undefined;
  let userName: string | undefined;
  let projectId: string | undefined;
  let projectName: string | undefined;

  try {
    [token, userId, userName, projectId, projectName] = await Promise.all([
      getCookieValue('accessToken', options),
      getCookieValue('userId', options),
      getCookieValue('userName', options),
      getCookieValue('projectId', options),
      getCookieValue('projectName', options),
    ]);
  } catch (error) {
    console.error(
      'Error occurred while fetching cookies in request interceptor:',
      error
    );
  }

  const baseHeader: HeadersInit = {};

  if (userId && userName && projectId && projectName) {
    baseHeader['DEVIS-PROJECT-ID'] = projectId;
    baseHeader['DEVIS-PROJECT-NAME'] = projectName;
    baseHeader['DEVIS-USER-ID'] = userId;
    baseHeader['DEVIS-USER-NAME'] = userName;
  }

  const contentHeader: HeadersInit = options.useForm
    ? {} // multipart/form-data는 Content-Type 헤더를 설정하지 않음 (브라우저가 자동으로 설정)
    : { 'Content-Type': 'application/json' };

  options.headers = {
    ...contentHeader,
    ...baseHeader,
    ...(options.headers || {}), // 기존 헤더 유지
    ...(token ? { Authorization: `Bearer ${token}` } : {}), // 토큰이 있을 경우 Authorization 헤더 추가/갱신
  };

  return [`${baseUrl}${url}`, options];
};

// 토큰 재발급 함수
async function refreshToken(options: IReqOptions = {}): Promise<string | null> {
  try {
    const refreshApiUrl = '/api/auth/refresh-token'; // 이 경로가 절대 경로인지 확인하거나 baseUrl에 따라 조정
    const baseUrl = getFullUrl(options);

    const reqHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // SSR 환경에서 요청 헤더에 현재 쿠키를 포함하여 전달
    if (typeof window === 'undefined') {
      try {
        // eslint-disable-next-line global-require
        const { cookies } = require('next/headers');
        const cookieStore = cookies();
        const cookieHeader = cookieStore
          .getAll()
          .map((c: { name: string; value: string }) => `${c.name}=${c.value}`)
          .join('; ');
        if (cookieHeader) {
          reqHeaders.cookie = cookieHeader;
        }
      } catch (e) {
        // console.warn('Failed to get cookies for refresh token request in SSR context.', e);
      }
    }

    const res = await fetch(`${baseUrl}${refreshApiUrl}`, {
      method: 'POST',
      credentials: 'include', // 세션 쿠키를 포함하여 요청 (브라우저용)
      headers: reqHeaders,
      // SSR 환경에서 HTTPS agent 사용
      ...(typeof window === 'undefined' && agent ? { agent } : {}),
      // 캐시 무효화 (Next.js fetch 캐싱에 영향)
      cache: 'no-store',
    });

    if (res.ok) {
      const data = await res.json();
      const newToken = data.accessToken;
      if (newToken) {
        // 새 토큰을 쿠키에 저장
        await setCookieValue('accessToken', newToken, options);
        return newToken;
      }
      return null;
    } else {
      console.error(
        'Refresh token API failed with status:',
        res.status,
        res.statusText
      );
      // 리프레시 토큰 실패 시 기존 토큰 삭제 및 로그인 페이지로 리다이렉트
      await deleteCookieValue('accessToken', options);
      await deleteCookieValue('userId', options);
      await deleteCookieValue('userName', options);
      await deleteCookieValue('projectId', options);
      await deleteCookieValue('projectName', options);
      return null;
    }
  } catch (e) {
    console.error('Error refreshing token:', e);
    await deleteCookieValue('accessToken', options); // 에러 발생 시 토큰 삭제
    return null;
  }
}

// 응답 인터셉터 (토큰 재발급 및 재시도 통합)
export const responseInterceptor = async (
  response: Response,
  originalRequest: (overrideToken?: string) => Promise<Response>, // 재시도 시 토큰 재정의
  options: IReqOptions = {}
): Promise<Response> => {
  if (response.status === 401 || response.status === 403) {
    console.warn(
      'Authentication failed (401/403). Attempting to refresh token.'
    );
    const newToken = await refreshToken(options);
    if (newToken) {
      console.log(
        'Token refreshed, retrying original request with new token...'
      );
      return await originalRequest(newToken);
    } else {
      console.error(
        'Failed to refresh token. Redirecting to login or error page.'
      );
      if (typeof window !== 'undefined') {
        // CSR 환경에서만 리다이렉트
        const redirectUrl = process.env.NEXT_PUBLIC_PIMS_SERVER_URL || '/404'; // 적절한 로그인 페이지 URL
        window.location.href = redirectUrl;
        // 클라이언트에서 리다이렉트가 발생하면 이 Promise는 resolve되지 않을 수 있습니다.
        // 하지만 Next.js 에서는 throw new Error 대신 redirect를 사용하는 것이 더 자연스럽습니다.
        // 현재 로직상으로 `window.location.href`는 함수 종료 후 실행되므로, 여기서 에러를 throw하여
        // 호출 체인을 중단시키는 것이 안전합니다.
        const error: FetchError = new Error(
          'Failed to authenticate and refresh token, client redirect initiated'
        );
        error.status = response.status;
        error.response = response;
        throw error;
      } else {
        // SSR 환경에서는 에러를 throw하여 상위 컴포넌트나 미들웨어에서 처리하도록 함
        // Next.js 13 App Router에서는 `redirect()` 함수를 사용하거나 에러를 throw하여 에러 페이지를 보여줄 수 있습니다.
        const redirectUrl = process.env.NEXT_PUBLIC_PIMS_SERVER_URL || '/404';
        redirect(redirectUrl); // Next.js `redirect` 함수 사용
        // `redirect` 함수는 내부적으로 Error를 throw하므로, 이 코드는 Unreachable 입니다.
      }
    }
  }
  return response;
};

// fetchWithInterceptor 함수
export const fetchWithInterceptor = async <T = any>(
  url: string,
  options: IReqOptions = {}
): Promise<T> => {
  const maxRetries = options.retries ?? 1; // 기본 1번 재시도 (총 2번의 요청 시도)
  const retryDelay = options.retryDelay ?? 500; // 500ms 지연
  let currentRetry = 0;

  // fetch 요청을 함수로 래핑 (토큰 재발급 시 재사용)
  const doFetch = async (overrideToken?: string): Promise<Response> => {
    let reqOptions = { ...options };
    if (overrideToken) {
      reqOptions = {
        ...reqOptions,
        headers: {
          ...(reqOptions.headers || {}),
          Authorization: `Bearer ${overrideToken}`,
        },
      };
    }

    const [finalUrl, finalOptions] = await requestInterceptor(url, reqOptions);

    try {
      return await fetch(finalUrl, {
        ...finalOptions,
        // SSR 환경에서 HTTPS agent 사용
        ...(typeof window === 'undefined' && agent ? { agent } : {}),
      });
    } catch (e: any) {
      // 네트워크 에러 (예: CORS, DNS 에러) 발생 시 재시도 고려
      console.error(`Network error during fetch for ${finalUrl}:`, e);
      const error: FetchError = new Error('Network request failed');
      error.message = e.message || error.message; // 실제 에러 메시지 반영
      throw error; // 재시도 로직에서 처리될 수 있도록 에러 throw
    }
  };

  while (currentRetry <= maxRetries) {
    try {
      const response = await doFetch();

      // 응답 인터셉터를 거쳐 최종 응답 처리
      const finalResponse = await responseInterceptor(
        response,
        async (newToken?: string) => {
          // 재시도 시점에 원래의 요청을 새 토큰으로 다시 호출
          return await doFetch(newToken);
        },
        options // options 객체를 responseInterceptor에도 전달하여 쿠키 설정 등에 사용
      );

      if (!finalResponse.ok) {
        let errorData: any = null;
        try {
          errorData = await finalResponse.json();
        } catch {
          // JSON 파싱 실패 시 null 유지
        }

        const error: FetchError = new Error(
          errorData?.message || finalResponse.statusText || 'Unknown error'
        );
        error.status = finalResponse.status;
        error.statusText = finalResponse.statusText;
        error.data = errorData;
        error.response = finalResponse;

        // 4xx (401/403 제외 - responseInterceptor에서 처리됨) 또는 5xx 에러
        if (
          finalResponse.status >= 400 &&
          finalResponse.status < 500 &&
          finalResponse.status !== 401 &&
          finalResponse.status !== 403
        ) {
          // 클라이언트 에러는 재시도하지 않음 (예: Bad Request)
          throw error;
        }

        if (finalResponse.status >= 500 && currentRetry < maxRetries) {
          // 서버 에러는 재시도
          console.warn(
            `Server error (${finalResponse.status}). Retrying (${currentRetry + 1}/${maxRetries})...`
          );
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
          currentRetry++;
          continue; // 다음 재시도 루프로 이동
        }
        throw error; // 더 이상 재시도하지 않는 에러 또는 마지막 재시도 실패
      }

      return await finalResponse.json();
    } catch (error: any) {
      // 네트워크 에러 또는 재시도 가능한 서버 에러인 경우
      if (
        (error instanceof Error &&
          error.message === 'Network request failed' &&
          currentRetry < maxRetries) ||
        (error.status && error.status >= 500 && currentRetry < maxRetries)
      ) {
        console.warn(
          `Error encountered. Retrying (${currentRetry + 1}/${maxRetries})...`,
          error.message
        );
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        currentRetry++;
        continue;
      }
      // 그 외의 치명적인 에러 또는 마지막 재시도 실패
      // `redirect()`는 에러를 throw하므로, 여기서 catch될 수 있습니다.
      // Next.js의 `redirect` 에러는 특별히 처리하지 않고 다시 throw합니다.
      if (
        error &&
        typeof error === 'object' &&
        'digest' in error &&
        error.digest === 'NEXT_REDIRECT'
      ) {
        throw error;
      }

      console.error('Fetch Error (final attempt failed):', error);
      throw error;
    }
  }

  // 모든 재시도가 실패했을 경우
  const error: FetchError = new Error('Max retries exceeded.');
  throw error; // 항상 에러를 throw하거나 성공적인 값을 반환해야 합니다.
};

export const getQueryString = (params: {
  [key: string]: string | number | boolean | undefined | null;
}) => {
  const searchParams = new URLSearchParams();
  for (const key in params) {
    const value = params[key];
    if (value !== undefined && value !== null) {
      searchParams.append(key, String(value));
    }
  }
  const queryString = searchParams.toString();
  return queryString.length > 0 ? `?${queryString}` : '';
};

export const postQueryString = (params: { [key: string]: any }) => {
  return JSON.stringify(params);
};
