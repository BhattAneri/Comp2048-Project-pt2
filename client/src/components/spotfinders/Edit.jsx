import React, { useState, useEffect } from 'react';
import { Form, Container } from 'react-bootstrap';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

const Edit = function (props) {

  const id = props.location.state.id; // found in docs for react router

  const [inputs, setInputs] = useState({
    destination: '',
    holidayBudget: '',
    typeOfVacation: 'Short Vacation'
  });

  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const spotfinderResp = await Axios.get(`/api/spotfinders/${id}`);
      if (spotfinderResp.status === 200) setInputs(spotfinderResp.data);
    })();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      const resp = await Axios.post('/api/spotfinders/update', inputs);

      if (resp.status === 200)  {
        toast("The vacation spot was updated successfully", {
          type: toast.TYPE.SUCCESS
        });
        setRedirect(true);
      } else {
        toast("There was an issue updating the vacation spot", {
          type: toast.TYPE.ERROR
        });
      }
    } catch (error) {
      toast("There was an issue updating the vacation spot", {
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

  if (redirect) return (<Redirect to="/blogs"/>);

  return (
    <Container className="my-5">
      <header>
        <h1>Edit Vacation Spot</h1>
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
            <Form.Label>Holiday Budget:</Form.Label>
            <Form.Control
              as="Number"
              name="holidayBudget"
              onChange={handleInputChange}
              value={inputs.holidayBudget}
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
              <option value="Short Vacation">Short Vacation</option>
              <option value="Long Vacation">Long Vacation</option>
            </Form.Control>
          </Form.Group>

          <Form.Group>
            <button type="submit" className="btn btn-primary">Update</button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );

};

export default Edit;