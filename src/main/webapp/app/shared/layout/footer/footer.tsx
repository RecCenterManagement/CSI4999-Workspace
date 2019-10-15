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
            <img src="../../../content/images/Oakland_University_logo.png" width="200" className="img-fluid" alt="" />
          </MDBCol>
          <MDBCol md="6" lg="6" className="text-center text-md-left">
            <a href="tel:248-370-2100">
              <i className="fa fa-phone mr-3" /> (248) 370-2100&emsp; | &emsp;&emsp;
            </a>
            <a href="https://oupolice.com/addresses/lookup/">
              <i className="fa fa-home mr-3" />
              Address Lookup&emsp; | &emsp;&emsp;
            </a>
            <a href="https://map.concept3d.com/?id=566#!ct/6600,5468,0,43591,43593,43596,43598,43643">
              <i className="fa fa-map mr-3" />
              Campus Map&emsp; | &emsp;&emsp;
            </a>
            <a href="https://www.oakland.edu/contact-ou/">
              <i className="fa fa-mail-bulk mr-3" />
              Contact OU
            </a>
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
          <hr className="brown accent-3 mb-4 mt-0 d-inline-block mx-auto" style={{ width: '160px' }} />
          <p>
            The Mission of University Recreation and Well-Being is to offer programs, services and facilities that foster student
            development, create a connection to Oakland University and motivate our community toward a life-long commitment of well-being.
          </p>
          <h6 className="text-uppercase font-weight-bold">
            <strong>Contact OU Rec Center</strong>
          </h6>
          <hr className="brown accent-3 mb-4 mt-0 d-inline-block mx-auto" style={{ width: '200px' }} />
          <p>
            <a href="https://www.google.com/maps/place/569+Pioneer+Dr,+Rochester,+MI+48309/">
              <i className="fa fa-home mr-3" /> 569 Pioneer Drive <br />
              &emsp;&emsp;&ensp;Rochester, MI 48309-4482, US
            </a>
          </p>
          <p>
            <a href="mailto:rec@oakland.edu">
              <i className="fa fa-envelope mr-3" /> rec@oakland.edu
            </a>
          </p>
          <p>
            <a href="tel:248-370-4732">
              <i className="fa fa-phone mr-3" /> (248) 370-4REC (4732)
            </a>
          </p>
          <p>
            <a href="#!">
              <i className="fa fa-fax mr-3" /> (248) 370-4889
            </a>
          </p>
        </MDBCol>
        <MDBCol md="3" lg="2" xl="2" className="mb-4">
          <h6 className="text-uppercase font-weight-bold">
            <strong>Academics</strong>
          </h6>
          <hr className="brown accent-3 mb-4 mt-0 d-inline-block mx-auto" style={{ width: '90px' }} />
          <p>
            <a href="https://www.oakland.edu/cas/">Arts and Sciences</a>
          </p>
          <p>
            <a href="https://www.oakland.edu/business/">Business Administration</a>
          </p>
          <p>
            <a href="https://www.oakland.edu/sehs/">Education and Human Services</a>
          </p>
          <p>
            <a href="https://www.oakland.edu/secs/">Engineering and Computer Science</a>
          </p>
          <p>
            <a href="https://www.oakland.edu/grad/">Graduate School</a>
          </p>
          <p>
            <a href="https://www.oakland.edu/shs/">Health Sciences</a>
          </p>
          <p>
            <a href="https://www.oakland.edu/hc/">Honors College</a>
          </p>
          <p>
            <a href="https://www.oakland.edu/bis/">Integrative Studies</a>
          </p>
          <p>
            <a href="https://www.oakland.edu/nursing/">Nursing</a>
          </p>
          <p>
            <a href="https://www.oakland.edu/medicine/">OUWB School of Medicine</a>
          </p>
        </MDBCol>
        <MDBCol md="3" lg="2" xl="2" className="mb-4">
          <h6 className="text-uppercase font-weight-bold">
            <strong>Info For</strong>
          </h6>
          <hr className="brown accent-3 mb-4 mt-0 d-inline-block mx-auto" style={{ width: '75px' }} />
          <p>
            <a href="https://www.oakland.edu/alumni/">Alumni</a>
          </p>
          <p>
            <a href="https://www.oakland.edu/students/">Current Students</a>
          </p>
          <p>
            <a href="https://www.oakland.edu/giving/">Donors</a>
          </p>
          <p>
            <a href="https://www.oakland.edu/faculty-and-staff/">Faculty and Staff</a>
          </p>
          <p>
            <a href="https://www.oakland.edu/grad/">Future Graduate Students</a>
          </p>
          <p>
            <a href="https://www.oakland.edu/futurestudents/">Future Undergraduate Students</a>
          </p>
          <p>
            <a href="https://www.oakland.edu/about/ou-mission-and-vision/">Mission and Vision</a>
          </p>
          <p>
            <a href="https://www.oakland.edu/president/strategic-planning/">Strategic Plan</a>
          </p>
        </MDBCol>
        <MDBCol md="3" lg="2" xl="2" className="mb-4">
          <h6 className="text-uppercase font-weight-bold">
            <strong>Quick Links</strong>
          </h6>
          <hr className="brown accent-3 mb-4 mt-0 d-inline-block mx-auto" style={{ width: '100px' }} />
          <p>
            <a href="https://www.oakland.edu/about/">About OU</a>
          </p>
          <p>
            <a href="https://www.oakland.edu/community/">Community Engagement</a>
          </p>
          <p>
            <a href="https://sail.oakland.edu/PROD/bwpkedir.P_DisplayDirectory">Directory</a>
          </p>
          <p>
            <a href="https://www.oakland.edu/diversity/">Diversity, Equity, and Inclusion</a>
          </p>
          <p>
            <a href="https://www.oakland.edu/eri/">Eye Research Institute</a>
          </p>
          <p>
            <a href="https://www.oakland.edu/registrar/important-dates/">Important Dates</a>
          </p>
          <p>
            <a href="https://jobs.oakland.edu/">Jobs at OU</a>
          </p>
          <p>
            <a href="https://www.oakland.edu/macombouinc/">Macomb-OU Incubator</a>
          </p>
          <p>
            <a href="https://www.oakland.edu/macomb/">Macomb Programs</a>
          </p>
          <p>
            <a href="https://www.oakland.edu/ouinc/">OU INC</a>
          </p>
          <p>
            <a href="https://www.oakland.edu/universityoffices/">University Offices</a>
          </p>
          <p>
            <a href="#!">Webmaster</a>
          </p>
        </MDBCol>
        <MDBCol md="3" lg="2" xl="2" className="mb-4">
          <h6 className="text-uppercase font-weight-bold">
            <strong>Legal</strong>
          </h6>
          <hr className="brown accent-3 mb-4 mt-0 d-inline-block mx-auto" style={{ width: '100px' }} />
          <p>
            <a href="https://oupolice.com/clery/">Campus Safety</a>
          </p>
          <p>
            <a href="https://www.oakland.edu/consumer-information/">Consumer Information</a>
          </p>
          <p>
            <a href="https://www.oakland.edu/policies-regulations/dmca/">DMCA Notice</a>
          </p>
          <p>
            <a href="https://oupolice.com/em/">Emergency Preparedness</a>
          </p>
          <p>
            <a href="https://www.oakland.edu/gdpr/">GDPR Privacy Notice</a>
          </p>
          <p>
            <a href="https://www.oakland.edu/hlc-reaffirmation/">HLC Reaffirmation</a>
          </p>
          <p>
            <a href="https://www.oakland.edu/policies/">Policies and Regulations</a>
          </p>
          <p>
            <a href="https://www.oakland.edu/policies-regulations/web-privacy/">Privacy Statement</a>
          </p>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    <div style={{ backgroundColor: '#8e774d' }}>
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow className="py-4 d-flex align-items-center">
          <MDBCol md="6" lg="5" className="text-center text-md-left mb-4 mb-md-0">
            <h6 className="mb-0 white-text font-weight-bold">Stay connected with us!</h6>
          </MDBCol>
          <MDBCol md="6" lg="7" className="text-center text-md-right">
            &copy; {new Date().getFullYear()} Copyright: <a href="https://www.oakland.edu/"> Oakland University </a>
          </MDBCol>
          <MDBCol md="6" lg="7" className="text-center text-md-right">
            <a className="fb-ic ml-0" href="https://www.facebook.com/ourecwell">
              <i className="fab fa-facebook-f blue-text mr-lg-4" />
            </a>
            <a className="tw-ic" href="https://twitter.com/OURecWell">
              <i className="fab fa-twitter light-blue-text mr-lg-4" />
            </a>
            <a className="yt-ic" href="https://www.youtube.com/user/OUCampusRecreation">
              <i className="fab fa-youtube red-text mr-lg-4" />
            </a>
            <a className="ins-ic" href="https://www.instagram.com/ourecwell/">
              <i className="fab fa-instagram pink-text mr-lg-4" />
            </a>
            <a className="wp-ic" href="https://ourecwell.wordpress.com/">
              <i className="fab fa-wordpress black-text mr-lg-4" />
            </a>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  </MDBFooter>
);

export default Footer;
