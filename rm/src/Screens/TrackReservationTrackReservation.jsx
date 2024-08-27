import React, { useState, useEffect } from 'react';
import { useFrappeAuth, useFrappeGetDocList } from 'frappe-react-sdk';
import Navbar from '../Components/NavBar';

const TrackReservation = () => {
  const { currentUser } = useFrappeAuth();
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [filterStatus, setFilterStatus] = useState('');
  const [error, setError] = useState(null);

  // Fetch reservations only if currentUser is available
  const { data: fetchedReservations = [], error: fetchError } = useFrappeGetDocList('Reservation', {
    filters: currentUser ? { customer: currentUser } : {},
    fields: ["*"],
    enabled: currentUser, 
  });

  useEffect(() => {
    if (fetchError) {
      setError('Error fetching reservations.');
    } else {
      setFilteredReservations(fetchedReservations);
    }
  }, [fetchedReservations, fetchError]);

  // Handle filtering by status
  const handleFilterChange = (e) => {
    const { value } = e.target;
    setFilterStatus(value);

    if (value) {
      setFilteredReservations(fetchedReservations.filter((reservation) => reservation.status === value));
    } else {
      setFilteredReservations(fetchedReservations);
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen pt-16 text-white">
      <Navbar />
      <div className="max-w-3xl mx-auto p-5 bg-gray-800 rounded-lg shadow-lg mt-12">
        <h2 className="text-center text-2xl font-bold mb-6">Track Reservation</h2>
        {currentUser ? (
          <>
            <div className="mb-4">
              <label htmlFor="filterStatus" className="block font-semibold mb-2">Filter by Status</label>
              <select
                id="filterStatus"
                name="filterStatus"
                value={filterStatus}
                onChange={handleFilterChange}
                className="w-full p-3 border border-gray-600 rounded-lg bg-gray-700"
              >
                <option value="">All</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            {filteredReservations.length > 0 ? (
              <ul className="space-y-4">
                {filteredReservations.map((reservation) => (
                  <li key={reservation.name} className="p-4 bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-lg font-bold">Table: {reservation.table}</h3>
                        <p className="text-sm text-gray-300">
                          Date: {reservation.reservation_date} | Time: {reservation.reservation_time} - {reservation.end_time}
                        </p>
                        <p className="text-sm text-gray-300">
                          Status: <span className="font-semibold">{reservation.status}</span>
                        </p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-400">
                      Number of People: {reservation.number_of_people}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-lg font-semibold">No reservations found.</p>
            )}
          </>
        ) : (
          <p className="text-center text-lg font-semibold">Please log in to track your reservations.</p>
        )}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default TrackReservation;
