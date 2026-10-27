// export const STRAPI_SERVER = "https://strapi.totaltrailerparts.com";

// export const callStrapiBackend = async (
//   type = "GET",
//   content,
//   parameters = {},
//   data = null
// ) => {
//   const jwt = JSON.parse(localStorage.getItem("user"))?.jwt;

//   let params = "";
//   let id = null;

//   if (parameters.id) {
//     id = parameters.id;
//     delete parameters.id;
//   }

//   const keys = Object.keys(parameters);

//   keys.forEach((key, i) => {
//     params += `${i ? "&" : "?"}${key}=${parameters[key]}`;
//   });

//   let options = {
//     headers: {
//       "Content-Type": "application/json",
//     },
//     method: type,
//   };

//   if (jwt) {
//     options.headers.Authorization = `Bearer ${jwt}`;
//   }

//   if (data) {
//     options.body = JSON.stringify({ data });
//   }

//   return (
//     await fetch(
//       `${STRAPI_SERVER}/api/${content}${id ? `/${id}` : ""}${params}`,
//       options
//     )
//   ).json();
// };

// export const getUser = () => {
//   const userString = localStorage.getItem("user");
//   return userString ? JSON.parse(userString) : null;
// };

// export const mergeAttributesWithId = (item) =>
//   item
//     ? {
//         ...item.attributes,
//         id: item.id,
//       }
//     : item;

// const getLocalCart = () => {
//   const cartString = localStorage.getItem("cart");
//   return cartString
//     ? JSON.parse(cartString).map((item, id) => ({ ...item, id }))
//     : [];
// };

// const updateLocalCart = (cart) => {
//   return localStorage.setItem("cart", JSON.stringify(cart));
// };
// // { quantity: "", product: 1, user: 1 }

// const addToLocalCart = (item) => {
//   const cart = getLocalCart();
//   cart.push(item);
//   updateLocalCart(cart);
// };

// const deleteLocalCartItem = (id) => {
//   const cart = getLocalCart();
//   const newCart = cart.filter((item, i) => id !== i);
//   console.log(id, newCart);
//   return updateLocalCart(newCart);
// };

// const isInLocalCart = (id) => {
//   const cart = getLocalCart();
//   const newCart = cart.filter((item) => item.id !== id);
//   updateLocalCart(newCart);
// };

// const updateLocalCartItem = (id, data) => {
//   const cart = getLocalCart();
//   const newCart = cart.map((item) => {
//     if (item.id === id) {
//       return { ...item, ...data };
//     }
//     return item;
//   });
//   updateLocalCart(newCart);
// };

// const emptyLocalCart = () => {
//   localStorage.removeItem("cart");
// };

// const strapi = {
//   get: (content, parameters) =>
//     callStrapiBackend("GET", content, { populate: "*", ...parameters }),
//   post: (content, data) => callStrapiBackend("POST", content, {}, data),
//   put: (content, parameters, data) =>
//     callStrapiBackend("PUT", content, parameters, data),
//   delete: (content, parameters) =>
//     callStrapiBackend("DELETE", content, parameters),
//   getBestSellers: () => {
//     return callStrapiBackend("GET", "bestsellers", {
//       "populate[product][populate][0]": "img",
//     });
//   },
//   getCart: async () => {
//     const user = getUser();
//     if (user) {
//       const data = (
//         await callStrapiBackend("GET", "carts", {
//           "populate[product][populate][0]": "img",
//           "filters[user][id][$eq]": user.id,
//         })
//       ).data;

//       return data.map((item) => ({
//         ...mergeAttributesWithId(item),
//         product: {
//           ...mergeAttributesWithId(item.attributes.product.data),
//         },
//       }));
//     } else {
//       return getLocalCart();
//     }
//   },
//   addToCart: async ({ product, quantity }) => {
//     const user = getUser();
//     if (user) {
//       return callStrapiBackend(
//         "POST",
//         "carts",
//         {},
//         { product, quantity, user: user.id }
//       );
//     } else {
//       const productData = mergeAttributesWithId(
//         (await strapi.get("products", { id: product })).data
//       );
//       console.log(productData);
//       return addToLocalCart({ product: productData, quantity });
//     }
//   },
//   deleteCartItem: async (id) => {
//     const user = getUser();
//     if (user) {
//       return await callStrapiBackend("DELETE", "carts", { id });
//     } else {
//       return deleteLocalCartItem(id);
//     }
//   },
//   emptyCart: async () => {
//     const user = getUser();
//     if (user) {
//       const cartItems = (
//         await callStrapiBackend("GET", "carts", {
//           "populate[product][populate][0]": "img",
//           "filters[user][id][$eq]": getUser().id,
//         })
//       ).data;

//       const res = await Promise.all(
//         cartItems.map(async (item) =>
//           callStrapiBackend("DELETE", "carts", { id: item.id })
//         )
//       );

//       return res;
//     } else {
//       return emptyLocalCart();
//     }
//   },
//   updateCartItem: async (id, data) => {
//     const user = getUser();
//     if (user) {
//       callStrapiBackend("PUT", "carts", { id }, data);
//     } else {
//       updateLocalCartItem(id, data);
//     }
//   },
//   isInCart: async (product_id) => {
//     await callStrapiBackend("GET", "cart", {
//       "filters[product][$eq]": product_id,
//     });
//   },

//   getWishlist: async () => {
//     const data = (
//       await callStrapiBackend("GET", "wishlists", {
//         "populate[product][populate][0]": "img",
//         "filters[user][id][$eq]": getUser().id,
//       })
//     ).data;

//     return data.map((item) => ({
//       ...mergeAttributesWithId(item),
//       product: {
//         ...mergeAttributesWithId(item.attributes.product.data),
//       },
//     }));
//   },
//   addToWishlist: (data) =>
//     callStrapiBackend("POST", "wishlists", {}, { ...data, user: getUser().id }),
//   deleteWishlistItem: (id) => callStrapiBackend("DELETE", "wishlists", { id }),
//   updateWishlistItem: (id, data) =>
//     callStrapiBackend("PUT", "wishlists", { id }, data),

//   getImageURL: (data) =>
//     `${STRAPI_SERVER}${data?.data?.attributes.formats.thumbnail.url}`,

//   addToCheckout: (data) =>
//     callStrapiBackend("POST", "checkouts", {}, { ...data, user: getUser()?.id }),
//   getCurrentCheckout: () =>
//     callStrapiBackend("GET", "checkouts", {
//       "filters[user][id][$eq]": getUser().id,
//       "filters[status][$eq]": "UNPAID",
//     }),

//   getCatalogue: async (subCategory) => {
//     const data = (
//       await callStrapiBackend("GET", "products", {
//         "filters[subCategory][$eq]": subCategory,
//       })
//     ).data;

//     return data.map((item) => ({
//       ...mergeAttributesWithId(item),
//     }));
//   },
//   postReview: async (data) => callStrapiBackend("POST", "reviews", {}, data),
// };

// export default strapi;
