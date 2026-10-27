import React, { useState, useEffect } from 'react';
import './gallery.css';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import GalleryCards from '../../components/gallerycards/GalleryCards';
import Modal from 'react-bootstrap/Modal';

import pic1 from '../../assets/photo/1.webp';
import pic2 from '../../assets/photo/2.webp';

import p1 from '../../assets/asset/1.webp';
import p2 from '../../assets/asset/2.webp';
import p3 from '../../assets/asset/3.webp';
import p4 from '../../assets/asset/tire.webp';
import p5 from '../../assets/asset/5.webp';
import p6 from '../../assets/asset/6.webp';
import p7 from '../../assets/asset/7.webp';
import p8 from '../../assets/asset/8.webp';
import p9 from '../../assets/asset/9.webp';
import p10 from '../../assets/asset/10.webp';
import p11 from '../../assets/asset/11.webp';
import p12 from '../../assets/asset/p12.webp';

// gallery assets
import b1 from '../../assets/photo/brake/brake1.webp';
import b2 from '../../assets/photo/brake/brake2.webp';
import b3 from '../../assets/photo/brake/brake3.webp';
import b4 from '../../assets/photo/brake/brake4.webp';
import b5 from '../../assets/photo/brake/brake5.webp';
import b6 from '../../assets/photo/brake/brake6.webp';
import b7 from '../../assets/photo/brake/brake7.webp';
import b8 from '../../assets/photo/brake/brake8.webp';
import b9 from '../../assets/photo/brake/brake9.webp';
import b10 from '../../assets/photo/brake/brake10.webp';
import b11 from '../../assets/photo/brake/brake11.webp';
import b12 from '../../assets/photo/brake/brake12.webp';
import b13 from '../../assets/photo/brake/brake13.webp';
import b14 from '../../assets/photo/brake/brake14.webp';
import b15 from '../../assets/photo/brake/brake15.webp';
import b16 from '../../assets/photo/brake/brake16.webp';
import b17 from '../../assets/photo/brake/brake17.webp';
import b18 from '../../assets/photo/brake/brake18.webp';
import b19 from '../../assets/photo/brake/brake19.webp';

import L1 from '../../assets/photo/lubejob/lube1.webp';
import L2 from '../../assets/photo/lubejob/lube2.webp';
import L3 from '../../assets/photo/lubejob/lube3.webp';
import L4 from '../../assets/photo/lubejob/lube4.webp';

import a1 from '../../assets/photo/axle/axle1.webp';
import a2 from '../../assets/photo/axle/axle2.webp';

import s1 from '../../assets/photo/suspension/suspension1.webp';

import d1 from '../../assets/photo/doorcable/door1.webp';
import d2 from '../../assets/photo/doorcable/door2.webp';

import f1 from '../../assets/photo/fender/fender1.webp';
import f2 from '../../assets/photo/fender/fender2.webp';
import f3 from '../../assets/photo/fender/fender3.webp';
import f4 from '../../assets/photo/fender/fender4.webp';
import f5 from '../../assets/photo/fender/fender5.webp';
import f6 from '../../assets/photo/fender/fender6.webp';
import f7 from '../../assets/photo/fender/fender7.webp';
import f8 from '../../assets/photo/fender/fender8.webp';
import f9 from '../../assets/photo/fender/fender9.webp';

import li1 from '../../assets/photo/lights/light1.webp';
import li2 from '../../assets/photo/lights/light2.webp';
import li3 from '../../assets/photo/lights/light3.webp';
import li4 from '../../assets/photo/lights/light4.webp';

import t1 from '../../assets/photo/tiremounting/tire1.webp';
import t2 from '../../assets/photo/tiremounting/tire2.webp';
import t3 from '../../assets/photo/tiremounting/tire3.webp';

import j1 from '../../assets/photo/brake/brake1.webp';
import j2 from '../../assets/photo/brake/brake2.webp';
import j3 from '../../assets/photo/brake/brake3.webp';

import e1 from '../../assets/photo/electrical/e1.webp';
import e2 from '../../assets/photo/electrical/e2.webp';
import e3 from '../../assets/photo/electrical/e3.webp';
import e4 from '../../assets/photo/electrical/e4.webp';
import e5 from '../../assets/photo/electrical/e5.webp';
import e6 from '../../assets/photo/electrical/e6.webp';
import e7 from '../../assets/photo/electrical/e7.webp';
import e8 from '../../assets/photo/electrical/e8.webp';
import e9 from '../../assets/photo/electrical/e9.webp';
import e10 from '../../assets/photo/electrical/e10.webp';
import e11 from '../../assets/photo/electrical/e11.webp';
import e12 from '../../assets/photo/electrical/e12.webp';
import e13 from '../../assets/photo/electrical/e13.webp';
import e14 from '../../assets/photo/electrical/e14.webp';
import e15 from '../../assets/photo/electrical/e15.webp';
import e16 from '../../assets/photo/electrical/e16.webp';
import e17 from '../../assets/photo/electrical/e17.webp';
import e18 from '../../assets/photo/electrical/e18.webp';
import e19 from '../../assets/photo/electrical/e19.webp';
import e20 from '../../assets/photo/electrical/e20.webp';
import e21 from '../../assets/photo/electrical/e21.webp';


