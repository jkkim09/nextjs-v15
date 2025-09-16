import {
  sendGAEvent as _sendGAEvent,
  sendGTMEvent as _sendGTMEvent,
  GAEventName,
  GAEventParams,
} from '@next/third-parties/google';

/** GA 이벤트 타입 */
export interface AnalyticsGAEvent {
  name: GAEventName;
  params?: GAEventParams;
}

/** GTM 이벤트 타입 */
export interface AnalyticsGTMEvent {
  event?: string;
  data?: Record<string, any>;
}

/** 통합 이벤트 타입: GA + GTM */
export type AnalyticsEvent = Partial<AnalyticsGAEvent> &
  Partial<AnalyticsGTMEvent>;

/**
 * GA 이벤트 params를 GTM data로 변환
 * - GAEventParams는 key/value 형태이므로 GTM data로 그대로 사용 가능
 */
function mapGAParamsToGTMData(
  params?: GAEventParams
): Record<string, any> | undefined {
  if (!params) return undefined;

  // 필요 시 매핑 로직 추가 가능
  return { ...params };
}

/**
 * 통합 이벤트 전송
 * - name만 있어도 GA + GTM 전송
 * - params는 GTM data로 자동 변환
 */
export function sendAnalyticsEvent(event: AnalyticsEvent) {
  if (typeof window === 'undefined') return;

  // GA 전송
  if (event.name) {
    _sendGAEvent('event', event.name, event.params);
  }

  // GTM 전송
  const gtmEventName = event.event || event.name;
  if (gtmEventName) {
    const gtmData = event.data || mapGAParamsToGTMData(event.params);
    _sendGTMEvent({ event: gtmEventName, ...(gtmData || {}) });
  }
}
