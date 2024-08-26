import React, { useState, useEffect } from 'react';
import { useFrappeAuth, useFrappeGetDocList, useFrappeCreateDoc } from 'frappe-react-sdk';
import Navbar from '../Components/NavBar';
import { useNavigate } from 'react-router-dom';

const ReservationForm = () => {
  const { currentUser } = useFrappeAuth();
  const [reservationItems, setReservationItems] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch available tables
  const { data: tables, error: tablesError } = useFrappeGetDocList('Table', {
    filters: { status: 'Available' },
  });

  // Fetch menu items
  const { data: menuItems, error: menuItemsError } = useFrappeGetDocList('Menu Item');

  // Using Frappe Create Doc hook for submitting the reservation
  const { createDoc, loading: submitting, error: submitError } = useFrappeCreateDoc();

  useEffect(() => {
    if (tablesError || menuItemsError) {
      setError('Error fetching data.');
    }
    if (submitError) {
      setError('Error submitting reservation.');
    }
  }, [tablesError, menuItemsError, submitError]);

  // Get today's date and current time
  const today = new Date().toISOString().split('T')[0];
  const currentTime = new Date().toTimeString().split(' ')[0].slice(0, 5);

  const handleAddRow = () => {
    setReservationItems([...reservationItems, { item: '', quantity: '', specialRequests: '' }]);
  };

  const handleRemoveRow = (index) => {
    setReservationItems(reservationItems.filter((_, i) => i !== index));
  };

  const handleChangeRow = (index, e) => {
    const { name, value } = e.target;
    const updatedItems = reservationItems.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setReservationItems(updatedItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      customer: currentUser, // Ensure customer is valid
      table: formData.get('table'),
      reservation_date: formData.get('reservation_date'),
      reservation_time: formData.get('reservation_time'),
      number_of_people: formData.get('number_of_people'),
      reservation_items: reservationItems.map(item => ({
        item: item.item,
        quantity: item.quantity,
        special_requests: item.specialRequests,
      })),
    };

    try {
      await createDoc('Reservation', data);
      alert('Reservation submitted successfully.');
    } catch (error) {
      console.error('Error:', error);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen pt-16 text-white">
      <Navbar />
      <div className="max-w-lg mx-auto p-5 bg-gray-800 rounded-lg shadow-lg mt-12">
        <h2 className="text-center text-2xl font-bold mb-6">Reservation Form</h2>
        {currentUser ? (
          <form id="reservation-form" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="customer" className="block font-semibold mb-2">Customer</label>
              <input type="text" id="customer" name="customer" value={currentUser || ''} readOnly className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700" />
            </div>
            <div className="mb-4">
              <label htmlFor="table" className="block font-semibold mb-2">Table</label>
              <select id="table" name="table" required className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700">
                <option value="">Select a table</option>
                {tables?.map((table) => (
                  <option key={table.name} value={table.name}>{table.name}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="reservation_date" className="block font-semibold mb-2">Reservation Date</label>
              <input 
                type="date" 
                id="reservation_date" 
                name="reservation_date" 
                required 
                min={today} // Disable past dates
                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700" 
              />
            </div>
            <div className="mb-4">
              <label htmlFor="reservation_time" className="block font-semibold mb-2">Reservation Time</label>
              <input 
                type="time" 
                id="reservation_time" 
                name="reservation_time" 
                required 
                min={currentTime} // Restrict time to current time onwards
                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700" 
              />
            </div>
            <div className="mb-4">
              <label htmlFor="number_of_people" className="block font-semibold mb-2">Number of People</label>
              <input type="number" id="number_of_people" name="number_of_people" required className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700" />
            </div>

            <div className="mb-4">
              <label className="block font-semibold mb-2">Reservation Items</label>
              <table className="w-full border border-gray-600 rounded-lg bg-gray-700">
                <thead>
                  <tr>
                    <th className="border-b py-2 px-4 bg-red-600">Item</th>
                    <th className="border-b py-2 px-4 bg-red-600">Quantity</th>
                    <th className="border-b py-2 px-4 bg-red-600">Special Requests</th>
                    <th className="border-b py-2 px-4 bg-red-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {reservationItems.map((item, index) => (
                    <tr key={index}>
                      <td className="border-b p-2">
                        <select name="item" value={item.item} onChange={(e) => handleChangeRow(index, e)} className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700">
                          <option value="">Select an item</option>
                          {menuItems?.map(menuItem => (
                            <option key={menuItem.name} value={menuItem.name}>{menuItem.name}</option>
                          ))}
                        </select>
                      </td>
                      <td className="border-b p-2">
                        <input type="number" name="quantity" value={item.quantity} onChange={(e) => handleChangeRow(index, e)} className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700" />
                      </td>
                      <td className="border-b p-2">
                        <input type="text" name="specialRequests" value={item.specialRequests} onChange={(e) => handleChangeRow(index, e)} className="w-full p-2 border border-gray-600 rounded-lg bg-gray-700" />
                      </td>
                      <td className="border-b p-2 text-center">
                        <button type="button" onClick={() => handleRemoveRow(index)} className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button type="button" onClick={handleAddRow} className="mt-4 bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800">Add Item</button>
            </div>

            <button type="submit" className="w-full bg-red-700 text-white py-3 rounded-lg hover:bg-red-800" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        ) : (
          <p className="text-center text-red-500">Please log in to make a reservation.</p>
        )}
      </div>
    </div>
  );
};

export default ReservationForm;
