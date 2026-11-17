import { createContext, useState } from "react";

export const CartContext = createContext();

// eslint-disable-next-line react/prop-types
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [notification, setNotification] = useState("");

  const updateTotalPrice = (newTotal) => {
    setTotalPrice(newTotal);
  };

  const addToCart = (item) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, item];
      updateTotalPrice(
        prevCart.reduce((sum, item) => sum + item.price * item.count, 0) +
          item.price * item.count
      );
      return updatedCart;
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const itemToRemove = prevCart.find((item) => item.id === itemId);
      if (itemToRemove) {
        updateTotalPrice(
          prevCart.reduce((sum, item) => sum + item.price * item.count, 0) -
            itemToRemove.price * itemToRemove.count
        );
      }
      return prevCart.filter((item) => item.id !== itemId);
    });
  };

  const increaseItemCount = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.id === itemId) {
          item.count += 1;
        }
        return item;
      });
      updateTotalPrice(
        updatedCart.reduce((sum, item) => sum + item.price * item.count, 0)
      );
      return updatedCart;
    });
  };

  const decreaseItemCount = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.id === itemId && item.count > 1) {
          item.count -= 1;
        }
        return item;
      });
      updateTotalPrice(
        updatedCart.reduce((sum, item) => sum + item.price * item.count, 0)
      );
      return updatedCart;
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalPrice,
        addToCart,
        removeFromCart,
        increaseItemCount,
        decreaseItemCount,
        updateTotalPrice,
        notification,
        setNotification,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
