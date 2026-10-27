import "./AboutImgs.css";
import React from "react";
import Slider from "react-slick";
import p1 from "../../assets/aa1.webp";
import p2 from "../../assets/aa2.webp";
import p3 from "../../assets/shop3.webp";
import p4 from "../../assets/aa3.webp";
import p5 from "../../assets/aa4.webp";

const AboutImgs = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    cssEase: "ease-in-out"
    
  };

  return (
    <div className="about-imgs-container">
      <Slider {...settings}>
        <div className="slider-container">
          <div className="slider-image">
            <div className="background-opacity"></div>
            <img src={p1} alt="slider-pic" />
          </div>
        </div>
        <div className="slider-container">
          <div className="slider-image">
            <div className="background-opacity"></div>
            <img src={p2} alt="slider-pic" />
          </div>
        </div>
        <div className="slider-container">
          <div className="slider-image">
            <div className="background-opacity"></div>
            <img src={p3} alt="slider-pic" />
          </div>
        </div>
        <div className="slider-container">
          <div className="slider-image">
            <div className="background-opacity"></div>
            <img src={p4} alt="slider-pic" />
          </div>
        </div>
        <div className="slider-container">
          <div className="slider-image">
            <div className="background-opacity"></div>
            <img src={p5} alt="slider-pic" />
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default AboutImgs;
