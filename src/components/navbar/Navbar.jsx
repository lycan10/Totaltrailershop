import React, { useState, useContext, useEffect, useRef } from "react";
import logo from "../../assets/mainlogo/mainlogo.webp";
import rrc from "../../assets/RRC.webp"
// import logo2 from "../../assets/1.webp";
import emailjs from '@emailjs/browser';
import natda from "../../assets/logo/natda1.webp";

import "./navbar.css";
import { AiOutlineHeart } from "react-icons/ai";
// import { FiShoppingBag } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import { PiClipboardText } from "react-icons/pi";
import phone from "../../assets/call2.webp";
// import { bestSellerData, cartData } from "../../constant/data/data";
// import { BsTrash } from "react-icons/bs";
// import { userData } from "../../pages/helpers";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { RiCloseLine, RiMenu3Line } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";
import AuthContext from "../../AuthContext";
// import { useStrapi } from "../../hooks/useStrapi";
// import strapi from "../../functions/strapi";

import { IoCalendarOutline } from "react-icons/io5";
import { HashLink } from "react-router-hash-link";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Cart from "./Cart";
import { Link, useNavigate } from "react-router-dom";

import GA4React from 'ga-4-react';

const ga4react = new GA4React('G-Q100SQBYDV');


const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [show, setShow] = useState(false);
  const [screenSize, setScreenSize] = useState('lg')
  const [errors, setErrors] = useState({});

  const handleClose = () => {
    setShow(false);
    setFormError('');
    setErrors({});
  };
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

  // Fetch disabled dates from backend so the picker can block them
  useEffect(() => {
    const apiBase = process.env.REACT_APP_BASE_URL || 'https://api.totaltrailershop.com/public';
    fetch(`${apiBase}/api/appointments/disabled-dates`)
      .then((r) => r.json())
      .then((dates) => setDisabledDates(Array.isArray(dates) ? dates : []))
      .catch(() => { });
  }, []);

  // Helper to check if a date string/object is disabled based on backend list
  const isDateDisabled = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${day}`;

    // Check if it's Saturday (6) or Sunday (0)
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return false;
    }

    // Check if it's in the backend disabled dates array
    if (disabledDates.includes(dateStr)) {
      return false;
    }

    return true;
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
    } else if (disabledDates.includes(formData.date)) {
      newErrors.date = 'This date is unavailable. Please choose another date.';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear specific field error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    setFormError('');

    if (name === 'date') {
      const todayStr = new Date().toISOString().split('T')[0];
      if (disabledDates.includes(value)) {
        setErrors((prev) => ({
          ...prev,
          date: 'This date is not available. Please choose another date.',
        }));
        setFormData({ ...formData, date: '' });
        return;
      }
      if (value && value < todayStr) {
        setErrors((prev) => ({
          ...prev,
          date: 'Please select today or a future date.',
        }));
        setFormData({ ...formData, date: '' });
        return;
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    if (errors.date) {
      setErrors((prev) => ({ ...prev, date: '' }));
    }
    setFormError('');

    if (!date) {
      setFormData({ ...formData, date: '' });
      return;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    setFormData({ ...formData, date: formattedDate });
  };

  var YOUR_SERVICE_ID = 'service_r2oz9nd';
  const YOUR_TEMPLATE_ID = 'template_4cr76l4';
  const YOUR_PUBLIC_KEY = '-0rFb-M8gUI55KkAy';

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
      // 1. Save appointment in Backend database
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

      // 2. Also send email via EmailJS (non-blocking)
      try {
        await emailjs.sendForm(YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, form.current, {
          publicKey: YOUR_PUBLIC_KEY,
        });
      } catch (ejsErr) {
        console.warn('EmailJS send failed:', ejsErr);
      }

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
      setErrors({});
      handleClose();
      navigateToThankYou();
    } catch (err) {
      setFormError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };


  // const {
  //   signOut,
  //   gatedAction,
  //   authState: { user, isSignout },
  // } = useContext(AuthContext);

  // const [showModal, setShowModal] = useState(false);
  // const [value, setValue] = useState(1);

  // const { loading, data, error } = useStrapi("carts");

  // const cartData = data ? data?.data : [];
  //   const isLoggedIn = false; // Replace with your actual logic for checking if the user is logged in

  //   const userData = useFetch(url).data;
  // const user = userData && userData.length > 0 ? userData[0] : null;

  // const username = user ? user.username : '';
  // const firstName = user ? user.firstName : '';

  // const username = user?.username;

  const trackClickEvent = (eventCategory, eventAction, eventLabel) => {
    ga4react.gtag("event", eventAction, {
      event_category: eventCategory,
      event_label: eventLabel,
    });
  };

  const navigateToHome = () => {
    // Use the URL of the page you want to navigate to
    const newUrl = "/";

    if (window.location.pathname === newUrl) {
      // If the user is already on the target page, perform a full page reload
      window.location.reload();
    } else {
      // Navigate to the new page
      trackClickEvent('Button', 'Click', 'Home Button Clicked');
      window.location.href = newUrl;
    }
  };
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
  const navigateToAbout = () => {
    // Use the URL of the page you want to navigate to
    const newUrl = "/about";

    if (window.location.pathname === newUrl) {
      // If the user is already on the target page, perform a full page reload
      window.location.reload();
    } else {
      // Navigate to the new page
      trackClickEvent('Button', 'Click', 'About Button Clicked');
      window.location.href = newUrl;

    }
  };
  const navigateToProduct = () => {
    // Use the URL of the page you want to navigate to
    const newUrl = "/products";

    if (window.location.pathname === newUrl) {
      // If the user is already on the target page, perform a full page reload
      window.location.reload();
    } else {
      // Navigate to the new page
      trackClickEvent('Button', 'Click', 'Product Button Clicked');
      window.location.href = newUrl;
    }
  };

  const navigateToSoon = () => {
    // Use the URL of the page you want to navigate to
    const newUrl = "/soon";

    if (window.location.pathname === newUrl) {
      // If the user is already on the target page, perform a full page reload
      window.location.reload();
    } else {
      // Navigate to the new page
      window.location.href = newUrl;
    }
  };
  const navigateToDeals = () => {
    // Use the URL of the page you want to navigate to
    const newUrl = "/deals";

    if (window.location.pathname === newUrl) {
      // If the user is already on the target page, perform a full page reload
      window.location.reload();
    } else {
      // Navigate to the new page
      trackClickEvent('Button', 'Click', 'Deal Button Clicked');
      window.location.href = newUrl;
    }
  };
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
  const navigateToGallery = () => {
    // Use the URL of the page you want to navigate to
    const newUrl = "/gallery";

    if (window.location.pathname === newUrl) {
      // If the user is already on the target page, perform a full page reload
      window.location.reload();
    } else {
      // Navigate to the new page
      trackClickEvent('Button', 'Click', 'Contact Button Clicked');
      window.location.href = newUrl;
    }
  };
  const navigateToAppointment = () => {
    // Use the URL of the page you want to navigate to
    const newUrl = "/appointments";

    if (window.location.pathname === newUrl) {
      // If the user is already on the target page, perform a full page reload
      window.location.reload();
    } else {
      // Navigate to the new page
      trackClickEvent('Button', 'Click', 'Contact Button Clicked');
      window.location.href = newUrl;
    }
  };

  // const navigateToWishlist = () => gatedAction(() => {
  //   // Use the URL of the page you want to navigate to
  //   const newUrl = "/wishlist";

  //   // if (!isSignout) {
  //   // If the user is logged in, navigate to the wishlist page
  //   if (window.location.pathname === newUrl) {
  //     // If the user is already on the target page, perform a full page reload
  //     window.location.reload();
  //   } else {
  //     // Navigate to the new page
  //     trackClickEvent('Button', 'Click', 'Wishlist Button Clicked');
  //     window.location.href = newUrl;
  //   }
  //   // } else {
  //   //   // If the user is not logged in, show the modal
  //   //   setShowModal(true);
  //   // }
  // });

  // const closeModal = () => {
  //   setShowModal(false);
  // };

  const navigateToRegister = () => {
    // Use the URL of the page you want to navigate to
    const newUrl = "/register";

    if (window.location.pathname === newUrl) {
      // If the user is already on the target page, perform a full page reload
      window.location.reload();
    } else {
      // Navigate to the new page
      trackClickEvent('Button', 'Click', 'Register Button Clicked');
      window.location.href = newUrl;
    }
  };

  const navigateToLogin = () => {
    // Use the URL of the page you want to navigate to
    const newUrl = "/login";

    if (window.location.pathname === newUrl) {
      // If the user is already on the target page, perform a full page reload
      window.location.reload();
    } else {
      // Navigate to the new page
      trackClickEvent('Button', 'Click', 'Login Button Clicked');
      window.location.href = newUrl;
    }
  };

  // const handleChange = (e) => {
  //   setValue(e.target.value);
  // };

  // const handleSubmit = () => {};

  const navigate = useNavigate()

  // const handleLogout = () => {
  //   // localStorage.setItem("user", "");

  //   signOut();
  //   const newUrl = "/Login";

  //   if (window.location.pathname === newUrl) {
  //     // If the user is already on the target page, perform a full page reload
  //     window.location.reload();
  //   } else {
  //     // Navigate to the new page
  //     trackClickEvent('Button', 'Click', 'Logout Button Clicked');
  //     navigate(newUrl) ;
  //   }
  // };

  const phoneNumber = +12488530033; // Replace with your actual phone number

  const handleCallClick = () => {
    trackClickEvent('Button', 'Click', 'Call Button Clicked');
    window.location.href = `tel:${phoneNumber}`;

  };

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

  const todayStr = new Date().toISOString().split('T')[0];
  const isTodaySelected = formData.date === todayStr;
  const now = new Date();
  const minTimeStr = isTodaySelected
    ? `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
    : undefined;

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-top">
          <div className="navbar-top-welcome">
            <p>
              Welcome to{" "}
              <span style={{ color: "#3B67AF" }}> #TotalPeaceofMind</span>
            </p>
          </div>
          <div className="navbar-top-codes">
            <p>CAGE Code: 9Q994</p>
            <p>UEI: V4R2V4L9C6Y9</p>
          </div>
          {/* {!isSignout ? (
            <div className="navbar-top-login-container">
              <div className="navbar-login">
                <FiUser className="navbar-icons" />
                <p>Hi {user.username}</p>
              </div>
              <div className="navbar-login" onClick={handleLogout}>
                <PiClipboardText className="navbar-icons" />
                <p>Logout</p>
              </div>
            </div>
          ) : (
            <div className="navbar-top-login-container">
              <Link reloadDocument to='/login'>
              <div className="navbar-login" onClick={navigateToLogin}>
                <FiUser className="navbar-icons" />
                <p>Login</p>
              </div>
              </Link>
              <Link reloadDocument to='/register'><div className="navbar-login" >
                <PiClipboardText className="navbar-icons" />
                <p>Register</p>
              </div></Link>
            </div>
          )} */}
        </div>
        <div className="navbar-middle">
          <Link reloadDocument to='/'>
            <div
              className="navbar-logo"
              style={{ cursor: "pointer" }}
            >
              <img src={logo} alt="logo" />
            </div>
          </Link>

          <div className="navbar-middle-content">
            <div
              className="navbar-logo-rrc navbar-logo-natda"
            >
              <img src={natda} alt="logo" />
            </div>
            <div
              className="navbar-logo-rrc"
            >
              <img src={rrc} alt="logo" />
            </div>
            <div className="navbar-middle-tel">
              <div className="navbar-middle-tel-img">
                <img src={phone} alt="" />
              </div>
              <div className="navbar-tel-number" onClick={handleCallClick}>
                <h1>CALL US NOW</h1>
                <p>(248) 853-0033</p>
              </div>
            </div>
            {/* <Cart /> */}
          </div>
        </div>
        <div className="navbar-bottom">
          <div className="navbar-links">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/services">Service</Link>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div className="navbar-cta" onClick={handleShow}>
            <h1>Book an appointment: </h1>
            <IoCalendarOutline className="icon2" />
          </div>
          {/* <Modal show={showModal} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Please Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>You need to log in to access the wishlist.</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={closeModal}>
                Close
              </Button>
              <Button variant="primary" onClick={navigateToLogin}>
                Login
              </Button>
            </Modal.Footer>
          </Modal> */}
        </div>
      </div>
      <div className="navbar-mini">
        <div className="navbar-mini-container">
          {toggleMenu ? (
            <RiCloseLine
              color="#3B67AF"
              size={25}
              onClick={() => setToggleMenu(false)}
            />
          ) : (
            <RiMenu3Line
              color="#3B67AF"
              size={25}
              onClick={() => setToggleMenu(true)}
            />
          )}
          {toggleMenu && (
            <div
              className={`navbar-menu_container ${toggleMenu ? "slide-bottom" : "slide-top"
                }`}
            >
              <div className="navbar-menu_links">
                <nav>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/about">About</Link>
                    </li>
                    <li>
                      <Link to="/services">Service</Link>
                    </li>
                    <li>
                      <Link to="/gallery">Gallery</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact</Link>
                    </li>
                    {/* {!isSignout ? (
            <div className="navbar-top-login-container mini-login">
              <div className="navbar-login">
                <FiUser className="navbar-icons" />
                <p>Hi {user.username}</p>
              </div>
              <div className="navbar-login" onClick={handleLogout}>
                <PiClipboardText className="navbar-icons" />
                <p>Logout</p>
              </div>
            </div>
          ) : (
            <div className="navbar-top-login-container">
              <div className="navbar-login" onClick={navigateToLogin}>
                <FiUser className="navbar-icons" />
                <p>Login</p>
              </div>
              <div className="navbar-login" onClick={navigateToRegister}>
                <PiClipboardText className="navbar-icons" />
                <p>Register</p>
              </div>
            </div>
          )} */}
                    {/* <div className='navbar-socials'>
                                <Link to='/'><AiOutlineTwitter  className='social-logo'/></Link>
                                <Link to='/'><AiFillFacebook  className='social-logo'/></Link>
                                <Link to='/'><AiOutlineInstagram  className='social-logo'/></Link>
                            </div> */}
                  </ul>
                </nav>
              </div>
            </div>
          )}
          {/* <div className="navbar-top-codes">
            <p>CAGE Code: 9Q994</p>
            <p>UEI: V4R2V4L9C6Y9</p>
          </div> */}
          <div className="navbar-cta" onClick={handleShow}>
            <h1>Book an appointment: </h1>
            <IoCalendarOutline className="icon2" />
          </div>
          {/* <Cart mobile /> */}
        </div>
        {/* <div className="navbar-mini-container">
          <div className="navbar-mini-hamburger">
            <RxHamburgerMenu />
          </div>
          <div className="navbar-mini-image">
            <img src={logo} alt="" />
          </div>
          <Cart mobile />
        </div> */}
      </div>
      <Modal show={show} onHide={handleClose} centered size={screenSize} className="booking-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="modal-gallery-title">
              <h2>Book an appointment</h2>
            </div>
          </Modal.Title>
        </Modal.Header>
        <form ref={form} onSubmit={sendEmail}>
          <div className="modal-booking container">
            <div className="modal-booking-title">
              <p>Schedule your next maintenance with our team of experts.</p>
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
                  selected={formData.date ? new Date(formData.date) : null}
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
                <input type="time" placeholder="Time" name="time" value={formData.time} onChange={handleChange} min={minTimeStr} className={errors.time ? "input-error" : ""} />
                {errors.time && (
                  <span className="modal-booking-field-error">{errors.time}</span>
                )}
              </div>
            </div>
            <div className="modal-booking-textarea">
              <textarea placeholder="Message" name="message" value={formData.message} onChange={handleChange} />
            </div>
            {formError && (
              <p style={{ color: '#e53e3e', fontSize: '0.85rem', marginBottom: '0.5rem', textAlign: 'center' }}>
                {formError}
              </p>
            )}
            <div
              className="modal-booking-button"
              onClick={submitting ? undefined : sendEmail}
              style={{
                cursor: submitting ? 'not-allowed' : 'pointer',
                opacity: submitting ? 0.7 : 1,
              }}
            >
              <p style={{ cursor: submitting ? 'not-allowed' : 'pointer' }}>
                {submitting ? 'Submitting...' : 'Submit'}
              </p>
            </div>
          </div>
        </form>
        <Modal.Footer className="modal-footer"></Modal.Footer>
      </Modal>

    </div>
  );
};

export default Navbar;