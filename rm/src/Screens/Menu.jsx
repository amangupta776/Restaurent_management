import React, {useState } from 'react';
import {  useFrappeGetDocList } from 'frappe-react-sdk';

const Menu = () => {
  
  const [activeFilter, setActiveFilter] = useState('all');
  
  const { data: menuItems, error } = useFrappeGetDocList('Menu Item', {
    fields: ['item_name', 'description', 'price', 'category'],
    filters: {
      availability: 1
    }
  });

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col">
      
      <main className="flex-1 p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-indigo-400 mb-4">PAPERBOY</h1>

          <div className="flex justify-center mb-6">
            <img
              src="https://images.unsplash.com/photo-1560611588-163f295eb145?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Delicious Menu"
              className="w-full max-w-lg rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="flex justify-center space-x-2 mb-6">
            {['all', 'Starter', 'Main Course', 'Dessert', 'Beverage'].map(category => (
              <button
                key={category}
                onClick={() => handleFilterClick(category)}
                className={`bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-transform duration-300 ${activeFilter === category ? 'bg-red-700' : ''}`}
              >
                {category === 'all' ? 'All' : category}
              </button>
            ))}
          </div>

          <h2 className="text-3xl font-bold text-indigo-400 mb-6">Our Menu</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {menuItems?.filter(item => activeFilter === 'all' || item.category === activeFilter).map(item => (
              <div key={item.item_name} className="bg-gray-800 p-4 rounded-lg shadow-md">
                <h3 className="text-2xl font-semibold text-gray-100 mb-2">{item.item_name}</h3>
                <p className="text-gray-400 mb-2">Description: {item.description}</p>
                <p className="text-red-600 font-bold text-xl">Price: ${item.price}</p>
              </div>
            ))}
            {menuItems?.length === 0 && <p className="text-gray-400 text-center col-span-full">No menu items available.</p>}
            {error && <p className="text-red-500 text-center col-span-full">Error fetching menu items: {error.message}</p>}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Menu;
