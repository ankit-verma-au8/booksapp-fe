import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { addComment } from "../redux/actions/Commentactions";
import { increaseComment } from "../redux/actions/Postactions";
import Commentitem from "./Commentitem";

const Comments = ({
  user,
  addComment,
  postid,
  commentsArray,
  increaseComment,
  socketId,
}) => {
  const [comment, setComment] = useState("");
  const handlecommentchange = (e) => {
    setComment(e.target.value);
  };
  const handleClickcomment = (e) => {
    addComment({ postId: postid, commentText: comment, socketId });
    setComment("");
    increaseComment(postid);
  };

  return (
    <div class="coment-bottom bg-white p-2 px-4">
      <div class="d-flex flex-row add-comment-section mt-4 mb-4">
        <img
          class="img-fluid img-responsive rounded-circle mr-2"
          alt=""
          src={user.imagelink}
          width="38"
        />
        <input
          value={comment}
          onChange={handlecommentchange}
          style={{ height: "40px", fontSize: "18px" }}
          type="text"
          class="form-control shadow-none mr-3"
          placeholder="Add comment"
        />
        <Button
          style={{
            padding: "3px 5px",
            color: "white",
            backgroundColor: "#4064AC",
            border: "2px solid blue",
            fontWeight: "800",
            fontSize: "1rem",
          }}
          onClick={handleClickcomment}
          className="dropdown"
          color="primary"
        >
          Comment
        </Button>
      </div>
      {commentsArray ? (
        commentsArray.map((comment) => {
          return <Commentitem key={comment._id} comment={comment} />;
        })
      ) : (
        <div style={{ position: "relative", left: "40%" }} class="lds-heart">
          <div></div>
        </div>
      )}
    </div>
  );
};

const mapStatetoprops = (storeData) => {
  return {
    user: storeData.userState.user,
    socketId: storeData.userState.socketId,
    commentsArray: storeData.commentState.comments,
  };
};

export default connect(mapStatetoprops, { addComment, increaseComment })(
  Comments
);
