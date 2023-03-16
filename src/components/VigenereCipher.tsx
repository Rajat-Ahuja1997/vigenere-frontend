import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

function VigenereForm(): JSX.Element {
  const [basePassword, setBasePassword] = useState('');
  const [key, setKey] = useState('');
  const [password, setPassword] = useState('');

  const handleReset = () => {
    setPassword('');
    setBasePassword('');
    setKey('');
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const url = 'http://localhost:80/vigenere';
    const data = new URLSearchParams();
    data.append('basePassword', basePassword);
    data.append('key', key);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data.toString(),
    })
      .then((response) => response.json())
      .then((data) => setPassword(data))
      .catch((error) => console.log(error));
  };

  return (
    <Container className="d-flex justify-content-center align-items-center text-center" style={{ height: '100vh' }}>
      <Form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '40px', borderRadius: '10px' }}>
        <h2 className="mb-4 text-center" style={{ color: '#2f4f4f' }}>
          Vigenere Cipher
        </h2>
        <Form.Group controlId="formBasicBasePassword" className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter base password"
            value={basePassword}
            onChange={(event) => setBasePassword(event.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicKey" className="mb-4">
          <Form.Control
            type="text"
            placeholder="Enter key"
            value={key}
            onChange={(event) => setKey(event.target.value)}
          />
        </Form.Group>
        {password === '' &&
        <Button variant="primary" type="submit" className="w-100">
          Submit
        </Button>
        }
        {password !== '' &&
        <Button variant="primary" type="submit" className="w-100" onClick={() => handleReset()}>
          Reset
        </Button>
        }
        {password !== '' &&
          <div className='mt-2'>Generated password: {password}</div>
        }
      </Form>
    </Container>
  );
}

export default VigenereForm;
