import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import ReactGA from "react-ga";
import GA4React from 'ga-4-react';
import { Link, useLocation } from "react-router-dom";


const ga4react = new GA4React('G-Q100SQBYDV'); 


const ServiceCard = ({ image, title, description }) => {
  const location = useLocation();
      useEffect(() => {
        ReactGA.pageview(location.pathname + location.search);
      }, [location]);

    const trackClickEvent = (eventCategory, eventAction, eventLabel) => {
        ga4react.gtag("event", eventAction, {
          event_category: eventCategory,
          event_label: eventLabel,
        });
      };
    const navigateToService = () => {
        // Use the URL of the page you want to navigate to
        const newUrl = "/services";
    
        if (window.location.pathname === newUrl) {
          // If the user is already on the target page, perform a full page reload
          window.location.reload();
        } else {
          // Navigate to the new page
          trackClickEvent('Button', 'Click', 'Contact Button Clicked');
          window.location.href = newUrl;
        }
      };
    return (
      <div className="home-services-bottom-card">
        <img src={image} alt={title} />
  
        <div className="home-services-bottom-card-content">
          <h1>{title}</h1>
          <p>{description}</p>
          <div className="homeservice-button-tag" onClick={navigateToService} >
            <p>More details</p>
            <MdOutlineKeyboardArrowRight />
          </div>
        </div>
      </div>
    );
  };
  
  export default ServiceCard;