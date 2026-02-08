# 🚗 **Car Service – Server‑Side API**

[🇬🇧 Read in English](./README.md)

**Car Service Server‑Side** یک API ماژولار، مقیاس‌پذیر و صنعتی برای مدیریت سیستم کرایه خودرو است.  
این پروژه با **NestJS + TypeScript + Prisma + PostgreSQL + Zod + Swagger** ساخته شده و تمرکزش روی معماری تمیز،
توسعه‌پذیری بلندمدت و استانداردسازی پاسخ‌هاست.

---

## 🚀 Features

- مدیریت کاربران (CRUD کامل)
- احراز هویت JWT (Login / Register / Refresh)
- مدیریت نقش‌ها (User, Admin, Super Admin)
- مدیریت خودروها (ثبت، ویرایش، حذف، لیست)
- سیستم رزرو / کرایه خودرو
- Response Factory اختصاصی برای خروجی‌های استاندارد
- اعتبارسنجی ورودی‌ها با **Zod + nestjs-zod**
- مستندسازی کامل API با **Swagger**
- اتصال پایدار به PostgreSQL با **Prisma**
- ساختار ماژولار و قابل‌گسترش

---

# 📦 Core Packages

| Tech           | Version | Description                   |
|----------------|---------|-------------------------------|
| **typescript** | ^5.7.3  | Schema validation             |
| **nestjs**     | ^11.0.1 | NestJS core utilities         |
| **jwt**        | ^11.0.2 | JWT authentication            |
| **passport**   | ^11.0.5 | Passport authentication layer |
| **swagger**    | ^11.2.6 | API documentation (Swagger)   |
| **prisma**     | ^7.3.0  | Prisma ORM client             |
| **pg**         | ^8.18.0 | PostgreSQL driver             |
| **bcrypt**     | ^6.0.0  | Password hashing              |
| **zod**        | ^4.3.6  | Schema validation             |

---

## 🏁 Quick Start

1. Clone the project:

   ```bash
   git clone https://github.com/your-repo/car-service-server.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create `.env` file:

   ```env
   PORT="3000"

   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/car_service"

   # JWT
   JWT_SECRET="your_secret_key"
   JWT_EXPIRES="1h"
   ```

4. Sync Prisma schema:

   ```bash
   npm run prisma:sync
   ```

5. Run the project in development mode:

   ```bash
   npm run start:dev
   ```

---

## 🏗️ Build (Production)

برای کامپایل TypeScript به JavaScript:

```bash
npm run build
```

خروجی داخل پوشهٔ `dist/` قرار می‌گیرد.

---

## 🚀 Start (Production)

بعد از build:

```bash
npm start
```

یا مستقیم:

```bash
node dist/main.js
```

---

## 🔐 Security Note: Script Folder Access

پوشهٔ `scripts/` شامل ابزارهای توسعه مثل **Prisma Sync Script** است.  
این اسکریپت‌ها **نباید** در محیط production اجرا شوند.

### ✔️ توصیه‌های امنیتی

- در سرور production دسترسی اجرای این پوشه را ببندید
- یا در CI/CD این پوشه را حذف کنید
- فقط توسعه‌دهندگان مورد اعتماد اجازه اجرای این اسکریپت‌ها را داشته باشند

---

## 🔮 Future Plans

- سیستم پرداخت آنلاین برای رزرو خودرو
- مدیریت فاکتور و رسید
- سیستم امتیازدهی کاربران
- پنل ادمین پیشرفته
- گزارش‌گیری (Reports)
- فیلتر و جستجوی پیشرفته خودروها
- پشتیبانی از چند زبان (i18n)
- اضافه شدن Webhook برای رویدادهای مهم

---

[🇬🇧 Read in English](./README.md)