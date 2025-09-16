declare module '@next/third-parties/google' {
  // ✅ GA4 표준 이벤트 이름 (공식 문서 기준)
  export type GAEventName =
    | 'page_view'
    | 'scroll'
    | 'click'
    | 'view_item'
    | 'view_item_list'
    | 'select_item'
    | 'view_promotion'
    | 'select_promotion'
    | 'add_to_cart'
    | 'remove_from_cart'
    | 'begin_checkout'
    | 'add_payment_info'
    | 'add_shipping_info'
    | 'purchase'
    | 'refund'
    | 'sign_up'
    | 'login'
    | 'search'
    | 'share'
    | 'generate_lead'
    | 'exception'
    | 'timing_complete'
    // 필요 시 커스텀 이벤트도 가능
    | (string & {});

  // GA 이벤트에서 자주 쓰이는 아이템 정보
  export interface GAItem {
    item_id?: string;
    item_name?: string;
    quantity?: number;
    price?: number;
    currency?: string;
    [key: string]: string | number | boolean | undefined;
  }

  // 공통 이벤트 파라미터
  export interface GAEventParams {
    // 기본
    category?: string;
    label?: string;
    value?: number;

    // 페이지 관련
    page_location?: string;
    page_path?: string;
    page_title?: string;

    // 사용자 행동 관련
    method?: string; // (예: login method, payment method)

    // 구매/전자상거래 관련
    transaction_id?: string;
    currency?: string;
    items?: GAItem[];
    coupon?: string;
    affiliation?: string;
    shipping?: number;
    tax?: number;

    // 기타 확장 가능
    [key: string]: string | number | boolean | GAItem[] | undefined;
  }

  /**
   * Google Analytics 이벤트 전송 함수
   *
   * @param eventType - 보통 'event' 또는 'page_view'
   * @param eventName - GA 표준 이벤트 이름 또는 커스텀 이벤트
   * @param params - 선택적 추가 데이터
   */
  export function sendGAEvent(
    eventType: 'event' | 'page_view',
    eventName: GAEventName,
    params?: GAEventParams
  ): void;

  // 오버로드: eventType 없이 바로 eventName + params
  export function sendGAEvent(
    eventName: GAEventName,
    params?: GAEventParams
  ): void;

  // GA Provider 컴포넌트
  export interface GoogleAnalyticsProps {
    gaId: string;
  }
  export function GoogleAnalytics(props: GoogleAnalyticsProps): JSX.Element;
}
