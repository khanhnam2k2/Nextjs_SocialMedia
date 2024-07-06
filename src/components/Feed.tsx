import React from "react";
import Post from "./Post";

const Feed = () => {
  return (
    <div className=" flex flex-col gap-12">
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Feed;
