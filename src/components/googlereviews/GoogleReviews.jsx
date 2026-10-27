import React, { useEffect } from 'react';

const GoogleReviews = () => {
  useEffect(() => {
    const element = document.querySelector('#your-element');
    if (element) {
      const observer = new ResizeObserver((entries) => {
        entries.forEach((entry) => {
          // handle resize logic if needed
        });
      });
    
      observer.observe(element);
  
      return () => observer.disconnect(); // Clean up on unmount
    }
  }, []);

  useEffect(() => {
    // Check if the Elfsight script is already added
    if (!document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]')) {
      const script = document.createElement('script');
      script.src = "https://static.elfsight.com/platform/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="google-reviews">
      <div
        id="your-element"
        className="elfsight-app-b904531d-c985-4af0-9eed-c37a814824ea"
        data-elfsight-app-lazy
      ></div>
    </div>
  );
};

export default GoogleReviews;
