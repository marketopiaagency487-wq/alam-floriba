"use client";

import { useEffect, useRef, useState } from "react";
import { trackFormLead, trackWhatsApp, trackCall } from "@/lib/tracking";

/* ─────────────────────────────────────────────
   الثوابت — عدّل هنا فقط
   ───────────────────────────────────────────── */
const PHONE_DISPLAY = "01286679790";
const PHONE_INTL = "+201286679790";
const WA_NUMBER = "201286679790";
const WA_TEXT = encodeURIComponent(
  "أريد الاستفسار عن مشروع علم الروم Alam Al Roum — الأسعار والوحدات المتاحة"
);
const WA_LINK = `https://wa.me/${WA_NUMBER}?text=${WA_TEXT}`;
/* TODO: حط الـ Web3Forms Access Key بتاعك هنا */
const WEB3FORMS_KEY = "6a5fac9a-6757-47c9-ae6b-a38999b52033";
const START_PRICE = "15,000,000";

/* الداتا */
const HERO_STATS = [
  { v: "12 كم", l: "من بوابة مطروح الشرقية" },
  { v: "6 كم", l: "من مطار مطروح الدولي" },
  { v: "50 كم", l: "من رأس الحكمة" },
];

const FACTS = [
  { v: "4,902", l: "فدان مساحة المخطط" },
  { v: "7.2", l: "كم واجهة متوسطية" },
  { v: "+30", l: "كم مسارات وممرات" },
  { v: "18", l: "حفرة، ملعب جولف بطولات" },
  { v: "22", l: "كم بحيرات صالحة للسباحة" },
  { v: "490", l: "مرسى في ميناء مركز المدينة" },
  { v: "15", l: "فندقاً ضمن البرنامج المخطط" },
  { v: "29.7", l: "مليار دولار إجمالي الاستثمارات" },
];

const PROGRAM = [
  { n: "01", t: "بحيرات ومارينا دولية", d: "بحيرات صالحة للسباحة بطول مخطط 22 كم، ومارينا دولية ومارينا محلية." },
  { n: "02", t: "ميناء مركز المدينة", d: "ميناء مخطط في مركز المدينة يضم 490 مرسى، ونادي يخوت شراعي." },
  { n: "03", t: "15 فندقاً وضيافة عالمية", d: "محفظة فندقية متكاملة ضمن البرنامج المخطط بشراكة استشارات HVS." },
  { n: "04", t: "جامعة للدراسات العليا", d: "مؤسسة تعليمية ضمن المخطط تخدم مجتمع المدينة على مدار العام." },
  { n: "05", t: "بوليفارد وأبراج مرتفعة", d: "بوليفارد رئيسي وأبراج مرتفعة، ومركزان للمدينة وسبع بوابات ضمن المخطط." },
  { n: "06", t: "شبكة نقل متكاملة", d: "نحو 10 كم من شبكة القطار السريع الجديدة، و+30 كم مسارات وممرات مخططة." },
];

const UNITS = [
  {
    t: "استوديوهات",
    d: "وحدات مدمجة بتصميم عملي، مثالية للاستثمار والإجازات القصيرة.",
    p: "15 مليون جنيه",
  },
  {
    t: "الشقق السكنية",
    d: "وحدات سكنية بمساحات وتصاميم متعددة تناسب العائلات والأفراد.",
    p: "18 مليون جنيه",
  },
  {
    t: "الوحدات الفندقية والضيافة",
    d: "وحدات مُدارة ضمن محفظة فندقية عالمية، بعائد استثماري وخدمات متكاملة.",
    p: "22 مليون جنيه",
  },
  {
    t: "التاون هاوس والتوين هاوس",
    d: "وحدات سكنية متلاصقة أو مزدوجة، توازن بين المساحة الخاصة والقيمة الاستثمارية.",
    p: "30 مليون جنيه",
  },
  {
    t: "الفلل المستقلة",
    d: "فلل مستقلة بخصوصية كاملة وحدائق خاصة، ضمن مواقع مميزة بالمخطط العام.",
    p: "45 مليون جنيه",
  },
];

