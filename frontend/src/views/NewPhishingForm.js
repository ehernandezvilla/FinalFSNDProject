import React, { useState } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import Footer from '../views/Footer';

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

const NewPhishingForm = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [domainId, setDomainId] = useState('');
  const [description, setDescription] = useState('');
  const [ip, setIp] = useState('');
  const [isDangerous, setIsDangerous] = useState(false);
  const [phishingUrl, setPhishingUrl] = useState('');
  const [submittedBy, setSubmittedBy] = useState('');
  const [createDate, setCreateDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await getAccessTokenSilently();

      const response = await axios.post(
        'http://127.0.0.1:5000/phishing',
        {
          domain_id: domainId,
          description: description,
          ip: ip,
          is_dangerous: isDangerous,
          phishing_url: phishingUrl,
          submited_by: submittedBy,
          create_date: createDate
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
    } catch (error) {
      console.error('Error adding phishing domain:', error);
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

        <Label>Create Date:</Label>
        <Input type="text" value={createDate} onChange={(e) => setCreateDate(e.target.value)} />

        <Button type="submit">Submit</Button>
      </Form>
      <Footer />
    </FormContainer>
  );
};

export default NewPhishingForm;
