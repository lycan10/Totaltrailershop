import React from 'react'

import "./logosection.css"

import img1 from "../../assets/logo/logo1.webp"
import img2 from "../../assets/logo/logo21.webp"
import img3 from "../../assets/logo/logo2a1.webp"
import img4 from "../../assets/logo/logo2b.webp"
import img5 from "../../assets/logo/logo2c.webp"
import img6 from "../../assets/logo/logo3.webp"
import img7 from "../../assets/logo/logo4.webp"
import img8 from "../../assets/logo/logo5.webp"
import img9 from "../../assets/logo/logo6.webp"
import img10 from "../../assets/logo/logo7.webp"
import img11 from "../../assets/logo/logo81.webp"
import img12 from "../../assets/logo/logo9.webp"
import img13 from "../../assets/logo/logo10.webp"
import img14 from "../../assets/logo/logo11.webp"
import img15 from "../../assets/logo/logo12.webp"
import img16 from "../../assets/logo/logo12.webp"
import img17 from "../../assets/logo/logo13.webp"
import img18 from "../../assets/logo/logo13.webp"

const LogoSection = () => {
  const imageArray = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15, img16, img17, img18];

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