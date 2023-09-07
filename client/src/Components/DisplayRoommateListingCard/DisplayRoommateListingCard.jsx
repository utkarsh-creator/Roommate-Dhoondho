import React, { Component } from "react";
import axios from "axios";
import "../Cards/Cards.css";

class DisplayRoommateListingCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roommates: [],
    };

    this.profileData = JSON.parse(localStorage.getItem("profile"));
  }

  componentDidMount() {
    const user_Id = this.profileData.user._id;
    console.log("user_Id recorded:", user_Id);

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
        this.setState({ roommates: response.data });
      })
      .catch((error) => {
        console.error("Error fetching roommates:", error);
      });
  }

  render() {
    const { roommates } = this.state;
    return (
      <div>
        <h2>My Roommates Listing</h2>
        <div className="tab-content-new">
          <div className="cardsnew">
            {roommates.map((roommate) => (
              <span className="cardsnew">
                <div className="main-card">
                  <div className="card-details">
                    <div className="card-img"></div>
                    <div className="card-info">
                      <div className="card-informatios">
                        <div className="card-name">wantedblock</div>
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
                            Prefered Bed
                          </div>
                          <div className="card-preference-content">
                            {roommate.prefbed}
                          </div>
                        </div>
                        <div className="card-bed">
                          <div className="card-preference-title">Remaining</div>
                          <div className="card-preference-content">
                            {roommate.remaining}
                          </div>
                        </div>
                      </div>
                      <div className="card-downers2">
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
                  <diV className="card-hr">
                    <hr />
                  </diV>
                  <div className="card-habits-section">
                    <div className="card-habit"></div>
                  </div>
                </div>
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default DisplayRoommateListingCard;
