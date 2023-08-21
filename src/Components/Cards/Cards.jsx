import React, { useState, useEffect } from "react";

import "./Cards.css";
function Cards() {
  return (
    <>
      <span className="cards">
        <div className="main-card">
          <div className="card-details">
            <div className="card-img"></div>
            <div className="card-info">
              <div className="card-informatios">
                <div className="card-name">Harshit P G </div>
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
                  <div className="card-preference-content">0600</div>
                </div>
                <div className="card-block">
                  <div className="card-preference-title">Prefered Block</div>
                  <div className="card-preference-content">B,Q,L,M</div>
                </div>
                <div className="card-bed">
                  <div className="card-preference-title">Prefered Bed Type</div>
                  <div className="card-preference-content">2,3,4,6</div>
                </div>
              </div>
              <div className="card-downers">
                <div className="card-year">
                  <div className="card-preference-title">Year</div>
                  <div className="card-preference-Year">2023</div>
                </div>
                <div className="card-gender">
                  <div className="card-preference-title">Gender</div>
                  <div className="card-preference-Gender">Boy</div>
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
    </>
  );
}
export default Cards;
