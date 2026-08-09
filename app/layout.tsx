import type { Metadata } from "next";
import Script from "next/script";
import { GOOGLE_ADS_ID } from "@/lib/tracking";
import "./globals.css";

export const metadata: Metadata = {
  title: "علم الروم الساحل الشمالي | الأسعار تبدأ من 15.6 مليون — التفاصيل والتسجيل",
  description:
    "مشروع علم الروم Alam Al Roum بالساحل الشمالي — مدينة ساحلية متكاملة على 7.2 كم واجهة بحرية بشراكة الديار القطرية وهيئة المجتمعات العمرانية. أسعار استرشادية تبدأ من 15.6 مليون جنيه. منصة معلومات واستفسارات مستقلة — سجّل بياناتك ليتواصل معك فريق مبيعات معتمد.",
  keywords:
    "علم الروم, Alam Al Roum, علم الروم الساحل الشمالي, مشروع علم الروم, الديار القطرية, أسعار علم الروم, علم الروم مطروح",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    title: "علم الروم | وجهة ساحلية جديدة على البحر المتوسط — الأسعار من 15.6 مليون",
    description:
      "مدينة ساحلية متكاملة على 4,902 فدان باستثمارات 29.7 مليار دولار. سجّل بياناتك لمعرفة أحدث الأسعار والوحدات المتاحة.",
    type: "website",
    locale: "ar_EG",
  },
};

/* JSON-LD: أسئلة شائعة */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "كم أسعار الوحدات في علم الروم؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "الأسعار الاسترشادية لمرحلة Sandside Lagoons تبدأ من 15.6 مليون جنيه للشاليهات وتصل إلى 78.4 مليون جنيه للفلل المستقلة، مع مبالغ جدية حجز (EOI) تبدأ من 100 ألف جنيه. يؤكد فريق المبيعات الأسعار الحالية وأنظمة السداد وفق الطرح المتاح وقت الاستفسار.",
      },
    },
    {
      "@type": "Question",
      name: "من هو المطور المسؤول عن المشروع؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "المشروع شراكة بين شركة الديار القطرية وهيئة المجتمعات العمرانية الجديدة التابعة لوزارة الإسكان المصرية.",
      },
    },
    {
      "@type": "Question",
      name: "هل التسجيل يُلزمني بالشراء؟",
      acceptedAnswer: {
        "@type": "Answer",
        text: "لا، التسجيل هو إبداء اهتمام مبدئي فقط للتواصل معك وإطلاعك على التفاصيل والأسعار الحالية دون أي التزام مالي.",
      },
    },
  ],
};

/* JSON-LD: المشروع */
const projectJsonLd = {
  "@context": "https://schema.org",
  "@type": "Place",
  name: "علم الروم — Alam Al Roum",
  description:
    "مدينة ساحلية متكاملة على 4,902 فدان بواجهة متوسطية 7.2 كم، بشراكة الديار القطرية وهيئة المجتمعات العمرانية الجديدة. أسعار استرشادية تبدأ من 15.6 مليون جنيه.",
  address: {
    "@type": "PostalAddress",
    addressRegion: "مطروح",
    addressCountry: "EG",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=El+Messiri:wght@400;600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
        />
        {/* Google Ads gtag — TODO: فعّله بعد وضع الـ ID الحقيقي في lib/tracking.ts */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
