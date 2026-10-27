import React, { useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import image from "../../assets/abt1.webp";
import "aos/dist/aos.css";
import AOS from "aos";
import mission from "../../assets/abt3.webp";
import vision from "../../assets/vision.webp";

// import {AiOutlineTwitter, AiFillFacebook, AiOutlineInstagram } from "react-icons/ai"

import icon1 from "../../assets/icon1.webp";
import icon2 from "../../assets/icon2.webp";
import icon3 from "../../assets/icon3.webp";

import "./about.css";

import v1 from "../../assets/v1.webp";
import v2 from "../../assets/v2.webp";
import v3 from "../../assets/v3.webp";
import v4 from "../../assets/v4.webp";

import team1 from "../../assets/team1.webp";
import team2 from "../../assets/team2.webp";
import team3 from "../../assets/team3.webp";

import ReactGA from "react-ga";
import { useLocation } from "react-router-dom";
import AboutImgs from "../../components/aboutimgs/AboutImgs";
import GoogleReviews from "../../components/googlereviews/GoogleReviews";

const About = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="aboutus" id="about">
      <Navbar />
      <div className="aboutus-container">
        <div className="contact-header-image">
          <div className="banner-opacity"></div>
          <img src={image} alt="" />
          <div className="contact-header-text">
            <h1>About</h1>
          </div>
        </div>
        <div className="aboutpage-content-container">
          <div
            className="aboutpage-content-image"
          // data-aos="fade-up"
          // data-aos-easing="linear"
          // data-aos-duration="1000"
          >
            <AboutImgs />
          </div>
          <div className="aboutpage-content">
            <div
              className="aboutpage-content-title"
            // data-aos="fade-up"
            // data-aos-easing="linear"
            // data-aos-duration="1000"
            >
              <div className="services-title" style={{ marginBottom: "0" }}>
                {/* <div className="contact-vertical"></div>
                <h1>Who we are</h1> */}
                <h1>Total peace of mind is our mantra. </h1>
              </div>

              <p>
                At Total Trailer and Truck, we’re your one-stop shop for trailer
                repairs, trailer parts, and truck accessory solutions. Located
                in Rochester Hills, Michigan, we’ve proudly served individuals
                and commercial clients since 2006—providing expert service in
                everything from axle and brake repairs to electrical
                diagnostics, lube jobs, and complete trailer overhauls. We also
                stock a wide range of high-quality trailer parts, so whether
                you're doing your own repairs or need us to handle them, we’ve
                got you covered.
              </p>

              <p>
                But we don’t stop at trailers. We’re also a trusted source for
                truck accessory sales and installations. From toolboxes, tonneau
                covers, and ladder racks to strobe lights, lift gates, and full
                suspension upgrades, we help you customize your truck for both
                function and style. Our experienced team is committed to
                delivering fast, professional service with the highest standards
                of safety and quality. Whether you're outfitting a work fleet or
                upgrading a personal vehicle, Total Trailer and Truck keeps you
                moving with confidence.
              </p>
            </div>
          </div>
        </div>

        <div className="aboutpage-mvs-container">
          <div
            className="aboutpage-mvs-img"
          // data-aos="fade-up"
          // data-aos-easing="linear"
          // data-aos-duration="1000"
          >
            <img src={mission} alt="" />
          </div>
          <div
            className="aboutpage-mvs"
          // data-aos="fade-up"
          // data-aos-easing="linear"
          // data-aos-duration="1000"
          >
            <h4>Our Misson</h4>
            <p>
              Our mission is to provide reliable, high-quality trailer repair
              services that ensure safety and extend the life of our clients'
              equipment. We strive to deliver excellence through skilled
              craftsmanship and personalized service.
            </p>
            <h4>Our Vision</h4>
            <p>
              Our vision is to be Michigan's trusted leader in trailer repair,
              known for integrity, quality, and dedication to customer
              satisfaction.
            </p>
            <h4>Core values</h4>
            <p>
              At Total Trailer, our core values are rooted in quality,
              integrity, and customer-centered service. We prioritize safety in
              every repair, ensuring reliable and lasting results for our
              clients. Driven by innovation, we stay updated with the latest
              repair techniques, building trust and delivering excellence with
              every project.
            </p>
          </div>
        </div>
        {/* <AboutImgs /> */}

        {/* <div className="aboutpage-services">
          <div className="aboutpage-services-title">
            <div className="contact-vertical"></div>
            <h1>Our Services</h1>
            <div
              className="contact-vertical"
              style={{ marginLeft: "0.5rem" }}
            ></div>
          </div>
          <p>
            At Total Trailer, we take pride in offering a wide range of services
            tailored to meet the unique needs of RV and trailer enthusiasts. Our
            commitment to excellence extends to every aspect of our service
            offerings, ensuring that your RV and trailer experience is filled
            with peace of mind.
          </p>
          <div className="about-services-details">
            <div className="aboutpage-mvs services-mvs">
              <img src={icon1} alt="" />
              <h4>On-Time Delivery</h4>
              <p>
                Count on Total Trailer for not only high-quality trailer
                solutions but also for a service that respects your time and
                convenience. Your journey matters to us, and we're here to make
                sure it begins right on time.
              </p>
            </div>
            <div className="aboutpage-mvs services-mvs">
              <img src={icon2} alt="" />
              <h4>Direct Replacement Parts</h4>
              <p>
                We provide a comprehensive selection of direct replacement parts
                to keep your trailer in optimal condition. From essential
                components to specialized items, we've got you covered.
              </p>
            </div>
            <div className="aboutpage-mvs services-mvs">
              <img src={icon3} alt="" />
              <h4>Expert Advice</h4>
              <p>
                Our experienced team is here to offer guidance and support.
                Whether you're looking for recommendations, installation tips,
                or troubleshooting assistance, we're just a call or message
                away.
              </p>
            </div>
          </div>
        </div> */}

        <div className="about-reviews">
          <GoogleReviews />
        </div>

        {/* <div className='aboutpage-team-overall'>
          <div className="aboutpage-team-container">
            <div className="about-team-title" data-aos="fade-up"  data-aos-easing="linear" data-aos-duration="1000">
            <div className="aboutpage-services-title">
          <div className="contact-vertical" ></div>
            <h1>Our Team</h1>
            <div className="contact-vertical" style={{marginLeft:"0.5rem"}}></div>
          </div>
                  <p>Meet the driving force behind our success – the talented individuals who transform ideas into reality, creativity into innovation, and passion into excellence.</p>
            </div>
            <div className="aboutpage-team-content">
              <div className="aboutpage-team"  data-aos="fade-up"  data-aos-easing="linear" data-aos-duration="1000">
                <div className="aboutpage-team-image">
                  <img src={team1} alt="Team" />
                </div>
                <h1>John doe </h1>
                <p>CEO</p>
              </div>
              <div className="aboutpage-team"  data-aos="fade-up"  data-aos-easing="linear" data-aos-duration="1000">
                <div className="aboutpage-team-image">
                  <img src={team2} alt="Team" />
                </div>
                <h1>Eleanor smith</h1>
                <p>Project Director</p>
              </div>
              <div className="aboutpage-team"  data-aos="fade-up"  data-aos-easing="linear" data-aos-duration="1000">
                <div className="aboutpage-team-image">
                  <img src={team3} alt="Team" />
                </div>
                <h1>Paige hilton</h1>
                <p>Director of Communications</p>
              </div>
            </div>
          </div>
        </div> */}
        <div></div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
