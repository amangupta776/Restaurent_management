import React from 'react';
import Navbar from '../Components/NavBar';
import {Link} from "react-router-dom"
const Home = () => {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col">
 
      
      <main className="flex-1 pt-20 pb-8 px-4"> 
        <div className="text-center">
          <div className="text-4xl font-bold text-indigo-400 mb-8">flavour & flavors</div>
          <div className="flex justify-center mb-6">
            <img
              src="https://images.unsplash.com/photo-1560611588-163f295eb145?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Restaurant"
              className="w-full max-w-lg rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </div>
          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-6">
            Welcome to flavour & flavors, where we bring you an unparalleled dining experience. Our menu features a curated selection of exquisite dishes crafted from the finest ingredients. Whether you're here for a quick bite or a full-course meal, we promise an unforgettable culinary journey. Don't miss out on our special events and catering services for your next big celebration!
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/order" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-transform duration-300 hover:scale-105">Track Your Order</Link>
            <Link to="/reservation" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-transform duration-300 hover:scale-105">Reservations</Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
