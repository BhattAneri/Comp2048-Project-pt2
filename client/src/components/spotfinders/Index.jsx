import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Index = function ({user}) {

  const [spotfinders, setSpotfinders] = useState([]);

  useEffect(() => {
    (async () => {
      await getSpotfinders();
    })();
  }, []);

  const getSpotfinders = async () => {
    const spotfindersResp = await Axios.get('/api/spotfinders');
    if (spotfindersResp.status === 200) setSpotfinders(spotfindersResp.data);
  };

  const deleteSpotfinder = async blog => {
    try {
      const resp = await Axios.post('/api/spotfinders/delete', {
        id: spotfinders._id
      });

      if (resp.status === 200) toast("The vacation spot was deleted successfully", {type: toast.TYPE.SUCCESS});

      await getSpotfinders();
    } catch (error) {
      toast("There was an error deleting the spot", {type: toast.TYPE.ERROR});
    }
  };

  return (
    <Container className="my-5">
      <header>
        <h1>My Vacation Spots</h1>
      </header>

      <hr/>

      <div className="content">
        {spotfinders && spotfinders.map((blog, i) => (
          <div key={i} className="card my-3">
            <div className="card-header clearfix">
              <div className="float-left">
                <h5 className="card-title">
                  {spotfinders.destination}
                </h5>

                {spotfinders.user ? (
                  <small>~{spotfinders.user.fullname}</small>
                ) : null}
              </div>
                  
              <div className="float-right">
                <small>{spotfinders.updatedAt}</small>
              </div>
            </div>

            <div className="card-body">
              <p className="card-text">
                {spotfinders.synopsis}
              </p>
            </div>

            {user ? (
              <div className="card-footer">
                <Link to={{
                  pathname: "/spotfinders/edit",
                  state: {
                    id: spotfinders._id
                  }
                }}>
                  <i className="fa fa-edit"></i>
                </Link>

                <button type="button" onClick={() => deleteSpotfinder(spotfinders)}>
                  <i className="fa fa-trash"></i>
                </button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </Container>
  );

};

export default Index;