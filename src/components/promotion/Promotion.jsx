import React from 'react'
import "./promotion.css"
import Marquee from 'react-fast-marquee'

const Promotion = () => {
    // useEffect(() => {
    //     const script = document.createElement("script");
    //     script.src = "https://assets.mailerlite.com/js/universal.js";
    //     script.async = true;
    //     script.onload = () => {
    //       if (typeof ml === "function") {
    //         ml("account", "1303978");
    //       }
    //     };
    //     document.body.appendChild(script);
    //   }, []);
  return (
    <div className='promotion'>
        <div className='promotion-container'>
        <Marquee pauseOnClick={true} pauseOnHover={true} autoFill={true}>
  <p>Trailer Hitches</p>
  <span>•</span>
  <p>Hitch Installation</p>
  <span>•</span>
  <p>Trailer Repair</p>
  <span>•</span>
  <p>Trailer Parts</p>
  <span>•</span>
  <p>Trailer Maintenance</p>
  <span>•</span>
</Marquee>
        </div>
    </div>
  )
}

export default Promotion