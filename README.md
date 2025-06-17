# 🚀 Visitor Management System - Full-Stack Application

This project is a complete, full-stack appointment booking application featuring a responsive, tab-based frontend and a robust .NET 8 backend API.

Developed as part of my internship assignment at **Fidrox Technologies Private Limited**, Bangalore, this project has evolved from a UI prototype into a functional web application that captures appointment data and persists it in a SQL Server database.

---

## 🌟 Features

*   **Modern Frontend:** A professional, responsive UI built with **AdminLTE** and **Bootstrap** for a seamless user experience on any device.
*   **Full-Stack Functionality:** A .NET 8 Web API backend handles business logic and data persistence.
*   **Database Integration:** Uses **Entity Framework Core 8** to connect to a **SQL Server** database, making data storage and retrieval efficient and reliable.
*   **Asynchronous Data Submission:** The frontend communicates with the backend asynchronously using AJAX, providing a smooth user experience without page reloads.
*   **Organized Data Entry:** A two-tabbed interface separates primary visitor details from additional requirements.
*   **Ready for Expansion:** The architecture is modular and ready for future enhancements like user authentication, admin dashboards, and more.

---

## 💻 Tech Stack

### Frontend
-   **HTML5**
-   **CSS3**
-   **JavaScript (jQuery)**
-   **Bootstrap 4** 
-   **AdminLTE 4 Beta**

### Backend
-   **.NET 8**
-   **ASP.NET Core Web API** 
-   **Entity Framework Core 8** 
-   **SQL Server (LocalDB)** 

---

## 🛠️ Setup and Installation

To run this project locally, you will need **Visual Studio 2022** with the **ASP.NET and web development** workload and the **.NET 8 SDK**.

### 1. Backend Setup (VisitorManagementAPI)

1.  Clone the repository:
    ```bash
    git clone https://github.com/sudarsanSDA/appointment-ui-design.git
    ```
2.  Open the `VisitorManagementAPI.sln` solution file in Visual Studio.
3.  **Restore NuGet Packages:** Visual Studio should do this automatically. If not, right-click the solution in the Solution Explorer and select "Restore NuGet Packages".
4.  **Create the Database:** Open the **Package Manager Console** (`Tools > NuGet Package Manager > Package Manager Console`) and run the following command to create the database and its tables using Entity Framework Migrations:
    ```powershell
    Update-Database
    ```
5.  **Run the API:** Press **F5** or the green play button to start the backend. A browser window will open to the Swagger UI page (e.g., `https://localhost:7103/swagger`), confirming the API is running. Note the port number.

### 2. Frontend Setup

1.  **Update the API URL:** Open the `script.js` file. Find the `apiUrl` constant and ensure its port number matches the one your backend is running on.
    ```javascript
    const apiUrl = 'https://localhost:7103/api/appointments'; // Change port if necessary
    ```
2.  **Open the Form:** Open the `index.html` file in your web browser.

You can now fill out the form and submit data, which will be saved to your local SQL Server database.

---

## 👨‍💻 About Me

**P. Sudarsan**  
B.Tech – Computer Engineering  
📧 [sudarsanjcr@gmail.com](mailto:sudarsanjcr@gmail.com)  
🌐 [https://www.sudarsan.net.in](https://www.sudarsan.net.in)

---

## 🏢 Project Attribution

This project was created for and is attributed to:

**Fidrox Technologies Private Limited**  
Jayanagar, Bangalore – INDIA  
📅 Internship Project – 2025

> **© 2025 Fidrox Technologies Private Limited, Bangalore, INDIA. All rights reserved.**