import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "تم استلام بياناتك | علم الروم",
  robots: { index: false, follow: false },
};

const WA_LINK =
  "https://wa.me/201001050018?text=" +
  encodeURIComponent(
    "أريد الاستفسار عن مشروع علم الروم Alam Al Roum — الأسعار والوحدات المتاحة"
  );

export default function ThankYouPage() {
  return (
    <main className="thanks">
      <div className="thanks-card">
        <div className="thanks-icon">✓</div>
        <h1>تم استلام بياناتك بنجاح</h1>
        <p>
          هيتواصل معاك فريق المبيعات المعتمد خلال 24 ساعة على الرقم المسجل بأحدث أسعار ووحدات
          علم الروم وخطط السداد المتاحة.
        </p>
        <div className="hero-ctas">
          <a href={WA_LINK} target="_blank" rel="noopener" className="btn btn-wa">
            أو كلمنا واتساب دلوقتي
          </a>
          <a href="/" className="btn btn-outline">الرجوع للصفحة الرئيسية</a>
        </div>
      </div>
    </main>
  );
}