const PARTNERS = [
  { n: "SOM", r: "المخطط العام" },
  { n: "SWA Group", r: "عمارة وتخطيط المشهد الطبيعي" },
  { n: "HVS", r: "استشارات الضيافة" },
  { n: "Marina Projects", r: "تصميم وتشغيل المارينا" },
  { n: "SETEC", r: "البنية التحتية والحركة" },
  { n: "Savills", r: "الاستشارات العقارية" },
];

const GALLERY = [
  { src: "/images/gallery-tower-marina.jpg", cap: "البرج المميز والمارينا" },
  { src: "/images/gallery-coastline.jpg", cap: "7.2 كم واجهة بحرية" },
  { src: "/images/gallery-sandy-beach.jpg", cap: "الشاطئ الرملي" },
  { src: "/images/gallery-lagoon-villas.jpg", cap: "فلل على البحيرات" },
  { src: "/images/gallery-aerial-masterplan.jpg", cap: "المخطط العام الجوي" },
  { src: "/images/gallery-alam-al-roum-aerial.jpg", cap: "Alam Al Roum" },
];

const FAQ = [
  {
    q: "إزاي أعرف الأسعار الحالية وخطط السداد؟",
    a: "الأسعار الاسترشادية تبدأ من 15 مليون جنيه. يؤكد فريق المبيعات الأسعار الحالية، أنواع الوحدات والمساحات، وخطط السداد والتوافر وفق الطرح المتاح وقت الاستفسار. سجّل بياناتك وهيتواصل معاك الفريق مباشرة.",
  },
  {
    q: "من هو المطور المسؤول عن المشروع؟",
    a: "المشروع شراكة بين شركة الديار القطرية وهيئة المجتمعات العمرانية الجديدة التابعة لوزارة الإسكان المصرية.",
  },
  {
    q: "هل التسجيل يُلزمني بالشراء؟",
    a: "لا، التسجيل هو إبداء اهتمام مبدئي فقط للتواصل معك وإطلاعك على التفاصيل والأسعار الحالية.",
  },
];

/* ─────────────────────────────────────────────
   المكونات المساعدة
   ───────────────────────────────────────────── */
function LeadForm({ id, withBudget = false }: { id: string; withBudget?: boolean }) {
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", WEB3FORMS_KEY);
    data.append("subject", "ليد جديد — علم الروم Alam Al Roum");
    data.append("from_name", "Alam Al Roum Landing");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data,
      });
      if (res.ok) {
        trackFormLead();
        window.location.href = "/thank-you";
        return;
      }
      alert("حصل خطأ بسيط، جرّب تاني أو كلمنا واتساب");
    } catch {
      alert("حصل خطأ بسيط، جرّب تاني أو كلمنا واتساب");
    }
    setSending(false);
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor={`${id}-name`}>الاسم بالكامل</label>
        <input id={`${id}-name`} name="name" type="text" required placeholder="اكتب اسمك" />
      </div>
      <div className="field">
        <label htmlFor={`${id}-phone`}>رقم الموبايل</label>
        <input
          id={`${id}-phone`}
          name="phone"
          type="tel"
          required
          placeholder="01xxxxxxxxx"
          pattern="01[0-9]{9}"
          dir="ltr"
          style={{ textAlign: "right" }}
        />
      </div>
      {withBudget && (
        <div className="field">
          <label htmlFor={`${id}-budget`}>حجم الاستثمار المتوقع</label>
          <select id={`${id}-budget`} name="budget" defaultValue="من 15 إلى 20 مليون جنيه">
            <option>من 15 إلى 20 مليون جنيه</option>
            <option>من 20 إلى 30 مليون جنيه</option>
            <option>من 30 إلى 45 مليون جنيه</option>
            <option>أكثر من 45 مليون جنيه</option>
          </select>
        </div>
      )}
      <button type="submit" className="btn btn-gold" style={{ width: "100%" }} disabled={sending}>
        {sending ? "جاري الإرسال..." : "احجز استشارتي المجانية"}
      </button>
      <div className="trust-line">🔒 جميع البيانات سرية ولن تُستخدم إلا للتواصل معك بخصوص المشروع.</div>
      <div className="disclosure-note">
        نفس أسعار الشركة الرسمية — بدون أي عمولة من العميل · يتواصل معك فريق مبيعات معتمد خلال 24 ساعة.
      </div>
    </form>
  );
}

