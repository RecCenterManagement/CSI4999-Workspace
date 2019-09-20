import './footer.scss';
import React from 'react';
import { Translate } from 'react-jhipster';
import { Col, Row } from 'reactstrap';
import { MDBCol, MDBContainer, MDBRow, MDBFooter, MDBBtn, MDBIcon } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const Footer = props => (
  <MDBFooter color="elegant-color-dark" className="page-footer font-small pt-0">
    <div style={{ backgroundColor: '#8e774d' }}>
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow className="py-4 d-flex align-items-center">
          <MDBCol md="6" lg="5" className="text-center text-md-left mb-4 mb-md-0">
            <img src="" className="img-fluid" alt="" />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
    <MDBContainer className="mt-5 mb-4 text-center text-md-left">
      <MDBRow className="mt-3">
        <MDBCol md="3" lg="4" xl="3" className="mb-4">
          <h6 className="text-uppercase font-weight-bold">
            <strong>Recreation Center</strong>
          </h6>
          <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px' }} />
          <p>
            The Mission of University Recreation and Well-Being is to offer programs, services and facilities that foster student
            development, create a connection to Oakland University and motivate our community toward a life-long commitment of well-being.
          </p>
        </MDBCol>
        <MDBCol md="2" lg="2" xl="2" className="mb-4">
          <h6 className="text-uppercase font-weight-bold">
            <strong>Academics</strong>
          </h6>
          <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px' }} />
          <p>
            <a href="#!">Arts and Sciences</a>
          </p>
          <p>
            <a href="#!">Business Administration</a>
          </p>
          <p>
            <a href="#!">Education and Human Services</a>
          </p>
          <p>
            <a href="#!">Engineering and Computer Science</a>
          </p>
          <p>
            <a href="#!">Health Sciences</a>
          </p>
          <p>
            <a href="#!">Nursing</a>
          </p>
          <p>
            <a href="#!">OUWB School of Medicine</a>
          </p>
          <p>
            <a href="#!">Graduate School</a>
          </p>
          <p>
            <a href="#!">Honors College</a>
          </p>
          <p>
            <a href="#!">Integrative Studies</a>
          </p>
        </MDBCol>
        <MDBCol md="3" lg="2" xl="2" className="mb-4">
          <h6 className="text-uppercase font-weight-bold">
            <strong>Info For</strong>
          </h6>
          <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px' }} />
          <p>
            <a href="#!">Alumni</a>
          </p>
          <p>
            <a href="#!">Current Students</a>
          </p>
          <p>
            <a href="#!">Donors</a>
          </p>
          <p>
            <a href="#!">Faculty and Staff</a>
          </p>
          <p>
            <a href="#!">Future Graduate Students</a>
          </p>
          <p>
            <a href="#!">Future Undergraduate Students</a>
          </p>
          <p>
            <a href="#!">Mission and Vision</a>
          </p>
          <p>
            <a href="#!">Strategic Plan</a>
          </p>
        </MDBCol>
        <MDBCol md="3" lg="2" xl="2" className="mb-4">
          <h6 className="text-uppercase font-weight-bold">
            <strong>Quick Links</strong>
          </h6>
          <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px' }} />
          <p>
            <a href="#!">About OU</a>
          </p>
          <p>
            <a href="#!">Community Engagement</a>
          </p>
          <p>
            <a href="#!">Directory</a>
          </p>
          <p>
            <a href="#!">Diversity, Equity, and Inclusion</a>
          </p>
          <p>
            <a href="#!">Eye Research Institute</a>
          </p>
          <p>
            <a href="#!">Important Dates</a>
          </p>
          <p>
            <a href="#!">Jobs at OU</a>
          </p>
          <p>
            <a href="#!">Macomb-OU Incubator</a>
          </p>
          <p>
            <a href="#!">Macomb Programs</a>
          </p>
          <p>
            <a href="#!">OU INC</a>
          </p>
          <p>
            <a href="#!">University Offices</a>
          </p>
          <p>
            <a href="#!">Webmaster</a>
          </p>
        </MDBCol>
        <MDBCol md="4" lg="3" xl="3" className="mb-4">
          <h6 className="text-uppercase font-weight-bold">
            <strong>Contact</strong>
          </h6>
          <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: '60px' }} />
          <p>
            <i className="fa fa-home mr-3" /> Rochester, MI 48309-4482, US
          </p>
          <p>
            <i className="fa fa-envelope mr-3" /> rec@oakland.edu
          </p>
          <p>
            <i className="fa fa-phone mr-3" /> (248) 370-4REC (4732)
          </p>
          <p>
            <i className="fa fa-print mr-3" /> (248) 370-4889
          </p>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    <div style={{ backgroundColor: '#8e774d' }}>
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow className="py-4 d-flex align-items-center">
          <MDBCol md="6" lg="5" className="text-center text-md-left mb-4 mb-md-0">
            <h6 className="mb-0 white-text">Stay connected with us!</h6>
          </MDBCol>
          <MDBCol md="6" lg="7" className="text-center text-md-right">
            <a className="fb-ic ml-0">
              <i className="fab fa-facebook-f blue-text mr-lg-4" />
            </a>
            <a className="tw-ic">
              <i className="fab fa-twitter light-blue-text mr-lg-4" />
            </a>
            <a className="li-ic">
              <i className="fab fa-linkedin-in white-text mr-lg-4" />
            </a>
            <a className="ins-ic">
              <i className="fab fa-instagram pink-text mr-lg-4" />
            </a>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  </MDBFooter>
);

export default Footer;
