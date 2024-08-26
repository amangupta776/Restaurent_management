# Restaurant Management App

## Overview
The Restaurant Management App is designed to streamline the operations of a restaurant, including managing customers, reservations, orders, staff, inventory, and generating reports. Built using the Frappe framework and a React site using Doppio CLI, this app provides a comprehensive solution for restaurant management.

## Table of Contents
- [Project Plan](#project-plan)
- [Installation](#installation)
- [React Application](#react-application)
- [Features](#features)
- [Implementation Phases](#implementation-phases)
- [User Roles and Permissions](#user-roles-and-permissions)
- [Usage](#usage)
- [Maintenance and Updates](#maintenance-and-updates)
- [License](#license)

## Project Plan

### 1. Project Initialization
- **Setup Frappe Framework:** Ensure Frappe is installed and set up on your server.
- **Create Custom App:** Create a new app using `bench new-app restaurant_management`.

### 2. Doctype and Child Doctype Design

#### 2.1 Customer Management
- **Customer:** `customer_name`, `email`, `phone_number`, `address`

#### 2.2 Table and Reservation Management
- **Table:** `table_number`, `capacity`, `location`, `status` (Available, Reserved)
- **Reservation:** `customer`, `table`, `reservation_date`, `reservation_time`, `status` (Pending, Confirmed, Completed, Cancelled), `number_of_people`
  - **Child Table - Reservation Items:** `item`, `quantity`, `special_requests`

#### 2.3 Menu and Order Management
- **Menu Item:** `item_name`, `description`, `price`, `category` (Starter, Main Course, Dessert, Beverage), `availability`
- **Order:** `customer`, `table`, `order_date`, `total_amount`, `status` (Pending, Confirmed, Completed, Cancelled)
  - **Child Table - Order Items:** `item`, `quantity`, `price`, `total`

#### 2.4 Staff Management
- **Staff:** `staff_name`, `role` (Chef, Waiter, Manager, Cleaner), `contact`, `shift_timing`, `salary`

#### 2.5 Inventory Management
- **Inventory Item:** `item_name`, `quantity`, `unit`, `price_per_unit`, `supplier`
- **Inventory Transaction:** `transaction_date`, `item`, `quantity`, `transaction_type` (Purchase, Usage, Waste), `remarks`

#### 2.6 Reporting
- **Daily Sales Report:** `date`, `total_sales`, `number_of_orders`, `average_order_value`
- **Inventory Usage Report:** `date`, `item`, `quantity_used`, `remaining_quantity`

### 3. Website Pages
- **Home Page:** Introduction and navigation to other sections.
- **Menu Page:** Display all available menu items with categories.
- **Reservation Page:** Form for booking a table and selecting menu items.
- **Order Tracking Page:** Allow customers to view the status of their orders.
- **Contact Page:** Contact information and form for inquiries.

### 4. Admin Dashboard
- **Dashboard Page:** Overview of daily operations (Reservations, Orders, Sales).
- **Manage Reservations:** Interface to view, confirm, and cancel reservations.
- **Manage Orders:** Interface to manage and track orders.
- **Manage Menu Items:** Add, update, and delete menu items.
- **Manage Inventory:** Track inventory items and transactions.
- **Staff Management:** Manage staff details and shifts.
- **Reports Section:** Generate and view various reports.

### 5. User Roles and Permissions
- **Admin:** Full access to all features.
- **Manager:** Access to manage reservations, orders, and view reports.
- **Chef:** Access to view orders and update status.
- **Waiter:** Access to view reservations and manage tables.
- **Customer:** Access to book tables, view menu, and track orders.

## Installation
1. **Install Frappe:** Follow the official [Frappe installation guide](https://frappeframework.com/docs/user/en/installation).
2. **Create a New Site:**
   ```bash
   bench new-site your-site-name

3.**Install the App:**

bench --site your-site-name install-app restaurant_management
## Setup Doppio React: Follow the instructions on Doppio CLI to integrate React for customer operations.
React Application
The React app for customer operations is built using Doppio CLI and runs on port 8080 using Yarn. This app interfaces with the Frappe backend to handle customer interactions like booking tables, viewing menus, and tracking orders.

Running the React App
**Navigate to the React App Directory:**


cd restaurant_management/rm
## Install Dependencies:

yarn install
## Start the Development Server:

yarn dev
The app will run on http://localhost:8080.
## Building for Production:
yarn build
The build output will be in the build directory, ready for deployment.
**Features**
## Customer Management: Manage customer details and interactions.
## Table and Reservation Management: Efficiently handle table reservations and status.
## Menu and Order Management: Display menu items and manage orders.
## Staff Management: Track staff roles, shifts, and salaries.
## Inventory Management: Monitor and manage inventory items and transactions.
## Reporting: Generate daily sales and inventory usage reports.
## Admin Dashboard: Centralized interface for managing restaurant operations.
**Implementation Phases**
## Phase 1: Setup and Doctype Creation
Setup Frappe and create the custom app.
Define and create all required doctypes and child doctypes.
Set up initial data entry forms and validation.
## Phase 2: Website and User Interface Development
 Design and develop the website pages using React and Doppio CLI.
Create the reservation and order booking system.
Develop the admin dashboard and interfaces for managing operations.
## Phase 3: Reporting and Analytics
Implement the reporting doctypes.
Create standard reports and integrate them into the admin dashboard.
## Phase 4: Testing and Deployment
Thoroughly test all features and functionality.
Fix any bugs or issues discovered during testing.
Deploy the app to the production server.
## Phase 5: Training and Documentation
Provide training for staff on using the new system.
Create comprehensive documentation for users and administrators.
**User Roles and Permissions**
### Admin: Full access to all features.
### Manager: Access to manage reservations, orders, and view reports.
### Chef: Access to view orders and update status.
### Waiter: Access to view reservations and manage tables.
### Customer: Access to book tables, view menu, and track orders.
