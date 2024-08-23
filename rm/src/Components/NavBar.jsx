import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFrappeAuth } from 'frappe-react-sdk'; // Import useFrappeAuth for user state management
import LogoutButton from '../Components/LogoutButton'; // Import LogoutButton component

const Navbar = () => {
  const { currentUser } = useFrappeAuth(); // Get the current user state
  const navigate = useNavigate(); // Initialize navigate for redirection

  return (
    <nav className="bg-gray-900 text-gray-100 w-full fixed top-0 left-0 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <ul className="flex space-x-6">
          <li><Link to="/" className="hover:text-red-500 transition-colors duration-300">Home</Link></li>
          <li><Link to="/menu" className="hover:text-red-500 transition-colors duration-300">Menu</Link></li>
          <li><Link to="/reservation" className="hover:text-red-500 transition-colors duration-300">Reservations</Link></li>
          <li><Link to="/order" className="hover:text-red-500 transition-colors duration-300">Track Order</Link></li>
          <li><Link to="/contact" className="hover:text-red-500 transition-colors duration-300">Contact Us</Link></li>
        </ul>

        <div className="flex items-center space-x-4">
          {currentUser && currentUser !== "Guest" ? (
            <>
              <span className="text-gray-200">Welcome, {currentUser}</span>
              <LogoutButton />
            </>
          ) : (
            <button
              onClick={() => navigate('/login')} // Navigate to the login page
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-transform duration-300 hover:scale-105"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
