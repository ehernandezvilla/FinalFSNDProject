import React from "react";
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #333;
  color: #fff;
  padding: 15px;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
`;

const FooterText = styled.p`
  margin: 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>© 2023 ehernandezvilla FSND Project. All rights reserved.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