import h1 from '../../assets/photo/hitch/hitch1.webp';
import h2 from '../../assets/photo/hitch/hitch2.webp';
import h3 from '../../assets/photo/hitch/hitch3.webp';

import body1 from '../../assets/photo/bodywork/body1.webp';
import body2 from '../../assets/photo/bodywork/body2.webp';
import body3 from '../../assets/photo/bodywork/body3.webp';
import body4 from '../../assets/photo/bodywork/body4.webp';
import body5 from '../../assets/photo/bodywork/body5.webp';
import body6 from '../../assets/photo/bodywork/body6.webp';
import body7 from '../../assets/photo/bodywork/body7.webp';
import body8 from '../../assets/photo/bodywork/body8.webp';


import tire1 from "../../assets/beforeandafter/tires/matt19.webp";
import tire2 from "../../assets/beforeandafter/tires/matt21.webp";

import fender1 from "../../assets/beforeandafter/fender/matt56.webp";
import fender2 from "../../assets/beforeandafter/fender/matt59.webp";
import fender3 from "../../assets/beforeandafter/fender/matt57.webp";
import fender4 from "../../assets/beforeandafter/fender/matt60.webp";

import wire1 from "../../assets/beforeandafter/electrical/matt43.webp";
import wire2 from "../../assets/beforeandafter/electrical/matt69.webp";
import wire3 from "../../assets/beforeandafter/electrical/matt72.webp";
import wire4 from "../../assets/beforeandafter/electrical/matt42.webp";


import brake4 from "../../assets/beforeandafter/brakes_drums/IMG_5126.webp";
import brake3 from "../../assets/beforeandafter/brakes_drums/matt112.webp";
import brake5 from "../../assets/beforeandafter/brakes_drums/matt113.webp";
import brake6 from "../../assets/beforeandafter/brakes_drums/IMG_4695.webp";
import brake7 from "../../assets/beforeandafter/brakes_drums/IMG_5118.webp";
import brake8 from "../../assets/beforeandafter/brakes_drums/IMG_5831.webp";


import brake1 from "../../assets/beforeandafter/brakes_drums/IMG_3719.webp";
import brake2 from "../../assets/beforeandafter/brakes_drums/f4.webp";
import revamp1 from "../../assets/beforeandafter/brakes_drums/IMG_3715.webp";
import revamp2 from "../../assets/beforeandafter/brakes_drums/f2.webp";

import suspension1 from "../../assets/beforeandafter/suspension/IMG_5828.webp";
import suspension2 from "../../assets/beforeandafter/suspension/IMG_5829.webp";


import GalleryCardDeets from './GalleryCardDeets';

import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import BeforeAndAfter from './BeforeAndAfter';

