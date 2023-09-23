import React, { Component, useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import "./styles.css";
import "../Cards/Cards.css";
import { ListingContext } from "../../Context/listing-context";

function DisplayRoommateCard() {
  const profileData = JSON.parse(localStorage.getItem("profile"));
  const user = useSelector((state) => state.authReducer.authData);
  const [roommatePosts, setRoommatePosts] = useState([]);
  const [roomPosts, setRoomPosts] = useState([]);
  const [filteredRoommatePosts, setFilteredRoommatePosts] = useState([]);
  const [filteredRoomPosts, setFilteredRoomPosts] = useState([]);
  const [following, setFollowing] = useState([]);
  const [likeRoom, setLikeRoom] = useState([]);
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedBlock, setSelectedBlock] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const { addToCart2 } = useContext(ListingContext);
  const { addToCart } = useContext(ListingContext);

  useEffect(() => {
    fetchFollowing();
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

  // Depricated function
  const isFollowing = () => {
    axios
      .get(`http://roommate-finder-theta.vercel.app/user/${user?.user?._id}`)
      .then((response) => {
        const followingUserIds = response.data.map((user) => user.following);
        // setFollowing(followingUserIds);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchFollowing = () => {
    axios
      .get(
        `http://roommate-finder-theta.vercel.app/user/${profileData.user._id}`
      )
      .then((response) => {
        console.log("Profile fetched:", response.data);
        const followingUserIds = response.data.following;
        const likeRoomIds = response.data.likesRoom;
        setFollowing(followingUserIds);
        setLikeRoom(likeRoomIds);
        console.log("Following fetched:", followingUserIds, likeRoomIds);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
    };
    
  const filterByGenderAndBlock = (gender, block, year) => {
    setSelectedGender(gender);
    setSelectedBlock(block);
    setSelectedYear(year);
  };

  useEffect(() => {
    const filterData = () => {
      console.log("Selected Gender:", selectedGender);
      console.log("Selected Block:", selectedBlock);
      console.log("Selected Year:", selectedYear);

      const parseDate = (dateString) => new Date(dateString);

      const filteredRoommateData = roommatePosts.filter((post) => {
        console.log("Post Year:", post.year);
        return (
          (selectedGender === "All" || post.gender === selectedGender) &&
          (selectedBlock === "All" || post.preferredBlock === selectedBlock) &&
          (selectedYear === "All" || post.year === selectedYear)
        );
      })
      .sort((a, b) => parseDate(b.updatedAt) - parseDate(a.updatedAt));

      const filteredRoomData = roomPosts.filter((post) => {
        return (
          (selectedGender === "All" || post.gender === selectedGender) &&
          (selectedBlock === "All" || post.preferredBlock === selectedBlock) &&
          (selectedYear === "All" || post.year === selectedYear)
        );
      })
      .sort((a, b) => parseDate(b.updatedAt) - parseDate(a.updatedAt));

      console.log("Filtered Roommate Data:", filteredRoommateData);
      console.log("Filtered Room Data:", filteredRoomData);
      const combinedData = [...filteredRoommateData, ...filteredRoomData];
      setFilteredRoommatePosts(filteredRoommateData);
      setFilteredRoomPosts(filteredRoomData);
    };

    filterData();
  }, [selectedGender, selectedBlock, selectedYear, roommatePosts, roomPosts]);

    console.log("user data: ", user);
    console.log("user specific data: ", profileData);
      async function followUser(otherUserId) {
        let myUserId = user?.user?._id;
        let requestBody = {
          currentUserId: myUserId,
        };
        try {
          let result = await axios.put(
            `https://roommate-finder-theta.vercel.app/user/${otherUserId}/follow`,
            requestBody
          );
          console.log("result: ", result);
        } catch (err) {
          console.error(err);
        }
      }

      async function RoomLiking(otherRoomId) {
        let myUserId = user?.user?._id;
        let requestBody = {
          roomId: otherRoomId,
        };
        try {
          let result = await axios.put(
            `https://roommate-finder-theta.vercel.app/user/${myUserId}/likesroom`,
            requestBody
          );
          console.log("result: ", result);
        } catch (err) {
          console.error(err);
        }
      }

  return (
    <div className="tabs">
      <Tabs
        filterByGenderAndBlock={filterByGenderAndBlock}
        selectedGender={selectedGender}
        selectedBlock={selectedBlock}
        selectedYear={selectedYear}
      >
        <Tab label="Tab 1">
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
                            {" "}
                            {post.userDetails.firstname ?? "Null_Fname"}{" "}
                            {post.userDetails.lastname ?? "Null_Lname"}
                          </div>
                          <div className="card-add" onClick={() => followUser(post.userId)}>
                          {following.includes(post.userId) ? (
                              <img
                              src="./image/tick-icon.png"
                              alt=""
                              style={{ height: "24px", width: "24px" }}
                              />
                          ) : (
                              <img
                                src="./image/add-icon.png"
                                alt=""
                                style={{ height: "24px", width: "24px" }}
                              />
                          )}
                          </div>
                        </div>
                        <div className="card-preference">
                          <div className="card-rank">
                            <div className="card-preference-title">Rank</div>
                            <div className="card-preference-content">
                              {" "}
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
                              {" "}
                              {post.preferredBed}
                            </div>
                          </div>
                        </div>
                        <div className="card-downers">
                          <div className="card-year">
                            <div className="card-preference-title">Year</div>
                            <div className="card-preference-Year">
                              {post.year}
                            </div>
                          </div>
                          <div className="card-gender">
                            <div className="card-preference-title">Gender</div>
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
                      <div className="card-habit"></div>
                    </div>
                  </div>
                </span>
              </div>
            ))}
          </div>
        </Tab>
        <Tab label="Tab 2">
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
                          <div className="card-name">{post.preferredBlock} Block</div>
                          <div className="card-add" onClick={() => RoomLiking(post._id)}>
                          {likeRoom.includes(post._id) ? (
                              <img
                              src="./image/tick-icon.png"
                              alt=""
                              style={{ height: "24px", width: "24px" }}
                              />
                          ) : (
                              <img
                                src="./image/add-icon.png"
                                alt=""
                                style={{ height: "24px", width: "24px" }}
                              />
                          )}
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
                            <div className="card-preference-Year">
                              {post.year}
                            </div>
                          </div>
                          <div className="card-gender">
                            <div className="card-preference-title">Gender</div>
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
                      <div className="card-habit"></div>
                    </div>
                  </div>
                </span>
              </div>
            ))}
          </div>
        </Tab>
      </Tabs>
    </div>
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
    const { selectedYear } = this.props;

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
          selectedYear={selectedYear}
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
  selectedYear,
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
          <select
              onChange={(e) =>
                filterByGenderAndBlock(selectedGender, selectedBlock, e.target.value)
              }
            >
              <option hidden value="Year">
                Year
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="All">All</option>
            </select>
          </div>
          <div className="custom-select">
            <select
              onChange={(e) =>
                filterByGenderAndBlock(selectedGender, e.target.value, selectedYear)
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
                filterByGenderAndBlock(e.target.value, selectedBlock, selectedYear)
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
