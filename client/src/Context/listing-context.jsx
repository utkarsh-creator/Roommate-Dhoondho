import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ListingContext = createContext(null);

const getDefaultCart2 = (roommateList) => {
  let cart = {};
  for (const roommateId in roommateList) {
    cart[roommateId] = 0;
    console.log(roommateId);
  }
  return cart;
};
const getDefaultCart = (roomList) => {
  let cart = {};
  for (const roomId in roomList) {
    cart[roomId] = 0;
    console.log(roomId);
  }
  return cart;
};
export const ListingContextProvider = (props) => {
  const [roommateList, setRoommateList] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [cartItems2, setCartItems2] = useState({});
  const [selectedRoommateCards, setSelectedRoommateCards] = useState([]);
  const [selectedRoomCards, setSelectedRoomCards] = useState([]);

  useEffect(() => {
    axios
      .get("https://roommate-finder-theta.vercel.app/roommate/all")
      .then((response) => {
        const roommatePostsWithUserDetailsPromises = response.data.map(
          (post) => {
            return axios
              .get(
                `https://roommate-finder-theta.vercel.app/user/${post.userId}`
              )
              .then((userResponse) => {
                const userDetails = userResponse.data;
                return {
                  ...post,
                  userDetails,
                };
              });
          }
        );

        return Promise.all(roommatePostsWithUserDetailsPromises);
      })
      .then((roommatePostsWithUserDetails) => {
        setRoommateList(roommatePostsWithUserDetails);
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("https://roommate-finder-theta.vercel.app/room/all")
      .then((response) => {
        const roomPostsWithUserDetailsPromises = response.data.map((post) => {
          return axios
            .get(`https://roommate-finder-theta.vercel.app/user/${post.userId}`)
            .then((userResponse) => {
              const userDetails = userResponse.data;
              return {
                ...post,
                userDetails,
              };
            });
        });

        return Promise.all(roomPostsWithUserDetailsPromises);
      })
      .then((roomPostsWithUserDetails) => {
        setRoomList(roomPostsWithUserDetails);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setCartItems(getDefaultCart(roomList));
    setCartItems2(getDefaultCart2(roommateList));
  }, [roomList, roommateList]);

  const addToCart = (itemId) => {
    if (cartItems[itemId] === 1) {
      alert("You already selected this person.");
      return;
    }

    setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    setSelectedRoommateCards((prev) => [...prev, itemId]);
  };
  const addToCart2 = (itemId) => {
    if (cartItems2[itemId] === 1) {
      alert("you already selected this room.");
      return;
    }

    setCartItems2((prev) => ({ ...prev, [itemId]: 1 }));
    setSelectedRoomCards((prev) => [...prev, itemId]);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const contextValue = {
    cartItems,
    cartItems2,
    addToCart,
    addToCart2,
    removeFromCart,
    selectedRoommateCards,
    selectedRoomCards,
  };
  console.log(cartItems);
  console.log(cartItems2);

  return (
    <ListingContext.Provider value={contextValue}>
      {props.children}
    </ListingContext.Provider>
  );
};