const Gallery = () => {
  const [show, setShow] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [flipStates, setFlipStates] = useState(Array(10).fill(false)); // Array for each card’s flip state
  const [screenSize, setScreenSize] = useState('lg');
  const handleClose = () => setShow(false);

  const [open, setOpen] = useState(false);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxSlides, setLightboxSlides] = useState([]);

  const handleClose1 = () => setShow(false);

  const handleShow1 = (service) => {
    setCurrentService(service);
    setShow(true);
  };

  const handleLightboxOpen = (images) => {
    const slides = images.map((img) => ({ src: img }));
    setLightboxSlides(slides);
    setLightboxOpen(true);
  };

  const handleShow = (service) => {
    setCurrentService(service);
    setShow(true);
  };

  const handleFlip = (index) => {
    setFlipStates((prevFlipStates) => {
      const newFlipStates = [...prevFlipStates];
      newFlipStates[index] = !newFlipStates[index];
      return newFlipStates;
    });
  };

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width <= 500) {
        setScreenSize('sm');
      } else if (width <= 800) {
        setScreenSize('md');
      } else {
        setScreenSize('lg');
      }
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);

    return () => window.removeEventListener('resize', updateScreenSize);
  }, []);

  const servicesListApi = [
    { title: "Lube job", image: p1, description: "Keep your trailer running smoothly with regular lubrication services.", images: [L1, L2, L3, L4] },
    { title: "Electrical", image: p3, description: "Comprehensive electrical repairs and maintenance for safe travels.", images: [e1, e2, e3, e4, e5, e6, e7, e8, e9, e10, e11, e12, e13, e14, e15, e16, e17, e18, e19, e20, e21] },
    {
      title: "Hitches",
      image: p12,
      description: "Expert hitch installation and maintenance for secure and reliable towing.",
      images: [h1, h2, h3]
    },
    {
      title: "Bodywork",
      image: p10,
      description: "Transform your trailer's exterior with expert bodywork repairs and upgrades, including structural fixes.",
      images: [body1, body2, body3, body4, body5, body6, body7, body8] // Replace body1, body2, body3 with the actual image imports for bodywork.
    },
    { title: "Suspension", image: p2, description: "Ensure a stable ride with expert suspension services.", images: [s1] },
    { title: "Axle", image: p8, description: "Axle repair and maintenance to keep your trailer moving reliably.", images: [a1, a2] },
    { title: "Door cable", image: p7, description: "Replace worn door cables for smoother and safer operation.", images: [d1, d2] },
    { title: "Fender", image: p11, description: "Fender repairs and replacements to maintain your trailer’s appearance and safety.", images: [f1, f2, f3, f4, f5, f6, f7, f8, f9] },
    { title: "Lights", image: p9, description: "Lighting solutions to ensure visibility and compliance on the road.", images: [li1, li2, li3, li4] },
    { title: "Brakes & Drums", image: p5, description: "Maintain stopping power with brake and drum services.", images: [b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19] },
    { title: "Tire mounting", image: p4, description: "Professional tire mounting for safe and efficient performance.", images: [t1, t2, t3] },
    { title: "Jack mounting", image: p6, description: "Securely mounted jacks for convenient lifting and stability.", images: [] },
    // { title: "Mobile repairs", image: p11, description: "On-the-go repairs wherever you need us." }
  ];


  return (
    <div className="gallery">
      <Navbar />
      <div className="gallery-container">
        <div className="gallery-title">
          <h1>Gallery</h1>
          <p>
            Our before-and-after photos highlight how our repair services bring new life to old or damaged trailers.
            Whether it's fixing structural issues, addressing wear and tear, or adding custom features, you'll see firsthand
            the transformation our skilled mechanics can achieve.
          </p>
        </div>

        <div className="gallerycards-container">
          {servicesListApi.map((service, index) => (
            <GalleryCards
              key={index}
              image={service.image}
              service={service.title}
              description={service.description}
              onClick={() => handleShow(service)}
            />
          ))}
        </div>

        <div className="gallery-title before-text">
          <h1>Before and After </h1>
          <p>
            From damaged and aging to strong and reliable—our before-and-after photos tell the story of expert craftsmanship and quality repairs. See how we bring trailers back to life, ensuring safety, durability, and performance.
          </p>
          {/* <span>*Click the arrow and slide left or right to view full image*</span> */}
        </div>
        <div className="gallerycards-container gallery-before-and-after-container">
          <BeforeAndAfter img1={tire2} img2={tire1} />
          <BeforeAndAfter img1={fender2} img2={fender1} />
          <BeforeAndAfter img1={fender4} img2={fender3} />
          <BeforeAndAfter img1={suspension2} img2={suspension1} />
          <BeforeAndAfter img1={brake2} img2={brake1} />
          <BeforeAndAfter img1={revamp2} img2={revamp1} />
          <BeforeAndAfter img1={brake4} img2={brake3} />
          <BeforeAndAfter img1={brake6} img2={brake5} />
          <BeforeAndAfter img1={brake8} img2={brake7} />
          <BeforeAndAfter img1={wire1} img2={wire2} />
          <BeforeAndAfter img1={wire4} img2={wire3} />
        </div>
      </div>
      <Footer />

      <Modal show={show} onHide={handleClose} centered size={screenSize} className="main-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="modal-gallery-title">
              <h2>{currentService?.title}</h2>
            </div>
          </Modal.Title>
        </Modal.Header>
        <div className="modal-gallery-container">
          {currentService?.images.map((pic, idx) => (
            <GalleryCardDeets key={idx} pics={pic} onClick={() => handleLightboxOpen(currentService.images)} />

          ))}

        </div>
        <Modal.Footer className='modal-footer'></Modal.Footer>
      </Modal>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        plugins={[Fullscreen, Thumbnails, Slideshow, Zoom]}
      />
    </div>
  );
};

export default Gallery;
