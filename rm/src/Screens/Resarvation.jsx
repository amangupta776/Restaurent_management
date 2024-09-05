import React, { useState, useEffect } from 'react';
import { useFrappeAuth, useFrappeGetDocList, useFrappeCreateDoc } from 'frappe-react-sdk';
import Navbar from '../Components/NavBar';
import CheckReservation from '../Components/ReservationAvailability';

const ReservationForm = () => {
  const { currentUser } = useFrappeAuth();
  const [reservationItems, setReservationItems] = useState([]);
  const [reservationTime, setReservationTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [error, setError] = useState(null);
  const [endTimeError, setEndTimeError] = useState(null);
  const [endTimeEnabled, setEndTimeEnabled] = useState(false);
 


  // Fetch available tables
  const { data: tables, error: tablesError } = useFrappeGetDocList('Table', {
    filters: { status: 'Available' },
    enabled: currentUser
  });

  // Fetch menu items
  const { data: menuItems, error: menuItemsError } = useFrappeGetDocList('Menu Item',{
    enabled: currentUser
  });

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


  const handleReservationTimeChange = (e) => {
    const { value } = e.target;
    setReservationTime(value);
     
    // Enable end time field when reservation time is filled
    if (value) {
      setEndTimeEnabled(true);
    } else {
      setEndTimeEnabled(false);
      setEndTime('');
      setEndTimeError(null);
    }
  };

  const handleEndTimeChange = (e) => {
    const { value } = e.target;
    setEndTime(value);

    // Only validate if reservation time is set
    if (reservationTime) {
      // Calculate minimum end time
      const [resHour, resMinute] = reservationTime.split(':').map(Number);
      const resDate = new Date();
      resDate.setHours(resHour, resMinute, 0, 0);

      const minEndDate = new Date(resDate.getTime() + 30 * 60000); // 30 minutes in milliseconds

    
      const [endHour, endMinute] = value.split(':').map(Number);
      const endDate = new Date();
      endDate.setHours(endHour, endMinute, 0, 0);

      // Validate end time
      if (endDate < minEndDate) {
        setEndTimeError('End time must be at least 30 minutes after reservation time.');
      } else {
        setEndTimeError(null);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate minimum end time
    const [resHour, resMinute] = reservationTime.split(':').map(Number);
    const resDate = new Date();
    resDate.setHours(resHour, resMinute, 0);

    const minEndTime = new Date(resDate.getTime() + 30 * 60000); // Add 30 minutes
    const [endHour, endMinute] = endTime.split(':').map(Number);
    const endDate = new Date();
    endDate.setHours(endHour, endMinute, 0);

    if (endDate < minEndTime) {
      setEndTimeError('End time must be at least 30 minutes after reservation time.');
      return;
    } else {
      setEndTimeError(null);
    }

    const data = {
      customer: currentUser,
      table: e.target.table.value,
      reservation_date: e.target.reservation_date.value,
      reservation_time: reservationTime,
      end_time: endTime,
      number_of_people: e.target.number_of_people.value,
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
     
      {currentUser ? <CheckReservation /> : ""}
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
                
               
                onChange={handleReservationTimeChange}
                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700" 
              />
            </div>
            <div className="mb-4">
              <label htmlFor="end_time" className="block font-semibold mb-2">Reservation End Time</label>
              <input 
                type="time" 
                id="end_time" 
                name="end_time" 
                required 
            
         
                value={endTime}
                onChange={handleEndTimeChange}
                disabled={!endTimeEnabled}
                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700" 
              />
              {endTimeError && <p className="text-red-500 mt-2">{endTimeError}</p>}
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
                    <th className="border-b py-2 px-4 bg-red-600">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {reservationItems&&reservationItems.map((item, index) => (
                    <tr key={index}>
                      <td className="border-b py-2 px-4">
                        <select
                          name="item"
                          value={item.item}
                          onChange={(e) => handleChangeRow(index, e)}
                          className="w-full p-2 border border-gray-600 bg-gray-700 rounded-lg"
                        >
                          <option value="">Select item</option>
                          {menuItems?.map((menuItem) => (
                            <option key={menuItem.name} value={menuItem.name}>
                              {menuItem.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="border-b py-2 px-4">
                        <input
                          type="number"
                          name="quantity"
                          value={item.quantity}
                          onChange={(e) => handleChangeRow(index, e)}
                          className="w-full p-2 border border-gray-600 bg-gray-700 rounded-lg"
                        />
                      </td>
                      <td className="border-b py-2 px-4">
                        <input
                          type="text"
                          name="specialRequests"
                          value={item.specialRequests}
                          onChange={(e) => handleChangeRow(index, e)}
                          className="w-full p-2 border border-gray-600 bg-gray-700 rounded-lg"
                        />
                      </td>
                      <td className="border-b py-2 px-4 text-center">
                        <button type="button" onClick={() => handleRemoveRow(index)} className="text-red-500 hover:text-red-700">
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button type="button" onClick={handleAddRow} className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg">
                Add Row
              </button>
            </div>
            <div className="flex justify-center">
              <button type="submit" disabled={submitting} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
                {submitting ? 'Submitting...' : 'Submit Reservation'}
              </button>
            </div>
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          </form>
        ) : (
          <p className="text-center text-lg font-semibold">Please log in to make a reservation.</p>
        )}
      </div>
    </div>
  );
};

export default ReservationForm;
