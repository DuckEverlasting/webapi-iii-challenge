import React from "react";

export default function UserList(props) {
  return props.users.map(el => (
    <div>
      <p>{el.name}</p>
    </div>
  ));
}
