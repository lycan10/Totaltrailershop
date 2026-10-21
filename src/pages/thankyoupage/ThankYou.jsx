import React, { useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import logo from "../../assets/ty1.png"
import "./thankyou.css"

const ThankYou = () => {
    // useEffect(() => {
    //     // Add gtag script
    //     const script = document.createElement('script');
    //     script.async = true;
    //     script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-16471384204';
    //     document.head.appendChild(script);

    //     // Initialize gtag
    //     window.dataLayer = window.dataLayer || [];
    //     function gtag() {
    //         window.dataLayer.push(arguments);
    //     }
    //     window.gtag = gtag; // Attach gtag to window for global access

    //     gtag('js', new Date());
    //     gtag('config', 'AW-16471384204'); // Replace with your tracking ID

    //     // Set up event listener for conversion tracking
    //     const trackConversion = () => {
    //         if (window.location.href.includes('/thankyou') && typeof window.gtag === 'function') {
    //             window.gtag('event', 'conversion', { 'send_to': 'AW-16471384204/rG-gCLLO1usZEIzBla49' });
    //         }
    //     };

    //     // Add load event listener
    //     window.addEventListener('load', trackConversion);

    //     // Cleanup event listener on component unmount
    //     return () => window.removeEventListener('load', trackConversion);
    // }, []); // Empty dependency array ensures this only runs once

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
    return (
        <div className='thankyou'>
            <Navbar />
            <div className="thankyou-container">
                <div className="thankyou-one">
                    <img src={logo} alt="" />
                </div>
                <div className="thankyou-two" onClick={navigateToHome}>
                <h1>THANK YOU</h1>
                <p>We’re eager to connect with you and assist with all your trailer needs. </p>
                <div className="thankyou-two-button">
                    <p>Go home</p>
                </div>
                </div>
              
            </div>
            <Footer />
        </div>
    );
};

export default ThankYou;
