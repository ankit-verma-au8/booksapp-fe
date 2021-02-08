import React from "react";

const Commentitem = ({ comment }) => {
  return (
    <div
      class="commented-section mt-4"
      style={{
        border: "1.5px solid rgb(153, 151, 151)",
        boxShadow: "0 0 3px -1px black",
        padding: "5px",
        borderRadius: "5px",
      }}
    >
      <div class="d-flex flex-row align-items-center commented-user">
        <img
          class="img-fluid img-responsive rounded-circle mr-2"
          alt=""
          src={comment.imagelink}
          width="38"
        />
        <h6 class="mr-2">{comment.name}</h6>
        <span class="dot mb-1"></span>
        <span class="mb-1 ml-2">
          {new Date(comment.createdAt).toLocaleString()}
        </span>
      </div>
      <div class="comment-text-sm ml-5">
        <span>{comment.commentText}</span>
      </div>
    </div>
  );
};

export default Commentitem;
