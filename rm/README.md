# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
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
