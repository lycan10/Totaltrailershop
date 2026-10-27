import React, { useState, useContext, useEffect } from "react";
import "./appointments.css"

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import GA4React from 'ga-4-react';

const ga4react = new GA4React('G-757XGDZ579');


const Appointments = () => {
  const [show, setShow] = useState(false);
  const [screenSize, setScreenSize] = useState('lg')
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true); 

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width <= 500) {
        setScreenSize('sm');
      } else if (width <= 800) {
        setScreenSize('md');
      } else {
        setScreenSize('lg');
      }
    };
  
    // Initial screen size setup
    updateScreenSize();
  
    // Add event listener for window resize
    window.addEventListener('resize', updateScreenSize);
  
    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const trackClickEvent = (eventCategory, eventAction, eventLabel) => {
    ga4react.gtag("bookings", eventAction, {
      event_category: eventCategory,
      event_label: eventLabel,
    });
  };
  return (
    <Modal show={show} onHide={handleClose} centered size={screenSize} className="booking-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="modal-gallery-title">
              <h2>Book an appointment</h2>
            </div>
          </Modal.Title>
        </Modal.Header>
        <div className="modal-booking container">
         <div className="modal-booking-title">
          <p>Set up an appointment for quality service tailored to your needs.</p>
         </div>
         <div className="modal-booking-form-container">
         <div className="modal-booking-form">
          <input type="text" placeholder="First name" />
         </div>
         <div className="modal-booking-form">
          <input type="text" placeholder="Last name" />
         </div>
         <div className="modal-booking-form">
          <input type="text" placeholder="Business name" />
         </div>
         <div className="modal-booking-form">
          <input type="text" placeholder="Email" />
         </div>
         <div className="modal-booking-form">
          <input type="text" placeholder="Phone" />
         </div>
         <div className="modal-booking-form">
         <select name="selectedFruit" defaultValue="orange">
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="orange">Orange</option>
        </select>
         </div>
         <div className="modal-booking-form">
          <input type="text" placeholder="Date" />
         </div>
         <div className="modal-booking-form">
          <input type="text" placeholder="Time" />
         </div>
         
         </div>
         <div className="modal-booking-textarea">
          <textarea type="text" placeholder="Message" />
         </div>
         <div className="modal-booking-button">
          <p>Submit</p>
         </div>
        </div>
        <Modal.Footer className='modal-footer'>
          
        </Modal.Footer>
      </Modal>
  )
}

export default Appointments