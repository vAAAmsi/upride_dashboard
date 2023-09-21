import React, { useState } from 'react';
import './popup.css'; // 
import { Button, TextField } from '@mui/material';
function AddBookingModal({ onClose, onSave }) {
  const [bookingData, setBookingData] = useState({}); 
  const handleSave = () => {
    onSave(bookingData); 
    onClose();
  };

  return (
    <div className="add-booking-modal">
      <div className="modal-content">
        <h2>Add Booking</h2>
        
        <form onSubmit={handleSave}>
        <TextField 
        required
        type="text"
        label="Name"
        value={bookingData.username}
        onChange={(e) => setBookingData({ ...bookingData, username: e.target.value })}
      /> <br/>
      <TextField
        required
        style={{marginTop:'10px'}}
        type="text"
        label="status"
        value={bookingData.status}
        onChange={(e) => setBookingData({ ...bookingData, status: e.target.value })}
      />
      <div className="modal-buttons">
        <Button variant='contained' type='submit' >Save</Button>
        <Button  variant='contained' onClick={onClose}>Cancel</Button>
      </div>
        </form>
      </div>
    </div>
  );
}

export default AddBookingModal;
