import React from 'react';
import { MDBContainer, MDBCard, MDBCardBody  } from 'mdb-react-ui-kit';
import Card from 'react-bootstrap/Card';
import { VscUnlock } from 'react-icons/vsc';

function App() {
  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center vh-100'>
      <MDBCard className='card-container'>     
          <MDBCardBody>
            <ul className='background'>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
            <div className='login-form'>
              <Card>
                <Card.Body style={{ width: '600px' }}>
                  <div className="login-container">
                    <h5 className="login-heading">
                      <strong>
                        <VscUnlock className="login-icon" />
                      </strong>
                    </h5>
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
                      <defs>
                        <linearGradient id="gradient" gradientTransform="rotate(90)">
                          <stop offset="0%" stopColor="#0851a6" />
                          <stop offset="100%" stopColor="#021b79" />
                        </linearGradient>
                        <mask id="gradient-mask">
                          <rect className="gradient-rect" x="0" y="0" width="100%" height="100%" />
                        </mask>
                      </defs>
                    </svg>
                  </div>
                  <h5 style={{ textAlign: 'center' }}><strong>Login</strong></h5>
                  <div className='mt-4'>
                    <input type="text" placeholder="Username" className="form-control"
                    />
                  </div>
                  <div className='mt-4'>
                    <input type="password" placeholder='Password' className="form-control"
                    />
                  </div>
                  <div className='login-button' style={{ textAlign: 'center' }}>
                    <button class="login-button2" >Submit</button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </MDBCardBody>  
      </MDBCard>
    </MDBContainer>
  );
}

export default App;
