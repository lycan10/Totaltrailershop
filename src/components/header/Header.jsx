import React from 'react'
import "./header.css"
import Slider from "react-slick";
import p1 from "../../assets/H1.jpg"
import p3 from "../../assets/h4.jpg"
import p2 from "../../assets/4sp.jpeg"

const Header = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    cssEase: "linear"
  };
  return (
    <div className='header'>
              <Slider {...settings}>
          <div className='slider-container'>
            <div className='slider-image'>
            <div className='background-opacity'></div>
                <img src={p1} alt="slider-pic" />
            </div>
            {/* <div className="header-title">
                <h1>Real Stories, Real Adventures</h1>
                <p> From cross-country road trips to off-grid camping, our parts are the trusted companions in every real adventure. </p>
            </div> */}
          </div>
          <div className='slider-container'>
            <div className='slider-image'>
            <div className='background-opacity'></div>
                <img src={p2} alt="slider-pic" />
            </div>
            {/* <div className="header-title">
                <h1>Tailored Solutions for Every Adventure</h1>
                <p> Your adventures are unique, and so are our solutions.</p>
            </div> */}
          </div>
          <div className='slider-container'>
            <div className='slider-image'>
            <div className='background-opacity'></div>
                <img src={p3} alt="slider-pic" />
            </div>
            {/* <div className="header-title">
                <h1>Unmatched Quality, Unforgettable Journeys</h1>
                <p>Our premium trailer and RV parts redefine durability and performance.</p>
            </div> */}
          </div>
         
        </Slider>
    </div>
  )
}

export default Header