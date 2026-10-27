import React from 'react'
import './stats.css'

import s1 from "../../assets/ss1.webp"
import s2 from "../../assets/ss2.webp"
import s3 from "../../assets/ss3.webp"
import s4 from "../../assets/ss4.webp"

const Stats = () => {
    return (
        <div className='stats'>
            <div className="stats-content">
                <img src={s1} alt="" />
                <h2>3000+</h2>
                <p>Trailer parts available</p>
            </div>
            <div className="stats-content">
                <img src={s2} alt="" />
                <h2>5</h2>
                <p>Expert Technicians</p>
            </div>
            <div className="stats-content">
                <img src={s3} alt="" />
                <h2>15k</h2>
                <p>Satisfied Clients</p>
            </div>
            <div className="stats-content">
                <img src={s4} alt="" />
                <h2>80k</h2>
                <p>Completed projects</p>
            </div>
        </div>
    )
}

export default Stats