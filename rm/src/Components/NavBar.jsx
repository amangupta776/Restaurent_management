import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import LogoutButton from '../Components/LogoutButton';

const Navbar = () => {
  const { authUser } = useAuth(); // Get auth state from AuthContext

  return (
    <nav className="bg-gray-900 text-gray-100 w-full fixed top-0 left-0 shadow-lg z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <ul className="flex space-x-6">
          <li><Link to="/" className="hover:text-red-500 transition-colors duration-300">Home</Link></li>
          <li><Link to="/menu" className="hover:text-red-500 transition-colors duration-300">Menu</Link></li>
          <li><Link to="/reservation" className="hover:text-red-500 transition-colors duration-300">Reservations</Link></li>
          <li><Link to="/contact" className="hover:text-red-500 transition-colors duration-300">Contact Us</Link></li>
          {authUser && authUser !== "Guest" && (
            <>
              <li><Link to="/order" className="hover:text-red-500 transition-colors duration-300">Track Order</Link></li>
              <li><Link to="/trackreservation" className="hover:text-red-500 transition-colors duration-300">Track Your Reservation</Link></li>
            </>
          )}
        </ul>

        <div className="flex items-center space-x-4">
          {authUser && authUser !== "Guest" ? (
            <>
              <span className="text-gray-200">Welcome, {authUser}</span>
              <LogoutButton />
            </>
          ) : (
            <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
