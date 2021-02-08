import React, { useState, useEffect } from "react";
import "../styles/Postitem.css";
import utills from "../utils";
import { withRouter } from "react-router-dom";
import {
  checkuserLike,
  addlike,
  removelike,
} from "../redux/actions/Postactions";
import { connect } from "react-redux";
import { getallcomments } from "../redux/actions/Commentactions";
import Comments from "../components/Comments";
import "react-tippy/dist/tippy.css";
import { Tooltip } from "react-tippy";

const Postitem = ({
  post,
  addlike,
  currentuserId,
  removelike,
  socketId,
  getallcomments,
  history,
}) => {
  const {
    userId,
    name,
    postText,
    likes,
    _id,
    comments,
    bookTitle,
    bookId,
    createdAt,
    image,
    likedusers,
  } = post;
  const [state, setState] = useState({
    userId: "632425424625",
    name: "Ankit Verma",
    createdAt: "June 27 | 02:36",
    postText:
      "🔥 If you're tired of using outline styles for secondary buttons, asoft solid background based on the text color can be a greatalternative.",
    likes: 25,
    postId: "fdgsfhsdvfhf",
    liked: false,
    comments: 25,
    bookTitle: "Three mistakes of my life",
    bookId: null,
    isliked: null,
    image:
      "https://pbs.twimg.com/profile_images/1012717264108318722/9lP-d2yM_400x400.jpg",
    commentState: false,
  });
  const handleLike = (e) => {
    setState({ ...state, isliked: true, likes: state.likes + 1 });
    if (!state.isliked) {
      addlike({ postId: e.target.dataset.postid, socketId });
    } else {
      setState({ ...state, isliked: false, likes: state.likes - 1 });
      removelike({ postId: e.target.dataset.postid, socketId });
    }
  };
  const handleComment = (e) => {
    if (!state.commentState) {
      setState({ ...state, commentState: !state.commentState });
      getallcomments({ postId: state.postId });
    } else {
      setState({ ...state, commentState: !state.commentState });
    }
  };
  const handleclickbookdetail = (id) => {
    history.push(`/bookdetail/${id}`);
  };
  useEffect(() => {
    const localTime = new Date(createdAt).toLocaleString();
    let islikedbool;
    if (likedusers.includes(currentuserId)) {
      islikedbool = true;
    } else {
      islikedbool = false;
    }
    setState({
      userId,
      name,
      postText,
      likes,
      postId: _id,
      comments,
      bookTitle,
      bookId,
      createdAt: localTime,
      image,
      isliked: islikedbool,
    });
  }, [
    userId,
    name,
    postText,
    likes,
    _id,
    comments,
    bookTitle,
    bookId,
    createdAt,
    image,
    currentuserId,
    likedusers,
  ]);
  return (
    <div class="tweet-wrap">
      <div class="tweet-header">
        <img src={state.image} alt="" class="avator" />
        <div class="tweet-header-info">
          {state.name} <span>{state.createdAt}</span>
          <p>{state.postText}</p>
        </div>
      </div>

      <div class="tweet-info-counts">
        <div class="likes">
          <svg
            class="feather feather-heart sc-dnqmqq jxshSx"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={state.isliked ? "#FF0000" : " none"}
            stroke={state.isliked ? "#FF0000" : "currentColor"}
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            data-postid={state.postId}
            cursor="pointer"
            onClick={handleLike}
          >
            <path
              data-postid={state.postId}
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
            ></path>
          </svg>
          <div class="likes-count">{state.likes}</div>
        </div>
        <div class="comments">
          <svg
            class="feather feather-message-circle sc-dnqmqq jxshSx"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
            onClick={handleComment}
            data-postid={state.postId}
            cursor="pointer"
          >
            <path
              data-postid={state.postId}
              d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"
            ></path>
          </svg>
          <div onClick={handleComment} class="comment-count">
            {state.comments}
          </div>
        </div>
        <div
          onClick={() => {
            handleclickbookdetail(bookId);
          }}
          class="likes book-icon"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-book"
            viewBox="0 0 16 16"
          >
            <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
          </svg>
          <Tooltip title={state.bookTitle} position="top">
            <div class="likes-count">
              {utills.limitDescription(state.bookTitle, 5)}
            </div>
          </Tooltip>
        </div>
      </div>
      {state.commentState ? <Comments postid={state.postId} /> : null}
    </div>
  );
};

const mapStatetoprops = (storeData) => {
  return {
    currentuserId: storeData.userState.user._id,
    userLiked: storeData.postState,
    socketId: storeData.userState.socketId,
  };
};

export default connect(mapStatetoprops, {
  checkuserLike,
  addlike,
  removelike,
  getallcomments,
})(withRouter(Postitem));
