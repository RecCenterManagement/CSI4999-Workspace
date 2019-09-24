import React, { Component } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

const Membership = props => (
      <div>
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
                <td>Rec Center membership is included in
                  tuition for students enrolled in the current
                  semester.</td>
                <td>Placeholder</td>
                <td>Placeholder</td>
              </tr>
              <tr>
                <td>Students* (enrolled at other colleges or universities)</td>
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
          <br />
          *The student membership is the primary membership holder.
          <br />
          <b>Secondary:</b> individuals 18 and older who live in the same residence
          as the primary member can be added to their account.
          <br />
          <b>Dependent:</b> Those ages 2-17 can be added to the primary member's
           account.
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
          <br />
          *The Non Benefits-Eligible OU Employee membership is the primary membership holder.
          <br />
          <b>Secondary:</b> individuals 18 and older who live in the same residence as the primary member can be added to their account.
          <br />
          <b>Dependent:</b> Those ages 2-17 can be added to the primary member's
          account.
          <br />
          <br />
          <b>Payroll Deduction</b> — Faculty and staff with 12- or 9-month appointments may pay for annual spouse/dependents
          Rec Center membership through payroll deduction, where fees are automatically deducted from the employee’s
          paycheck in accordance with the university schedule. A payroll deduction form must be completed and signed
          when submitting a membership application.
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
          <br />
          *The community membership is the primary membership holder.
          <br />
          <b>Secondary:</b> individuals 18 and older who live in the same residence as the primary member can be added to their account.
          <br />
          <b>Dependent:</b> Those ages 2-17 can be added to the parent/legal guardian member's account.
          account.
          <br />
          <br />
       </div>
);

export default Membership;
