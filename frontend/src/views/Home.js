// src/views/Home.js
import React from 'react';
import logo from '../assets/images/logo.jpg';
import icon1 from '../assets/images/icon1.png';
import icon2 from '../assets/images/icon2.png';
import icon3 from '../assets/images/icon3.png';
import icon4 from '../assets/images/icon4.png';
import './Home.css'; // Importamos el archivo de estilos CSS
import Footer from './Footer'; // Importamos el componente Footer
import Articles from './Articles';
import Phishing from './Phishing';
import PhishingSearch from './PhishingSearch';


const Home = () => {
  return (
    <div className="home-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <h1>¡Hey! Welcome to the FSND home project!</h1>
        <p>This is a simple app for registering dangerous (phishing) domains and compare them against their real domains.</p>
        <p><b>You can find the details of endpoints and auth structure in the README file. There's just a few of them considerer for the frontend.</b></p>
        <p>In some cases you'll need to be registered and authorized to use certain endpoints</p>
      </div> 
      <div className="search-container">
      <PhishingSearch />
      </div>
      <h2 className="heading-text">How can we help you?</h2>
      <div className="grid-container">
        <div>
          <img src={icon1} alt="Icon 1" className="icon" />
          <p>
          Phishing is when attackers attempt to trick users into doing 'the wrong thing', such as clicking a bad link that will download malware, or direct them to a dodgy website..
          </p>
        </div>
        <div>
          <img src={icon2} alt="Icon 2" className="icon" />
          <p>
          Most phishing attacks are sent by email. The crook will register a fake domain that mimics a genuine organisation and sends thousands of generic requests. 
The fake domain often involves character substitution, like using ‘r’ and ‘n’ next to each other to create ‘rn’ instead of ‘m’. 
          </p>
        </div>
        <div>
          <img src={icon3} alt="Icon 3" className="icon" />
          <p>
          The recipient might see the word ‘Amazon’ in the sender’s address and assume that it was a genuine email.
There are many ways to spot a phishing email, but as a general rule, you should always check the email address of a message that asks you to click a link or download an attachment. 
          </p>
        </div>
        <div>
          <img src={icon4} alt="Icon 1" className="icon" />
          <p>
          Whaling attacks are even more targeted, taking aim at senior executives. Although the end goal of whaling is the same as any other kind of phishing attack, the technique tends to be a lot subtler. 
Tricks such as fake links and malicious URLs aren’t helpful in this instance, as criminals are attempting to imitate senior staff. 
Whaling emails also commonly use the pretext of a busy CEO who wants an employee to do them a favour.
          </p>
        </div>
      </div>
      <Phishing />
      <Articles />
      <Footer />
      
    </div>
  );
};

export default Home;


    

