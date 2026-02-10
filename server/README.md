# 🚗 **Car Service – Server‑Side API**

[🇮🇷 Read in Persian](./README.FA.md)


**Car Service Server‑Side** is a modular, scalable, and production‑ready API designed for managing a complete car rental
system.  
Built with **NestJS + TypeScript + Prisma + PostgreSQL + Zod + Swagger**, it focuses on clean architecture, long‑term
maintainability, and fully standardized API responses.

---

## 🚀 Features

- User management (full CRUD)
- JWT authentication (Login / Register / Refresh)
- Role‑based access control (User, Admin, Super Admin)
- Car management (create, update, delete, list)
- Car reservation / rental system
- Custom Response Factory for unified API outputs
- Input validation using **Zod + nestjs‑zod**
- Full API documentation with **Swagger**
- Stable PostgreSQL integration via **Prisma**
- Modular and scalable project structure

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

1. Clone the repository:

   ```bash
   git clone https://github.com/mardi-niyayesh/CarService.git
   cd MyCar/server
   ```

**or with ssh**

   ```bash
   git clone git@github.com:mardi-niyayesh/CarService.git
   cd MyCar/server
   ```


2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```env
   PORT="3000"

   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/car_service"

   # JWT
   JWT_SECRET="your_secret_key"
   JWT_EXPIRES="1h"
   ```

4. Generate Prisma Client (required once):

   ```bash
   npm run prisma:generate
   ```

5. Start development mode:

   ```bash
   npm run start:dev
   ```

---

## 🏗️ Build (Production)

Compile TypeScript into JavaScript:

```bash
npm run build
```

The compiled output will be generated inside the `dist/` directory.

---

## 🚀 Start (Production)

After building:

```bash
npm start
```

Or run directly:

```bash
node dist/main.js
```

---

## 🔐 Security Note: Script Folder Access

The `scripts/` directory contains development‑only utilities such as the **Prisma Sync Script**.  
These scripts **must not** be executed in production environments.

### ✔️ Recommended Production Setup

- Disable execution permissions for the `scripts` folder on production servers
- Or exclude the folder entirely during CI/CD or Docker builds
- Ensure only trusted developers can run these scripts locally

This prevents accidental or unauthorized execution of sensitive operations.

---

## 🔮 Future Plans

- Online payment system for car rentals
- Invoice and receipt management
- User rating and feedback system
- Advanced admin panel
- Reporting and analytics
- Advanced filtering and search for cars
- Multi‑language support (i18n)
- Webhooks for important system events

---

[🇮🇷 Read in Persian](./README.FA.md)
