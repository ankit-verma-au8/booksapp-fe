import React from "react";
import Typewriter from "typewriter-effect";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const Homepage = ({ user }) => {
  return !user ? (
    <div
      className="type_writer"
      style={{
        height: "86vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .typeString("Books are fun!")
            .pauseFor(2000)
            .deleteAll()
            .typeString("Books are life!")
            .pauseFor(2000)
            .deleteAll()
            .typeString("Books are friends!")
            .pauseFor(2000)
            .deleteAll()
            .typeString("They let you travel without moving your feet!")
            .pauseFor(2000)
            .deleteAll()
            .typeString("Register and connect with other readers!")
            .start();
        }}
      />
    </div>
  ) : (
    <Redirect to="/home" />
  );
};
const mapStatetoprops = (storeData) => {
  return {
    user: storeData.userState.user,
  };
};
export default connect(mapStatetoprops)(Homepage);
