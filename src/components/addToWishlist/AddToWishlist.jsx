import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FiLoader } from "react-icons/fi";

import strapi from "../../functions/strapi";
import AuthContext from "../../AuthContext";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import GA4React from 'ga-4-react';

const ga4react = new GA4React('G-757XGDZ579');

const AddToWishlistBtn = ({ id }) => {
  const {
    fetchWishlist,
    gatedAction,
    authState: { wishlist, user },
  } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    const wishlistItem = wishlist.filter((item) => item.product.id === id);
    setIsInWishlist(wishlistItem.length ? wishlistItem[0].id : false);
  }, [wishlist]);

  const trackClickEvent = (eventCategory, eventAction, eventLabel) => {
    ga4react.gtag("event", eventAction, {
      event_category: eventCategory,
      event_label: eventLabel,
    });
  };

  const add = () => gatedAction(() => {
    setLoading(true);
    strapi
      .addToWishlist({ product: id, quantity: 1 })
      .then((res) => {
        // console.log(res);
        toast.success("Product successfully added to your wishlist!", {
          hideProgressBar: true,
          position: toast.POSITION.TOP_RIGHT,
        });
        trackClickEvent('Button', 'Click', 'Wishlist Button Clicked');
      })
      .catch((error) => {
        toast.error("An error occured, please try again later.", {
          hideProgressBar: true,
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .finally(() => {
        setLoading(false);
        fetchWishlist();
      });
  });

  const remove = () => gatedAction(() => {
    setLoading(true);
    strapi
      .deleteWishlistItem(isInWishlist)
      .then((res) => {
        // console.log(res);
        toast.success("Product successfully removed from your wishlist!", {
          hideProgressBar: true,
          position: toast.POSITION.TOP_RIGHT,
        });
        trackClickEvent('Button', 'Click', 'Wishlist Remove Button Clicked');
      })
      .catch((error) => {
        toast.error("An error occured, please try again later.", {
          hideProgressBar: true,
          position: toast.POSITION.TOP_RIGHT,
        });
      })
      .finally(() => {
        setLoading(false);
        fetchWishlist();
      });
  });

  return (
    <div className="wishlist text-black" onClick={isInWishlist ? remove : add}>
      {loading ? (
        <FiLoader />
      ) : isInWishlist ? (
        <AiFillHeart className="card-icon" />
      ) : (
        <AiOutlineHeart className="card-icon" />
      )}
      {/* <ToastContainer /> */}
    </div>
  );
};

export default AddToWishlistBtn;
