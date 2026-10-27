import React, { useEffect, useState } from "react";
import ReactGA from "react-ga";
import GA4React from 'ga-4-react';
import { Link, useLocation } from "react-router-dom";
import "./header.css"
import Slider from "react-slick";
import p1 from "../../assets/cb1.webp"
import p3 from "../../assets/h4.webp"
import p2 from "../../assets/4sp.webp"

const ga4react = new GA4React('G-Q100SQBYDV');

const Header = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    cssEase: "linear",

  };
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
  const phoneNumber = +12488530033; // Replace with your actual phone number

  const handleCallClick = () => {
    // trackClickEvent('Button', 'Click', 'Call Button Clicked');
    window.location.href = `tel:${phoneNumber}`;

  };

  return (
    <div className='header'>
      <div className="header-container-top">
        <div className="header-left"
        >

          <h1>Optimize Your Trailer’s Performance with Total Trailer</h1>

          <p>
            From routine maintenance to complex repairs, our expert technicians provide the reliable service your trailer needs. With quality trailer parts and comprehensive solutions, we help keep your trailer safe, reliable, and performing at its best.
          </p>





          <div className="home-button button-2" onClick={handleCallClick} style={{ cursor: "pointer" }}>
            <p>Call us now</p>
          </div>

          <div className="header-stats-container">
            <div className="header-stats">
              <h3>80k</h3>
              <p>Trailers Repaired</p>
            </div>
            <div className="header-vertical-line"></div>
            <div className="header-stats">
              <h3>4.8 star</h3>
              <p>Google rating</p>
            </div>
            <div className="header-vertical-line"></div>
            <div className="header-stats">
              <h3>98%</h3>
              <p>Customer satisfaction</p>
            </div>

          </div>
        </div>
        <div className="header-right-container">

          <div className="header-box-line"></div>
          <div className="header-img">
            <img src={p1} alt="" />
          </div>
        </div>
      </div>
      <div className="header-container-bottom">
        <p>With over 22 years of experience, we deliver the expertise and reliable service <br /> you can count on for #TotalPeaceOfMind.</p>

      </div>
      <div className="header-container-bottom-mobile">
        <p>With over 22 years of experience, we deliver the expertise and reliable service you can count on for #TotalPeaceOfMind.</p>

      </div>

    </div>
  )
}

export default Header