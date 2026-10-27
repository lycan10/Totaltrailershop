import React from 'react'

import "./gallerycarddeets.css"

const GalleryCardDeets = ({pics, onClick}) => {
  return (
    <div className='gallerycarddeets' >
        <div className="gallerycarddeetscontainer">
            <img src={pics} alt="" onClick={onClick} />
        </div>
    </div>

       // <ReactCardFlip
            //   key={index}
            //   isFlipped={flipStates[index]}
            //   flipDirection="horizontal"
            //   className="card-flip"
            // >
            //   {/* Front side */}
            //   <div className="modal-img" onClick={() => handleFlip(index)}>
            //     <img src={pic1} alt="Before" />
            //     <h3>Before</h3>
            //   </div>

            //   {/* Back side */}
            //   <div className="modal-img" onClick={() => handleFlip(index)}>
            //     <img src={pic2} alt="After" />
            //     <h3>After</h3>
            //   </div>
            // </ReactCardFlip>
  )
}

export default GalleryCardDeets