import React, { lazy } from "react";

const LazyLoadedRoomCards = ({
  filteredRoomPosts,
  roomPosts,
  addToCart,
  addToCart2,
  selectRoomDetail,
}) => {
  return (
    <div className="cards">
      {(filteredRoomPosts.length >= 0 ? filteredRoomPosts : roomPosts).map(
        (post) => (
          <div className="each-card" key={post.id}>
            <span className="cards">
              <div className="main-card">
                <div className="card-details">
                  <div className="card-img"></div>
                  <div className="card-info">
                    <div className="card-informatios">
                      <div className="card-name">{post.preferredBlock}</div>
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
                        <div className="card-preference-title">Remaining</div>
                        <div className="card-preference-content">remaining</div>
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
        )
      )}
    </div>
  );
};

export default LazyLoadedRoomCards;
