# علم الروم — Alam Al Roum Landing

## قبل الرفع على Vercel — شيك ليست

1. **الصور** — ✅ متحططة من البروشور جاهزة في `public/images/`. الأسماء المطلوبة لو حبيت تبدل أي صورة: — انسخ الصور من مشروعك القديم لـ `public/images/`:
   - `hero.jpg` (خلفية الهيرو)
   - `gallery-tower-marina.jpg`
   - `gallery-coastline.jpg`
   - `gallery-sandy-beach.jpg`
   - `gallery-lagoon-villas.jpg`
   - `gallery-aerial-masterplan.jpg`
   - `gallery-alam-al-roum-aerial.jpg`

2. **Web3Forms** — في `app/page.tsx` أعلى الملف:
   - `WEB3FORMS_KEY` → ✅ متحطط (6a5fac9a-...)

3. **Google Ads** — في `lib/tracking.ts`:
   - `GOOGLE_ADS_ID` → AW-XXXXXXXXXX بتاعك
   - `FORM_LABEL` / `WHATSAPP_LABEL` / `CALL_LABEL` → الـ conversion labels

4. **الدومين** — مفيش أي دومين متسجل في الكود. لو حبيت تضيف sitemap بعد ربط الدومين، أنشئ `app/sitemap.ts` بروابط الصفحات الأربعة.

5. **أسعار الوحدات** — لو عايز تعدل الأرقام الاسترشادية، كلها في `UNITS` أعلى `app/page.tsx`.

## الرقم المستخدم في كل الصفحة
- اتصال وواتساب: **01286679790**
- لو حبيت تغيّره مستقبلاً: عدّل `PHONE_DISPLAY` و `PHONE_INTL` و `WA_NUMBER` أعلى `app/page.tsx` + رقم الواتساب في `app/thank-you/page.tsx` + الأرقام في صفحات about/privacy/disclaimer.

## صفحات الامتثال (Google Ads)
- `/about` — من نحن + توضيح "منصة معلومات واستفسارات مستقلة" و"فريق مبيعات معتمد"
- `/privacy` — سياسة الخصوصية
- `/disclaimer` — إخلاء المسؤولية + توضيح الأسعار الاسترشادية
- الفوتر فيه الـ disclosure الكامل + لينكات الصفحات الثلاثة
- `/thank-you` عليها noindex ومستثناة من robots.txt

## Build
```bash
npm install
npm run build
```
