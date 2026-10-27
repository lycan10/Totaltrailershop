import React from 'react';
import "./gallerycards.css";


const GalleryCards = ({image, service, description, onClick}) => {

  

  return (
    <div className="gallerycards">
      <div className="gallerycard">
        <div
          className="gallerycard-img"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: '60%', // Adjust size as needed
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="overlay" onClick={onClick} >
            <div className="overlay-content" >
              <a href="#!">View Project</a>
            </div>
          </div>
        </div>

        <div className="gallerycard-content">
          <a href="#!">
            <h2>{service}</h2>
            <p>{description}</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default GalleryCards;
