import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import GA4React from 'ga-4-react';
import ReactGA from "react-ga4";
import TagManager from 'react-gtm-module'


// GA4 Measurement ID
// const ga4MeasurementId = 'G-Q100SQBYDV';
// const ga4MeasurementId = 'G-3LMSVMTQV0';
const ga4MeasurementId = 'G-757XGDZ579';

const tagManagerArgs = {
  gtmId: 'GTM-M2GRGNGG'
}
TagManager.initialize(tagManagerArgs)


// Initialize GA4React and handle errors
const initializeGA = async () => {

  
  try {
    const ga4react = new GA4React(ga4MeasurementId);
    
    // Await GA4React initialization
    await ga4react.initialize();

    // Initialize ReactGA if GA4React is successful
    ReactGA.initialize([{ trackingId: ga4MeasurementId }]);
    console.log("GA4React initialized successfully");

    // Log the initial page view
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
    
  } catch (error) {
    console.error("GA4React initialization failed:", error);

    // Additional error handling can go here if needed
    if (error && error.type === "error") {
      console.warn("Check for network issues or ad blockers that might be blocking GA4.");
    }
  }
};

// Execute the initialization
initializeGA();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
