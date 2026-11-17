import React from "react";
import img1 from "../imgs/fries.jpg";
import { useNavigate } from "react-router";

function Catern() {
  const navigate = useNavigate();

  const navigation = () => {
    navigate("/pickup");
  };
  const micro = () => {
    navigate("/deliverypartner");
  };

  return (
    <div className="p-4">
      <h1 className="text-center font-bold text-4xl text-darkgreen mb-8">
        Catering Services
      </h1>
      <div className="flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2">
          <img
            className="h-64 w-full object-cover lg:h-96"
            src={img1}
            alt="Catering services"
          />
        </div>
        <div className="mt-8 lg:mt-0 lg:pl-10 lg:w-1/2 text-center lg:text-left">
          <h1 className="text-3xl font-bold text-darkgreen">
            <span className="block">What type of</span> catering order can we
            get started for you?
          </h1>
          <div className="mt-10">
            <p className="font-semibold">
              Pick up your order at the RESTAURANT
            </p>
            <button
              className="border-2 border-darkgreen hover:bg-darkgreen hover:text-white p-2 w-full max-w-xs mt-5 h-14"
              onClick={navigation}
            >
              Catering Pickup
            </button>
          </div>
          <div className="mt-10">
            <p className="font-semibold">We bring your order to you</p>
            <button
              className="border-2 border-darkgreen hover:bg-darkgreen hover:text-white p-2 w-full max-w-xs mt-5 h-14"
              onClick={micro}
            >
              Catering Delivery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Catern;
