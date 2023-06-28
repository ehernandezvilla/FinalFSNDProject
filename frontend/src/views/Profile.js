// src/views/Profile.js
import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from 'styled-components';
import Footer from "./Footer";

const Avatar = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
`;

const Message = styled.div`
  padding-top: 20px;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  color: #888;
`;

const ProfileContainer = styled.div`
  margin-top: 20px;
`;

const ProfileButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #888;
  cursor: pointer;
`;

const Profile = () => {
  const { isAuthenticated, user, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [showToken, setShowToken] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        const accessToken = await getAccessTokenSilently();
        setToken(accessToken);

        // Parse the token to get the permissions
        const base64Url = accessToken.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const data = JSON.parse(jsonPayload);
        if (data.permissions) {
          setPermissions(data.permissions);
        }
      }
    };
    getToken();
  }, [getAccessTokenSilently, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <Message>
        Please log in to view your profile.
      </Message>
    );
  }

  const handleToggleToken = () => {
    setShowToken(!showToken);
  };

  return (
    <ProfileContainer>
      <Avatar src={user.picture} alt="Profile" />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <h3>Token Data</h3>
      <ProfileButton onClick={handleToggleToken}>
        {showToken ? "Hide JWT" : "Show JWT"}
      </ProfileButton>
      {showToken && <p>{token}</p>}
      <h3>Permissions</h3>
      <ul>
        {permissions.map((permission, index) => (
          <li key={index}>{permission}</li>
        ))}
      </ul>
      <Footer />
    </ProfileContainer>
  );
};

export default Profile;

