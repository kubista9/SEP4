import React, { useState, useEffect } from 'react';
import axios from 'axios'; 

function GreenHouseDetails() {
  const [greenhouse, setGreenhouse] = useState(null);

  useEffect(() => {
    const fetchGreenhouseData = async () => {
      try {
        const response = await fetch('http://localhost:5047/GreenHouse?greenHouseId=2');
        if (!response.ok) {
          throw new Error('Failed to fetch greenhouse data');
        }
        const data = await response.json();
        console.log('Response data:', data); // Log the received data
        if (!data || data.length === 0) {
          throw new Error('No greenhouse data found');
        }
        // Update state with the first element of the array
        setGreenhouse(data[0]);
      } catch (error) {
        console.error('Error fetching greenhouse data:', error);
      }
    };
  
    fetchGreenhouseData();
  }, []);
  

  const updateGreenhouseWindow = async () => {
    if (!greenhouse) return; // Ensure greenhouse data is loaded
  
    try {
      // Toggle window status
      const newWindowStatus = !greenhouse.isWindowOpen;
  
      // Send PATCH request to update the window status
      const response = await axios.patch(`http://localhost:5047/GreenHouse/${greenhouse.greenHouseId}`, {
        isWindowOpen: newWindowStatus // Use 'isWindowOpen' instead of 'IsWindowOpen'
      });
  
      // Check if the response contains a message property
      if (response.data && response.data.message) {
        console.log(response.data.message); // Log the response message
      } else {
        console.log('Window status updated successfully'); // Default message if 'message' property is undefined
      }
  
      // Update local state with the updated window status
      setGreenhouse(prevState => ({
        ...prevState,
        isWindowOpen: newWindowStatus // Update 'isWindowOpen' in the local state
      }));
    } catch (error) {
      console.error('Error updating greenhouse window status:', error);
    }
  };
  
  
  return (
    <div className='container'>
      {greenhouse ? (
        <div className='wrapper'>
          <p>ID: {greenhouse.greenHouseId}</p>
          <p>Window opened: {greenhouse.isWindowOpen ? 'Yes' : 'No'}</p>
          <button onClick={updateGreenhouseWindow}>
            {greenhouse.isWindowOpen ? 'Close Window' : 'Open Window'}
          </button>
        </div>
      ) : (
        <p>Loading greenhouse details...</p>
      )}
    </div>
  );
  
}

export default GreenHouseDetails;