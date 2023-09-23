import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ListingContext } from "../../Context/listing-context.jsx";
import "../Cards/Cards.css";
import "./Selecting.css";
import Modal from "../../Components/Modal/Modal";
import Modal2 from "../Modal/Modal2";

export const Listing = () => {
  const { selectedRoommateCards, selectedRoomCards } =
    useContext(ListingContext);
  const {
    addToCart2,
    addToCart,
    showModal,
    showModal2,
    selectRoommateDetail,
    seletedroommatedetail,
    selectRoomDetail,
    seletedroomdetail,
  } = useContext(ListingContext);

  const selectedRoommateCardsExist = Array.isArray(selectedRoommateCards);
  const selectedRoomCardsExist = Array.isArray(selectedRoomCards);

  const [roommatePosts, setRoommatePosts] = useState([]);
  const [roomPosts, setRoomPosts] = useState([]);
  const [matchingRoommateData, setMatchingRoommateData] = useState([]);
  const [matchingRoomData, setMatchingRoomData] = useState([]);
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
        setRoommatePosts(roommatePostsWithUserDetails);

        // Compare the data and store matching data in matchingRoommateData
        const matchingData = roommatePostsWithUserDetails.filter((post) =>
          selectedRoommateCards.includes(post._id)
        );
        setMatchingRoommateData(matchingData);
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
        setRoomPosts(roomPostsWithUserDetails);

        const matchingData2 = roomPostsWithUserDetails.filter((post) =>
          selectedRoomCards.includes(post._id)
        );
        setMatchingRoomData(matchingData2);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log("Selected Roommate Cards:", selectedRoommateCards);
  console.log("Matching Roommate Data:", matchingRoommateData);
  console.log("Selected Room Cards:", selectedRoomCards);
  console.log("Matching Room Data:", matchingRoomData);

  return (
    <div className="listing">
      <div className="listing-buttons">
        <button className="activelisting">
          <p className="listing-text">Your Selections</p>
        </button>
      </div>
      <div className="profiletab-hr">
        <hr />
      </div>
      <div className="tab-content">
        <div>
          {showModal && <Modal />}
          <div className="cards">
            {selectedRoommateCardsExist &&
              matchingRoommateData.map((item) => (
                <div className="each-card" key={item.id}>
                  <span className="cards">
                    <div className="main-card">
                      <div className="card-details">
                        <div className="card-img"></div>
                        <div className="card-info">
                          <div className="card-informatios">
                            <div className="card-name">
                              {item.userDetails.firstname ?? "Null_Fname"}{" "}
                              {item.userDetails.lastname ?? "Null_Lname"}
                            </div>
                            <div className="card-add">
                              <img
                                src="./image/add-icon.png"
                                alt=""
                                style={{ height: "24px", width: "24px" }}
                              />
                            </div>
                          </div>
                          <div className="card-preference">
                            <div className="card-rank">
                              <div className="card-preference-title">Rank</div>
                              <div className="card-preference-content">
                                {" "}
                                {item.rank}
                              </div>
                            </div>
                            <div className="card-block">
                              <div className="card-preference-title">
                                Prefered Block
                              </div>
                              <div className="card-preference-content">
                                {" "}
                                {item.preferredBlock}
                              </div>
                            </div>
                            <div className="card-bed">
                              <div className="card-preference-title">
                                Prefered Bed Type
                              </div>
                              <div className="card-preference-content">
                                {" "}
                                {item.preferredBed}
                              </div>
                            </div>
                          </div>
                          <div className="card-downers">
                            <div className="card-year">
                              <div className="card-preference-title">Year</div>
                              <div className="card-preference-Year">year</div>
                            </div>
                            <div className="card-gender">
                              <div className="card-preference-title">
                                Gender
                              </div>
                              <div className="card-preference-Gender">
                                {" "}
                                {item.gender}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-hr">
                        <hr />
                      </div>
                      <div className="card-habits-section">
                        <div className="card-habit">Habits</div>
                        <div
                          className="card-habit-details"
                          onClick={() => selectRoommateDetail(item.desc)}
                        >
                          <div className="detail-box">
                            <img
                              src="./image/add-icon.png"
                              alt=""
                              style={{ height: "16px", width: "16px" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </span>
                </div>
              ))}

            {showModal2 && <Modal2 />}

            {selectedRoomCardsExist &&
              matchingRoomData.map((item) => (
                <div div className="each-card" key={item.id}>
                  <span className="cards">
                    <div className="main-card">
                      <div className="card-details">
                        <div className="card-img"></div>
                        <div className="card-info">
                          <div className="card-informatios">
                            <div className="card-name">
                              {item.preferredBlock}
                            </div>
                            <div className="card-add">
                              <img
                                src="./image/add-icon.png"
                                alt=""
                                style={{ height: "24px", width: "24px" }}
                              />
                            </div>
                          </div>
                          <div className="card-preference">
                            <div className="card-rank">
                              <div className="card-preference-title">Rank</div>
                              <div className="card-preference-content">
                                {item.rank}
                              </div>
                            </div>
                            <div className="card-block">
                              <div className="card-preference-title">
                                Prefered Bed
                              </div>
                              <div className="card-preference-content">
                                {item.preferredBed}
                              </div>
                            </div>
                            <div className="card-bed">
                              <div className="card-preference-title">
                                Remaining
                              </div>
                              <div className="card-preference-content">
                                remaining
                              </div>
                            </div>
                          </div>
                          <div className="card-downers2">
                            <div className="card-year">
                              <div className="card-preference-title">Year</div>
                              <div className="card-preference-Year">year</div>
                            </div>
                            <div className="card-gender">
                              <div className="card-preference-title">
                                Gender
                              </div>
                              <div className="card-preference-Gender">
                                {item.gender}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-hr">
                        <hr />
                      </div>
                      <div className="card-habits-section">
                        <div className="card-habit">Leader</div>
                        <div
                          className="card-habit-details"
                          onClick={() => selectRoomDetail(item.desc)}
                        >
                          <div className="detail-box">
                            <img
                              src="./image/add-icon.png"
                              alt=""
                              style={{ height: "16px", width: "16px" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
