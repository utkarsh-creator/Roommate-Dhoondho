import React, { useContext } from "react";
import { ListingContext } from "../../Context/listing-context";

const LazyLoadedRoommateCards = ({
  filteredRoommatePosts,
  roommatePosts,
  selectRoommateDetail,
}) => {
  const { cartItems, addToCart } = useContext(ListingContext);
  return (
    <>
      {(filteredRoommatePosts.length >= 0
        ? filteredRoommatePosts
        : roommatePosts
      ).map((post) => (
        <div loading="lazy" className="each-card" key={post.id}>
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
                    {cartItems[post._id] !== 1 && (
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
                    )}
                  </div>
                  <div className="card-preference">
                    <div className="card-rank">
                      <div className="card-preference-title">Rank</div>
                      <div className="card-preference-content">{post.rank}</div>
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
    </>
  );
};

export default LazyLoadedRoommateCards;
