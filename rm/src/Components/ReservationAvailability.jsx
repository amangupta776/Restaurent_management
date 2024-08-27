import React, { useState, useEffect } from 'react';
import {  useFrappeGetDocList } from 'frappe-react-sdk';

const CheckReservation = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [reservedTimings, setReservedTimings] = useState([]);
    const { data: reservationsForDate } = useFrappeGetDocList('Reservation', {
      filters: { reservation_date: selectedDate,
        status:"Confirmed"
       },
      fields: ['reservation_time', 'end_time', 'table'],
    });
    const today = new Date().toISOString().split('T')[0];
  
    useEffect(() => {
      if (reservationsForDate) {
        setReservedTimings(reservationsForDate);
      }
    }, [reservationsForDate]);
  
    return (
      <div className="max-w-lg mx-auto p-5 bg-gray-800 rounded-lg shadow-lg mt-12">
        <h2 className="text-center text-2xl font-bold mb-6">Check Reservation Availability</h2>
        <div className="mb-4">
          <label htmlFor="check_date" className="block font-semibold mb-2">Select Date</label>
          <input 
            type="date" 
            id="check_date" 
            name="check_date" 
            className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700" 
            onChange={(e) => setSelectedDate(e.target.value)}
            min={today}
          />
        </div>
        {(reservedTimings.length > 0) ? (
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Reserved Timings for {selectedDate}</h3>
            <ul className="list-disc list-inside bg-gray-700 p-4 rounded-lg">
              {reservedTimings.map((reservation, index) => (
                <li key={index}>
                  Table {reservation.table}: {reservation.reservation_time} - {reservation.end_time}
                </li>
              ))}
            </ul>
          </div>
        ):<p>No Reservation on Choosen Date</p>}
      </div>
    );
  };

  export default CheckReservation