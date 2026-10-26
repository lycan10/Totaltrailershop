import { useState, useEffect } from "react";
import "./newsletter.css";
import note from "../../assets/note.webp"

const Newsletter = () => {
  const API_URL = "https://connect.mailerlite.com/api/subscribers"; 
  const API_KEY = process.env.REACT_APP_API_KEY;




  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    optIn: false,
  });

  const [errorMsg, setErrorMsg] = useState('');

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form reload at the start
  
    if (!formData.email) {
      console.error("Email is required but missing!");
      return;
    }
  
    try {
      const response = await fetch(
        "https://connect.mailerlite.com/api/subscribers", 
        
    
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            Authorization: `Bearer ${API_KEY}`,
          },
          body: JSON.stringify({
            email: formData.email,
            name: formData.name,
            phone: formData.phone,
            optIn: true,
            groups: ['155019315460965545']
          }),
        }
      );
  
      const data = await response.json();
     
  
      if (response.ok) {  // Use `response.ok` instead of `response.status == 200`
        setSubmitted(true);
  
        // ✅ Clear form correctly
        setFormData({
          name: "",
          email: "",
          phone: "",
          optIn: false,
        });
  
      } else {
        console.error("Subscription failed:", data);
      }
  
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMsg("Subscription failed. Please try again later.");

    }
  };
  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch(
  //       "https://assets.mailerlite.com/jsonp/1303978/forms/144878551143810174/subscribe",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //         },
  //         body: new URLSearchParams(formData).toString(),
  //         // body: JSON.stringify({
  //         //   fields: {
  //         //     name: formData.name,
  //         //     email: formData.email,
  //         //     phone: formData.phone,
  //         //   },
  //         //   optin: formData.optIn ? 1 : 0,
  //         // }),
  //       }
  //     );

  //     if (response.ok) {
  //       setSubmitted(true);
  //     } else {
  //       console.error("Subscription failed");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   }
  // };

  return (
    <div className="newsletter">
        <div className="newsletter-container">
        <div className="ml-form-embedContainer ml-subscribe-form">
      <div className="ml-form-align-center">
        <div className="ml-form-embedWrapper embedForm">
          {/* <div className="ml-form-embedHeader">
            <img
              src="https://storage.mlcdn.com/account_image/1303978/XP5t4WoThh27cKRvGEebkvTBmJhaxtjwy5dNleB9.webp"
              alt="Trailer repairs"
              style={{ display: "block" }}
            />
          </div> */}

          {submitted ? (
            <div className="ml-form-successBody row-success">
              <h4>Thank you!</h4>
              <p>You have successfully joined our subscriber list.</p>
            </div>
          ) : (
            <div className="ml-form-embedBody ml-form-embedBodyDefault row-form">
              <div className="ml-form-embedContent">
                <h4>NEWSLETTER</h4>
                <p>Sign up for our newsletter and be the first to know about new services, promotions, and more.</p>
              </div>

              <form onSubmit={handleSubmit} className="ml-block-form">
                <div className="ml-form-formContent">
                  <div className="ml-form-fieldRow">
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                      autoComplete="given-name"
                    />
                  </div>

                  <div className="ml-form-fieldRow">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-control"
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div className="ml-form-fieldRow">
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="ml-form-checkboxRow">
                  <label className="checkbox">
                    <input type="checkbox" name="optIn" checked={formData.optIn} onChange={handleChange} />
                    <span className="label-description">Opt in to receive news and updates.</span>
                  </label>
                </div>
                {errorMsg && <p className="error">{errorMsg}</p>}

                <div className="ml-form-embedSubmit">
                  <button type="submit" className="primary">Subscribe</button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
    <div className="newsletter-image">
          <img src={note} alt="" />
    </div>
        </div>
    </div>
    
  );
};

export default Newsletter;
