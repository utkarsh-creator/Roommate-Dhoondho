import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../Cards/Cards.css";
import Modal from "../../Components/Modal/Modal";
import { ListingContext } from "../../Context/listing-context";

function DisplayRoommateListingCard() {
  const [roommates, setRoommates] = useState([]);
  const profileData = JSON.parse(localStorage.getItem("profile"));
  const { showModal, selectRoommateDetail } = useContext(ListingContext);

  useEffect(() => {
    const user_Id = profileData?.user?._id;
    console.log("user_Id recorded:", user_Id);

    if (user_Id) {
      const requestData = {
        userId: user_Id,
      };

      console.log("requestData:", requestData);

      axios
        .post(
          `https://roommate-finder-theta.vercel.app/roommate/my/${user_Id}`,
          requestData
        )
        .then((response) => {
          setRoommates(response.data);
        })
        .catch((error) => {
          console.error("Error fetching roommates:", error);
        });
    }
  }, [profileData]);

  return (
    <>
      {showModal && <Modal />}
      {roommates.map((roommate) => (
        <div className="each-card" key={roommate.id}>
          <span className="cards">
            <div className="main-card">
              <div className="card-details">
                <div className="card-img"></div>
                <div className="card-info">
                  <div className="card-informatios">
                    <div className="card-name">Name</div>
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
                        {roommate.rank}
                      </div>
                    </div>
                    <div className="card-block">
                      <div className="card-preference-title">
                        Prefered Block
                      </div>
                      <div className="card-preference-content">
                        {roommate.preferredBlock}
                      </div>
                    </div>
                    <div className="card-bed">
                      <div className="card-preference-title">
                        Prefered Bed Type
                      </div>
                      <div className="card-preference-content">
                        {roommate.preferredBed}
                      </div>
                    </div>
                  </div>
                  <div className="card-downers">
                    <div className="card-year">
                      <div className="card-preference-title">Year</div>
                      <div className="card-preference-Year">year</div>
                    </div>
                    <div className="card-gender">
                      <div className="card-preference-title">Gender</div>
                      <div className="card-preference-Gender">
                        {roommate.gender}
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
                  onClick={() => selectRoommateDetail(roommate.desc)}
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
    </>
  );
}

export default DisplayRoommateListingCard;
