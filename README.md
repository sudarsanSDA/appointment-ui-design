# 🚀 Visitor Management System - Full-Stack Application

![.NET](https://img.shields.io/badge/.NET-8-512BD4?style=for-the-badge&logo=dotnet)
![Azure](https://img.shields.io/badge/Azure-App_Service-0089D6?style=for-the-badge&logo=microsoft-azure)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?style=for-the-badge&logo=javascript)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI/CD-2088FF?style=for-the-badge&logo=github-actions)

A complete, full-stack appointment booking system featuring a responsive front-end, a robust .NET 8 API backend, and deployment to the cloud via a CI/CD pipeline. This project was developed as a professional assignment for **Fidrox Technologies Private Limited**.

**(Highly Recommended: Create a short screen recording or GIF of you using the app and embed it here!)**
`![Application Demo](./screenshots/demo.gif)`

---

## 🌐 Live Demo Links

This application is fully deployed and accessible online.

*   ### ➡️ **1. Live Application (Front-End on GitHub Pages)**
    **[https://sudarsansda.github.io/appointment-ui-design/dashboard.html](https://sudarsansda.github.io/appointment-ui-design/dashboard.html)**
    *This is the main user interface where you can view the dashboard and create new appointments.*

*   ### ➡️ **2. Live API Documentation (Back-End on Azure)**
    **[https://visitor-management-api-sudarsan-a0fshadyesard2fa.southeastasia-01.azurewebsites.net/swagger/index.html](https://visitor-management-api-sudarsan-a0fshadyesard2fa.southeastasia-01.azurewebsites.net/swagger/index.html)**
    *This is the live Swagger UI for the backend API, detailing all available endpoints.*

---

## ✨ Key Features

*   **Responsive UI**: Built with Bootstrap & AdminLTE, the interface is fully responsive and provides a seamless experience on both desktop and mobile devices.
*   **Robust .NET 8 API**: A powerful backend built with ASP.NET Core handles all business logic, data validation, and database operations.
*   **Full CRUD Functionality**: Users can create new appointments (`POST`) and view all appointments (`GET`).
*   **Interactive Dashboard**: The dashboard displays real-time counts for different appointment statuses and allows users to dynamically filter the main list by clicking on status cards.
*   **Client-Side Validation**: The submission form includes mandatory field checks using JavaScript to ensure data integrity before an API call is made.
*   **Asynchronous Operations**: AJAX is used for all communication with the backend, creating a smooth, single-page-application feel without page reloads.
*   **Cloud-Native Deployment**: The entire solution is deployed to the cloud, with the API hosted on Microsoft Azure and the UI on GitHub Pages.
*   **Automated CI/CD Pipeline**: A GitHub Actions workflow automatically builds and deploys the .NET API to Azure whenever changes are pushed to the `main` branch.

---

## 💻 Technology Stack

| Category                  | Technologies & Tools                                                              |
| ------------------------- | --------------------------------------------------------------------------------- |
| **Front-End**             | `HTML5`, `CSS3`, `JavaScript (ES6)`, `jQuery`, `Bootstrap`, `AdminLTE`                |
| **Back-End**              | `.NET 8`, `ASP.NET Core Web API`, `C#`, `Entity Framework Core 8`                     |
| **Database & Deployment** | `Microsoft Azure App Service`, `Azure SQL Database`, `GitHub Pages`, `GitHub Actions (CI/CD)` |

---

<details>
<summary>View Local Development Setup Instructions</summary>

To run this project on your local machine, you will need **Visual Studio 2022** with the **"ASP.NET and web development"** workload and the **.NET 8 SDK**.

### 1. Backend Setup (VisitorManagementAPI)

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/sudarsanSDA/appointment-ui-design.git
    cd appointment-ui-design/API/VisitorManagementAPI
    ```
2.  **Install EF Core Tools:** If you don't have it, install the command-line tool.
    ```powershell
    dotnet tool install --global dotnet-ef
    ```
3.  **Restore Packages:** Open the `VisitorManagementAPI.sln` file in Visual Studio. It should restore packages automatically.
4.  **Update Connection String:** In `appsettings.Development.json`, ensure the `DefaultConnection` string points to your local SQL Server instance.
5.  **Create the Database:** Open the **Package Manager Console** (`View > Other Windows > Package Manager Console`) and run the migration command:
    ```powershell
    Update-Database
    ```
6.  **Run the API:** Press **F5** or click the green run button. The Swagger UI will open (e.g., at `https://localhost:7123/swagger`). Note the port number.

### 2. Frontend Setup

1.  **Configure API Endpoint:** Open `js/script.js` and `js/dashboard.js` and ensure the `apiUrl` or `API_BASE_URL` constant matches your backend's local port.
    ```javascript
    const apiUrl = 'https://localhost:7123/api/Appointments'; 
    ```
2.  **Launch the App:** Open `index.html` or `dashboard.html` in your web browser using a live server extension or by simply opening the file. The application is now connected to your local API.

</details>

---

## 👤 Contact

**P. Sudarsan**
*   📧 Email: [sudarsanjcr@gmail.com](mailto:sudarsanjcr@gmail.com)
*   🌐 Portfolio: [https://www.sudarsan.net.in](https://www.sudarsan.net.in)
*   🔗 LinkedIn: [Your LinkedIn Profile URL]

---

## 🏢 Project Attribution

This project was developed for and is attributed to **Fidrox Technologies Private Limited** as part of an internship assignment.

> © 2025 Fidrox Technologies Private Limited, Bangalore, INDIA. All rights reserved.