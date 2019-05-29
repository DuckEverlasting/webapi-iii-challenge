import React from "react";

export default function PostList(props) {
  return props.posts.map(el => (
    <div>
      <p>{el.text}</p>
      <p>{el.user_id}</p>
    </div>
  ));
}
