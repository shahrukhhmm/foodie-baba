import React, { useContext } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Content from './list.js';
import Cards from './cards';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { CartContext } from '../../cart/CartContext.jsx';
import menuImage from '../../imgs/menu1.jpeg'; 

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#9ac300", borderRadius: "50%" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#9ac300", borderRadius: "50%" }}
            onClick={onClick}
        />
    );
}

function ExploreMenu() {
    const { addToCart } = useContext(CartContext);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        autoplay: true,
        autoplaySpeed: 1000 // Change the value as needed (milliseconds)
    };

    return (
        <div className='text-center'>
            <h1 className='pb-3 border-b-8 border-darkgreen inline-block text-5xl font-bold mt-20 font-[roboto]'>Explore Menu</h1>
            {/* Wrap the image in a Link */}
            <Link to="/menu">
                <img src={menuImage} alt="Menu" className='mt-8 mx-auto' style={{ width: '80%', borderRadius: '15px' }} />
            </Link>
        </div>
    );
}

export default ExploreMenu;
