import './facilities.scss';
import React, { Component, Fragment } from 'react';
import { MDBContainer, MDBRow, MDBTable, MDBTableBody, MDBTableHead, MDBCol } from 'mdbreact';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import 'react-tabs/style/react-tabs.scss';

class Facilities extends Component {
  state = {
    activeItem: '1'
  };

  toggle = tab => e => {
    if (this.state.activeItem !== tab) {
      this.setState({
        activeItem: tab
      });
    }
  };

  render() {
    return (
      <MDBContainer>
        <MDBRow className="mt-3">
          <MDBCol>
            <h6 className="text-uppercase font-weight-bold">
              <strong>Facility Rentals</strong>
            </h6>
            <hr className="black accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: '140px' }} />
          </MDBCol>
          <p>
            All facility rental requests must be submitted via a Facility Request Form. For best consideration, please submit requests at
            least 2 weeks in advance. A roster must be presented for access, or other access arrangements needs to be submitted 1 week prior
            to event or reservation will be in jeopardy of getting cancelled.
            <br />
            <br />
            Recreation & Well-Being staff will determine the viability of all requests. Every effort is made to ensure informal recreational
            space availability to membership.
          </p>
        </MDBRow>
        <Tabs forceRenderTabPanel defaultIndex={0}>
          <TabList>
            <Tab>
              <b>General Facility Rental Info</b>
            </Tab>
            <Tab>
              <b>Aquatic Center</b>
            </Tab>
            <Tab>
              <b>Outdoor Complex</b>
            </Tab>
            <Tab>
              <b>Recreation Center</b>
            </Tab>
            <Tab>
              <b>Fitness Court</b>
            </Tab>
          </TabList>
          <TabPanel>
            <Tabs forceRenderTabPanel>
              <TabList>
                <Tab>Rates</Tab>
                <Tab>OU Department Usage Info</Tab>
                <Tab>OU Student Usage Info</Tab>
                <Tab>External Group Rental Info</Tab>
              </TabList>
              <TabPanel>
                <h6 className="text-uppercase font-weight-bold">
                  <strong>Rate Guidelines</strong>
                </h6>
                <hr className="black accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: '135px' }} />
                <p>
                  <b>OU Departments</b>
                  <ul>
                    <li>
                      <p>
                        There is no facility rental charge to OU Departments for facility usage as long as the activity is university
                        related (business meetings, class, etc) and within posted operational hours.
                      </p>
                    </li>
                    <li>
                      <p>
                        OU Departments requesting space for non-university related activities or space outside normal operational hours will
                        be assessed the internal facility rental rate.
                      </p>
                    </li>
                    <li>
                      <p>Regardless of usage type, set-up and staffing fees, when necessary, will be charged to the department.</p>
                    </li>
                  </ul>
                </p>
                <p>
                  <b>OU Student Organizations</b>
                  <ul>
                    <li>
                      <p>
                        There is no facility rental charge for OU Student Organizations/Club Sports for approved requests that are part of
                        the organization's/club’s normal activity (practice, meeting, etc) for organization/club members.
                      </p>
                    </li>
                    <li>
                      <p>
                        Student Organization/Club Sport members that are not OU students will need to purchase a guest pass to enter
                        facility.
                      </p>
                    </li>
                    <li>
                      <p>
                        Special Events such as tournaments and conferences or any other activity that invites non club members will be
                        treated as ‘non-related’ events and will be assessed the internal facility rental rates.
                      </p>
                    </li>
                    <li>
                      <p>
                        Regardless of usage type, set-up and staffing fees, when necessary, will be charged to the Student Organization/Club
                        Sport.
                      </p>
                    </li>
                  </ul>
                  <p>
                    <b>OU Student Organizations</b>
                    <p>
                      Non-University groups wishing to use an area of the facility may request to do so pending space availability.
                      Appropriate external rental rates apply.
                    </p>
                  </p>
                </p>
                <MDBTable striped>
                  <MDBTableHead color="black" textWhite>
                    <tr>
                      <th>Facility/Room</th>
                      <th>Internal</th>
                      <th>External</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>3 Court Gym</td>
                      <td>$90</td>
                      <td>$180</td>
                    </tr>
                    <tr>
                      <td>Activity Center</td>
                      <td>$28</td>
                      <td>$56</td>
                    </tr>
                    <tr>
                      <td>Aquatic Classroom</td>
                      <td>$23</td>
                      <td>$46</td>
                    </tr>
                    <tr>
                      <td>Basketball or Volleyball Court</td>
                      <td>$30</td>
                      <td>$60</td>
                    </tr>
                    <tr>
                      <td>Conference Room</td>
                      <td>$10</td>
                      <td>$20</td>
                    </tr>
                    <tr>
                      <td>Long Course Pool Lane</td>
                      <td>$15</td>
                      <td>$30</td>
                    </tr>
                    <tr>
                      <td>Short Course Pool Lane</td>
                      <td>$6</td>
                      <td>$12</td>
                    </tr>
                    <tr>
                      <td>Soccer Field</td>
                      <td>$60</td>
                      <td>$130</td>
                    </tr>
                    <tr>
                      <td>Studio 919 (limited use)</td>
                      <td>$35</td>
                      <td>$70</td>
                    </tr>
                    <tr>
                      <td>Tennis Court</td>
                      <td>$7</td>
                      <td>$24</td>
                    </tr>
                    <tr>
                      <td>Wellness Classroom</td>
                      <td>$23</td>
                      <td>$46</td>
                    </tr>
                  </MDBTableBody>
                </MDBTable>
                <MDBTable striped>
                  <MDBTableHead color="black" textWhite>
                    <tr>
                      <th>Setup Fees - FLAT RATES</th>
                      <th />
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>3 Court Gym - Bleachers</td>
                      <td>$10</td>
                    </tr>
                    <tr>
                      <td>3 Court Gym - Flooring</td>
                      <td>$100</td>
                    </tr>
                    <tr>
                      <td>3 Court Gym - Flooring with DCR Tables and/or Chairs</td>
                      <td>$165</td>
                    </tr>
                    <tr>
                      <td>Activity Center</td>
                      <td>$25</td>
                    </tr>
                    <tr>
                      <td>Field Lining</td>
                      <td>$130</td>
                    </tr>
                    <tr>
                      <td>Wellness Classroom</td>
                      <td>$20</td>
                    </tr>
                  </MDBTableBody>
                </MDBTable>
                <MDBTable striped>
                  <MDBTableHead color="black" textWhite>
                    <tr>
                      <th>Staffing Fees - HOURLY</th>
                      <th />
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <td>Custodial</td>
                      <td>$20</td>
                    </tr>
                    <tr>
                      <td>Event Attendant</td>
                      <td>$12.25</td>
                    </tr>
                    <tr>
                      <td>Event Building Manager</td>
                      <td>$13.75</td>
                    </tr>
                    <tr>
                      <td>Field Supervisor</td>
                      <td>$10</td>
                    </tr>
                    <tr>
                      <td>Lifeguard</td>
                      <td>$12.75</td>
                    </tr>
                  </MDBTableBody>
                </MDBTable>
              </TabPanel>
              <TabPanel>
                <ul>
                  <li>
                    <p>
                      There are no facility rental charges to OU Departments for facility usage as long as the activity is university
                      related (business meetings, class, etc) and within posted operational hours.
                    </p>
                  </li>
                  <li>
                    <p>
                      OU Departments requesting space for non-university related activities or space outside normal operational hours will
                      be charged the internal rental rate.
                    </p>
                  </li>
                  <li>
                    <p>Setup/tear-down fees may apply for any activity that requires a setup beyond standard room setup.</p>
                  </li>
                  <li>
                    <p>Staffing fees will be applied for any approved reservations outside normal operational hours.</p>
                  </li>
                  <li>
                    <p>
                      Reservations that contain charges require a department fund number to charge or pre-payment of fees, to confirm
                      reservation.
                    </p>
                  </li>
                </ul>
                <Accordion>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                      Facility Access Guidelines
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <p>
                          <b>General:</b>
                          <ul>
                            <li>
                              <p>Photo ID is required by all participants/spectators.</p>
                            </li>
                            <li>
                              <p>Students need to show OU Student ID.</p>
                            </li>
                            <li>
                              <p>Facility Members need to show OU ID or Campus Recreation Key Fob.</p>
                            </li>
                            <li>
                              <p>
                                Non-Students/Non-Members need to provide Picture ID and be on the sponsoring department supplied roster.
                              </p>
                            </li>
                          </ul>
                        </p>
                        <p>
                          <b>Specific:</b>
                          <ul>
                            <li>
                              <b>Academic Class - </b>
                              <p>
                                Students MUST swipe OU ID to gain access to facility, class Instructors names must be provided to the
                                facility contact in advance, instructors must show OU ID to Welcome Center Staff to gain entry into the
                                facility.
                              </p>
                            </li>
                            <li>
                              <b>OU Departments - </b>
                              <p>
                                Roster of Attendees must be provided to the facility contact 1 week in advance, access limited to those on
                                roster. Attendees must show picture ID to Welcome Center Staff to gain entry into the facility.
                              </p>
                            </li>
                          </ul>
                        </p>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                      Staffing
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        <p>
                          Staffing needs are determined by RecWell Staff based on the activity. General guidelines to assist in planning are
                          as follows:
                        </p>
                        <ul>
                          <li>
                            <p>
                              Events using only one space during normal operational hours and having under 75 participants do not require
                              any staff unless requested beyond the organization reserving the space.
                            </p>
                          </li>
                          <li>
                            <p>
                              Events using only one space outside of normal operational hours and having under 150 participants will require
                              1 RecWell Building Manager and 1 RecWell Event Attendant.
                            </p>
                          </li>
                          <li>
                            <p>
                              Events using more than one space during normal operational hours will require 1 RecWell Event Attendant per 75
                              participants or fraction thereof.
                            </p>
                          </li>
                          <li>
                            <p>
                              Events using more than one space outside of normal operational hours will require 1 RecWell Event Attendant
                              per 75 participants or fraction thereof and 1 RecWell Building Manager. Minimum staffing level is 1 RecWell
                              Building Manager and 1 RecWell Attendant. Note: RecWell Building Manager does count as 1 staff member in the
                              1:75 staffing ratio.
                            </p>
                          </li>
                          <li>
                            <p>RecWell Staffed check-in table is above and beyond the staffing requirements above.</p>
                          </li>
                          <li>
                            <p>Aquatic Center usage requires a minimum of 2 lifeguards.</p>
                          </li>
                        </ul>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </TabPanel>
              <TabPanel>
                <ul>
                  <li>
                    <p>Any OU Student Organization or Club Sport in good standing may request use of an area in the facility.</p>
                  </li>
                  <li>
                    <p>
                      There are no facility rental charges for OU Student Organization/Club Sports for approved requests that are part of
                      the organization/club’s normal activity (practice, meeting, etc).
                    </p>
                  </li>
                  <li>
                    <p>OU Departments requesting space outside normal operational hours will be charged the internal rental rate.</p>
                  </li>
                  <li>
                    <p>
                      Special Events such as tournaments and conferences or any other activity that invites non club members will be treated
                      as ‘non-related’ events and will be assessed the internal facility rental rates.
                    </p>
                  </li>
                  <li>
                    <p>
                      Student Organizations/Club Sports must submit a roster of active members at the beginning of each semester, or upon
                      their first facility request of each semester.
                    </p>
                  </li>
                  <li>
                    <p>
                      Student Organization/Club Sport members that are not OU students will need to purchase a guest pass to enter facility.
                    </p>
                  </li>
                  <li>
                    <p>Setup/tear-down fees may apply for any activity that requires a setup beyond standard room setup.</p>
                  </li>
                  <li>
                    <p>Staffing fees will be applied for any approved reservations outside normal operational hours.</p>
                  </li>
                  <li>
                    <p>Reservations that contain charges require a fund number to charge or pre-payment of fees to confirm reservation.</p>
                  </li>
                </ul>
                <Accordion>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                      Facility Access Guidelines
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <p>
                          <b>General:</b>
                          <ul>
                            <li>
                              <p>Photo ID is required by all participants/spectators.</p>
                            </li>
                            <li>
                              <p>Students need to show OU Student ID.</p>
                            </li>
                            <li>
                              <p>Facility Members need to show OU ID or Campus Recreation Key Fob.</p>
                            </li>
                            <li>
                              <p>
                                Non-Students/Non-Members need to provide Picture ID and be on the sponsoring department supplied roster.
                              </p>
                            </li>
                          </ul>
                        </p>
                        <p>
                          <b>Specific:</b>
                          <ul>
                            <li>
                              <b>Sports Clubs (Meetings/Practices) - </b>
                              <p>
                                Roster of official members must be provided to the Facility Coordinator, access is limited to those on the
                                roster. Club Members who are OU Students must swipe in with OU ID. Club Members who are not OU Students must
                                purchase a facility membership or pay for a day pass for each visit.
                              </p>
                            </li>
                            <li>
                              <b>Student Organizations (Member Meetings) - </b>
                              <p>
                                Roster of official members must be provided to the Facility Coordinator, access is limited to those on the
                                roster. Student Org Members who are OU Students must swipe in with OU ID; Student Org Members who are not OU
                                Students must purchase a day pass for each visit.
                              </p>
                            </li>
                          </ul>
                        </p>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                      Staffing
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        <p>
                          Staffing needs are determined by RecWell Staff based on the activity. General guidelines to assist in planning are
                          as follows:
                        </p>
                        <ul>
                          <li>
                            <p>
                              Events using only one space during normal operational hours and having under 75 participants do not require
                              any staff unless requested beyond the organization reserving the space.
                            </p>
                          </li>
                          <li>
                            <p>
                              Events using only one space outside of normal operational hours and having under 150 participants will require
                              1 RecWell Building Manager and 1 RecWell Event Attendant.
                            </p>
                          </li>
                          <li>
                            <p>
                              Events using more than one space during normal operational hours will require 1 RecWell Event Attendant per 75
                              participants or fraction thereof.
                            </p>
                          </li>
                          <li>
                            <p>
                              Events using more than one space outside of normal operational hours will require 1 RecWell Event Attendant
                              per 75 participants or fraction thereof and 1 RecWell Building Manager. Minimum staffing level is 1 RecWell
                              Building Manager and 1 RecWell Attendant. Note: RecWell Building Manager does count as 1 staff member in the
                              1:75 staffing ratio.
                            </p>
                          </li>
                          <li>
                            <p>RecWell Staffed check-in table is above and beyond the staffing requirements above.</p>
                          </li>
                          <li>
                            <p>Aquatic Center usage requires a minimum of 2 lifeguards.</p>
                          </li>
                        </ul>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </TabPanel>
              <TabPanel>
                <ul>
                  <li>
                    <p>
                      Non-University groups wishing to use an area of the facility may request to do so pending space availability.
                      Appropriate external rental rates apply.
                    </p>
                  </li>
                  <li>
                    <p>Setup/Teardown fees may apply for any activity that requires a setup beyond standard room setup (see rate sheet).</p>
                  </li>
                  <li>
                    <p>
                      Any approved request for a full day or multiple day event will require an event preparation meeting with a
                      Professional Staff Member.
                    </p>
                  </li>
                  <li>
                    <p>
                      If requesting use of all facilities of a particular nature (i.e. all three gym courts) for an entire day(s),
                      provisions will need to be made to make one portion of the facility available for recreational use for a 2 hour time
                      block during the day(s). This 2 hour block of time will be designated by Department staff based on recreational use
                      patterns.
                    </p>
                  </li>
                  <li>
                    <p>External Groups must also follow Oakland University's General Terms and Conditions for Agreements</p>
                  </li>
                </ul>
                <Accordion>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                      Insurance Requirements
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                        <ul>
                          <li>
                            <p>
                              External Groups must have general liability insurance and/or excess umbrella insurance in an amount totaling
                              no less than $1,000,000 per occurrence and $1,000,000 aggregate, and no more than $250,000 deductible per
                              occurrence. The Certificate of Insurance should name 'Oakland University and Board of Trustees' as
                              additionally insured on the policy.
                            </p>
                          </li>
                          <li>
                            <p>
                              External Groups must also have workers compensation insurance at the statutory amount and $1,000,000 of
                              employer’s liability insurance. The Certificate of Insurance should name 'Oakland University' as a certificate
                              holder.
                            </p>
                          </li>
                          <li>
                            <p>
                              External Groups must have sexual abuse & molestation insurance no less than $1,000,000 per occurrence and
                              $2,000,000 aggregate. The Certificate of Insurance should name 'Oakland University and Board of Trustees' as
                              additionally insured on the policy.
                            </p>
                          </li>
                        </ul>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="1">
                      Facility Access Guidelines
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="1">
                      <Card.Body>
                        <p>
                          <ul>
                            <li>
                              <b>GENERAL - </b>
                              <p>Photo ID is required by all participants/spectators.</p>
                            </li>
                            <li>
                              <b>SPECIFIC - </b>
                              <p>
                                Roster of Attendees must be provided to the Facility Coordinator 1 week in advance, access is limited to
                                those on the roster. Attendees must show picture ID to Welcome Center Staff to gain entry into the facility.
                                <br />
                                <br />
                                <i>Note: Large events may require a check-in table to be staffed for the event entry.</i>
                              </p>
                            </li>
                          </ul>
                        </p>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="2">
                      Deposits
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="2">
                      <Card.Body>
                        <p>These are the general guidelines, specifics will be laid out in the confirmation or rental agreement.</p>
                        <ul>
                          <li>
                            <b>Estimated facility charges under $50</b>
                            <ul>
                              <li>
                                Non-Refundable pre-payment of estimated facility charges due at receipt of confirmation to hold reservation.
                              </li>
                            </ul>
                          </li>
                          <li>
                            <b>Estimated facility charges under $500</b>
                            <ul>
                              <li>Non-Refundable Reservation Deposit of $50 due at receipt of confirmation to hold reservation.</li>
                              <li>Deposit of 50% of Estimated Facility Charges due 1 month prior to reservation.</li>
                            </ul>
                          </li>
                          <li>
                            <b>Estimated facility charges $500+</b>
                            <ul>
                              <li>
                                Non-Refundable Reservation Deposit of 10% of Estimated Facility Charges due at receipt of confirmation to
                                hold reservation.
                              </li>
                              <li>Deposit of 50% of Estimated Facility Charges due 1 month prior to reservation.</li>
                            </ul>
                          </li>
                        </ul>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="3">
                      Cancellations
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="3">
                      <Card.Body>
                        <ul>
                          <li>
                            <p>
                              Cancellations can occur up to 1 month prior to the reservation without any additional penalty beyond the
                              non-refundable reservation deposit.
                            </p>
                          </li>
                          <li>
                            <p>
                              Cancellations made between 15-30 days prior to the event will be eligible for a 50% refund of the 50% deposit
                              paid.
                            </p>
                          </li>
                          <li>
                            <p>
                              Cancellations made between 8 - 14 days prior to the reservation will not be eligible for a refund of
                              deposits/pre-payments.
                            </p>
                          </li>
                          <li>
                            <p>
                              Cancellations made between 2-7 days prior to the reservation will be charged full estimated facility charges
                              that were indicated in the confirmation.
                            </p>
                          </li>
                          <li>
                            <p>
                              Cancellations day of or no-shows will be charged all estimated charges (facility, staffing, setup, teardown,
                              etc.) that were indicated in the confirmation.
                            </p>
                          </li>
                        </ul>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="4">
                      Room Setup
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="4">
                      <Card.Body>
                        <p>
                          The grid below classifies normal setups into one of three categories. There are no setup charges for setups in the
                          Standard or Basic column.
                        </p>
                        <MDBTable striped>
                          <MDBTableHead color="black" textWhite>
                            <tr>
                              <th>Room</th>
                              <th>Standard</th>
                              <th>Basic</th>
                              <th>Expanded</th>
                            </tr>
                          </MDBTableHead>
                          <MDBTableBody>
                            <tr>
                              <td>Activity Center</td>
                              <td>Empty Room</td>
                              <td>Empty Room</td>
                              <td>Special Requests</td>
                            </tr>
                            <tr>
                              <td>David E. Herman Room</td>
                              <td>Tables and Chairs for 30</td>
                              <td>LCD Projector</td>
                              <td>Empty Room Special Requests</td>
                            </tr>
                            <tr>
                              <td>Pioneer Room</td>
                              <td>Empty Room</td>
                              <td>Rectangle Tables/Chairs</td>
                              <td>Specialized Setup</td>
                            </tr>
                            <tr>
                              <td>3 Court Gym</td>
                              <td>Empty Room</td>
                              <td>Scoring Table</td>
                              <td> Floor Covering Tables/Chairs Special Requests</td>
                            </tr>
                          </MDBTableBody>
                        </MDBTable>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="5">
                      Staffing
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="5">
                      <Card.Body>
                        <p>
                          Staffing needs are determined by RecWell Staff based on the activity. General guidelines to assist in planning are
                          as follows:
                        </p>
                        <ul>
                          <li>
                            <p>
                              Events using only one space during normal operational hours and having under 75 participants do not require
                              any staff unless requested beyond the organization reserving the space.
                            </p>
                          </li>
                          <li>
                            <p>
                              Events using only one space outside of normal operational hours and having under 150 participants will require
                              1 RecWell Building Manager and 1 RecWell Event Attendant.
                            </p>
                          </li>
                          <li>
                            <p>
                              Events using more than one space during normal operational hours will require 1 RecWell Event Attendant per 75
                              participants or fraction thereof.
                            </p>
                          </li>
                          <li>
                            <p>
                              Events using more than one space outside of normal operational hours will require 1 RecWell Event Attendant
                              per 75 participants or fraction thereof and 1 RecWell Building Manager. Minimum staffing level is 1 RecWell
                              Building Manager and 1 RecWell Attendant. Note: RecWell Building Manager does count as 1 staff member in the
                              1:75 staffing ratio.
                            </p>
                          </li>
                          <li>
                            <p>RecWell Staffed check-in table is above and beyond the staffing requirements above.</p>
                          </li>
                          <li>
                            <p>Aquatic Center usage requires a minimum of 2 lifeguards.</p>
                          </li>
                        </ul>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </TabPanel>
            </Tabs>
          </TabPanel>
          <TabPanel>
            <MDBCol>
              <h6 className="text-uppercase font-weight-bold">
                <strong>Aquatic Center</strong>
              </h6>
              <hr className="black accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: '130px' }} />
            </MDBCol>
            <p>
              The Oakland University Aquatic Center houses a 50-meter stretch pool with spectator seating for 1,000 and deck space or 670
              participants. Outside of recreational use by members, the Aquatic Center is the home of the Oakland University NCAA Division 1
              swim team and hosts many state and regional meets.
            </p>
            <MDBTable striped>
              <MDBTableHead color="black" textWhite>
                <tr>
                  <th>Room</th>
                  <th>Amenities</th>
                  <th>Capacity</th>
                  <th>sq/ft</th>
                  <th>Food Allowed</th>
                  <th>A/V Supported</th>
                  <th>Description</th>
                </tr>
              </MDBTableHead>
            </MDBTable>
          </TabPanel>
          <TabPanel>
            <MDBCol>
              <h6 className="text-uppercase font-weight-bold">
                <strong>Outdoor Complex</strong>
              </h6>
              <hr className="black accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: '155px' }} />
            </MDBCol>
            <p>
              The Recreation and Athletic Outdoor Complex allows different exercise alternatives outside of our indoor facilities. Members
              have access to the Outdoor Complex, except when they are reserved for organizational use. Read more about Outdoor Complex
              usage policies.
            </p>
            <MDBTable striped>
              <MDBTableHead color="black" textWhite>
                <tr>
                  <th>Room</th>
                  <th>Amenities</th>
                  <th>Capacity</th>
                  <th>sq/ft</th>
                  <th>Food Allowed</th>
                  <th>A/V Supported</th>
                  <th>Description</th>
                </tr>
              </MDBTableHead>
            </MDBTable>
          </TabPanel>
          <TabPanel>
            <MDBCol>
              <h6 className="text-uppercase font-weight-bold">
                <strong>Rec Center</strong>
              </h6>
              <hr className="black accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: '95px' }} />
            </MDBCol>
            <p>
              With an open and relaxing environment, Oakland University's Recreation Center is as much a home for the occasional user as for
              the sports enthusiast. This contemporary 140,000 square foot facility offers something for everyone, no matter your fitness
              goals.
            </p>
            <MDBCol>
              <h6 className="text-uppercase font-weight-bold">
                <strong>Upper Level</strong>
              </h6>
              <hr className="black accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: '105px' }} />
            </MDBCol>
            <MDBTable striped>
              <MDBTableHead color="black" textWhite>
                <tr>
                  <th>Room</th>
                  <th>Amenities</th>
                  <th>Capacity</th>
                  <th>sq/ft</th>
                  <th>Food Allowed</th>
                  <th>A/V Supported</th>
                  <th>Description</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <td>Cardio Loft</td>
                </tr>
                <tr>
                  <td>Indoor Track</td>
                </tr>
                <tr>
                  <td>Social Lounge</td>
                </tr>
                <tr>
                  <td>Studio 919</td>
                </tr>
              </MDBTableBody>
            </MDBTable>
            <MDBCol>
              <h6 className="text-uppercase font-weight-bold">
                <strong>Lower Level</strong>
              </h6>
              <hr className="black accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: '105px' }} />
            </MDBCol>
            <MDBTable striped>
              <MDBTableHead color="black" textWhite>
                <tr>
                  <th>
                    <b>Room</b>
                  </th>
                  <th>
                    <b>Amenities</b>
                  </th>
                  <th>
                    <b>Capacity</b>
                  </th>
                  <th>
                    <b>sq/ft</b>
                  </th>
                  <th>
                    <b>Food Allowed</b>
                  </th>
                  <th>
                    <b>A/V Supported</b>
                  </th>
                  <th>
                    <b>Description</b>
                  </th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                <tr>
                  <td>
                    <b>3-Court Gym</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Activity Center</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>David E. Herman Classroom</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Fitness Annex A</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Fitness Annex B</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Fitness Center</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Pioneer Classroom</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Racquetball Courts</b>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Studio 897</b>
                  </td>
                </tr>
              </MDBTableBody>
            </MDBTable>
          </TabPanel>
          <TabPanel>
            <MDBCol>
              <h6 className="text-uppercase font-weight-bold">
                <strong>Fitness Court</strong>
              </h6>
              <hr className="black accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: '115px' }} />
            </MDBCol>
            <p>
              Thanks to an innovative partnership with Priority Health, the new Priority Health Fitness Court is a free, state-of-the-art,
              outdoor circuit training facility, available to the public and suitable for ages 14+, and appropriate for all fitness levels!
            </p>
            <MDBTable striped>
              <MDBTableHead color="black" textWhite>
                <tr>
                  <th>Room</th>
                  <th>Amenities</th>
                  <th>Capacity</th>
                  <th>sq/ft</th>
                  <th>Food Allowed</th>
                  <th>A/V Supported</th>
                  <th>Description</th>
                </tr>
              </MDBTableHead>
            </MDBTable>
          </TabPanel>
        </Tabs>
      </MDBContainer>
    );
  }
}

export default Facilities;
