
# **Vaccine Record System**

## **Table of Contents**
1. [Introduction](#introduction)
2. [Features](#features)
3. [Project Importance](#project-importance)
4. [Technologies Used](#technologies-used)
5. [Database Schema](#database-schema)
6. [Installation and Setup](#installation-and-setup)
7. [Usage](#usage)
8. [Contributing](#contributing)
9. [License](#license)
10. [Acknowledgements](#acknowledgements)

---

## **Introduction**

**Vaccine Record System** is an immunization management platform designed to help individuals and families track and manage vaccination records efficiently. The system allows users to:

- **Manage Personal Accounts**: Securely register and log in to manage vaccination records.
- **Log Vaccinations**: Record details of each vaccination, including vaccine name, administration date, provider, and upcoming due dates.
- **Locate Immunization Centers**: Find nearby centers offering vaccinations with detailed information such as address and services provided.

Aligned with **Sustainable Development Goal (SDG) 3: Good Health and Well-being**, this project aims to improve public health by ensuring timely vaccinations and easy access to vaccination centers.

---

## **Features**

- **User Authentication**: Secure registration and login system to protect user data.
- **Vaccination Records Management**: Easily add, view, and manage vaccination records.
- **Immunization Center Locator**: Interactive map to find nearby vaccination centers with essential details.
- **Responsive Design**: Accessible and user-friendly interface across various devices.
- **Data Integrity**: Robust database design ensuring accurate and reliable data storage.

---

## **Project Importance**

Vaccinations are a cornerstone of public health, preventing the spread of infectious diseases and safeguarding communities. However, keeping track of multiple vaccination schedules can be challenging for individuals and families. The **Vaccine Record System** addresses this issue by:

- **Enhancing Health Outcomes**: Ensures timely administration of vaccines, reducing the risk of disease outbreaks.
- **Simplifying Record-Keeping**: Provides a centralized platform for managing vaccination histories.
- **Promoting Accessibility**: Facilitates easy discovery of nearby immunization centers, improving access to healthcare services.
- **Supporting Public Health Initiatives**: Contributes to broader efforts in disease prevention and health promotion.

---

## **Technologies Used**

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js with Express.js
- **Database**: MySQL
- **Data Access**: SQL (Structured Query Language)
- **Data Visualization**: Chart.js (for graphical representations)
- **Mapping**: Google Maps JavaScript API (for center locator)
- **Version Control**: Git, GitHub

---

## **Database Schema**

The **Vaccine Record System** utilizes a relational database designed in MySQL, comprising three essential tables:

1. **Users**
2. **Vaccinations**
3. **Centers**

### **1. Users Table**

**Purpose**: Stores information about users who have accounts in the Vaccine Record System.

**Schema**:

```sql
CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    contact_info VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Fields**:
- `user_id`: Unique identifier for each user.
- `name`: Full name of the user.
- `email`: User’s email address (unique).
- `password_hash`: Hashed password for secure authentication.
- `contact_info`: Additional contact details (e.g., phone number).
- `created_at`: Timestamp of account creation.

---

### **2. Vaccinations Table**

**Purpose**: Records vaccination details for each user.

**Schema**:

```sql
CREATE TABLE IF NOT EXISTS Vaccinations (
    vaccination_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    vaccine_name VARCHAR(100) NOT NULL,
    date_administered DATE,
    provider VARCHAR(100),
    next_due_date DATE,
    center_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (center_id) REFERENCES Centers(center_id) ON DELETE SET NULL
);
```

**Fields**:
- `vaccination_id`: Unique identifier for each vaccination record.
- `user_id`: References the user who received the vaccination.
- `vaccine_name`: Name of the vaccine administered.
- `date_administered`: Date when the vaccine was given.
- `provider`: Healthcare provider or clinic that administered the vaccine.
- `next_due_date`: Scheduled date for the next vaccination dose (if applicable).
- `center_id`: References the immunization center where the vaccine was administered.

**Notes**:
- `center_id` is optional; set to `NULL` if not applicable.
- On deletion of a user, all their vaccination records are also deleted (`ON DELETE CASCADE`).

---

### **3. Centers Table**

**Purpose**: Contains information about immunization centers where vaccines are administered.

**Schema**:

```sql
CREATE TABLE IF NOT EXISTS Centers (
    center_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255) NOT NULL,
    contact_info VARCHAR(100),
    services_offered TEXT,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Fields**:
- `center_id`: Unique identifier for each center.
- `name`: Name of the immunization center.
- `address`: Physical address of the center.
- `contact_info`: Contact details (e.g., phone number, email).
- `services_offered`: Types of vaccines or services provided.
- `latitude`: Geographical latitude for mapping.
- `longitude`: Geographical longitude for mapping.
- `created_at`: Timestamp of center addition.

---

## **Installation and Setup**

### **Prerequisites**

- [Node.js](https://nodejs.org/en/) installed on your machine.
- [MySQL](https://www.mysql.com/) installed and running.
- A code editor like [Visual Studio Code](https://code.visualstudio.com/).

### **Step-by-Step Guide**

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/vaccine-record-system.git
   cd vaccine-record-system
   ```

2. **Install Dependencies**

   Navigate to the backend directory (if separated) or ensure all dependencies are listed in `package.json` and install them:

   ```bash
   npm install
   ```

3. **Set Up MySQL Database**

   - **Create Database**:

     ```sql
     CREATE DATABASE IF NOT EXISTS vaccine_record_system;
     USE vaccine_record_system;
     ```

   - **Run SQL Scripts**:

     Execute the `CREATE TABLE` statements provided in the [Database Schema](#database-schema) section using your MySQL client (e.g., MySQL Workbench, phpMyAdmin, or command line).

4. **Configure Environment Variables**

   Create a `.env` file in the root directory to store your database credentials and other configurations securely:

   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=vaccine_record_system
   PORT=3000
   GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
   ```

   **Note**: Replace `YOUR_GOOGLE_MAPS_API_KEY` with your actual Google Maps API key obtained from the [Google Cloud Console](https://console.cloud.google.com/).

5. **Start the Backend Server**

   ```bash
   node server.js
   ```

   **Optional**: For development purposes, you can use `nodemon` to automatically restart the server on code changes:

   ```bash
   npm install -g nodemon
   nodemon server.js
   ```

6. **Access the Application**

   Open your web browser and navigate to `http://localhost:3000` to access the Vaccine Record System.

---

## **Usage**

### **1. User Registration and Login**

- **Register**: Create a new account by providing your name, email, and password.
- **Login**: Access your account using your registered email and password.

### **2. Managing Vaccination Records**

- **Add Vaccination**: Log new vaccination records by specifying the vaccine name, administration date, provider, and next due date.
- **View Records**: Review all your past and upcoming vaccinations in an organized table.
- **Edit/Delete Records**: Update or remove vaccination entries as needed.

### **3. Locating Immunization Centers**

- **Search Centers**: Use the interactive map to find nearby immunization centers based on your location.
- **View Details**: Click on markers to see detailed information about each center, including address and services offered.
- **List of Centers**: Browse through a list of available centers with contact information for easy reference.

### **4. Dashboard**

- **Visual Analytics**: View charts representing your vaccination history and upcoming schedules.
- **Quick Overview**: Get a snapshot of your vaccination status and upcoming appointments.

---

## **Contributing**

Contributions are welcome! If you'd like to contribute to the **Vaccine Record System**, please follow these steps:

1. **Fork the Repository**

   Click the "Fork" button at the top right corner of the repository page to create a personal copy.

2. **Clone Your Fork**

   ```bash
   git clone https://github.com/your-username/vaccine-record-system.git
   cd vaccine-record-system
   ```

3. **Create a Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Commit Your Changes**

   ```bash
   git commit -m "Add feature: your-feature-description"
   ```

5. **Push to Your Fork**

   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**

   Navigate to the original repository and open a pull request from your feature branch.

### **Reporting Issues**

If you encounter any bugs or have feature requests, please open an issue in the repository with detailed information.

---

## **Acknowledgements**

- **Mayo Clinic**: For design inspiration guiding the user interface and user experience.
- **OpenAI & GPT-4**: For providing guidance and support in developing the project structure and functionalities.
- **Developers and Contributors**: For their continuous efforts in improving public health through technology.

---

## **Final Thoughts**

The **Vaccine Record System** serves as a vital tool in promoting public health by ensuring that individuals and families can efficiently manage and track their vaccination schedules. By leveraging modern web technologies and a robust database structure, this system aims to reduce the incidence of vaccine-preventable diseases and contribute to the well-being of communities.

**Join me in making vaccinations easier to manage and accessible to everyone!**
