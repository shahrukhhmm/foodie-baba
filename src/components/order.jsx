import React from "react";
import { useNavigate } from "react-router";

function Order() {
  const navigate = useNavigate();

  const navigation = () => {
    navigate("/menu");
  };

  return (
    <>
      <h1 className="flex justify-center text-darkgreen text-4xl mt-6 font-bold text-center">
        ORDER ONLINE
      </h1>
      <h1 className="flex justify-center mt-20 text-2xl font-bold text-greenyellow text-center">
        HOUSTON HEIGHTS
      </h1>
      <div className="flex flex-col lg:flex-row justify-center items-center lg:gap-20 mt-10 gap-10">
        <div className="text-center">
          <p className="text-gray-500 font-semibold">
            PICK UP YOUR ORDER AT THE RESTAURANT
          </p>
          <button
            className="border-darkgreen text-darkgreen font-bold my-10 py-5 px-14 rounded border-2 hover:cursor-pointer hover:bg-darkgreen hover:text-white duration-300 w-full max-w-xs"
            onClick={navigation}
          >
            PICKUP
          </button>
        </div>
        <div className="text-center">
          <p className="text-gray-500 font-semibold">
            GET YOUR ORDER DELIVERED WITH DOORDASH
          </p>
          <button className="border-darkgreen text-darkgreen font-bold my-10 py-5 px-14 rounded border-2 hover:cursor-pointer hover:bg-darkgreen hover:text-white duration-300 w-full max-w-xs">
            DELIVERY
          </button>
        </div>
      </div>
    </>
  );
}

export default Order;
