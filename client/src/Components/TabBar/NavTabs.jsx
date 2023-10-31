import React, { Component, useEffect, useState, useContext } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./styles.css";
import "../Cards/Cards.css";
import { ListingContext } from "../../Context/listing-context";
import Modal from "../../Components/Modal/Modal";
import Modal2 from "../Modal/Modal2";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

function DisplayRoommateCard() {
  const profileData = JSON.parse(localStorage.getItem("profile"));
  const [isLoading, setIsLoading] = useState(true);
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const user = useSelector((state) => state.authReducer.authData);
  const [roommatePosts, setRoommatePosts] = useState([]);
  const [roomPosts, setRoomPosts] = useState([]);
  const [filteredRoommatePosts, setFilteredRoommatePosts] = useState([]);
  const [filteredRoomPosts, setFilteredRoomPosts] = useState([]);
  const [userGender, setUserGender] = useState([]);
  const [userId, setUserId] = useState([]);
  const [following, setFollowing] = useState([]);
  const [likeRoom, setLikeRoom] = useState([]);
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedBlock, setSelectedBlock] = useState("All");
  const [selectedYear, setSelectedYear] = useState("All");
  const [rankOrder, setSelectedRankOrder] = useState("Increasing");
  const {
    addToCart2,
    addToCart,
    showModal,
    showModal2,
    selectRoommateDetail,
    seletedroommatedetail,
    selectRoomDetail,
    selectRoommatePhone,
    seletedroomdetail,
  } = useContext(ListingContext);
  const getBlockOptions = (userGender) => {
    const menHostels = [
      "A",
      "B",
      "B ANNEX",
      "C",
      "D",
      "D ANNEX",
      "E",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      "M",
      "M ANNEX",
      "N",
      "P",
      "Q",
      "R",
      "All",
    ];
    const womenHostels = ["A", "B", "C", "D", "E", "F", "G", "H", "All"];
    if (userGender === "F") {
      return womenHostels;
    } else {
      return menHostels;
    }
  };

  useEffect(() => {
    const fetchRoommateAndRoomCards = async () => {
      try {
        // Fetch roommate posts in batches
        const roommateResponse = await axios.get(
          "https://roommate-finder-theta.vercel.app/roommate/all"
        );
        const roommatePosts = roommateResponse.data.slice(0, 10);

        // Fetch room posts in batches
        const roomResponse = await axios.get(
          "https://roommate-finder-theta.vercel.app/room/all"
        );
        const roomPosts = roomResponse.data.slice(0, 10);

        const roommatePostsWithUserDetailsPromises = roommatePosts.map(
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
              })
              .catch((error) => {
                // Handle 404 errors here, you can simply ignore the error and return null or any other default value.
                console.log(
                  `Error fetching user details for user ID ${post.userId}:`,
                  error
                );
                return null;
              });
          }
        );

        const roomPostsWithUserDetailsPromises = roomPosts.map((post) => {
          return axios
            .get(`https://roommate-finder-theta.vercel.app/user/${post.userId}`)
            .then((userResponse) => {
              const userDetails = userResponse.data;
              return {
                ...post,
                userDetails,
              };
            })
            .catch((error) => {
              // Handle 404 errors here, you can simply ignore the error and return null or any other default value.
              console.log(
                `Error fetching user details for user ID ${post.userId}:`,
                error
              );
              return null;
            });
        });

        const [roommatePostsWithUserDetails, roomPostsWithUserDetails] =
          await Promise.all([
            Promise.all(roommatePostsWithUserDetailsPromises),
            Promise.all(roomPostsWithUserDetailsPromises),
          ]);

        setRoommatePosts(roommatePostsWithUserDetails);
        setRoomPosts(roomPostsWithUserDetails);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    if (profileData?.user?.gender) {
      fetchFollowing();
      fetchRoommateAndRoomCards();
    } else {
      setIsLoading(false);
      setShowPlaceholder(true);
    }
  }, []);

  const fetchFollowing = () => {
    axios
      .get(
        `https://roommate-finder-theta.vercel.app/user/${profileData.user._id}`
      )
      .then((response) => {
        console.log("Profile fetched:", response.data);
        const followingUserIds = response.data.likesRoommate;
        const likeRoomIds = response.data.likesRoom;
        const userGender = response.data.gender;
        const userId = response.data._id;
        setFollowing(followingUserIds);
        setLikeRoom(likeRoomIds);
        setUserGender(userGender);
        setUserId(userId);
        console.log(
          "Following fetched:",
          followingUserIds,
          likeRoomIds,
          userGender
        );
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      });
  };
  const blockOptions = getBlockOptions(userGender);

  const filterByGenderAndBlock = (gender, block, year, rankOrder) => {
    setSelectedGender(gender);
    setSelectedBlock(block);
    setSelectedYear(year);
    setSelectedRankOrder(rankOrder);
  };

  useEffect(() => {
    const filterData = () => {
      console.log("Selected Gender:", selectedGender);
      console.log("Selected Block:", selectedBlock);
      console.log("Selected Year:", selectedYear);

      const parseDate = (dateString) => new Date(dateString);

      const filteredRoommateData = roommatePosts
        .filter((post) => {
          console.log("Post Year:", post.year);
          return (
            //(selectedGender === "All" || post.gender === selectedGender)
            (selectedGender === userGender || post.gender === userGender) &&
            (selectedBlock === "All" ||
              post.preferredBlock === selectedBlock) &&
            (selectedYear === "All" || post.year === selectedYear)
          );
        })
        .sort((a, b) => parseDate(b.updatedAt) - parseDate(a.updatedAt));

      const filteredRoomData = roomPosts
        .filter((post) => {
          return (
            (selectedGender === userGender || post.gender === userGender) &&
            (selectedBlock === "All" ||
              post.preferredBlock === selectedBlock) &&
            (selectedYear === "All" || post.year === selectedYear)
          );
        })
        .sort((a, b) => parseDate(b.updatedAt) - parseDate(a.updatedAt));

      const sortPostsByRank = (posts) => {
        console.log("Rank Order:", rankOrder);
        return posts.sort((a, b) => {
          if (rankOrder === "Increasing") {
            return a.rank - b.rank;
          } else if (rankOrder === "Decreasing") {
            return b.rank - a.rank;
          }
          return 0;
        });
      };

      const sortedRoommateData = sortPostsByRank(filteredRoommateData);
      const sortedRoomData = sortPostsByRank(filteredRoomData);

      console.log("Filtered Roommate Data:", filteredRoommateData);
      console.log("Filtered Room Data:", filteredRoomData);
      // const combinedData = [...filteredRoommateData, ...filteredRoomData];
      // setFilteredRoommatePosts(filteredRoommateData);
      // setFilteredRoomPosts(filteredRoomData);
      const combinedData = [...sortedRoommateData, ...sortedRoomData];
      setFilteredRoommatePosts(sortedRoommateData);
      setFilteredRoomPosts(sortedRoomData);
    };

    filterData();
  }, [
    selectedGender,
    selectedBlock,
    selectedYear,
    rankOrder,
    roommatePosts,
    roomPosts,
  ]);

  console.log("user data: ", user);
  console.log("user specific data: ", profileData);
  console.log("User Id:", userId);
  console.log("User Gender:", userGender);

  async function likeRoommate(otherUserId) {
    try {
      const usersResponse = await axios.get(
        "https://roommate-finder-theta.vercel.app/roommate/all"
      );

      const otherUserData = usersResponse.data.find(
        (user) => user._id === otherUserId
      );

      if (otherUserData) {
        const otherUserGender = otherUserData.gender;
        const roommateuserId = otherUserData.userId;
        console.log(otherUserGender);
        if (roommateuserId !== userId) {
          if (
            (userGender === "M" && otherUserGender === "M") ||
            (userGender === "F" && otherUserGender === "F")
          ) {
            let myUserId = user?.user?._id;
            let requestBody = {
              roommateId: otherUserId,
            };

            let result = await axios.put(
              `https://roommate-finder-theta.vercel.app/user/${myUserId}/likesRoommate`,
              requestBody
            );

            console.log("result: ", result);

            if (result.status === 200) {
              // Update the check-icon immediately
              const updatedFollowing = [...following];
              if (!updatedFollowing.includes(otherUserId)) {
                updatedFollowing.push(otherUserId);
                setFollowing(updatedFollowing);
              }
            }
          } else {
            alert("Broo.. In VIT we don't have coed hostels.");
          }
        } else {
          alert("You can't select your own post.");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function RoomLiking(otherRoomId) {
    try {
      const roomResponse = await axios.get(
        "https://roommate-finder-theta.vercel.app/room/all"
      );

      const roomDataResponse = roomResponse.data.find(
        (room) => room._id === otherRoomId
      );

      if (roomDataResponse) {
        const roomGender = roomDataResponse.gender;
        const roomuserId = roomDataResponse.userId;
        if (roomuserId !== userId) {
          if (
            (userGender === "M" && roomGender === "M") ||
            (userGender === "F" && roomGender === "F")
          ) {
            let myUserId = user?.user?._id;
            let requestBody = {
              roomId: otherRoomId,
            };

            let result = await axios.put(
              `https://roommate-finder-theta.vercel.app/user/${myUserId}/likesroom`,
              requestBody
            );

            console.log("result: ", result);

            if (result.status === 200) {
              // Update the check-icon immediately
              const updatedLikeRoom = [...likeRoom];
              if (!updatedLikeRoom.includes(otherRoomId)) {
                updatedLikeRoom.push(otherRoomId);
                setLikeRoom(updatedLikeRoom);
              }
            }
          } else {
            alert("Broo.. In VIT we don't have coed hostels.");
          }
        } else {
          alert("You can't select your own post.");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="tabs">
        <Tabs
          filterByGenderAndBlock={filterByGenderAndBlock}
          selectedGender={selectedGender}
          selectedBlock={selectedBlock}
          selectedYear={selectedYear}
          rankOrder={rankOrder}
          blockOptions={blockOptions}
        >
          <Tab label="Tab 1">
            {showModal && <Modal />}
            <div className="cards">
              {isLoading ? (
                <div className="loading-indicator-container">
                  <CircularProgress disableShrink color="primary" size={40} />
                </div>
              ) : showPlaceholder ? (
                <div align="center">
                  <Alert severity="warning">
                    Please complete your profile before using this application.
                  </Alert>
                  <br />
                  <p>
                    If you face any problem, please report to us at
                    <br />
                    mozillavit@gmail.com
                  </p>
                </div>
              ) : (
                (filteredRoommatePosts.length >= 0
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
                              {userGender && (
                                <div
                                  className="card-add"
                                  onClick={() =>
                                    likeRoommate(post._id, post.gender)
                                  }
                                >
                                  {following.includes(post._id) ? (
                                    <img
                                      src="./image/checkbox.png"
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
                              )}
                            </div>
                            <div className="card-preference">
                              <div className="card-rank">
                                <div className="card-preference-title">
                                  Rank
                                </div>
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
                                <div className="card-preference-title">
                                  Year
                                </div>
                                <div className="card-preference-Year">
                                  {post.year}
                                </div>
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
                          <div className="card-habit">
                            For Description - Click on the button:
                          </div>
                          <div
                            className="card-habit-details"
                            onClick={() => {
                              selectRoommateDetail(post.desc);
                              selectRoommatePhone(post.phone);
                            }}
                          >
                            <div className="detail-box">
                              <img
                                src="./image/desc.png"
                                alt=""
                                style={{ height: "18px", width: "18px" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </span>
                  </div>
                ))
              )}
            </div>
          </Tab>
          <Tab label="Tab 2">
            {showModal2 && <Modal2 />}
            <div className="cards">
              {isLoading ? (
                <div className="loading-indicator-container">
                  <CircularProgress disableShrink color="primary" size={40} />
                </div>
              ) : showPlaceholder ? (
                <div align="center">
                  <Alert severity="warning">
                    Please complete your profile before using this application.
                  </Alert>
                  <br />
                  <p>
                    If you face any problem, please report to us at
                    <br />
                    mfc.sdeysocial@dewdata.com
                  </p>
                </div>
              ) : (
                (filteredRoomPosts.length >= 0
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
                                {post.preferredBlock} Block
                              </div>
                              <div
                                className="card-add"
                                onClick={() =>
                                  RoomLiking(post._id, post.gender)
                                }
                              >
                                {likeRoom.includes(post._id) ? (
                                  <img
                                    src="./image/checkbox.png"
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
                                <div className="card-preference-title">
                                  Rank
                                </div>
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
                                  {post.preferredBed}
                                </div>
                              </div>
                            </div>
                            <div className="card-downers2">
                              <div className="card-year">
                                <div className="card-preference-title">
                                  Year
                                </div>
                                <div className="card-preference-Year">
                                  {post.year}
                                </div>
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
                          <div className="card-habit">
                            For Description - Click on the button:
                          </div>
                          <div
                            className="card-habit-details"
                            onClick={() => selectRoomDetail(post.desc)}
                          >
                            <div>
                              <img
                                src="./image/desc.png"
                                alt=""
                                style={{ height: "18px", width: "18px" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </span>
                  </div>
                ))
              )}
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
    const { rankOrder } = this.props;
    const { selectedBlock } = this.props;
    const { selectedYear } = this.props;
    const { blockOptions } = this.props;

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
          rankOrder={rankOrder}
          selectedBlock={selectedBlock}
          selectedYear={selectedYear}
          blockOptions={blockOptions}
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
  rankOrder,
  filterByGenderAndBlock,
  blockOptions,
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
                        <div className="tab-text"> Need Roommates</div>
                      </div>
                    </span>
                  ) : (
                    <span className="tab-elements">
                      <div className="roomate-icon">
                        <img src="./image/bed2.png" alt="" />
                        <div className="tab-text">Need Rooms</div>
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
                      <div className="tab-text"> Need Roommates</div>
                    </span>
                  ) : (
                    <span className="tab-elements">
                      <div className="roomate-icon">
                        <img src="./image/bed.png" alt="" />
                      </div>
                      <div className="tab-text">Need Rooms</div>
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
                filterByGenderAndBlock(
                  selectedGender,
                  selectedBlock,
                  selectedYear,
                  e.target.value
                )
              }
            >
              <option hidden value="Rank">
                Rank
              </option>
              <option value="Increasing">Increasing</option>
              <option value="Decreasing">Decreasing</option>
            </select>
          </div>
          <div className="custom-select">
            <select
              onChange={(e) =>
                filterByGenderAndBlock(
                  selectedGender,
                  selectedBlock,
                  e.target.value,
                  rankOrder
                )
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
                filterByGenderAndBlock(
                  selectedGender,
                  e.target.value,
                  selectedYear,
                  rankOrder
                )
              }
            >
              <option hidden value="Block">
                Block
              </option>
              {blockOptions.map((block) => (
                <option key={block} value={block}>
                  {block}
                </option>
              ))}
            </select>
          </div>
          {/* <div className="custom-select-2">
            <select
              onChange={(e) =>
                filterByGenderAndBlock(
                  e.target.value,
                  selectedBlock,
                  selectedYear
                )
              }
            >
              <option hidden value="Gender">
                Gender
              </option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="All">All</option>
            </select>
          </div> */}
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
