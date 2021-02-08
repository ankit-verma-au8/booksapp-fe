import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Postitem from "./Postitem";
import Postbox from "./Postbox";
import "../styles/Postpage.css";
import {
  getallPosts,
  increaseLike,
  decreaseLike,
  increaseComment,
} from "../redux/actions/Postactions";
import { setSocketId } from "../redux/actions/userActions";
import Pusher from "pusher-js";
const Postpage = ({
  user,
  getallPosts,
  posts,
  setSocketId,
  increaseLike,
  decreaseLike,
  increaseComment,
  history,
  responsefetching,
}) => {
  useEffect(() => {
    getallPosts(history);
    const pusher = new Pusher(process.env.REACT_APP_PUSHER_API_KEY, {
      cluster: process.env.REACT_APP_PUSHER_CLUSTER,
      encrypted: true,
    });
    var socketId;
    pusher.connection.bind("connected", function () {
      socketId = pusher.connection.socket_id;
      setSocketId(socketId);
    });
    const channel = pusher.subscribe("post-events");
    channel.bind("postAction", function (data) {
      // log message data to console - for debugging purposes
      console.log(data);
      var action = data.action;
      if (action === "like") {
        increaseLike(data.postId);
      } else if (action === "unlike") {
        decreaseLike(data.postId);
      } else if (action === "comment") {
        increaseComment(data.postId);
      }
    });
  }, [getallPosts, setSocketId, increaseLike, decreaseLike, increaseComment]);
  return user ? (
    <div
      style={{
        width: "100%",
        padding: "0px 15px",
        height: "87vh",
        overflow: "auto",
        display: "flex",
        justifyContent: "center",
      }}
      className="row"
    >
      {/* {responsefetching ? (
        <div style={{ position: "absolute", left: "40%" }} class="lds-heart">
          <div></div>
        </div>
      ) : null} */}
      <div className="posts-section col-lg-6 col-md-8 col-sm-10">
        <Postbox />

        {posts
          ? posts.map((element) => {
              return <Postitem key={posts._id} post={element} />;
            })
          : null}
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
};

const mapStatetoprops = (storeData) => {
  return {
    posts: storeData.postState.posts,
    user: storeData.userState.user,
    responsefetching: storeData.postState.isPostfetching,
  };
};
export default connect(mapStatetoprops, {
  getallPosts,
  setSocketId,
  increaseLike,
  decreaseLike,
  increaseComment,
})(Postpage);
