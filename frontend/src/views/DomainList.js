import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styled from 'styled-components';
import Footer from "./Footer";

const DomainButton = styled.button`
  padding: 10px;
  margin-top: 15px;
`;

const DomainList = () => {
  const [domains, setDomains] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  const { getAccessTokenSilently } = useAuth0();

  const getDomains = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch("http://127.0.0.1:5000/domains", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json();

      if (response.status === 200) {
        setDomains(responseData.domains); // Extraer el array de dominios del objeto de respuesta
        setFetchError(null);
      }
    } catch (error) {
      setFetchError(error.message);
    }
  };

  return (
    <div>
      <DomainButton onClick={getDomains}>Fetch Domains</DomainButton>
      {fetchError && <p>{fetchError}</p>}
      {domains.map((domain, index) => (
        <div key={index}>
          <h2>{domain.domain}</h2>
          <p>{domain.description}</p>
          <p>Create Date: {domain.create_date}</p>
          <p>ID: {domain.id}</p>
          <p>Is Active: {domain.is_active ? 'Active' : 'Inactive'}</p>
          <p>Is Verified: {domain.is_verified ? 'Verified' : 'Not Verified'}</p>
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default DomainList;




