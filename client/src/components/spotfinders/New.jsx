import React, { useState } from 'react';
import { Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const New = function () {

  const [inputs, setInputs] = useState({
    title: '',
    content: '',
    status: 'DRAFT'
  });

  const [redirect, setRedirect] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const resp = await Axios.post('/api/spotfinders', inputs);

      if (resp.status === 200)  {
        toast("The vacation spot was created successfully", {
          type: toast.TYPE.SUCCESS
        });
        setRedirect(true);
      } else {
        toast("There was an issue creating the vacation spot", {
          type: toast.TYPE.ERROR
        });
      }
    } catch (error) {
      toast("There was an issue creating the vacation spot", {
        type: toast.TYPE.ERROR
      });
    }
  };

  const handleInputChange = async event => {
    event.persist();

    const { name, value } = event.target;

    setInputs(inputs => ({
      ...inputs,
      [name]: value
    }));
  };

  if (redirect) return (<Redirect to="/spotfinders"/>);

  return (
    <Container className="my-5">
      <header>
        <h1>New Vacation Spot</h1>
      </header>

      <hr/>

      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Destination:</Form.Label>
            <Form.Control
              name="destination"
              onChange={handleInputChange}
              value={inputs.destination}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Type Of Vacation:</Form.Label>
            <Form.Control
              as="select"
              name="typeOfVacation"
              onChange={handleInputChange}
              defaultValue={inputs.typeOfVacation || 'Short Vacation'}
            >
              <option value="Long Vacation">Long Vacation</option>
              <option value="short Vacation">Short Vacation</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Holiday Budget:</Form.Label>
            <Form.Control
              as="textarea"
              name="holidayBudget"
              onChange={handleInputChange}
              value={inputs.holidayBudget}
            />
          </Form.Group>

     

          <Form.Group>
            <button type="submit" className="btn btn-primary">Save</button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );

};

export default New;