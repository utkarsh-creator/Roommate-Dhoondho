/* eslint-disable array-callback-return */
import React, { useContext } from "react";
import list from "../../data.js";
import list2 from "../../data2.js";
import { ListingContext } from "../../Context/listing-context.jsx";
import Cards from "./Cardsnew.jsx";
import RoomCards from "./RoomCardsnew.jsx";
import "./Selecting.css";

export const Listing = () => {
  const { cartItems } = useContext(ListingContext);
  const { cartItems2 } = useContext(ListingContext);

  return (
    <>
      <div className="listing">
        <div className="listing-buttons">
          <button className="activelisting">
            <p className="listing-text">Your Selections</p>
          </button>
        </div>
        <div className="profiletab-hr">
          <hr />
        </div>
        <div className="tab-content-new">
          <div className="cardsnew">
            {list.map((item) => {
              if (cartItems[item.id] !== 0) {
                return <Cards item={item} key={item.id} />;
              }
            })}
            {list2.map((item) => {
              if (cartItems2[item.id2] !== 0) {
                return <RoomCards item={item} key={item.id2} />;
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};
