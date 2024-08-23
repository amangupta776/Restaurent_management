import React, { useState, useEffect } from 'react';
import { useFrappeAuth, useFrappeGetDocList } from 'frappe-react-sdk';
import Navbar from '../Components/NavBar';

const OrderTracking = () => {
  const { currentUser } = useFrappeAuth();
  const [error, setError] = useState(null);

  // Fetch orders using Frappe's provider method
  const { data: orders, error: fetchError, isLoading } = useFrappeGetDocList('Order', {
    fields: ['*'],
    filters: {
      customer: currentUser, // Use email instead of currentUser object
    },
  });

  useEffect(() => {
    if (fetchError) {
      setError('Error fetching orders.');
    }
  }, [fetchError]);

  return (
    <div className="bg-gray-900 min-h-screen pt-16 text-white">
      <Navbar />
      <div className="w-4/5 mx-auto p-5 mt-16">
        <h2 className="text-center text-2xl font-bold mb-5">Track Your Order</h2>
        {currentUser ? (
          <>
            {isLoading && <p className="text-center">Loading...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {orders?.length > 0 ? (
              orders.map(order => (
                <div key={order.name} className="bg-gray-800 border border-gray-700 rounded-md p-4 mb-5 shadow-md">
                  <h3 className="text-xl font-semibold mb-2">Order #{order.name}</h3>
                  <p><strong>Status:</strong> {order.status}</p>
                  <p><strong>Table:</strong> {order.table}</p>
                  <p><strong>Order Date:</strong> {order.order_date}</p>
                  <p><strong>Total Amount:</strong> ${order.total_amount}</p>
                </div>
              ))
            ) : (
              !isLoading && <p className="text-center">No orders found.</p>
            )}
          </>
        ) : (
          <p className="text-center text-red-500">Please log in to view your orders.</p>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
