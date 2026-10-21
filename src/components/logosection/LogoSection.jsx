import React from 'react'

import "./logosection.css"

import img1 from "../../assets/logo/logo1.jpg"
import img2 from "../../assets/logo/logo21.png"
import img3 from "../../assets/logo/logo2a1.png"
import img4 from "../../assets/logo/logo2b.png"
import img5 from "../../assets/logo/logo2c.png"
import img6 from "../../assets/logo/logo3.jpg"
import img7 from "../../assets/logo/logo4.jpg"
import img8 from "../../assets/logo/logo5.jpg"
import img9 from "../../assets/logo/logo6.jpg"
import img10 from "../../assets/logo/logo7.png"
import img11 from "../../assets/logo/logo81.png"
import img12 from "../../assets/logo/logo9.jpg"
import img13 from "../../assets/logo/logo10.jpg"
import img14 from "../../assets/logo/logo11.png"
import img15 from "../../assets/logo/logo12.png"
import img16 from "../../assets/logo/logo12.jpg"
import img17 from "../../assets/logo/logo13.jpg"
import img18 from "../../assets/logo/logo13.png"

const LogoSection = () => {
    const imageArray = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18 ];

    const images = imageArray.map((img, i) => (
      <img key={i} src={img} alt={`Dealer logo ${i + 1}`} />
    ));
  return (
    <div className='logosection'>
        <div className='logosection-container'>
            <div className='logosection-image'>
                {images}
            </div>
        </div>
    </div>
  )
}

export default LogoSection