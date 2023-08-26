import React, { Component } from "react";
import Cards from "../Cards/Cards";
import RoomCards from "../Cards/RoomCards";
import "./styles.css";

class NavTabs extends Component {
  render() {
    return (
      <div className="tabs">
        <Tabs>
          <Tab label="Tab 1">
            <div className="tab-content">
              <div className="cards">
                <div className="each-card">
                  <Cards />
                </div>
                <div className="each-card">
                  <Cards />
                </div>
                <div className="each-card">
                  <Cards />
                </div>
                <div className="each-card">
                  <Cards />
                </div>
                <div className="each-card">
                  <Cards />
                </div>
                <div className="each-card">
                  <Cards />
                </div>
                <div className="each-card">
                  <Cards />
                </div>
                <div className="each-card">
                  <Cards />
                </div>
                <div className="each-card">
                  <Cards />
                </div>
                <div className="each-card">
                  <Cards />
                </div>
                <div className="each-card">
                  <Cards />
                </div>
                <div className="each-card">
                  <Cards />
                </div>
                <div className="each-card">
                  <Cards />
                </div>
                <div className="each-card">
                  <Cards />
                </div>
                <div className="each-card">
                  <Cards />
                </div>
              </div>
            </div>
          </Tab>
          <Tab label="Tab 2">
            <div className="tab-content">
              <div className="cards">
                <div className="each-card">
                  <RoomCards />
                </div>
                <div className="each-card">
                  <RoomCards />
                </div>
                <div className="each-card">
                  <RoomCards />
                </div>
                <div className="each-card">
                  <RoomCards />
                </div>
                <div className="each-card">
                  <RoomCards />
                </div>
                <div className="each-card">
                  <RoomCards />
                </div>
                <div className="each-card">
                  <RoomCards />
                </div>
                <div className="each-card">
                  <RoomCards />
                </div>
                <div className="each-card">
                  <RoomCards />
                </div>
                <div className="each-card">
                  <RoomCards />
                </div>
                <div className="each-card">
                  <RoomCards />
                </div>
                <div className="each-card">
                  <RoomCards />
                </div>
                <div className="each-card">
                  <RoomCards />
                </div>
                <div className="each-card">
                  <RoomCards />
                </div>
                <div className="each-card">
                  <RoomCards />
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
                        <img src="./image/bed 2.png" alt="" />
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
          <div class="custom-select">
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
          <div class="custom-select">
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
          <div class="custom-select-2">
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

export default NavTabs;
