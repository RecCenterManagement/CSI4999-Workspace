import React, { Component } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead, MDBContainer } from 'mdbreact';

const Membership = props => (
      <div>
      <MDBContainer>
          <a><b>Membership Rates and Information</b></a><br />
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th>Student</th>
                <th>1 Month</th>
                <th>4 Month</th>
                <th>12 month</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <tr>
                <td>OU Students</td>
                <td>Rec Center membership is included in <br />
                  tuition for students enrolled in the current<br />
                  semester.</td>
                <td />
                <td />
              </tr>
              <tr>
                <td>Students* <br />(enrolled at other colleges or universities)</td>
                <td>$30</td>
                <td>$100</td>
                <td>N/A</td>
              </tr>
              <tr>
                <td>Secondary</td>
                <td>$35</td>
                <td>$125</td>
                <td>N/A</td>
              </tr>
              <tr>
                <td>Dependent</td>
                <td>$25 (all)</td>
                <td>$50 (all)</td>
                <td>N/A</td>
              </tr>
            </MDBTableBody>
          </MDBTable>
          *The student membership is the primary membership holder.
          <br />
          <b>Secondary:</b> individuals 18 and older who live in the same residence
          as the primary member can be added to their account.
          <br />
          <b>Dependent:</b> Those ages 2-17 can be added to the primary member's
           account.
          <br />
          <br />
          <br />
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th>Employees</th>
                <th>1 Month</th>
                <th>4 Month</th>
                <th>12 month</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <tr>
                <td>Non Benefits-Eligible OU Employees*</td>
                <td>$40</td>
                <td>$150</td>
                <td>$360</td>
              </tr>
              <tr>
                <td>Secondary</td>
                <td>$35</td>
                <td>$125</td>
                <td>$330</td>
              </tr>
              <tr>
                <td>Dependent</td>
                <td>$25 (all)</td>
                <td>$50 (all)</td>
                <td>$100 (all)</td>
              </tr>
            </MDBTableBody>
          </MDBTable>
          *The Non Benefits-Eligible OU Employee membership is the primary membership holder.
          <br />
          <b>Secondary:</b> individuals 18 and older who live in the same residence as the primary member can be added to their account.
          <br />
          <b>Dependent:</b> Those ages 2-17 can be added to the primary member's
          account.
          <br />
          <b>Payroll Deduction</b> — Faculty and staff with 12- or 9-month appointments may pay for annual spouse/dependents
          Rec Center membership through payroll deduction, where fees are automatically deducted from the employee’s
          paycheck in accordance with the university schedule. A payroll deduction form must be completed and signed
          when submitting a membership application.
          <br />
          <br />
          <br />
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th>Community</th>
                <th>1 Month</th>
                <th>4 Month</th>
                <th>12 month</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <tr>
                <td>Community</td>
                <td>$45</td>
                <td>$165</td>
                <td>$440</td>
              </tr>
              <tr>
                <td>Secondary</td>
                <td>$35</td>
                <td>$125</td>
                <td>$330</td>
              </tr>
              <tr>
                <td>Dependent</td>
                <td>$25 (all)</td>
                <td>$50 (all)</td>
                <td>$100 (all)</td>
              </tr>
            </MDBTableBody>
          </MDBTable>
          *The community membership is the primary membership holder.
          <br />
          <b>Secondary:</b> individuals 18 and older who live in the same residence as the primary member can be added to their account.
          <br />
          <b>Dependent:</b> Those ages 2-17 can be added to the parent/legal guardian member's account.
          account.
          <br />
          <br />
          <br />
          <a><b>Guest Passes</b></a><br />
          <p>-Guests of members are $10 per day, and there is a maximum of two guests per day that can be sponsored by a single member.<br />
             -Guests 16 and older must show state-issued photo ID.<br />
             -Guests sign-in with their sponsor member and must be accompanied by that member at all times within the facility.<br />
          </p>
          <br />
          <a><b> Mini-Passes</b></a><br />
          <p>Eligible affiliates, who do not wish to join the Rec Center as a full member, may purchase a 10-entry mini-pass for $80.
           The purchaser must be eligible to purchase a full membership. Mini-Passes expire one year from purchase date,
            are for individual use only and are non-transferable. Mini-Passes do not include entry to GroupX classes but
             are eligible for single class passes.
          </p><br />
          <a><b>Refund</b></a><br />
          <p>Refunds are issued for medical or relocation purposes only. All requests must be submitted in writing to the Rec
          Center Director. All key fobs (if applicable) must be surrendered before a refund will be made.
          Refunds take about three to four weeks to process and have a $25 processing fee deducted from approved refund amount.<br />
          <br />
          <b><i>Memberships are non-transferable.</i></b></p>
          </MDBContainer>
       </div>
);

export default Membership;
