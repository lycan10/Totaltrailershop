import React, { useEffect, useState, useRef, useMemo } from "react";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";

import Footer from "../../components/footer/Footer";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import HomeReviews from "../../components/homereviews.jsx/HomeReviews";
import emailjs from '@emailjs/browser';
import ReactGA from "react-ga";
import { Link, useLocation } from "react-router-dom";

import "./home.css";
// import Homecoming from "../../components/homecoming/Homecoming";
// import AboutImgs from "../../components/aboutimgs/AboutImgs";
// import { Button, Modal } from "react-bootstrap";
import Stats from "../../components/stats/Stats";
import GoogleReviews from "../../components/googlereviews/GoogleReviews";
import mission from "../../assets/abt3.jpg";
import gal from "../../assets/g2.jpg";
import serv from "../../assets/servbanner2.jpeg";
import sale from "../../assets/repair2.jpg";
import Lightbox from "yet-another-react-lightbox";
// import Captions from "yet-another-react-lightbox/plugins/captions";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Video from "yet-another-react-lightbox/plugins/video";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import image1 from "../../assets/photo/electrical/e2.jpg";
import image2 from "../../assets/abt1.png";
import image3 from "../../assets/photo/lights/light1.jpg";

import GA4React from 'ga-4-react';
import Promotion from "../../components/promotion/Promotion";
import Newsletter from "../../components/newsletter/Newsletter";
import LogoSection from "../../components/logosection/LogoSection";
import ServiceCard from "./serviceCard";

const ga4react = new GA4React('G-Q100SQBYDV');

