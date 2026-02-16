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
| **postgreSQL** | ^16.11  | Modern Database               |
| **pg**         | ^8.18.0 | PostgreSQL driver             |
| **prisma**     | ^7.3.0  | Prisma ORM client             |
| **zod**        | ^4.3.6  | Schema validation             |
| **jwt**        | ^11.0.2 | JWT authentication            |
| **passport**   | ^11.0.5 | Passport authentication layer |
| **bcrypt**     | ^6.0.0  | Password hashing              |
| **swagger**    | ^11.2.6 | API documentation (Swagger)   |
| **vitest**     | ^4.0.8  | Testing Services and app      |

---

# 🇮🇷 **شروع سریع (Quick Start)**

1. **کلون کردن پروژه**

   ```bash
   git clone https://github.com/mardi-niyayesh/CarService.git
   cd CarService/server
   ```

   **با ssh**

   ```bash
   git clone git@github.com:mardi-niyayesh/CarService.git
   cd CarService/server
   ```

2. **نصب وابستگی‌ها**

   ```bash
   npm install
   ```

3. **ساخت فایل `.env`**

   ```env
   # for config and development
   NODE_ENV="production"

   PORT="3000"

   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/car_service"

   # JWT
   JWT_SECRET="your_secret_key"
   JWT_EXPIRES="1h"
   ```

4. **ساخت دیتابیس و Collationها:**<br><br>
   **بصورت خودکار (پیشنهادی):**

   ```bash
   npm run seed:database
   ```
   **تمام. 🏁 (برو مرحله پنجم)**<br><br><br>
   
   **یا دستی:**

   ```postgresql
   CREATE DATABASE car_service
       ENCODING 'UTF8'
       LC_COLLATE 'en_US.UTF-8'
       LC_CTYPE 'en_US.UTF-8'
       TEMPLATE template0
       OWNER app_owner;
   
   \c car_service;
   
   CREATE COLLATION IF NOT EXISTS "ar_SA.utf8" (LOCALE = 'ar_SA.utf8');
   CREATE COLLATION IF NOT EXISTS "ar_SA" (LOCALE = 'ar_SA.utf8');
   ```
   **و**
   ```bash
   npm run prisma:setup
   npm run seed:roles
   ```
   **.تمام**<br><br><br>

5. ساخت کاربر با نقش **owner** مالک:

   ```bash
   npm run seed:owner
   ```

   > و Prisma Client داخل ریپو قرار نمی‌گیرد و باید روی سیستم شما ساخته شود.

6. **اجرای پروژه در حالت توسعه**

   ```bash
   npm run start:dev
   ```

---

# 🏗️ **بیلد (Production)**

برای کامپایل TypeScript به JavaScript:

```bash
npm run build
```

خروجی کامپایل‌شده داخل پوشهٔ `dist/` قرار می‌گیرد.

---

## 🚀 **اجرای پروژه در Production**

بعد از build:

```bash
npm start
```

یا اجرای مستقیم فایل خروجی:

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

- مدیریت فاکتور و رسید
- پنل ادمین پیشرفته
- گزارش‌گیری (Reports)
- فیلتر و جستجوی پیشرفته خودروها

---

[🇬🇧 Read in English](./README.md)