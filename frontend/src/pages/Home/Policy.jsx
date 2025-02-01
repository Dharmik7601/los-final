import { MDBAccordion, MDBAccordionItem, MDBIcon } from 'mdb-react-ui-kit';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import { Container } from "react-bootstrap";
import { MDBBadge } from "mdb-react-ui-kit";

const Policy = () => { 
	return (
		<>
			<NavBar />
			<div className="p-4 title"><MDBBadge pill color='secondary' light>Policy Agreement</MDBBadge></div>
			<Container >
			<MDBAccordion /*initialActive={1}*/>
				<MDBAccordionItem collapseId={1}
					headerTitle={<><MDBIcon fas icon="question-circle" /> &nbsp; Policy #1</>}>
					Every loan providing entity will have policies <br/>
					1) CIBIL (Credit Information Bureau India Limited) score -> Credit score of client <br/>
					<br/>
					   CIBIL Score is a 3-digit numeric summary of your credit history, rating and report, and ranges from 300 to 900. <br/> 
					<br/>
					   The closer your score is to 900, the better your credit rating is. <br/>
					<br/>
						eg. 700-900 will be accepted <br/>
						    500-700 will be overrided <br/>
						    below 500 will be rejected <br/>
					<br/>
                    2) Equifax  <br/>
                    3) Highmark <br/>
					They are companies like CIBIL approved by the RBI
				</MDBAccordionItem>
				<MDBAccordionItem collapseId={2} headerTitle={<><MDBIcon fas icon="question-circle" /> &nbsp; Policy #2</>}>
					Legal verification of documents.
				</MDBAccordionItem>
				<MDBAccordionItem collapseId={3} headerTitle={<><MDBIcon fas icon="question-circle" /> &nbsp; Policy #3</>}>
					TAT (Turnaround time) for every aspect (application, loan verification, property verification)
				</MDBAccordionItem>
				<MDBAccordionItem collapseId={4} headerTitle={<><MDBIcon fas icon="question-circle" /> &nbsp; Policy #4</>}>
					Does the client have any cheque bouncing history?
				</MDBAccordionItem>
				<MDBAccordionItem collapseId={5} headerTitle={<><MDBIcon fas icon="question-circle" /> &nbsp; Policy #5</>}>
					Does the client have any existing loans? (overdue in loans)
				</MDBAccordionItem>
				<MDBAccordionItem collapseId={6} headerTitle={<><MDBIcon fas icon="question-circle" /> &nbsp; Policy #6</>}>
					Nature of industry (is it risky?)
				</MDBAccordionItem>
			</MDBAccordion>
			</Container>
			<Footer />
		</>
	);
}

export default Policy






























/* LOAN ORIGINATION SYSTEM -> it is an application process during a
loan life cycle.

POLICIES

Every loan providing entity will have policies
1) CIBIL (Credit Information Bureau India Limited)
score -> Credit score of client

CIBIL Score is a 3-digit numeric summary of your
 credit history, rating and report, and ranges 
from 300 to 900. 
The closer your score is to 900, the better your
credit rating is.

eg. 700-900 will be accepted
	500-700 will be overrided
	below 500 will be rejected

2) Equifax  3) Highmark
they are companies like CIBIL approved by the RBI

3) Legal verification of documents.

4) TAT (Turnaround time)
for every aspect (application, loan verification,
property verification)

5) Does the client have any cheque bouncing
history?

6) Does the client have any existing loans?
(overdue in loans)

7) Nature of industry (is it risky?) 

STEP1 --> LEAD GENERATION

1) Basic Client details -> name, mobile, email
Address, PAN, loan amount
=> verification details
-> reject/hold or process

2) CIBIL verification

3) Eligibility -> Business, Govt employee,
Professional (priority)

4) Detail verification
KYC, Employer verificaton, income details, experience

5) Document verification
> pan verification
> kyc verification
> address verification
> employment verification
> income details and financial verification
> tax returns

6) CAM (credit analysis memorandum) approval
Approval from entity providing loan
> branch approval
> head office approval

7) Before Sanction letter
> LLC verifiaction in case of business loan
> property and land verification incase of
home loan
> education institute verification incase of 
education loan

8) Loan Sanction Letter
> term
> loan amount
> rate of interest
> processing fee for loan providing entity
> emi (GST) */










