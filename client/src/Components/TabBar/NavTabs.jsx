import React, { Component, useEffect, useState, useContext } from "react";
import axios from "axios";
import "./styles.css";
import "../Cards/Cards.css";
import { ListingContext } from "../../Context/listing-context";
import Modal from "../../Components/Modal/Modal";
import Modal2 from "../Modal/Modal2";

function DisplayRoommateCard() {
  const [roommatePosts, setRoommatePosts] = useState([]);
  const [roomPosts, setRoomPosts] = useState([]);
  const [filteredRoommatePosts, setFilteredRoommatePosts] = useState([]);
  const [filteredRoomPosts, setFilteredRoomPosts] = useState([]);
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedBlock, setSelectedBlock] = useState("All");
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
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const filterByGenderAndBlock = (gender, block) => {
    setSelectedGender(gender);
    setSelectedBlock(block);
  };

  useEffect(() => {
    const filterData = () => {
      console.log("Selected Gender:", selectedGender);
      console.log("Selected Block:", selectedBlock);

      const filteredRoommateData = roommatePosts.filter((post) => {
        return (
          (selectedGender === "All" || post.gender === selectedGender) &&
          (selectedBlock === "All" || post.preferredBlock === selectedBlock)
        );
      });

      const filteredRoomData = roomPosts.filter((post) => {
        return (
          (selectedGender === "All" || post.gender === selectedGender) &&
          (selectedBlock === "All" || post.preferredBlock === selectedBlock)
        );
      });

      console.log("Filtered Roommate Data:", filteredRoommateData);
      console.log("Filtered Room Data:", filteredRoomData);
      const combinedData = [...filteredRoommateData, ...filteredRoomData];
      setFilteredRoommatePosts(filteredRoommateData);
      setFilteredRoomPosts(filteredRoomData);
    };

    filterData();
  }, [selectedGender, selectedBlock, roommatePosts, roomPosts]);

  return (
    <>
      <div className="tabs">
        <Tabs
          filterByGenderAndBlock={filterByGenderAndBlock}
          selectedGender={selectedGender}
          selectedBlock={selectedBlock}
        >
          <Tab label="Tab 1">
            {showModal && <Modal />}
            <div className="cards">
              {(filteredRoommatePosts.length >= 0
                ? filteredRoommatePosts
                : roommatePosts
              ).map((post) => (
                <div className="each-card" key={post.id}>
                  <span className="cards">
                    <div className="main-card">
                      <div className="card-details">
                        <div className="card-img"></div>
                        <div className="card-info">
                          <div className="card-informatios">
                            <div className="card-name">
                              {post.userDetails.firstname ?? "Null_Fname"}{" "}
                              {post.userDetails.lastname ?? "Null_Lname"}
                            </div>
                            <div
                              className="card-add"
                              onClick={() => addToCart(post._id)}
                            >
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
                                {post.rank}
                              </div>
                            </div>
                            <div className="card-block">
                              <div className="card-preference-title">
                                Prefered Block
                              </div>
                              <div className="card-preference-content">
                                {post.preferredBlock}
                              </div>
                            </div>
                            <div className="card-bed">
                              <div className="card-preference-title">
                                Prefered Bed Type
                              </div>
                              <div className="card-preference-content">
                                {post.preferredBed}
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
                                {post.gender}
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
                          onClick={() => selectRoommateDetail(post.desc)}
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
          </Tab>
          <Tab label="Tab 2">
            {showModal2 && <Modal2 />}
            <div className="cards">
              {(filteredRoomPosts.length >= 0
                ? filteredRoomPosts
                : roomPosts
              ).map((post) => (
                <div div className="each-card" key={post.id}>
                  <span className="cards">
                    <div className="main-card">
                      <div className="card-details">
                        <div className="card-img"></div>
                        <div className="card-info">
                          <div className="card-informatios">
                            <div className="card-name">
                              {post.preferredBlock}
                            </div>
                            <div
                              className="card-add"
                              onClick={() => addToCart2(post._id)}
                            >
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
                                {post.rank}
                              </div>
                            </div>
                            <div className="card-block">
                              <div className="card-preference-title">
                                Prefered Bed
                              </div>
                              <div className="card-preference-content">
                                {post.preferredBed}
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
                                {post.gender}
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
                          onClick={() => selectRoomDetail(post.desc)}
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
          </Tab>
        </Tabs>
      </div>
    </>
  );
}

class Tabs extends Component {
  state = {
    activeTab: this.props.children[0].props.label,
  };

  changeTab = (tab) => {
    this.setState({ activeTab: tab });
  };

  render() {
    let content;
    let buttons = [];
    const { gender_sorting } = this.props;
    const { filterByGenderAndBlock } = this.props;
    const { selectedGender } = this.props;
    const { selectedBlock } = this.props;

    return (
      <div>
        {React.Children.map(this.props.children, (child) => {
          buttons.push(child.props.label);
          if (child.props.label === this.state.activeTab)
            content = child.props.children;
        })}

        <TabButtons
          activeTab={this.state.activeTab}
          buttons={buttons}
          changeTab={this.changeTab}
          genderSorting={gender_sorting}
          filterByGenderAndBlock={filterByGenderAndBlock}
          selectedGender={selectedGender}
          selectedBlock={selectedBlock}
        />
        <div className="tab-content">{content}</div>
      </div>
    );
  }
}

const TabButtons = ({
  buttons,
  changeTab,
  activeTab,
  selectedGender,
  selectedBlock,
  filterByGenderAndBlock,
}) => {
  return (
    <div className="navtab-main">
      <div className="tab-buttons">
        {buttons.map((button) => {
          return (
            <button
              className={button === activeTab ? "active" : "nonactive"}
              onClick={() => changeTab(button)}
            >
              {button === activeTab ? (
                <React.Fragment>
                  {button === "Tab 1" ? (
                    <span className="tab-elements">
                      <div className="roomate-icon">
                        <img src="./image/roommatesicon.png" alt="" />
                        <div className="tab-text">Roommates</div>
                      </div>
                    </span>
                  ) : (
                    <span className="tab-elements">
                      <div className="roomate-icon">
                        <img src="./image/bed2.png" alt="" />
                        <div className="tab-text">Rooms</div>
                      </div>
                    </span>
                  )}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {button === "Tab 1" ? (
                    <span className="tab-elements">
                      <div className="roomate-icon">
                        <img src="./image/roommatesicon2.png" alt="" />
                      </div>
                      <div className="tab-text">Roommates</div>
                    </span>
                  ) : (
                    <span className="tab-elements">
                      <div className="roomate-icon">
                        <img src="./image/bed.png" alt="" />
                      </div>
                      <div className="tab-text">Rooms</div>
                    </span>
                  )}
                </React.Fragment>
              )}
            </button>
          );
        })}
        <div className="tab-dropdownbuttons">
          <div className="custom-select">
            <select>
              <option hidden value="Year">
                Year
              </option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
              <option value="2025">2025</option>
              <option value="2026">2026</option>
              <option value="2027">2027</option>
              <option value="AllYear">All</option>
            </select>
          </div>
          <div className="custom-select">
            <select
              onChange={(e) =>
                filterByGenderAndBlock(selectedGender, e.target.value)
              }
            >
              <option hidden value="Block">
                Block
              </option>
              <option value="A">A-Block</option>
              <option value="B">B-Block</option>
              <option value="C">C-Block</option>
              <option value="D">D-Block</option>
              <option value="E">E-Block</option>
              <option value="F">F-Block</option>
              <option value="G">G-Block</option>
              <option value="H">H-Block</option>
              <option value="I">I-Block</option>
              <option value="J">J-Block</option>
              <option value="K">K-Block</option>
              <option value="L">L-Block</option>
              <option value="M">M-Block</option>
              <option value="N">N-Block</option>
              <option value="P">P-Block</option>
              <option value="Q">Q-Block</option>
              <option value="R">R-Block</option>
              <option value="All">All</option>
            </select>
          </div>
          <div className="custom-select-2">
            <select
              onChange={(e) =>
                filterByGenderAndBlock(e.target.value, selectedBlock)
              }
            >
              <option hidden value="Gender">
                Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="All">All</option>
            </select>
          </div>
        </div>
      </div>
      <div className="navtab-hr">
        <hr />
      </div>
    </div>
  );
};

const Tab = (props) => {
  return <React.Fragment>{props.children}</React.Fragment>;
};

export default DisplayRoommateCard;