const Home = () => {
  const location = useLocation();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [show, setShow] = useState(false);
  const [screenSize, setScreenSize] = useState('lg')
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const form = useRef();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    email: '',
    phone: '',
    service: 'Lube job',
    date: '',
    time: '',
    message: '',
  });

  const [disabledDates, setDisabledDates] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [errors, setErrors] = useState({});

  // Fetch disabled dates from backend so the picker can block them
  useEffect(() => {
    const apiBase = process.env.REACT_APP_BASE_URL || 'https://api.totaltrailershop.com/public';
    fetch(`${apiBase}/api/appointments/disabled-dates`)
      .then((r) => r.json())
      .then((dates) => setDisabledDates(Array.isArray(dates) ? dates : []))
      .catch(() => { }); // silently fail – disabled dates are non-critical
  }, []);

  // Helper to normalize any date item to 'YYYY-MM-DD'
  const normalizedDisabledDates = useMemo(() => {
    if (!Array.isArray(disabledDates)) return [];
    return disabledDates
      .map((d) => {
        if (!d) return '';
        if (typeof d === 'string') return d.split('T')[0].split(' ')[0];
        if (d?.date) return String(d.date).split('T')[0].split(' ')[0];
        return '';
      })
      .filter(Boolean);
  }, [disabledDates]);

  // Helper to check if a date is selectable (weekdays only, not in disabled dates)
  const isDateDisabled = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    // Disable Saturday (6) and Sunday (0)
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return false;
    }

    // Disable if in backend disabled dates array
    if (normalizedDisabledDates.includes(dateStr)) {
      return false;
    }

    return true;
  };

  const handleDateChange = (date) => {
    if (errors.date) {
      setErrors((prev) => ({ ...prev, date: '' }));
    }
    setFormError('');

    if (!date) {
      setFormData((prev) => ({ ...prev, date: '' }));
      return;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    setFormData((prev) => ({ ...prev, date: formattedDate }));
  };

  const validateForm = () => {
    const newErrors = {};

    // First Name
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required.';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters.';
    }

    // Last Name
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required.';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters.';
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address (e.g. name@example.com).';
    }

    // Phone
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (cleanPhone.length < 10) {
      newErrors.phone = 'Phone number must be at least 10 digits.';
    } else if (cleanPhone.length > 15) {
      newErrors.phone = 'Phone number is too long.';
    }

    // Service
    if (!formData.service) {
      newErrors.service = 'Please select a service.';
    }

    // Date
    const todayStr = new Date().toISOString().split('T')[0];
    if (!formData.date) {
      newErrors.date = 'Appointment date is required.';
    } else if (formData.date < todayStr) {
      newErrors.date = 'Please select today or a future date.';
    } else if (normalizedDisabledDates.includes(formData.date)) {
      newErrors.date = 'This date is unavailable. Please choose another date.';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    setFormError('');
    setFormData({ ...formData, [name]: value });
  };

  var YOUR_SERVICE_ID = 'service_r2oz9nd';
  const YOUR_TEMPLATE_ID = 'template_4cr76l4';
  const YOUR_PUBLIC_KEY = '-0rFb-M8gUI55KkAy';

  const navigateToThankYou = () => {
    // Use the URL of the page you want to navigate to
    const newUrl = "/thankyou";

    if (window.location.pathname === newUrl) {
      // If the user is already on the target page, perform a full page reload
      window.location.reload();
    } else {
      // Navigate to the new page
      trackClickEvent('Button', 'Click', 'Home Button Clicked');
      window.location.href = newUrl;
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setFormError('');

    // Comprehensive client-side validation
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFormError('Please resolve the highlighted errors above.');
      return;
    }

    setSubmitting(true);

    const apiBase = process.env.REACT_APP_BASE_URL || 'https://api.totaltrailershop.com/public';

    try {
      const response = await fetch(`${apiBase}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const err = await response.json();
        const msg =
          err?.message ||
          (err?.errors ? Object.values(err.errors).flat().join(' ') : 'Failed to book appointment.');
        setFormError(msg);
        setSubmitting(false);
        return;
      }

      // 2️⃣  Also send email via EmailJS (non-blocking – fire and forget)
      /* try {
         await emailjs.sendForm(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, form.current, {
           publicKey: YOUR_PUBLIC_KEY,
         });
       } catch (ejsErr) {
         // EmailJS failure should NOT block the user — DB entry is already saved
         console.warn('EmailJS send failed:', ejsErr);
       }*/

      trackClickEvent('Button', 'Click', 'Appointment booked');

      setFormData({
        firstName: '',
        lastName: '',
        businessName: '',
        email: '',
        phone: '',
        service: 'Lube job',
        date: '',
        time: '',
        message: '',
      });
      handleClose();
      navigateToThankYou();
    } catch (err) {
      setFormError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };
  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);


  const trackClickEvent = (eventCategory, eventAction, eventLabel) => {
    ga4react.gtag("event", eventAction, {
      event_category: eventCategory,
      event_label: eventLabel,
    });
  };
  // const navigateToAbout = () => {

  //   const newUrl = "/about";

  //   if (window.location.pathname === newUrl) {
  //     window.location.reload();
  //   } else {
  //     trackClickEvent('Button', 'Click', 'About Button Clicked');
  //     navigate(newUrl);
  //   }
  // };

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
  // const navigateToGallery = () => {
  //   // Use the URL of the page you want to navigate to
  //   const newUrl = "/gallery";

  //   if (window.location.pathname === newUrl) {
  //     // If the user is already on the target page, perform a full page reload
  //     window.location.reload();
  //   } else {
  //     // Navigate to the new page
  //     trackClickEvent('Button', 'Click', 'Contact Button Clicked');
  //     window.location.href = newUrl;
  //   }
  // };

  const navigateToContact = () => {
    // Use the URL of the page you want to navigate to
    const newUrl = "/contact";

    if (window.location.pathname === newUrl) {
      // If the user is already on the target page, perform a full page reload
      window.location.reload();
    } else {
      // Navigate to the new page
      trackClickEvent('Button', 'Click', 'Contact Button Clicked');
      window.location.href = newUrl;
    }
  };

  const phoneNumber = +12488530033; // Replace with your actual phone number

  const handleCallClick = () => {
    trackClickEvent('Button', 'Click', 'Call Button Clicked');
    window.location.href = `tel:${phoneNumber}`;

  };
  const [open, setOpen] = useState(false);

  const todayStr = new Date().toISOString().split('T')[0];
  const isTodaySelected = formData.date === todayStr;
  const now = new Date();
  const minTimeStr = isTodaySelected
    ? `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    : undefined;

  return (
    <div className="home">
      <Navbar />
      <Header />
      <Promotion />
      <div className="aboutpage-mvs-container  home-sale">
        <div className="form-mvs"
        // data-aos="fade-up"
        // data-aos-easing="linear"
        // data-aos-duration="1000"
        >
          <h1>Book an appointment</h1>
          <form ref={form} onSubmit={sendEmail}>
            <div className="modal-booking container">
              <div className="modal-booking-title">
                <p>Keep your trailer road-ready with expert service from the Total Trailer team.</p>
              </div>
              <div className="modal-booking-form-container">
                <div className="modal-booking-form">
                  <input
                    type="text"
                    placeholder="First name *"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? "input-error" : ""}
                  />
                  {errors.firstName && (
                    <span className="modal-booking-field-error">{errors.firstName}</span>
                  )}
                </div>
                <div className="modal-booking-form">
                  <input
                    type="text"
                    placeholder="Last name *"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? "input-error" : ""}
                  />
                  {errors.lastName && (
                    <span className="modal-booking-field-error">{errors.lastName}</span>
                  )}
                </div>
                <div className="modal-booking-form">
                  <input
                    type="text"
                    placeholder="Business name"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                  />
                </div>
                <div className="modal-booking-form">
                  <input
                    type="email"
                    placeholder="Email *"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "input-error" : ""}
                  />
                  {errors.email && (
                    <span className="modal-booking-field-error">{errors.email}</span>
                  )}
                </div>
                <div className="modal-booking-form">
                  <input
                    type="tel"
                    placeholder="Phone (e.g. 248-853-0033) *"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? "input-error" : ""}
                  />
                  {errors.phone && (
                    <span className="modal-booking-field-error">{errors.phone}</span>
                  )}
                </div>
                <div className="modal-booking-form">
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={errors.service ? "input-error" : ""}
                  >
                    <option value="Lube job">Lube job</option>
                    <option value="Suspension">Suspension</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Brakes and drums">Brakes and drums</option>
                    <option value="Axle replacement">Axle replacement</option>
                    <option value="Jack mounting">Jack mounting</option>
                    <option value="Tire mounting">Tire mounting</option>
                    <option value="Door cables">Door cables</option>
                    <option value="Fender replacement">Fender replacement</option>
                    <option value="Lights">Lights</option>
                  </select>
                  {errors.service && (
                    <span className="modal-booking-field-error">{errors.service}</span>
                  )}
                </div>
                <div className="modal-booking-form">
                  <DatePicker
                    selected={
                      formData.date
                        ? (() => {
                            const parts = formData.date.split('T')[0].split('-');
                            return parts.length === 3
                              ? new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10))
                              : new Date(formData.date);
                          })()
                        : null
                    }
                    onChange={handleDateChange}
                    placeholderText="Date *"
                    minDate={new Date()}
                    filterDate={isDateDisabled}
                    dateFormat="yyyy-MM-dd"
                    className={`form-control ${errors.date ? "input-error" : ""}`}
                    wrapperClassName="w-100"
                  />
                  {errors.date && (
                    <span className="modal-booking-field-error">{errors.date}</span>
                  )}
                </div>
                <div className="modal-booking-form">
                  <input
                    type="time"
                    placeholder="Time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    min={minTimeStr}
                    className={errors.time ? "input-error" : ""}
                  />
                  {errors.time && (
                    <span className="modal-booking-field-error">{errors.time}</span>
                  )}
                </div>
              </div>
              <div className="modal-booking-textarea">
                <textarea placeholder="Message" name="message" value={formData.message} onChange={handleChange} />
              </div>
              <div className="forsale-button">
                {formError && (
                  <p style={{ color: '#e53e3e', fontSize: '0.85rem', marginBottom: '0.5rem', textAlign: 'center' }}>
                    {formError}
                  </p>
                )}
                <div
                  className="modal-booking-button"
                  onClick={submitting ? undefined : sendEmail}
                  style={{ cursor: submitting ? 'not-allowed' : 'pointer', opacity: submitting ? 0.6 : 1 }}
                >
                  <p style={{ cursor: submitting ? 'not-allowed' : 'pointer' }}>
                    {submitting ? 'Submitting...' : 'Submit'}
                  </p>
                </div>
                <h4> - or -</h4>
                <div className="home-button button-2" onClick={handleCallClick} style={{ cursor: "pointer" }}>
                  <p>Call us now</p>
                </div>
              </div>
            </div>
          </form>




        </div>

        <div
          className="aboutpage-mvs-img"
        // data-aos="fade-up"
        // data-aos-easing="linear"
        // data-aos-duration="1000"
        >
          <img src={sale} alt="Flat bed trailer" />

        </div>

      </div>



      <div className="aboutpage-mvs-container home-about">
        <div
          className="aboutpage-mvs-img"
        // data-aos="fade-up"
        // data-aos-easing="linear"
        // data-aos-duration="1000"
        >
          <img src={mission} alt="" />

        </div>
        <div
          className="aboutpage-mvs"
        // data-aos="fade-up"
        // data-aos-easing="linear"
        // data-aos-duration="1000"
        >

          <h4>ABOUT US</h4>
          <p>
            Total Trailer and Truck is dedicated to keeping you on the road with dependable repair services and top-quality trailer parts. Whether you need a minor fix or a major overhaul, our skilled mechanics are here to ensure that every trailer leaving our facility is road-ready and safe.
            With years of experience and a commitment to customer satisfaction, we strive to deliver not just quality repairs but peace of mind. Each job reflects our dedication to excellence, so you can trust that your trailer is in expert hands.

          </p>

          <h5>Our Commitment</h5>
          <div class="why-choose-list">
            <ul>
              <li>Quality Workmanship</li>
              <li>Reliable Service</li>
              <li>Road-Ready Trailers</li>
              <li>Customer Satisfaction</li>
              <li>Professional Expertise</li>
              <li>Long-Term Reliability</li>
            </ul>
          </div>

          <Link reloadDocument to='/about'> <div className="home-button" style={{ cursor: "pointer" }}>
            <p>Learn More About Us</p>
          </div></Link>
        </div>
      </div>

      <div className="home-service-container ">
        <div className="home-service-top">

          <div className="aboutpage-mvs home-serv"
          // data-aos="fade-up"
          // data-aos-easing="linear"
          // data-aos-duration="1000"
          >

            <h4>OUR SERVICES</h4>
            <p>
              At Total Trailer and Truck, we provide a comprehensive range of trailer repair and maintenance services tailored to keep your equipment in optimal condition. Our services include axle repairs, brake and drum replacements, electrical work, suspension adjustments, and lube jobs, all executed with meticulous attention to detail. Whether you need routine maintenance or extensive repairs, our skilled technicians are equipped to handle every aspect with the highest standards of safety and quality.
            </p>


            {/* <p>At Total Trailer, our core values are rooted in quality, integrity, and customer-centered service. We prioritize safety in every repair,
               ensuring reliable and lasting results for our clients. Driven by innovation, we stay updated with the latest repair techniques, building trust and delivering excellence with every project.
               </p> */}

          </div>
          <div className="home-button button-2" onClick={handleCallClick} style={{ cursor: "pointer", color: "white" }}>
            <p>Call us now</p>
          </div>
        </div>
        <div className="home-services-bottom-container">
          <ServiceCard
            image={serv}
            title="Maintenance & Mechanical"
            description="From routine lubrication and suspension work to brake, drum, and axle repairs, our experienced technicians help prevent wear, improve performance, and keep your trailer road-ready."
          />
          <ServiceCard
            image={image1}
            title="Electrical & Safety"
            description="Our electrical and safety services help keep your trailer visible, reliable, and safe on the road. From wiring and lighting to safety equipment, we make sure your trailer is ready for the job."
          />

          <ServiceCard
            image={image2}
            title="Trailer Essentials"
            description="Keep your trailer ready for everyday use with dependable tire, door, and support services designed to improve safety, functionality, and reliability."
          />

          <ServiceCard
            image={image3}
            title="Accessories & Upgrades"
            description="Enhance your trailer with practical accessories and custom upgrades designed to improve functionality, protection, performance, and overall appearance."
          />
        </div>


      </div>
      {/* <div className="aboutpage-mvs-container ">
          <div
            className="aboutpage-mvs-img"
            // data-aos="fade-up"
            // data-aos-easing="linear"
            // data-aos-duration="1000"
          >
            <img src={gal} alt="" />
           
          </div>
          <div
            className="aboutpage-mvs"
            // data-aos="fade-up"
            // data-aos-easing="linear"
            // data-aos-duration="1000"
          >

            <h4>GALLERY</h4>
            <p>
            Our gallery showcases the transformation we bring to each trailer through our expert repair services. From before-and-after photos to detailed shots of specialized work, you’ll see the dedication our team puts into each job. Whether it’s restoring a worn suspension, updating electrical systems, or enhancing the overall look with custom lighting, our gallery highlights the quality and care we bring to every project. Take a look and discover how we breathe new life into trailers, ensuring they’re safe, reliable, and ready for the road.

                 </p>
           
            <div className="home-button" onClick={navigateToGallery} style={{cursor: "pointer"}} >
              <p>View our gallery</p>
            </div>
          </div>
        </div> */}
      <div className="aboutpage-mvs-container ">
        <div
          className="aboutpage-mvs-img"
        // data-aos="fade-up"
        // data-aos-easing="linear"
        // data-aos-duration="1000"
        >
          <img src={gal} alt="" />

        </div>
        <div
          className="aboutpage-mvs why"
        // data-aos="fade-up"
        // data-aos-easing="linear"
        // data-aos-duration="1000"
        >

          <h4>WHY CHOOSE US?</h4>
          <p>At Total Trailer and Truck, we understand the importance of reliable, high-quality trailer service. Our commitment to excellence sets us apart, ensuring that every repair and maintenance task is handled with care and expertise. Here’s what makes us the trusted choice:</p>
          <ul>
            <li>
              <strong>Expert Technicians:</strong>
              <p>Our team is skilled in handling all aspects of trailer repair and maintenance, ensuring high-quality results every time.</p>
            </li>
            <li>
              <strong>Comprehensive Services:</strong>
              <p>From routine lube jobs to complete axle replacements, we cover a wide range of trailer needs.</p>
            </li>
            <li>
              <strong>Quality Parts:</strong>
              <p>We use top-quality parts for lasting repairs, helping your trailer perform at its best.</p>
            </li>
            <li>
              <strong>Customer Satisfaction:</strong> <p>Your peace of mind is our priority, and we’re committed to making sure you drive away safe and satisfied.</p>
            </li>
          </ul>

          <Link reloadDocument to='/contact'><div className="home-button" onClick={navigateToContact} style={{ cursor: "pointer" }} >
            <p style={{ maxWidth: "100%" }}>Contact us</p>
          </div></Link>
        </div>
      </div>

      <Stats />



      {/* <div className="home-bestseller">
        <Bestseller />
      </div> */}
      {/* <Homecoming /> */}
      {/* <HomeServices /> */}
      {/* <div className="home-bestseller">
        <NewArrivals />
      </div> */}

      {/* <AboutImgs /> */}
      {/* <Discount /> */}
      {/* <Newsletter/> */}
      <div className="home-logo">
        <LogoSection />
      </div>
      <div className="about-reviews">
        {/* <GoogleReviews /> */}
      </div>
      {/* <div className="home-bestseller">
        <TopDeals />
      </div> */}

      {/* <Qualities /> */}
      <Footer />
    </div>
  );
};

export default Home;
