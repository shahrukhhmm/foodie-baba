import React from 'react';
import { Link } from 'react-router-dom';
import './hero.css';
import backgroundVideo from '../../assets/vedios/vedio3 (1).mp4';

function Hero() {
    return (
        <div className="hero relative flex flex-col lg:flex-row justify-between px-5 lg:px-20 pt-20 h-screen">
            <video autoPlay loop muted playsInline className="video-background absolute inset-0 w-full h-full object-cover -z-10">
                <source src={backgroundVideo} type="video/mp4" />
                <source src={backgroundVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="relative z-10 lg:w-2/5 xl:w-[40%] text-white flex items-center justify-center lg:justify-start" style={{ marginTop: "700px" }}>
                {/* Your content here */}
            </div>
            <div className="relative z-10 lg:w-3/5 xl:w-[50%] flex items-center justify-center lg:justify-end">
                {/* Your content here */}
            </div>
        </div>
    );
}

export default Hero;
