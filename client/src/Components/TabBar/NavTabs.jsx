import React, { Component } from "react";
import axios from "axios";
import "./styles.css";
import "../Cards/Cards.css";

class DisplayRoommateCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      roommatePosts: [],
      roomPosts: [],
    };
  }

  componentDidMount() {
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
        this.setState({ roommatePosts: roommatePostsWithUserDetails });
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
        this.setState({ roomPosts: roomPostsWithUserDetails });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { roommatePosts, roomPosts } = this.state;
    return (
      <div className="tabs">
        <Tabs>
          <Tab label="Tab 1">
            <div className="cards">
              {roommatePosts.map((post) => (
                <div className="each-card">
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
              <div>
                <div className="roommate-cards">
                  <div className="cards">
                    {roomPosts.map((post) => (
                      <div div className="each-card">
                        <span className="cards">
                          <div className="main-card">
                            <div className="card-details">
                              <div className="card-img"></div>
                              <div className="card-info">
                                <div className="card-informatios">
                                  <div className="card-name">
                                    {post.preferredBlock}
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
                                      remaining
                                    </div>
                                  </div>
                                </div>
                                <div className="card-downers2">
                                  <div className="card-year">
                                    <div className="card-preference-title">
                                      Year
                                    </div>
                                    <div className="card-preference-Year">
                                      year
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
                              <div className="card-habit"></div>
                            </div>
                          </div>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
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
        />
        <div className="tab-content">{content}</div>
      </div>
    );
  }
}

const TabButtons = ({ buttons, changeTab, activeTab }) => {
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
              <option hidden value="0">
                Year
              </option>
              <option value="1">2023</option>
              <option value="2">2024</option>
              <option value="3">2025</option>
              <option value="4">2026</option>
              <option value="5">2027</option>
            </select>
          </div>
          <div className="custom-select">
            <select>
              <option hidden value="0">
                Block
              </option>
              <option value="1">A-Block</option>
              <option value="2">B-Block</option>
              <option value="3">C-Block</option>
              <option value="4">D-Block</option>
              <option value="5">E-Block</option>
              <option value="6">F-Block</option>
              <option value="7">G-Block</option>
              <option value="8">H-Block</option>
              <option value="9">I-Block</option>
              <option value="10">J-Block</option>
              <option value="11">K-Block</option>
              <option value="12">L-Block</option>
              <option value="13">M-Block</option>
              <option value="14">N-Block</option>
              <option value="15">P-Block</option>
              <option value="16">Q-Block</option>
              <option value="17">R-Block</option>
            </select>
          </div>
          <div className="custom-select-2">
            <select>
              <option hidden value="0">
                Gender
              </option>
              <option value="1">Boys</option>
              <option value="2">Girls</option>
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