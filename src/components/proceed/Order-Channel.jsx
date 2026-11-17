/* eslint-disable react/prop-types */
import Details from "./details";

function OrderChannel({ totalPrice, onClose, items }) {
  return (
    <div className="order-channel-container">
      <Details totalPrice={totalPrice} onClose={onClose} items={items} />
    </div>
  );
}

export default OrderChannel;
