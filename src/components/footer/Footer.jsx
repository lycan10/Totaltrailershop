import React, { useContext } from "react";
import "./footer.css";
// import logo from "../../assets/1.webp"
// import {BsFillTelephoneFill} from "react-icons/bs";
// import {BiLogoGmail} from "react-icons/bi";
// import {MdLocationOn} from "react-icons/md";
// import {AiFillFacebook, AiFillTwitterSquare, AiFillInstagram} from "react-icons/ai"
// import {FaSnapchatSquare} from "react-icons/fa"

import pay1 from "../../assets/visa.webp";
import pay2 from "../../assets/card.webp";
import pay3 from "../../assets/paypal.webp";

import icon1 from "../../assets/f.webp";
import icon2 from "../../assets/s.webp";
import icon3 from "../../assets/i.webp";
import icon4 from "../../assets/t.webp";
import icon5 from "../../assets/tik.webp";

import ico1 from "../../assets/ic1.webp";
import ico2 from "../../assets/ic2.webp";
import ico3 from "../../assets/ic3.webp";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import AuthContext from "../../AuthContext";
import Marquee from "react-fast-marquee";

const Footer = () => {
  // const {
  //   closeModal,
  //   authState: { showModal },
  // } = useContext(AuthContext);

  const navigateToHome = () => {
    // Use the URL of the page you want to navigate to
    const newUrl = "/";

    if (window.location.pathname === newUrl) {
      // If the user is already on the target page, perform a full page reload
      window.location.reload();
    } else {
      // Navigate to the new page
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

  const navigateToPrivacy = () => {
    // Use the URL of the page you want to navigate to
    const newUrl = "/privacy";

    if (window.location.pathname === newUrl) {
      // If the user is already on the target page, perform a full page reload
      window.location.reload();
    } else {
      // Navigate to the new page
      window.location.href = newUrl;
    }
  };

  const navigateToReturn = () => {
    // Use the URL of the page you want to navigate to
    const newUrl = "/return";

    if (window.location.pathname === newUrl) {
      // If the user is already on the target page, perform a full page reload
      window.location.reload();
    } else {
      // Navigate to the new page
      window.location.href = newUrl;
    }
  };
  const navigateToTermsOfService = () => {
    // Use the URL of the page you want to navigate to
    const newUrl = "/terms";

    if (window.location.pathname === newUrl) {
      // If the user is already on the target page, perform a full page reload
      window.location.reload();
    } else {
      // Navigate to the new page
      window.location.href = newUrl;
    }
  };
  const date = new Date();

  return (

    <div className="footer">
      <div className="footer-container-CTA">
        <div className="footer-container-CTA-socials">
          <div className="footer-container-CTA-socials-items-icons">
            <Link to="https://www.facebook.com/TotalTrailer">
              {" "}
              <img src={icon1} alt="" />
            </Link>
          </div>
          <div className="footer-container-CTA-socials-items-icons">
            <img src={icon2} alt="" />
          </div>
          <div className="footer-container-CTA-socials-items-icons">
            <Link to="https://www.instagram.com/total_trailerpart">
              {" "}
              <img src={icon3} alt="" />
            </Link>
          </div>
          <div className="footer-container-CTA-socials-items-icons">
            <Link to="https://twitter.com/totaltrailer">
              {" "}
              <img src={icon4} alt="" />
            </Link>
          </div>
          <div className="footer-container-CTA-socials-items-icons">
            <img src={icon5} alt="" />
          </div>
        </div>
        <div className="marquee-cont-footer" >
          <Marquee >
            <p style={{ color: "white" }}>Introducing the Total Trailer and Truck 10% Loyalty Card! Earn exclusive discounts on parts and services – Sign up today and start saving!</p>
          </Marquee>
        </div>

        {/* <div className="footer-container-CTA-newsletter">
            <h1>SIGN UP FOR NEWSLETTER</h1>
            <div className="footer-container-CTA-newsleter-button">
              <input type="text" placeholder="Enter Your Email Here" />
              <button>Subscribe Now</button>
            </div>
          </div> */}
      </div>
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-top1">
            <h1>CONTACT US</h1>
            <div className="footer-socials">
              <div className="footer-info">
                <div className="footer-info-icons">
                  <img src={ico1} alt="" />
                </div>
                <div className="footer-info-text">
                  <p>1747 E Auburn Rd Rochester Hills, MI</p>
                </div>
              </div>

              <div className="footer-info">
                <div className="footer-info-icons">
                  <img src={ico2} alt="" />
                </div>
                <div className="footer-info-text">
                  <p>totaltrailerparts@outlook.com</p>
                  <p>totaltrailerparts@gmail.com</p>
                </div>
              </div>
              <div className="footer-info">
                <div className="footer-info-icons">
                  <img src={ico3} alt="" />
                </div>
                <div className="footer-info-text">
                  <p>+1(248) 853-0033</p>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-top2-container">
            <div className="footer-top2">
              <h1>ABOUT TTP</h1>
              <ul>
                <li>
                  <Link reloadDocument to='/about'> <span>About Us</span></Link>

                </li>
                {/* <li>
                    <Link><span onClick={navigateToAbout}>Gallery</span></Link>
             
                  </li> */}
                <li>
                  <Link reloadDocument to='/gallery'>         <span >Gallery</span></Link>
                </li>
                <li>
                  <Link reloadDocument to='/terms'> <span >Terms of Use</span></Link>

                </li>

                <li>
                  <Link reloadDocument to='/privacy'><span >Privacy Policy</span></Link>
                </li>

              </ul>
            </div>
            <div className="footer-top2">
              <h1>CUSTOMER SERVICE</h1>
              <ul>
                <li>
                  <Link reloadDocument to='/'> <span>Home</span></Link>
                </li>
                <li>
                  <Link reloadDocument to='/services' ><span >Service</span></Link>
                </li>
                <li>
                  <Link reloadDocument to='/return' > <span >Return Policy</span></Link>
                </li>

                <li>
                  <Link reloadDocument to='/contact'  >        <span >Contact Us</span></Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-bottom1">
            <p>
              {" "}
              Copyright © {date.getFullYear()} Total Trailer and Truck. All Rights
              Reserved.{" "}
            </p>
          </div>
          <div className="footer-bottom3">
            <div className="footer-payment">
              <img src={pay1} alt="" />
            </div>
            <div className="footer-payment">
              <img src={pay2} alt="" />
            </div>
            <div className="footer-payment">
              <img src={pay3} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>

    // <Modal show={showModal} onHide={closeModal}>
    //   <Modal.Header closeButton>
    //     <Modal.Title>Please Login</Modal.Title>
    //   </Modal.Header>
    //   <Modal.Body>
    //     <p>You need to log in to access the wishlist.</p>
    //   </Modal.Body>
    //   <Modal.Footer>
    //     <Button variant="secondary" onClick={closeModal}>Close</Button>
    //     {/* Add a login button or link to your login page */}
    //     <Link to="/login" onClick={closeModal}>
    //       <Button variant="primary">Login</Button>
    //     </Link>
    //   </Modal.Footer>
    // </Modal>

  );
};

export default Footer;
