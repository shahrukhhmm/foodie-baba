// Cards.js
import React from 'react';

function Cards({ img, onClick, price, onAddToCart }) {
    return (
        <div 
            onClick={onClick} 
            className="card hover:cursor-pointer border p-4 lg:p-2 rounded-lg shadow-lg lg:w-48 lg:h-56 lg:text-sm"
        >
            <img 
                src={img} 
                alt="Product" 
                className="w-full h-40 lg:h-24 object-cover rounded-t-lg" 
            />
            <div className="details mt-4 lg:mt-2">
                <p className="text-xl lg:text-lg font-bold text-gray-800">${price}</p>
                <button 
                    onClick={(e) => { e.stopPropagation(); onAddToCart(); }} 
                    className="mt-2 lg:mt-1 bg-darkgreen text-white py-2 lg:py-1 px-4 lg:px-2 rounded hover:bg-darkgreen"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}



export default Cards;
