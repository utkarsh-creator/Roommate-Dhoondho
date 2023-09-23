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
    deleteRoommate = (roommate_id) => {
      const user_Id = this.profileData.user._id;
      const requestBody = {
        userId: user_Id,
      };
  
      axios
        .delete(`https://roommate-finder-theta.vercel.app/roommate/${roommate_id}`, {
          data: requestBody,
        })
        .then((response) => {
          console.log("Roommate deleted:", response);
          this.setState((prevState) => ({
            roommates: prevState.roommates.filter((roommate) => roommate._id !== roommate_id),
          }));
        })
        .catch((error) => {
          console.error("Error deleting roommate:", error);
        });
    };

  render() {
    const { roommates } = this.state;
    return (
      <>
        {roommates.map((roommate) => (
          <div className="each-card" key={roommates.id}>
            <div className="cards">
              <div className="main-card">
                <div className="card-details">
                  <div className="card-img"></div>
                  <div className="card-info">
                    <div className="card-informatios">
                      <div className="card-name">Roommate Details</div>
                      <div className="card-add" onClick={() => this.deleteRoommate(roommate._id)}>
                        <img
                          src="./image/delete-icon.png"
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
            </div>
          </div>
        ))}
      </>
    );
  }
}

export default DisplayRoommateListingCard;
