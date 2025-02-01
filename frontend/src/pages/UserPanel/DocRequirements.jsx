import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DocRequirements(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Required Documents
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Files need to have .jpeg or .pdf extension</h5>
        <div>
          <p>&nbsp;</p>
          <h5>1) Business Loan</h5><br />

          <b>1)</b> Photo Identity Proof: PAN Card / Aadhaar Card.<br />
          <b>2)</b> Address Proof: Driving License / Registered Rent Agreement / Electricity Bill (up to 3 months old) / Passport<br />
          <b>3)</b> COI (Certificate of Incorporation) | business registration, licenses, and permits<br />
          <b>4)</b> 6-12 months of bank statements<br />
          <b>5)</b> 1-2 years of personal and business tax returns | document verifying GST number (GST Returns)<br />
          <b>6)</b> 12 months of profit and loss balance sheet<br />
          <b>7)</b> cash flow statements<br />
          <b>8)</b> list of accounts receivables and payables<br />
          <b>9)</b> list of existing loans and debts<br />
          <p>&nbsp;</p>
          <h5>2) Home Loan</h5><br />

          <b>1)</b> Photo Identity Proof: Passport / Driving License / Voter ID / PAN Card / Aadhaar Card.<br />
          <b>2)</b> Address Proof: Driving License / Registered Rent Agreement / Electricity Bill (up to 3 months old) / Passport.<br />
          <b>3)</b> Employment Appointment Letter: Required if the current employment is less than 1-year old.<br />
          <b>4)</b> Financial Documents:<br />
          <b>--&gt;</b> Last 3 months salary slip.<br />
          <b>--&gt;</b> 6 month bank statement.<br />
          <b>--&gt;</b> 2 year Form 16.<br />
          <b>5)</b> Property Documents: Sale deed, Khata, transfer of ownership.<br />
          <b>6)</b> Advance Processing Cheque: A cancelled cheque for validation of bank account.<br />
          <b>7)</b> Financial Documents:<br />
          <b>a.</b> For <b>Salaried Individual</b>: 3 month salary slip, Form 16 and bank statement<br />

          <b>b.</b> For <b>Self-Employed Individual</b>: IT returns for last 2 years along with computation of income tax for past 2 years certified by a Chartered accountant<br />

          <b>c.</b> For <b>Self-Employed Non- Professionals</b>: IT returns for last 3 years along with computation of income tax for past 2 years certified by a Chartered accountant<br />
          <p>&nbsp;</p>
          <b> --&gt; SALARIED EMPLOYEES</b><br />
          Income Proof: 3 month payslips, 2 years Form 16, Copy of Income Tax PAN<br />
          Bank Statement: 6 months bank statement that shows salary from the employer and any EMI paid for outstanding debit.<br />
          <p>&nbsp;</p>
          <b> --&gt; SELF-EMPLOYED / PROFESSIONALS</b><br />
          Office Address Proof: Property Documents, Utility Bill.<br />
          Office Ownership Proof: Property Documents, Utility Bill, Maintenance Bill.<br />
          Business Existence Proof: 3 years old Saral Copy, the Company Registration license, Shop Establishment Act.<br />
          Income Proof: Latest 3 years Income Tax Returns including Computation of Income, Profit & Loss Account, Audit Report, Balance Sheet, etc.<br />
          Bank Statement: Past 1 year bank statement.<br />
          1 passport size color photograph.<br />
          <p>&nbsp;</p>
          <h5>3) Education Loan</h5><br />

          <b>1)</b> [Applicant & Co-Applicant] Photo Identity Proof: Passport / Driving License / Voter ID / PAN Card / Aadhaar Card.<br />
          <b>2)</b> Address Proof: Driving License / Registered Rent Agreement / Electricity Bill (up to 3 months old) / Passport.<br />
          <b>3)</b> Income Proof: Applicant / Co-Applicant (Employment / Document Proof)<br />
          <b>4)</b> Bank Statement / Pass Book of last 6 months<br />
          <b>5)</b> Proof of Admission: Printed Admission Letter From the Institute on its Letterhead With Institute's Address along with fees schedule.<br />
          <b>6)</b> Mark sheets / passing certificates of S.S.C., H.S.C, Degree courses<br />
          <b>7)</b> Collateral Property Document<br />
          <p>&nbsp;</p>
          <h5>4) Personal Loan</h5><br />

          <b>1)</b> Photo Identity Proof: Passport / Driving License / Voter ID / PAN Card / Aadhaar Card.<br />
          <b>2)</b> Address Proof: Driving License / Registered Rent Agreement / Electricity Bill (up to 3 months old) / Passport.<br />
          <b>3)</b> Income Proof: Last 3 months Payslip & Bank Statement of last 3 months.<br />
          <b>4)</b> Job Continuity Proof: Job Offer Letter / Letter from the HRD (if current employment less than 2 years).<br />
          <b>5)</b> Financial Documents<br />
          <b>a.</b> Salaried Individuals: Latest 3 month's Salary Slips and Form 16, Bank Statements of 6 months.<br />

          <b>b.</b> Self Employed Individuals: Latest 1 year bank statement for both savings and current account.<br />
          <p>&nbsp;</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-primary' onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DocRequirements
