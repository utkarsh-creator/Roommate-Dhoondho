import { useContext } from "react";
import { ListingContext } from "../../Context/listing-context";
import "./Modal.css";

function Modal() {
  const { seletedroommatephone, seletedroommatedetail, closeModal } =
    useContext(ListingContext);
  console.log(seletedroommatedetail);
  return (
    <aside className="modal-overlay">
      <div className="modal-container">
        <div className="habits">
          <div className="habitstab-main">
            <div className="habits-buttons">
              <div className="activehabits">
                <p className="habits-text"> Description</p>
              </div>
            </div>
            <div className="habitstab-hr">
              <hr />
            </div>
          </div>
          <div className="habitssection">
            <p>
              <b>Phone Number:</b> {seletedroommatephone}
            </p>
            <p>{seletedroommatedetail}</p>
          </div>
          <button
            onClick={closeModal}
            className="mx-auto bg-[#06105A] px-[0.75rem] py-[0.1rem] text-white rounded-[4px] self-start disabled:hover:cursor-not-allowed"
          >
            close
          </button>
        </div>
      </div>
    </aside>
  );
}
export default Modal;
