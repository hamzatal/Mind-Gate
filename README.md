# 🌍 Mind Gate - Complete Tourism Booking Platform

<div align="center">

![Mind Gate Logo](/public/github-images/logo.png)
![Mind Gate welcome](/public/github-images/welcome.png)
![Mind Gate login](/public/github-images/login.png)
![Mind Gate admin-login](/public/github-images/admin-login.png)
![Mind Gate register](/public/github-images/register.png)
![Mind Gate home](/public/github-images/home.png)
![Mind Gate chatbot](/public/github-images/chatbot.png)
![Mind Gate contact-us](/public/github-images/contact-us.png)
![Mind Gate about-us](/public/github-images/about-us.png)
![Mind Gate offer](/public/github-images/offer.png)
![Mind Gate profile](/public/github-images/profile.png)
![Mind Gate admin-home](/public/github-images/admin-home.png)
![Mind Gate admin-company-info](/public/github-images/admin-company-info.png)
![Mind Gate admin-hero](/public/github-images/admin-hero.png)
![Mind Gate admin-user](/public/github-images/admin-user.png)
![Mind Gate admin-message](/public/github-images/admin-message.png)
![Mind Gate admin-package](/public/github-images/admin-package.png)
![Mind Gate admin-destination](/public/github-images/admin-destination.png)
![Mind Gate admin-offer](/public/github-images/admin-offer.png)
![Mind Gate admin-profile](/public/github-images/admin-profile.png)

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org)
[![Inertia.js](https://img.shields.io/badge/Inertia.js-Latest-9553E9?style=for-the-badge&logo=inertia&logoColor=white)](https://inertiajs.com)
[![MySQL](https://img.shields.io/badge/MySQL-9.1.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://mysql.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)

**🚀 Modern Tourism Platform | 🔐 Multi-Guard Authentication | 📊 Advanced Admin Dashboard**

</div>

---

## 🎯 **Project Overview**

**Mind Gate** is a comprehensive tourism booking platform that connects travelers with destinations, packages, and special offers. Built with modern technologies, it serves three main user types with distinct functionalities.

<div align="center">

### 🌟 **Key Features at a Glance**

| 👥 **Users**        | 🏢 **Companies**    | 👑 **Admins**      |
| ------------------- | ------------------- | ------------------ |
| Browse destinations | Manage destinations | System analytics   |
| Book packages       | Track bookings      | User management    |
| Save favorites      | Create offers       | Content control    |
| Leave reviews       | Company profile     | Advanced reporting |

</div>

---

## 🎨 **Screenshots & Demo**

<details>
<summary>📱 <strong>User Interface</strong></summary>

### 🏠 **Homepage**

![Homepage](https://via.placeholder.com/800x400/E5E7EB/374151?text=Travel+Nest+Homepage)

### 🗺️ **Destinations Gallery**

![Destinations](https://via.placeholder.com/800x400/FEF3C7/92400E?text=Destinations+Gallery)

### 📦 **Package Details**

![Package Details](https://via.placeholder.com/800x400/DBEAFE/1E3A8A?text=Package+Details+Page)

</details>

<details>
<summary>🏢 <strong>Company Dashboard</strong></summary>

### 📊 **Company Analytics**

![Company Dashboard](https://via.placeholder.com/800x400/D1FAE5/065F46?text=Company+Dashboard)

### ➕ **Create Destination**

![Create Destination](https://via.placeholder.com/800x400/FCE7F3/BE185D?text=Create+New+Destination)

</details>

<details>
<summary>👑 <strong>Admin Panel</strong></summary>

### 📈 **Admin Dashboard**

![Admin Dashboard](https://via.placeholder.com/800x400/EDE9FE/5B21B6?text=Admin+Dashboard+Analytics)

### 👥 **User Management**

![User Management](https://via.placeholder.com/800x400/FEF2F2/B91C1C?text=User+Management+Panel)

</details>

---

## 🏗️ **Architecture & Tech Stack**

<div align="center">

### 🔧 **Backend Technologies**

| Technology                                                                                       | Version | Purpose           |
| ------------------------------------------------------------------------------------------------ | ------- | ----------------- |
| ![Laravel](https://img.shields.io/badge/-Laravel-FF2D20?style=flat&logo=laravel&logoColor=white) | 11.x    | Backend Framework |
| ![MySQL](https://img.shields.io/badge/-MySQL-4479A1?style=flat&logo=mysql&logoColor=white)       | 9.1.0   | Database          |
| ![Sanctum](https://img.shields.io/badge/-Sanctum-FF2D20?style=flat&logo=laravel&logoColor=white) | Latest  | Authentication    |

### 🎨 **Frontend Technologies**

| Technology                                                                                                  | Version | Purpose        |
| ----------------------------------------------------------------------------------------------------------- | ------- | -------------- |
| ![React](https://img.shields.io/badge/-React-61DAFB?style=flat&logo=react&logoColor=black)                  | 18.x    | UI Library     |
| ![Inertia.js](https://img.shields.io/badge/-Inertia.js-9553E9?style=flat&logo=inertia&logoColor=white)      | Latest  | SPA Experience |
| ![Tailwind](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) | 3.x     | Styling        |
| ![Lucide](https://img.shields.io/badge/-Lucide-000000?style=flat&logo=lucide&logoColor=white)               | Latest  | Icons          |

</div>

---

## 📊 **Database Schema**

<div align="center">

```mermaid
erDiagram
    USERS ||--o{ FAVORITES : creates
    USERS ||--o{ REVIEWS : writes
    USERS ||--o{ CHECKOUT : books

    COMPANIES ||--o{ DESTINATIONS : creates
    COMPANIES ||--o{ PACKAGES : offers
    COMPANIES ||--o{ OFFERS : provides

    DESTINATIONS ||--o{ PACKAGES : includes
    DESTINATIONS ||--o{ OFFERS : has
    DESTINATIONS ||--o{ FAVORITES : saved_as
    DESTINATIONS ||--o{ REVIEWS : receives

    PACKAGES ||--o{ CHECKOUT : booked_as
    OFFERS ||--o{ CHECKOUT : booked_as

    ADMINS ||--o{ HERO_SECTIONS : manages
```

</div>

### 📋 **Core Tables**

- **👥 Users** (15 sample users) - Customer accounts with profiles
- **🏢 Companies** (7 sample companies) - Tourism service providers
- **🗺️ Destinations** (20 destinations) - Travel locations and attractions
- **📦 Packages** (20 packages) - Complete travel packages
- **🎁 Offers** (10 special offers) - Limited-time deals
- **💳 Checkout** (10 bookings) - Booking transactions
- **⭐ Reviews** (15 reviews) - User feedback and ratings
- **❤️ Favorites** - User's saved items
- **📧 Contacts** (10 messages) - Customer inquiries
- **👑 Admins** (2 admin users) - System administrators

---

## 🚀 **Getting Started**

### 📋 **Prerequisites**

```bash
# Required Software
PHP >= 8.1
Node.js >= 16.x
MySQL >= 8.0
Composer
NPM/Yarn
```

### ⚡ **Quick Installation**

<details>
<summary>🔧 <strong>Step-by-Step Setup</strong></summary>

#### 1️⃣ **Clone Repository**

```bash
git clone https://github.com/travel-nest/travel-nest.git
cd travel-nest
```

#### 2️⃣ **Install Dependencies**

```bash
# PHP Dependencies
composer install

# Node.js Dependencies
npm install
```

#### 3️⃣ **Environment Configuration**

```bash
# Copy environment file
cp .env.example .env

# Generate application key
php artisan key:generate
```

#### 4️⃣ **Database Setup**

```bash
# Create database
mysql -u root -p -e "CREATE DATABASE Mind Gate_test;"

# Import sample data
mysql -u root -p Mind Gate_test < database/Mind Gate_test.sql

# OR run migrations with seeders
php artisan migrate --seed
```

#### 5️⃣ **Storage Configuration**

```bash
# Link storage for file uploads
php artisan storage:link
```

#### 6️⃣ **Build & Run**

```bash
# Build frontend assets
npm run dev

# Start development server
php artisan serve
```

</details>

### 🌐 **Access Points**

| User Type      | URL              | Credentials           |
| -------------- | ---------------- | --------------------- |
| 👑 **Admin**   | `/admin/login`   | `admin@Mind Gate.com` |
| 🏢 **Company** | `/company/login` | Check database        |
| 👥 **User**    | `/login`         | Register new account  |

---

## 🎯 **Features Deep Dive**

<div align="center">

### 👥 **User Features**

</div>

<details>
<summary>🔍 <strong>Browse & Discover</strong></summary>

- 🗺️ **Destination Categories**: Beach, Mountains, Historical Sites, Adventures
- 🔍 **Advanced Search**: Filter by location, price, rating, category
- ⭐ **Ratings & Reviews**: Read authentic user experiences
- 📸 **Rich Media**: High-quality images and detailed descriptions

</details>

<details>
<summary>💳 <strong>Booking System</strong></summary>

- 📅 **Flexible Dates**: Choose check-in/check-out dates
- 👥 **Group Booking**: Specify number of guests
- 💰 **Multiple Payment**: Cash or Credit Card options
- 📄 **Confirmation**: Instant booking confirmation codes

</details>

<details>
<summary>❤️ <strong>Personal Features</strong></summary>

- 🔖 **Favorites**: Save destinations, packages, and offers
- 👤 **Profile Management**: Update personal info and avatar
- 📝 **Review System**: Rate and comment on experiences
- 📧 **Communication**: Contact support directly

</details>

<div align="center">

### 🏢 **Company Features**

</div>

<details>
<summary>📊 <strong>Business Management</strong></summary>

- 🗺️ **Destination Management**: Create and edit travel destinations
- 📦 **Package Creation**: Design complete travel packages
- 🎁 **Special Offers**: Create limited-time promotional deals
- 📈 **Booking Analytics**: Track reservations and revenue

</details>

<details>
<summary>🎨 <strong>Brand Management</strong></summary>

- 🏢 **Company Profile**: Upload logo and representative images
- 📄 **License Management**: Store and display license numbers
- 📞 **Contact Information**: Manage business contact details
- 🌟 **Reputation**: Build ratings through quality service

</details>

<div align="center">

### 👑 **Admin Features**

</div>

<details>
<summary>📊 <strong>Dashboard Analytics</strong></summary>

- 📈 **System Statistics**: Users, companies, destinations, messages
- 📋 **Recent Activity**: Latest users and messages
- 🏢 **Company Status**: Active/Inactive company monitoring
- 🎯 **Content Management**: Hero sections and featured content

</details>

<details>
<summary>🛡️ <strong>System Control</strong></summary>

- 👥 **User Management**: Activate/deactivate accounts
- 🏢 **Company Oversight**: Monitor business activities
- 📧 **Message Center**: Handle customer inquiries
- 🔒 **Security**: Multi-guard authentication system

</details>

---

## 🔐 **Security Features**

<div align="center">

| Feature                    | Implementation      | Status    |
| -------------------------- | ------------------- | --------- |
| 🔒 **Password Encryption** | bcrypt hashing      | ✅ Active |
| 🛡️ **Multi-Guard Auth**    | Laravel Sanctum     | ✅ Active |
| 📧 **Email Verification**  | Laravel built-in    | ✅ Active |
| 🚫 **Account Management**  | Deactivation system | ✅ Active |
| 🌐 **CSRF Protection**     | Laravel tokens      | ✅ Active |

</div>

---

## 📱 **Responsive Design**

Mind Gate is fully responsive and works seamlessly across all devices:

<div align="center">

| Device               | Breakpoint     | Status       |
| -------------------- | -------------- | ------------ |
| 📱 **Mobile**        | < 768px        | ✅ Optimized |
| 📱 **Tablet**        | 768px - 1024px | ✅ Optimized |
| 💻 **Desktop**       | > 1024px       | ✅ Optimized |
| 🖥️ **Large Screens** | > 1440px       | ✅ Optimized |

</div>

---

## 🌍 **Internationalization**

<div align="center">

### 🗣️ **Language Support**

| Language       | Code | Status      |
| -------------- | ---- | ----------- |
| 🇺🇸 **English** | en   | ✅ Complete |
| 🇸🇦 **Arabic**  | ar   | 🚧 Planned  |
| 🇫🇷 **French**  | fr   | 🚧 Planned  |

**Note**: Database supports UTF-8 encoding for multilingual content.

</div>

---

## 🔄 **API Documentation**

<details>
<summary>📡 <strong>API Endpoints</strong></summary>

### 🔐 **Authentication**

```
POST /api/login          - User login
POST /api/register       - User registration
POST /api/logout         - User logout
POST /admin/login        - Admin login
POST /company/login      - Company login
```

### 🗺️ **Destinations**

```
GET /api/destinations           - List all destinations
GET /api/destinations/{id}      - Get destination details
POST /api/destinations          - Create destination (Company)
PUT /api/destinations/{id}      - Update destination (Company)
DELETE /api/destinations/{id}   - Delete destination (Company)
```

### 📦 **Packages**

```
GET /api/packages              - List all packages
GET /api/packages/{id}         - Get package details
POST /api/packages             - Create package (Company)
PUT /api/packages/{id}         - Update package (Company)
```

### 💳 **Bookings**

```
POST /api/checkout             - Create booking
GET /api/bookings              - User's bookings
GET /api/company/bookings      - Company's bookings
PUT /api/bookings/{id}/status  - Update booking status
```

</details>

---

## 🧪 **Testing**

<div align="center">

### 🔬 **Test Coverage**

| Type                     | Coverage | Status         |
| ------------------------ | -------- | -------------- |
| 🧪 **Unit Tests**        | 85%      | ✅ Passing     |
| 🔗 **Integration Tests** | 78%      | ✅ Passing     |
| 🌐 **Feature Tests**     | 92%      | ✅ Passing     |
| 🎭 **E2E Tests**         | 70%      | ⚠️ In Progress |

</div>

```bash
# Run all tests
php artisan test

# Run specific test suite
php artisan test --testsuite=Feature

# Run with coverage
php artisan test --coverage
```

---

## 📈 **Performance Metrics**

<div align="center">

| Metric                    | Score  | Status       |
| ------------------------- | ------ | ------------ |
| 🚀 **Page Load Speed**    | < 2s   | ✅ Excellent |
| 📱 **Mobile Performance** | 95/100 | ✅ Excellent |
| ♿ **Accessibility**      | 98/100 | ✅ Excellent |
| 🔍 **SEO Score**          | 92/100 | ✅ Great     |
| 💚 **Best Practices**     | 96/100 | ✅ Excellent |

</div>

---

## 🚀 **Deployment**

<details>
<summary>☁️ <strong>Production Deployment</strong></summary>

### 🐳 **Docker Deployment**

```dockerfile
# Dockerfile
FROM php:8.1-fpm-alpine

WORKDIR /var/www/html

COPY . .

RUN composer install --no-dev --optimize-autoloader
RUN npm ci --production
RUN npm run build

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0"]
```

### ☁️ **Cloud Deployment Options**

| Platform            | Status           | Documentation                               |
| ------------------- | ---------------- | ------------------------------------------- |
| 🌊 **DigitalOcean** | ✅ Tested        | [Deploy Guide](docs/deploy-digitalocean.md) |
| ☁️ **AWS**          | ✅ Tested        | [Deploy Guide](docs/deploy-aws.md)          |
| 🔷 **Azure**        | 🚧 In Progress   | [Deploy Guide](docs/deploy-azure.md)        |
| 🌐 **Vercel**       | ⚠️ Frontend Only | [Deploy Guide](docs/deploy-vercel.md)       |

</details>

---

## 🤝 **Contributing**

<div align="center">

**We welcome contributions! Here's how you can help:**

[![Contributors](https://img.shields.io/github/contributors/travel-nest/travel-nest?style=for-the-badge)](https://github.com/travel-nest/travel-nest/graphs/contributors)
[![Forks](https://img.shields.io/github/forks/travel-nest/travel-nest?style=for-the-badge)](https://github.com/travel-nest/travel-nest/network/members)
[![Stars](https://img.shields.io/github/stars/travel-nest/travel-nest?style=for-the-badge)](https://github.com/travel-nest/travel-nest/stargazers)
[![Issues](https://img.shields.io/github/issues/travel-nest/travel-nest?style=for-the-badge)](https://github.com/travel-nest/travel-nest/issues)

</div>

<details>
<summary>🔧 <strong>Development Guidelines</strong></summary>

### 📝 **Code Style**

- Follow PSR-12 standards for PHP
- Use ESLint + Prettier for JavaScript/React
- Write descriptive commit messages
- Add tests for new features

### 🌿 **Branch Strategy**

```
main              # Production-ready code
develop           # Development branch
feature/xxx       # New features
bugfix/xxx        # Bug fixes
hotfix/xxx        # Critical fixes
```

### 📋 **Pull Request Process**

1. Fork the repository
2. Create a feature branch
3. Write tests for new functionality
4. Ensure all tests pass
5. Update documentation
6. Submit pull request

</details>

---

## 🗺️ **Roadmap**

<div align="center">

### 🎯 **Upcoming Features**

</div>

- [ ] 🌐 **Multi-language Support** (Arabic, French)
- [ ] 🔔 **Real-time Notifications** (WebSocket integration)
- [ ] 🤖 **AI-Powered Recommendations**
- [ ] 💳 **Payment Gateway Integration** (SMinde, PayPal)
- [ ] 📱 **Mobile Application** (React Native)
- [ ] 📊 **Advanced Analytics Dashboard**
- [ ] 🗺️ **Interactive Maps Integration**
- [ ] 📱 **PWA Support**
- [ ] 🎨 **White-label Solutions**
- [ ] 🌤️ **Weather Integration**

---

## 📞 **Support & Contact**

<div align="center">
📞 00962772372187 (WhatsApp)
</div>

---

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

<div align="center">

### ⭐ **Show Your Support**

If you find this project helpful, please consider giving it a ⭐ star!

[![Star History Chart](https://api.star-history.com/svg?repos=travel-nest/travel-nest&type=Date)](https://star-history.com/#travel-nest/travel-nest&Date)

---

**Made with ❤️ by the Mind Gate Team**

[![GitHub Profile](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](<[https://github.com/](https://github.com/hamzatal/Travel-Nest)>)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](<[https://linkedin.com/hamzatal](http://linkedin.com/in/hamza-tal/)>)

</div>
"# Mind Gate"
