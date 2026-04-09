# 🛡️ Ashur Cyber Platform: Master Blueprint (Project Identity)

هذا الملف هو "وثيقة الذاكرة" للمشروع، يحتوي على كافة التفاصيل التقنية والمعمارية التي تم بناؤها لضمان استمرارية العمل وتذكر القرارات التصميمية.

---

## 🏛️ 1. المعمارية الهيكلية (Architecture)
تم اعتماد نظام **"العزل المزدوج النطاقات"** (Dual-Domain Isolation):

*   **بوابة الطلاب (Student Portal):** `https://ashur.alsadim.xyz`
    *   المسارات: `/dashboard`, `/login`, `/register`.
    *   الهدف: تفاعل الطلاب مع المناهج والبلاغات.
*   **مركز القيادة (Staff Command Center):** `https://staff.ashur.alsadim.xyz`
    *   المسارات: `/admins`, `/management`, `/staff`.
    *   الهدف: الإدارة العليا، إدارة الكادر، والمحتوى.

---

## 🔐 2. نظام الأمن والهوية (Security & Identity)

### 🛡️ بروتوكول التطهير (Protocol Sanitizer)
يعمل ملف `src/middleware.ts` كحارس للمجال:
*   يمنع تداخل الأدوار (Role Crossover).
*   يقوم بمسح الكوكيز (Cookies) إجبارياً إذا تم اكتشاف دور (Role) لا ينتمي للنطاق الحالي.
*   **قاعدة صارمة:** الآدمن لا يمكنه البقاء مسجلاً في نطاق الطلاب، والطالب لا يمكنه لمس نطاق الستاف.

### 🛡️ الحماية السيرفرية (Server-Side Guards)
ملف `src/app/actions/authActions.ts` يتحقق من عنوان الـ `host` قبل السماح بتسجيل الدخول:
*   `loginStudent` مرفوض في نطاق `staff`.
*   `loginStaff` مرفوض في نطاق الطلاب الرئيسي.

---

## 👥 3. الأدوار وصلاحيات الوصول (Roles & Access)

| الدور (Role) | المسار البرمجي | بوابة الدخول |
| :--- | :--- | :--- |
| **Admin** | `/admins` | `staff.ashur.alsadim.xyz` |
| **Management** | `/management` | `staff.ashur.alsadim.xyz` |
| **Student** | `/dashboard` | `ashur.alsadim.xyz` |

---

## 🔑 4. البيانات الأساسية المحفوظة (Sanitized Credentials)
*   **حساب المسؤول الرئيسي (Primary Admin):**
    *   رقم الهاتف: `07817544040`
    *   الدور: `admin`

---

## 💻 5. الترسانة التقنية (Tech Stack)
*   **Framework:** Next.js (App Router)
*   **Database:** MongoDB
*   **UI/UX:** Tailwind CSS + Framer Motion (للأنيميشن) + Lucide React (للأيقونات).
*   **Branding Theme:** Cyber Command Center (Dark Mode, Glassmorphism, HUD).

---

## 🚀 6. ملاحظات للتطوير المستقبلي
*   النظام الآن في حالة **"نقاء تام" (Absolute Purity)**.
*   عند الرغبة في إضافة خصائص جديدة للكادر، يجب العمل داخل مجلدات `/management` أو `/admins` والتأكد من توافق الروابط مع النطاق الفرعي.
*   تم ضبط الـ `Cors` والـ `Cookies` لتعمل بشكل متوافق عبر النطاقين.

---
**تاريخ آخر تحديث:** 2026-04-08
**الحالة:** مستقر (Absolute Isolation Phase Complete) 🖥️🛡️🦾
