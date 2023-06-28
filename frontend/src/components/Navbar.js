import React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import styled from 'styled-components';
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

const Nav = styled.nav`
  background-color: #333;
  color: #fff;
  padding: 15px;
  padding-top: 10px;
  font-family: 'Open Sans', sans-serif;
`;

const NavLink = styled(Link)`
  color: #fff;
  margin-right: 15px;
  padding-top: 15px;
  text-decoration: none;

  &:hover {
    color: #ddd;
  }
`;

const Message = styled.span`
  color: #fff;
  margin-right: 15px;
  padding-top: 15px;
`;

const NavBar = () => {
  const { isAuthenticated, user } = useAuth0();

  return (
    <Nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/domains">Domains</NavLink>
      {isAuthenticated ? <Message>Logged in as {user.name}</Message> : <Message>Not logged in</Message>}
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </Nav>
  );
};

export default NavBar;

