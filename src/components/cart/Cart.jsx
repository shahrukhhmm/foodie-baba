import { useState, useContext } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import OrderChannel from "../proceed/Order-Channel";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import axios from "axios";
import "../../App.css";

function Cart() {
  const {
    cart,
    totalPrice,
    removeFromCart,
    increaseItemCount,
    decreaseItemCount,
    updateTotalPrice,
    notification,
  } = useContext(CartContext);

  const [showOrderChannel, setShowOrderChannel] = useState(false);
  const [selectedAddOns, setSelectedAddOns] = useState({});
  const [spiceLevels, setSpiceLevels] = useState({});

  const handleSpiceLevelChange = (itemId, spiceLevel) => {
    setSpiceLevels((prevSpiceLevels) => ({
      ...prevSpiceLevels,
      [itemId]: spiceLevel,
    }));
  };

  const navigate = useNavigate();
  const isAuthenticated = () => localStorage.getItem("token") !== null;

  const handleProceedToCheckout = () => {
    if (!isAuthenticated()) {
      navigate("/login");
    } else if (cart.length > 0) {
      const items = cart.map((item) => ({
        menuname: item.title || item.name,
        quantity: item.count,
        addOns: selectedAddOns[item.id] || [],
        spiceLevel: spiceLevels[item.id] || "default",
      }));
      console.log(items);
      setShowOrderChannel(true);
    }
  };

  const handleRemove = (itemId) => {
    removeFromCart(itemId);
  };

  const handleCloseOrderChannel = () => {
    setShowOrderChannel(false);
  };

  const handleAddOnChange = (itemName, addOn, price) => {
    setSelectedAddOns((prevSelectedAddOns) => {
      const addOnsForItem = prevSelectedAddOns[itemName] || [];

      // Check if the add-on is already selected for this specific item
      const isAlreadySelected = addOnsForItem.some(
        (item) => item.addOn === addOn
      );

      if (!isAlreadySelected) {
        const updatedAddOns = [...addOnsForItem, { addOn, price }];

        // Update the selectedAddOns state with the new add-ons list for this item
        const newSelectedAddOns = {
          ...prevSelectedAddOns,
          [itemName]: updatedAddOns,
        };

        // Recalculate the total price for all items in the cart
        const newTotalPrice = cart.reduce((sum, item) => {
          const itemAddOns = newSelectedAddOns[item.name] || [];
          const addOnsTotal = itemAddOns.reduce(
            (addOnSum, addOnItem) => addOnSum + addOnItem.price,
            0
          );
          return sum + item.count * (item.price + addOnsTotal);
        }, 0);

        updateTotalPrice(newTotalPrice);

        return newSelectedAddOns;
      }

      return prevSelectedAddOns;
    });
  };

  const handleRemoveAddOn = (itemName, addOnIndex) => {
    setSelectedAddOns((prevSelectedAddOns) => {
      const addOnsForItem = prevSelectedAddOns[itemName] || [];
      const removedAddOn = addOnsForItem[addOnIndex];
      const updatedAddOns = addOnsForItem.filter(
        (_, index) => index !== addOnIndex
      );

      // Update the selectedAddOns state with the new add-ons list for this item
      const newSelectedAddOns = {
        ...prevSelectedAddOns,
        [itemName]: updatedAddOns,
      };

      // Recalculate the total price for all items in the cart
      const newTotalPrice = cart.reduce((sum, item) => {
        const itemAddOns = newSelectedAddOns[item.name] || [];
        const addOnsTotal = itemAddOns.reduce(
          (addOnSum, addOnItem) => addOnSum + addOnItem.price,
          0
        );
        return sum + item.count * (item.price + addOnsTotal);
      }, 0);

      updateTotalPrice(newTotalPrice);

      return newSelectedAddOns;
    });
  };

  console.log(cart);
  return (
    <PaymentForm
      cardTokenizeResponseReceived={(token, verifiedBuyer) => {
        // console.info("Token:", token);
        // console.info("Verified Buyer:", verifiedBuyer);
        // call api
        const price = Number(
          cart.reduce((accumulator, item) => {
            return accumulator + item.price * item.count;
          }, 0)
        ).toFixed(2);
        axios
          .post(`http://localhost:3000/payments/process-payment`, {
            token,
            verifiedBuyer,
            cart,
            price,
          })
          .then(({ data }) => {
            if (data.success) {
              alert("payment successful");
              window.location.reload();
            }
          })
          .catch((err) => {
            console.log("something went wrong server side", err.message);
          });
      }}
      locationId="LID"
      applicationId="sandbox-sq0idb-eg-MNEM3SRT70ilhKt2OoA"
    >
      <div className="cart-container">
        <div className="bg-darkred rounded-xl w-80% m-auto p-5 my-10">
          <div className="header border-b-2 border-darkgreen text-2xl font-bold text-white p-5">
            {cart.length} items
          </div>
          <div className="main h-96 overflow-y-scroll scrollbar-thin scrollbar-track-redyellow scrollbar-thumb-darkgreen">
            {cart.map((item) => (
              <div
                key={item.id}
                className="cart-item flex flex-col mt-4 border-b-2 border-darkgreen py-5"
              >
                <div className="item-details text-2xl ml-5 flex justify-between items-center">
                  <img
                    src={item?.path ? item.path : item.img}
                    alt="item"
                    className="size-20 rounded"
                  />
                  <p>{item.title ? item.title : item.name}</p>
                  <p className="ml-3">
                    {item.count} x $ {item.price}
                  </p>
                  <div className="buttons ml-5 text-center">
                    <button
                      className="increment px-5 py-2 bg-darkgreen text-white"
                      onClick={() => increaseItemCount(item.id)}
                    >
                      +
                    </button>
                    <p>{item.count}</p>
                    <button
                      className="decrement px-5 py-2 bg-darkgreen text-white"
                      onClick={() => decreaseItemCount(item.id)}
                    >
                      -
                    </button>
                  </div>
                </div>
                <div className="add-ons ml-5 mt-2">
                  {selectedAddOns[item.name]?.map((addOn, index) => (
                    <div key={index} className="flex items-center">
                      <p className="text-sm">{addOn.addOn}</p>
                      <button
                        className="text-red-500 ml-3"
                        onClick={() => handleRemoveAddOn(item.name, index)}
                      >
                        &#10005;
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex items-start lg:items-center gap-x-2 gap-y-2 flex-col lg:flex-row">
                  <button
                    className="remove-button bg-darkgreen text-white px-4 py-2 rounded ml-3 lg:ml-5"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                  <div className="recommended-addons">
                    <select
                      className="ml-3 p-2 rounded outline-none border border-orange-500 bg-orange-50"
                      onChange={(e) =>
                        handleAddOnChange(
                          item.name,
                          e.target.options[e.target.selectedIndex].text,
                          parseFloat(e.target.value)
                        )
                      }
                    >
                      <option value="">Sides</option>
                      <option value="3.99">Extra Tender / $3.99</option>
                      <option value="0.99">Sauce / $0.99</option>
                      <option value="1.99">Kaleslaw / $1.99</option>
                      <option value="2.99">Cheese Slice / $2.99</option>
                      <option value="0.99">Fried Pickles / $0.99</option>
                      <option value="0.97">Hot Sauce / $0.97</option>
                    </select>
                  </div>
                  <div className="spice-level">
                    <select
                      className="ml-3 p-2 rounded outline-none border border-orange-500 bg-orange-50"
                      onChange={(e) =>
                        handleSpiceLevelChange(item.id, e.target.value)
                      }
                    >
                      <option value="">Spice Level</option>
                      <option value="mild">Mild</option>
                      <option value="medium">Medium</option>
                      <option value="hot">Hot</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="footer flex justify-between bg-darkgreen p-5 rounded-xl">
            <h1 className="font-bold text-white text-2xl">
              Total: $ {totalPrice.toFixed(2)}
            </h1>
            <button
              className={`proceed-button ${
                cart.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-darkgreen hover:bg-darkgreen"
              } text-white px-4 py-2 mt-2 rounded`}
              onClick={handleProceedToCheckout}
              disabled={cart.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
        {showOrderChannel && (
          <div className="modal-overlay">
            <OrderChannel
              totalPrice={totalPrice}
              items={cart.map((item) => ({
                menuname: item.title || item.name,
                quantity: item.count,
                price: item.price,
                addOns: selectedAddOns[item.id] || [],
                spiceLevel: spiceLevels[item.id] || "default",
              }))}
              onClose={handleCloseOrderChannel}
            />
          </div>
        )}
        {notification && (
          <div className="notification bg-darkgreen text-white p-3 rounded fixed bottom-5 right-5">
            {notification}
          </div>
        )}
      </div>
    </PaymentForm>
  );
}

export default Cart;
