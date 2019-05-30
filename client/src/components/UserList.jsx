import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LinkSC = styled(Link)`
  display: block;
`

export default function UserList(props) {
  return props.users.map(el => (
      <LinkSC to={`/users/${el.id}`}>{el.name}</LinkSC>
  ));
}
