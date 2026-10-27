import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FiShoppingBag } from "react-icons/fi";

import strapi from "../../functions/strapi";
import AuthContext from "../../AuthContext";
import GA4React from 'ga-4-react';

const ga4react = new GA4React('G-757XGDZ579');


const AddToCartBtn = ({ id, quantity = 1 }) => {
  const {
    fetchCart,
    authState: { cart },
  } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    const cartItem = cart.filter((item) => item.product.id === id);
    console.log("cart item", cartItem.length ? cartItem[0].id : false);
    setIsInCart(cartItem.length ? cartItem[0].id : false);
  }, [cart]);

  const trackClickEvent = (eventCategory, eventAction, eventLabel) => {
    ga4react.gtag("event", eventAction, {
      event_category: eventCategory,
      event_label: eventLabel,
    });
  };



  const addToCart = () => {
    setLoading(true);
    strapi
      .addToCart({ product: id, quantity })
      .then((res) => {
        // console.log(res);
        toast.success("Product successfully added to your cart!", {
          hideProgressBar: true,
          position: toast.POSITION.TOP_RIGHT,
        });
        trackClickEvent('Button', 'Click', 'Cart Button Clicked');
      })
      .catch((error) => {
        toast.error("An error occured, please try again later.", {
          hideProgressBar: true,
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .finally(() => {
        setLoading(false);
        fetchCart();
      });
  };

  const removeFromCart = () => {
    setLoading(true);
    strapi
      .deleteCartItem(isInCart)
      .then((res) => {
        // console.log(res);
        toast.success("Product successfully removed from your cart!", {
          hideProgressBar: true,
          position: toast.POSITION.TOP_RIGHT,
        });
        trackClickEvent('Button', 'Click', 'Cart Remove Button Clicked');
      })
      .catch((error) => {
        toast.error("An error occured, please try again later.", {
          hideProgressBar: true,
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .finally(() => {
        setLoading(false);
        fetchCart();
      });
  };

  return (
    <div className="cart text-black" onClick={isInCart !== false ? removeFromCart : addToCart}>
      <FiShoppingBag className="card-icon" />
      {isInCart !== false ? (
        <p>{loading ? "REMOVING..." : "REMOVE FROM CART"}</p>
      ) : (
        <p>{loading ? "ADDING..." : "ADD TO CART"}</p>
      )}
      {/* <ToastContainer /> */}
    </div>
  );
};

export default AddToCartBtn;
