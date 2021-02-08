import React, { useState } from "react";
import "../styles/Postbox.css";
import Modal from "./Modal";
import { connect } from "react-redux";
import { toggleModalstate, createPost } from "../redux/actions/Postactions";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";
import utills from "../utils";

const Postbox = ({ toggleModalstate, bookInfo, createPost }) => {
  const [postInput, setPostinput] = useState("");
  const handleclickChoosebook = () => {
    toggleModalstate();
  };
  const handlechangepost = (e) => {
    setPostinput(e.target.value);
  };
  const handleclickPost = () => {
    if (!bookInfo) {
      alert("Please choose book first!");
      return;
    }
    if (postInput.length <= 3) {
      alert("Post must contaiin more than 3 letters!");
      return;
    }
    const bookObj = {
      postText: postInput,
      bookId: bookInfo._id,
      bookTitle: bookInfo.title,
    };
    createPost(bookObj);
    setPostinput("");
  };
  return (
    <div class="contentContainer">
      <Modal />
      <div class="boxContainer">
        <textarea
          value={postInput}
          onChange={handlechangepost}
          className="messageBox"
          id="postMessage"
          placeholder="What are you reading today?"
          style={{ color: "black" }}
        />
        <div className="button-both">
          {!bookInfo ? (
            <Tooltip
              title="Please add the book to which this post is inspired!"
              position="top"
            >
              <button
                onClick={handleclickChoosebook}
                type="button"
                class="bookButton"
                id="submitPost"
              >
                Choose Book
              </button>
            </Tooltip>
          ) : (
            <div
              onClick={handleclickChoosebook}
              style={{ marginRight: "6px" }}
              class="likes book-icon"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-book"
                viewBox="0 0 16 16"
                style={{ marginRight: "5px" }}
              >
                <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
              </svg>
              <Tooltip title={bookInfo.title} position="top">
                <div class="likes-count">
                  {utills.limitDescription(bookInfo.title, 15)}
                </div>
              </Tooltip>
            </div>
          )}

          <button
            onClick={handleclickPost}
            type="button"
            class="postButton"
            id="submitPost"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStatetoprops = (storeData) => {
  return {
    bookInfo: storeData.postState.bookInfo,
  };
};

export default connect(mapStatetoprops, { toggleModalstate, createPost })(
  Postbox
);
