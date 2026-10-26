import React from 'react'
import ImageSlider from "react-image-comparison-slider";

const BeforeAndAfter = ({img1, img2}) => {
  return (
    <div className='ba-container'>
        <ImageSlider
          image1={img1}
          image2={img2}
          sliderWidth={3}
          sliderColor="#3B67AF"
          handleColor="#3B67AF"
          handleBackgroundColor="white"
        />
    </div>
  )
}

export default BeforeAndAfter