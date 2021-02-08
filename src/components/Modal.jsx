import React from "react";
import Reactmodal from "react-modal";
import { connect } from "react-redux";
import "../styles/Modal.css";
import Search from "./Searchsuggestion";
import { toggleModalstate } from "../redux/actions/Postactions";

Reactmodal.setAppElement("#root");
const Modal = ({ modalState, toggleModalstate }) => {
  const handleclickModal = () => {
    toggleModalstate();
  };
  return (
    <Reactmodal
      onRequestClose={toggleModalstate}
      style={{
        overlay: { backgroundColor: "rgb(21, 32, 43,0.8)" },
        content: {
          position: "absolute",
          top: "100px",
          left: "60px",
          right: "60px",
          bottom: "100px",
          border: "1px solid #ccc",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          borderRadius: "4px",
          padding: "20px",
        },
      }}
      isOpen={modalState}
    >
      <h2 className="h2">Choose Book</h2>
      <Search />
      <button className="postButton" onClick={handleclickModal}>
        Add Book
      </button>
    </Reactmodal>
  );
};

const mapStatetoprops = (storeData) => {
  return {
    modalState: storeData.postState.modalState,
  };
};

export default connect(mapStatetoprops, { toggleModalstate })(Modal);
