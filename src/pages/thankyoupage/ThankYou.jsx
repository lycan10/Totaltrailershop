import React, { useEffect } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import logo from "../../assets/ty1.webp"
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

    const navigateToDashboard = () => {
        // Use the URL of the page you want to navigate to
        const newUrl = "/dashboard";
    
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
                <div className="thankyou-two" >
                    <h1>YOU’RE ALL SET!</h1>
                    <p>Your appointment request has been received. Check your dashboard for your booking details and updates or return to the homepage.</p>
                    
                    <div className="thank-button-container">
                        <div className="thankyou-two-button" onClick={navigateToHome}>
                            <p>Go home</p>
                        </div>
                        <div className="thankyou-two-button" onClick={navigateToDashboard}>
                            <p>View dashboard</p>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default ThankYou;
