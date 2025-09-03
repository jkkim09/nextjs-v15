import { getCookie } from 'cookies-next';
import https from 'https';

export interface FetchOptions extends RequestInit {
  retries?: number;
  retryDelay?: number;
  baseUrl?: string;
}

export interface IReqOptions extends FetchOptions {
  useForm?: boolean;
}

// 요청 인터셉터
export const requestInterceptor = async (
  url: string,
  options: IReqOptions = {}
): Promise<[string, FetchOptions]> => {
  const baseUrl = options?.baseUrl
    ? options?.baseUrl
    : process.env.NEXT_PUBLIC_SERVER_URL || '';

  //   const mode = process.env.NODE_ENV;
  //   // development, production
  //   console.log('NODE_ENV ---------', mode);

  let baseHeader: {
    'DEVIS-PROJECT-ID'?: string;
    'DEVIS-PROJECT-NAME'?: string;
    'DEVIS-USER-ID'?: string;
    'DEVIS-USER-NAME'?: string;
  } = {};

  let token = '';
  let userId = '';
  let userName = '';
  let projectId = '';
  let projectName = '';

  if (typeof window === 'undefined') {
    // ssr 일 경우만 import csr일떄 import 할 경우 Error 발생
    try {
      const { cookies } = await import('next/headers');
      const getToken = (await cookies()).get('accessToken')?.value;
      const getUserId = (await cookies()).get('userId')?.value;
      const getUserName = (await cookies()).get('userName')?.value;
      const getProjectId = (await cookies()).get('projectId')?.value;
      const getProjectName = (await cookies()).get('projectName')?.value;

      if (getToken) {
        token = getToken;
      }

      if (getUserId && getUserName && getProjectId && getProjectName) {
        userId = getUserId;
        userName = getUserName;
        projectId = getProjectId;
        projectName = getProjectName;
      }
    } catch (error) {
      console.error('Error occurred while fetching cookies:', error);
    }
  } else {
    const getToken = await getCookie('accessToken');
    const getUserId = await getCookie('userId');
    const getUserName = await getCookie('userName');
    const getProjectId = await getCookie('projectId');
    const getProjectName = await getCookie('projectName');

    if (getToken) {
      token = getToken;
    }

    if (getUserId && getUserName && getProjectId && getProjectName) {
      userId = getUserId;
      userName = getUserName;
      projectId = getProjectId;
      projectName = getProjectName;
    }
  }

  if (userId && userName && projectId && projectName) {
    baseHeader = {
      'DEVIS-PROJECT-ID': projectId,
      'DEVIS-PROJECT-NAME': projectName,
      'DEVIS-USER-ID': userId,
      'DEVIS-USER-NAME': userName,
    };
  }

  if (token) {
    const content = options.useForm
      ? ''
      : {
          'content-type': 'application/json',
        };

    options.headers = {
      ...content,
      ...baseHeader,
      ...options.headers,
      Authorization: token ? `Bearer ${token}` : '',
    };
  }

  return [`${baseUrl}${url}`, options];
};

// 토큰 재발급 함수 예시 (API 엔드포인트와 로직에 맞게 수정 필요)
async function refreshToken(): Promise<string | null> {
  try {
    // 예시: /api/auth/refresh-token 엔드포인트로 요청
    const res = await fetch('/api/auth/refresh-token', {
      method: 'POST',
      credentials: 'include',
    });
    if (res.ok) {
      const data = await res.json();
      // accessToken이 반환된다고 가정
      return data.accessToken;
    }
    return null;
  } catch (e) {
    console.error('Error refreshing token:', e);
    return null;
  }
}

// 응답 인터셉터
// 응답 인터셉터 (토큰 재발급 및 재시도 통합)
export const responseInterceptor = async (
  response: Response,
  originalRequest: (newToken: string) => Promise<Response>
): Promise<Response> => {
  if (response.status === 401 || response.status === 403) {
    const newToken = await refreshToken();
    if (newToken) {
      // 새 토큰으로 Authorization 헤더 갱신 후 재시도
      return await originalRequest(newToken);
    } else if (typeof window !== 'undefined') {
      const redirectUrl = process.env.NEXT_PUBLIC_PIMS_SERVER_URL || '/404';
      window.location.href = redirectUrl;
    }
  }
  return response;
};

// fetchWithInterceptor 함수 내에서 401/403 발생 시 토큰 재발급 및 재시도
export const fetchWithInterceptor = async <T = never>(
  url: string,
  options: IReqOptions = {}
): Promise<T> => {
  const agent = new https.Agent();

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
    return fetch(finalUrl, {
      ...finalOptions,
      ...{
        agent,
      },
    });
  };

  try {
    const response = await doFetch();
    const finalResponse = await responseInterceptor(
      response,
      async (newToken?: string) => doFetch(newToken)
    );

    if (!finalResponse.ok) {
      let errorData;
      try {
        errorData = await finalResponse.json();
      } catch {
        errorData = null;
      }
      throw {
        status: finalResponse.status,
        statusText: finalResponse.statusText,
        data: errorData,
        response: finalResponse,
      };
    }

    return await finalResponse.json();
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
};

export const getQueryString = (params: { [key: string]: never }) => {
  const returnValue = new URLSearchParams(params).toString();
  return returnValue.length > 0 ? `?${returnValue}` : '';
};

export const postQueryString = (params: { [key: string]: never }) => {
  return JSON.stringify(params);
};
