import React, { useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import Footer from './Footer';

const FormContainer = styled.div`
  margin-top: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Label = styled.label`
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 5px;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  padding: 5px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: salmon;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
`;

const ErrorMessage = styled.span`
  color: red;
  margin-top: 5px;
`;

const NewPhishingForm = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [domainId, setDomainId] = useState('');
  const [description, setDescription] = useState('');
  const [ip, setIp] = useState('');
  const [isDangerous, setIsDangerous] = useState(false);
  const [phishingUrl, setPhishingUrl] = useState('');
  const [submittedBy, setSubmittedBy] = useState('');
  const [createDate, setCreateDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await getAccessTokenSilently();

      const formattedDate = createDate.replace(/\//g, '-'); // Reemplazar barras (/) por guiones (-) en la fecha

      const response = await axios.post(
        process.env.REACT_APP_PHISHING_URL,
        {
          domain_id: domainId,
          description: description,
          ip: ip,
          is_dangerous: isDangerous,
          phishing_url: phishingUrl,
          submited_by: submittedBy,
          create_date: formattedDate
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('New phishing domain added:', response.data);
      // Limpiar los campos del formulario después de enviar los datos
      setDomainId('');
      setDescription('');
      setIp('');
      setIsDangerous(false);
      setPhishingUrl('');
      setSubmittedBy('');
      setCreateDate('');
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding phishing domain:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('An error occurred while adding the phishing domain. Please check if the domain_id is correct or check /domains');
      }
    }
  };

  return (
    <FormContainer>
      <h2>Add New Phishing Domain</h2>
      <Form onSubmit={handleSubmit}>
        <Label>Domain ID:</Label>
        <Input type="text" value={domainId} onChange={(e) => setDomainId(e.target.value)} />

        <Label>Description:</Label>
        <TextArea value={description} onChange={(e) => setDescription(e.target.value)} />

        <Label>IP:</Label>
        <Input type="text" value={ip} onChange={(e) => setIp(e.target.value)} />

        <Label>Is Dangerous:</Label>
        <input
          type="checkbox"
          checked={isDangerous}
          onChange={(e) => setIsDangerous(e.target.checked)}
        />

        <Label>Phishing URL:</Label>
        <Input type="text" value={phishingUrl} onChange={(e) => setPhishingUrl(e.target.value)} />

        <Label>Submitted By:</Label>
        <Input type="text" value={submittedBy} onChange={(e) => setSubmittedBy(e.target.value)} />

        <Label>Create Date (DD/MM/YYYY):</Label>
        <Input
          type="text"
          pattern="\d{2}/\d{2}/\d{4}"
          value={createDate}
          onChange={(e) => setCreateDate(e.target.value)}
        />

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <Button type="submit">Submit</Button>
      </Form>
      <Footer />
    </FormContainer>
  );
};

export default NewPhishingForm;