/* ─────────────────────────────────────────────
   الصفحة
   ───────────────────────────────────────────── */
export default function Home() {
  const [showPopup, setShowPopup] = useState(false);
  const popupShown = useRef(false);

  /* بوب أب تلقائي: بعد 16 ثانية أو عند 55% سكرول */
  useEffect(() => {
    function open() {
      if (popupShown.current) return;
      popupShown.current = true;
      setShowPopup(true);
    }
    const timer = setTimeout(open, 16000);
    function onScroll() {
      const scrolled =
        (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrolled >= 0.55) open();
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* أنيميشن الظهور */
  useEffect(() => {
    const els = document.querySelectorAll(".animate-in");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("visible");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* ── Header ── */}
      <header className="header">
        <div className="header-inner">
          <a href="#top" className="brand">
            علم الروم
            <span>Alam Al Roum</span>
          </a>
          <div className="header-cta">
            <a href={`tel:${PHONE_INTL}`} className="btn btn-sea btn-sm" onClick={trackCall}>
              📞 {PHONE_DISPLAY}
            </a>
            <a href="#lead-form" className="btn btn-gold btn-sm">
              اطلب أسعار علم الروم
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        {/* ── Hero ── */}
        <section className="hero">
          <div className="hero-inner">
            <div>
              <div className="hero-badge">📍 الساحل الشمالي الشرقي — مصر</div>
              <h1>
                مشروع علم الروم <em>Alam Al Roum</em> أطول واجهة بحرية لمشروع واحد على المتوسط
              </h1>
              <div className="price-badge">
                <b>الأسعار تبدأ من {START_PRICE} جنيه</b>
                <small>* أسعار استرشادية — يؤكدها فريق المبيعات وقت الاستفسار</small>
              </div>
              <p className="hero-sub">
                علم الروم مدينة ساحلية متكاملة بشراكة الديار القطرية وهيئة المجتمعات العمرانية
                الجديدة، على بُعد 12 كم فقط من بوابة مطروح الشرقية. اترك بياناتك الآن للتواصل مع
                فريق المبيعات ومعرفة أحدث الأسعار وتفاصيل الوحدات المتاحة.
              </p>
              <div className="hero-ctas">
                <a href="#lead-form" className="btn btn-gold">اطلب موعد استشارة مجانية</a>
                <a href="#details" className="btn btn-outline">تفاصيل المشروع</a>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener"
                  className="btn btn-wa"
                  onClick={trackWhatsApp}
                >
                  تواصل واتساب
                </a>
              </div>
              <div className="hero-stats">
                {HERO_STATS.map((s) => (
                  <div key={s.l} className="hstat">
                    <b>{s.v}</b>
                    <span>{s.l}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lead-card">
              <h3>احجز استشارتك المجانية الآن</h3>
              <p>سجّل بياناتك وهيتواصل معاك فريق المبيعات خلال 24 ساعة بأحدث أسعار ووحدات علم الروم.</p>
              <LeadForm id="hero" />
            </div>
          </div>
        </section>

        {/* ── Logos strip ── */}
        <div className="logos">
          <div className="logos-inner">
            <b>الديار القطرية</b>
            <b>هيئة المجتمعات العمرانية الجديدة</b>
            <span>SOM</span>
            <span>SWA Group</span>
            <span>HVS</span>
            <span>Savills</span>
          </div>
        </div>

        {/* ── Facts ── */}
        <section className="section" id="details">
          <div className="section-inner">
            <div className="animate-in">
              <span className="eyebrow">حقائق المشروع</span>
              <h2 className="section-title">مقياس مدينة، وترابط وجهة واحدة</h2>
              <p className="section-desc">
                مشروع علم الروم باستثمارات تتجاوز 29.7 مليار دولار على 4,902 فدان، بشراكة الديار
                القطرية وهيئة المجتمعات العمرانية الجديدة. الأسعار الاسترشادية تبدأ من 15 مليون
                جنيه — تواصل مع فريق المبيعات لمعرفة أحدث الأسعار وخطط السداد المتاحة وقت الاستفسار.
              </p>
            </div>
            <div className="stats animate-in">
              {FACTS.map((f) => (
                <div key={f.l} className="stat">
                  <b>{f.v}</b>
                  <span>{f.l}</span>
                </div>
              ))}
            </div>
            <div className="cta-band animate-in">
              <div>
                <h3>اطلب أسعار علم الروم والوحدات المتاحة</h3>
                <p>
                  يؤكد فريق المبيعات الأسعار الحالية، أنواع الوحدات والمساحات، وخطط السداد
                  والتوافر وفق الطرح المتاح وقت الاستفسار.
                </p>
              </div>
              <a href="#lead-form" className="btn btn-gold">تواصل مع فريق المبيعات</a>
            </div>
          </div>
        </section>

        {/* ── Program ── */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-inner">
            <div className="animate-in">
              <span className="eyebrow">موجز البرنامج المخطط</span>
              <h2 className="section-title">مكونات توسّع معنى المدينة الساحلية</h2>
              <p className="section-desc">
                المكونات التالية وفق البرنامج المخطط المعلن للمشروع.
              </p>
            </div>
            <div className="cards animate-in">
              {PROGRAM.map((c) => (
                <div key={c.n} className="card">
                  <span className="num">{c.n}</span>
                  <h4>{c.t}</h4>
                  <p>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Units & prices ── */}
        <section className="section" id="units" style={{ paddingTop: 0 }}>
          <div className="section-inner">
            <div className="animate-in center">
              <span className="eyebrow">أنواع الوحدات والأسعار</span>
              <h2 className="section-title">الأسعار تبدأ من 15 مليون جنيه</h2>
              <p className="section-desc" style={{ margin: "0 auto" }}>
                تشكيلة متنوعة من الوحدات ضمن المخطط العام — أسعار استرشادية، يؤكدها فريق
                المبيعات مع المساحات وخطط السداد وقت الاستفسار.
              </p>
            </div>
            <div className="units-grid animate-in">
              {UNITS.map((u) => (
                <div key={u.t} className="unit-card">
                  <div className="unit-body">
                    <h3>{u.t}</h3>
                    <p>{u.d}</p>
                    <div className="unit-price">
                      <b>تبدأ من {u.p}</b>
                      <small>سعر استرشادي — قابل للتغيير حسب الطرح</small>
                    </div>
                    <div className="unit-ctas">
                      <a
                        href={WA_LINK}
                        target="_blank"
                        rel="noopener"
                        className="btn btn-wa btn-sm"
                        onClick={trackWhatsApp}
                      >
                        واتساب
                      </a>
                      <a
                        href={`tel:${PHONE_INTL}`}
                        className="btn btn-sea btn-sm"
                        onClick={trackCall}
                      >
                        اتصال
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="price-note">
              جميع الأسعار المذكورة أسعار استرشادية وليست عرضاً رسمياً من المطور — التأكيد النهائي
              للأسعار والمساحات من فريق المبيعات وقت الاستفسار.
            </p>
          </div>
        </section>

        {/* ── Partners ── */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-inner">
            <div className="animate-in">
              <span className="eyebrow">فريق التصميم والتطوير</span>
              <h2 className="section-title">شراكات عالمية تقف خلف المخطط العام</h2>
            </div>
            <div className="partners animate-in">
              {PARTNERS.map((p) => (
                <div key={p.n} className="partner">
                  <b>{p.n}</b>
                  <span>{p.r}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Gallery ── */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-inner">
            <div className="animate-in">
              <span className="eyebrow">علم الروم | الساحل الشمالي</span>
              <h2 className="section-title">مشاهد من الرؤية الرسمية لمشروع علم الروم</h2>
              <p className="section-desc">
                Alam Al Roum — لقطات معتمدة من كتيّب المشروع توضّح المارينا، البرج المميز،
                والامتداد الساحلي.
              </p>
            </div>
            <div className="gallery animate-in">
              {GALLERY.map((g) => (
                <figure key={g.src}>
                  <img src={g.src} alt={`${g.cap} — مشروع علم الروم`} loading="lazy" />
                  <figcaption>{g.cap}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ── Lead section ── */}
        <section className="section" id="lead-form" style={{ paddingTop: 0 }}>
          <div className="section-inner">
            <div className="animate-in">
              <span className="eyebrow">حجز مبكر محدود</span>
              <h2 className="section-title">اطلب موعدك مع فريق المبيعات</h2>
              <p className="section-desc">
                اترك بياناتك وهيتواصل معاك أحد مستشارينا خلال 24 ساعة لعرض تفاصيل المشروع، وأحدث
                الأسعار وخطط السداد والوحدات المتاحة وقت الاستفسار.
              </p>
            </div>
            <div className="lead-grid">
              <ul className="lead-points animate-in">
                <li>
                  <span className="tick">✓</span>
                  لا التزام مالي عند التسجيل، مجرد إبداء اهتمام مبدئي
                </li>
                <li>
                  <span className="tick">✓</span>
                  تأكيد الأسعار وأنواع الوحدات والمساحات مباشرة من فريق المبيعات
                </li>
                <li>
                  <span className="tick">✓</span>
                  استشارة مجانية من فريق مختص بالساحل الشمالي
                </li>
                <li>
                  <span className="tick">✓</span>
                  نفس أسعار الشركة الرسمية — بدون أي عمولة من العميل
                </li>
              </ul>
              <div className="lead-card animate-in">
                <h3>سجّل بياناتك</h3>
                <p>جميع البيانات سرية ولن تُستخدم إلا للتواصل معك بخصوص المشروع.</p>
                <LeadForm id="main" withBudget />
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="section-inner">
            <div className="animate-in center">
              <span className="eyebrow">أسئلة شائعة</span>
              <h2 className="section-title">قبل أن تسجل، إليك أهم الإجابات</h2>
            </div>
            <div className="faq animate-in">
              {FAQ.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-inner">
          <span className="brand">
            علم الروم
            <span>الساحل الشمالي، مطروح</span>
          </span>
          <div className="footer-links">
            <a href="/about">من نحن</a>
            <a href="/privacy">سياسة الخصوصية</a>
            <a href="/disclaimer">إخلاء المسؤولية</a>
            <a href={`tel:${PHONE_INTL}`} onClick={trackCall}>{PHONE_DISPLAY}</a>
          </div>
          <p className="footer-disclosure">
            هذه منصة معلومات واستفسارات مستقلة عن مشروع علم الروم، يديرها فريق مبيعات معتمد
            للمشروعات العقارية بالساحل الشمالي. لسنا الموقع الرسمي للمطور، وجميع الأسماء
            والعلامات التجارية مملوكة لأصحابها. الأسعار المذكورة استرشادية وقابلة للتغيير وفق
            الطرح الرسمي وقت الاستفسار.
          </p>
        </div>
      </footer>

      {/* ── Floating buttons ── */}
      <div className="float-wrap">
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener"
          className="fab fab-wa"
          aria-label="تواصل واتساب"
          onClick={trackWhatsApp}
        >
          💬
        </a>
        <a href={`tel:${PHONE_INTL}`} className="fab fab-call" aria-label="اتصال" onClick={trackCall}>
          📞
        </a>
      </div>

      {/* ── Mobile bottom bar ── */}
      <div className="bottom-bar">
        <a href={`tel:${PHONE_INTL}`} className="btn btn-sea" onClick={trackCall}>
          📞 اتصال
        </a>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener"
          className="btn btn-wa"
          onClick={trackWhatsApp}
        >
          واتساب
        </a>
        <a href="#lead-form" className="btn btn-gold">
          اطلب السعر
        </a>
      </div>

      {/* ── Popup ── */}
      {showPopup && (
        <div className="overlay" onClick={() => setShowPopup(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              aria-label="إغلاق"
              onClick={() => setShowPopup(false)}
            >
              ✕
            </button>
            <div className="price-badge">
              <b>الأسعار تبدأ من {START_PRICE} جنيه</b>
              <small>* سعر استرشادي — يؤكده فريق المبيعات وقت الاستفسار</small>
            </div>
            <h3>اعرف أحدث أسعار علم الروم</h3>
            <p>
              سجّل بياناتك دلوقتي وهيتواصل معاك فريق المبيعات المعتمد خلال 24 ساعة بأحدث الأسعار
              وخطط السداد والوحدات المتاحة.
            </p>
            <LeadForm id="popup" />
          </div>
        </div>
      )}
    </>
  );
}
