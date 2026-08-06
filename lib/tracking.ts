/* ─────────────────────────────────────────────
   Google Ads Conversion Tracking — علم الروم
   TODO: بعد إنشاء الحملة، حط الـ IDs الحقيقية هنا
   ───────────────────────────────────────────── */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/* TODO: غيّر ده لرقم حسابك AW-XXXXXXXXXX */
export const GOOGLE_ADS_ID = "AW-XXXXXXXXXX";

/* TODO: Conversion labels من Google Ads */
const CONV_FORM = `${GOOGLE_ADS_ID}/FORM_LABEL`;
const CONV_WHATSAPP = `${GOOGLE_ADS_ID}/WHATSAPP_LABEL`;
const CONV_CALL = `${GOOGLE_ADS_ID}/CALL_LABEL`;

function fire(sendTo: string) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "conversion", { send_to: sendTo });
  }
}

/** تحويل نموذج الليد — بيتسجل أيضاً كـ page view على /thank-you */
export function trackFormLead() {
  fire(CONV_FORM);
}

/** تحويل ضغطة واتساب */
export function trackWhatsApp() {
  fire(CONV_WHATSAPP);
}

/** تحويل ضغطة اتصال */
export function trackCall() {
  fire(CONV_CALL);
}
