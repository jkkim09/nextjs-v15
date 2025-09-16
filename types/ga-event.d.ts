declare module '@next/third-parties/google' {
  // ✅ GA4 표준 이벤트 이름
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
    | (string & {});

  // GA 아이템 인터페이스
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
    category?: string;
    label?: string;
    value?: number;

    page_location?: string;
    page_path?: string;
    page_title?: string;

    method?: string;

    transaction_id?: string;
    currency?: string;
    items?: GAItem[];
    coupon?: string;
    affiliation?: string;
    shipping?: number;
    tax?: number;

    [key: string]: string | number | boolean | GAItem[] | undefined;
  }

  /**
   * GA 이벤트 전송 함수
   */
  export function sendGAEvent(
    eventType: 'event' | 'page_view',
    eventName: GAEventName,
    params?: GAEventParams
  ): void;
  export function sendGAEvent(
    eventName: GAEventName,
    params?: GAEventParams
  ): void;

  // SPA 페이지뷰 전송
  export function sendPageView(pathname?: string): void;

  // GTM 이벤트 전송 함수
  export interface GTMEventParams {
    event: string; // GTM에서 트리거용 이벤트 이름
    [key: string]: any; // 커스텀 데이터
  }
  export function sendGTMEvent(params: GTMEventParams): void;

  // GA 컴포넌트
  export interface GoogleAnalyticsProps {
    gaId: string;
  }
  export function GoogleAnalytics(props: GoogleAnalyticsProps): JSX.Element;

  // GTM 컴포넌트
  export interface GoogleTagManagerProps {
    gtmId: string;
  }
  export function GoogleTagManager(props: GoogleTagManagerProps): JSX.Element;
}
