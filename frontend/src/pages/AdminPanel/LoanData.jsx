import AdminSideBar from "../../components/Sidebar/AdminSideBar";
import PostLoginNavBar from "../../components/NavBar/PostLoginNavBar";
import { Container, Form, Row, Col, InputGroup, Button, Modal } from 'react-bootstrap';
import { MDBBadge } from "mdb-react-ui-kit";
import DataTable, { createTheme } from "react-data-table-component";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import "./LoanData.css";
import axios from "axios";

const documentList = [
	{
		DocID: 1,
		DocName: "Aston Villa",
		VerficationStatus: 'Approve',
		Status: <MDBBadge pill color='success' light>Received</MDBBadge>,
	},
	{
		DocID: 2,
		DocName: "Manchester United",
		VerficationStatus: 'Reject',
		Status: <MDBBadge pill color='danger' light>Pending</MDBBadge>,
	},
	{
		DocID: 3,
		DocName: "Everton",
		VerficationStatus: 'Approve',
		Status: <MDBBadge pill color='success' light>Received</MDBBadge>,
	},
	{
		DocID: 4,
		DocName: "Spurs",
		VerficationStatus: 'Reject',
		Status: <MDBBadge pill color='danger' light>Pending</MDBBadge>,
	},
	{
		DocID: 5,
		DocName: "Aston Villa",
		VerficationStatus: 'Approve',
		Status: <MDBBadge pill color='success' light>Received</MDBBadge>,
	},
	{
		DocID: 6,
		DocName: "Manchester City",
		VerficationStatus: 'Reject',
		Status: <MDBBadge pill color='danger' light>Pending</MDBBadge>,
	},
	{
		DocID: 7,
		DocName: "Wolves",
		VerficationStatus: 'Approve',
		Status: <MDBBadge pill color='success' light>Received</MDBBadge>,
	},
	{
		DocID: 8,
		DocName: "Manchester United",
		VerficationStatus: 'Reject',
		Status: <MDBBadge pill color='danger' light>Pending</MDBBadge>,
	},
	{
		DocID: 9,
		DocName: "Manchester United",
		VerficationStatus: 'Approve',
		Status: <MDBBadge pill color='success' light>Received</MDBBadge>,
	},
	{
		DocID: 10,
		DocName: "Chelsea",
		VerficationStatus: 'Reject',
		Status: <MDBBadge pill color='danger' light>Pending</MDBBadge>,
	},
	{
		DocID: 11,
		DocName: "Manchester United",
		VerficationStatus: 'Approve',
		Status: <MDBBadge pill color='success' light>Received</MDBBadge>,
	},
	{
		DocID: 12,
		DocName: "Manchester United",
		VerficationStatus: 'Reject',
		Status: <MDBBadge pill color='danger' light>Pending</MDBBadge>,
	},
	{
		DocID: 13,
		DocName: "Chelsea",
		VerficationStatus: 'Approve',
		Status: <MDBBadge pill color='success' light>Received</MDBBadge>,
	}
];


const LoanData = () => {

	const { userId, email, loanId } = useParams()

	createTheme("solarized", {
		text: {
			primary: "#268bd2",
			secondary: "#2aa198"
		},
		background: {
			default: "#002b36"
		},
		context: {
			background: "#cb4b16",
			text: "#FFFFFF"
		},
		divider: {
			default: "#073642"
		},
		action: {
			button: "rgba(0,0,0,.54)",
			hover: "rgba(0,0,0,.08)",
			disabled: "rgba(0,0,0,.12)"
		}
	}); //color scheme system

	const Navigate = useNavigate();



	const [show, setShow] = useState(false);
	const [Doc, setDoc] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleDocClose = () => setDoc(false);
	const handleDocShow = () => setDoc(true);

	const [docName, setdocName] = useState('');
	const [doc, setdoc] = useState(null);
	const [docDecision, setDocDecision] = useState('')
	const [loanDecision, setLoanDecision] = useState('')

	//	useEffect(() => {
	//		if(docName)
	//		handleDocShow();
	//	}, [docName])


	const [approval, setApproval] = useState();

	const [approve, setApprove] = useState(false);
	const [reject, setReject] = useState(false);
	const [data, setData] = useState(documentList);

	useEffect(() => {
		approval === "approve" ? setApprove(true) : setApprove(false);
		approval === "reject" ? setReject(true) : setReject(false);
	}, [approval])

	const handleApproval = (e) => {
		setDocDecision(e.target.value)
		//		e.target.val￼ue.trim() && setdoc({...doc,VerficationStatus:''});
		//		setData(data.map(d=>d.DocId === doc.DocId ? {...d,VerficationStatus:e.target.val￼ue}:d));
	}

	const handleDocSaveChange = async (e) => {
		console.log(doc);
		console.log(docDecision);
		try {
			await axios.post(`http://localhost:5000/api/v1/admin//getUser/loan/document/set/${userId}/${email}/${doc}`, {
				decision: docDecision
			}, {
				withCredentials: true
			}).then(response => {
				console.log(response);
				window.location.reload()
			})
		} catch (err) {
			if (err.response.data.msg) {
				alert(err.response.data.msg)
				return
			}
			alert('Something went wrong')
			return
		}
	}

	const [columns, setColumns] = useState([]);
	const [pending, setPending] = useState(true);
	const [loanDetails, setLoanDetails] = useState({})
	const [loanDocumentDetails, setLoanDocumentDetails] = useState([])

	useEffect(() => {
		getLoanDetails();
		loanDocuments();
	}, []);

	const viewDocument = async () => {
		let url
		try {
			await axios.get(`http://localhost:5000/api/v1/admin/getUser/loan/document/get-link/${userId}/${email}/${doc}`, {
				withCredentials: true
			}).then(response => {
				url = response.data
				window.open(url)
			})
		} catch (err) {
			if (err.response.data.msg) {
				alert(err.response.data.msg)
				return
			}
			alert('Something went wrong')
			return
		}

	}

	const handleReminder = async (req, res) => {
		try {
			await axios.get(`http://localhost:5000/api/v1/admin/getUser/loan/send/mail/${userId}/${email}/${loanId}`, {
				withCredentials: true
			}).then(response => {
				alert(response.data.msg)
			})
		} catch (err) {
			if (err.response.data.msg) {
				alert(err.response.data.msg)
				return
			}
			alert('Something went wrong')
			return
		}

	}

	//  const columns = [
	// 	{
	// 		name: "Doc ID",
	// 		selector: (row) => row.DocID,
	// 		sortable: true
	// 	},
	// 	{
	// 		name: "Doc Name",
	// 		selector: (row) => row.DocName,
	// 		sortable: true
	// 	},
	// 	{
	// 		name: "Status",
	// 		selector: (row) => row.Status,
	// 		sortable: true,
	// 	},
	// 	{
	// 		name: "Verification",
	// 		selector: (row) => row.VerficationStatus === 'Approve' ? <MDBBadge pill color='success' light>Approved</MDBBadge> : <MDBBadge pill color='danger' light>Rejected</MDBBadge>,
	// 		sortable: true,
	// 	},
	//  ];

	const loanDocuments = async () => {
		try {
			axios.get(`http://localhost:5000/api/v1/admin/getUser/loan/documents/${userId}/${email}/${loanId}`, {
				withCredentials: true
			}).then(response => {
				console.log(response.data);
				setLoanDocumentDetails(response.data)
			})
		} catch (err) {
			console.log(err);
		}
		const timeout = setTimeout(() => {
			setColumns([
				// {
				// 	name: <MDBBadge pill color='dark' light>Document ID</MDBBadge>,
				// 	selector: (row) => row.DocID,
				// 	sortable: true
				// },
				{
					name: <MDBBadge pill color='dark' light>Document Name</MDBBadge>,
					selector: (row) => row.document_type,
					sortable: true
				},
				{
					name: <MDBBadge pill color='dark' light>Status</MDBBadge>,
					// selector: (row) => row.document_status,
					// sortable: true,
					selector: (row) => row.document_status === 'Uploaded' ? <MDBBadge pill color='success' light>Uploaded</MDBBadge> : <MDBBadge pill color='danger' light>Pending</MDBBadge>,
					sortable: true,
				},
				{
					name: <MDBBadge pill color='dark' light>Verification</MDBBadge>,
					selector: (row) => row.document_verification !== 'Unverified' ? <MDBBadge pill color='success' light>Verified</MDBBadge> : <MDBBadge pill color='danger' light>Unverified</MDBBadge>,
					sortable: true,
				},
			]);
			setPending(false);
		}, 2000);
		return () => clearTimeout(timeout);
	}

	const getLoanDetails = async () => {
		try {
			await axios.get(`http://localhost:5000/api/v1/admin/getUser/loan/details/${userId}/${email}/${loanId}`, {
				withCredentials: true
			}).then(response => {
				setLoanDetails(response.data)
			})
		} catch (err) {
			console.log(err);
			Navigate('/')
		}
	}

	const handleLoanStatus = async (req, res) => {
		try {
			await axios.post(`http://localhost:5000/api/v1/admin/getUser/loan/status/set/${userId}/${email}/${loanId}`, {
				decision: loanDecision
			}, {
				withCredentials: true
			}).then(response => {
				alert(response.data.msg)
				if (loanDecision === 'Accepted') {
					Navigate(`/admin-panel/sanction/${userId}/${email}/${loanId}`)
					return
				}
				window.location.reload()
			})
		} catch (err) {
			if (err.response.data.msg) {
				alert(err.response.data.msg)
				return
			}
			alert('Something went wrong')
			return
		}
	}


	const handleRowClicked = (row) => {
		console.log(row.DocName);
		//Open modal with check box to approve or reject a document
		//option will change the tag in verfication column
	};

	//const buttonText = loanDetails.application_status === 'Accepted' ? 'View Sanction Letter' : 'Take Decision';

	const handleSanctionLetter = async () => {
		window.open(`/admin-panel/sanction-letter/${userId}/${email}/${loanId}`)
		return
	}

	const handleClick = async () => {
		if (loanDetails.application_status === 'Accepted') {
			await handleSanctionLetter();
			return
		} else {
			await handleShow();
			return
		}
	};

	return (
		<>
			<PostLoginNavBar />
			<div style={{ display: 'flex' }}>
				<AdminSideBar />

				<Container>
					{/* LOAN INFO */}
					<div className="p-4 title"><MDBBadge pill color='secondary' light>Loan ID: {loanId}</MDBBadge></div>
					<Form className="container mt-3 mb-3">
						<Row className="mb-3">
							{/* LOAN AMOUNT */}
							<Form.Group controlId="formBasicNumber" className="col col-sm-8">
								<Form.Label><MDBBadge pill color='secondary' light>DESIRED LOAN AMOUNT</MDBBadge></Form.Label>
								<InputGroup>
									<InputGroup.Text id="basic-addon1">₹</InputGroup.Text>
									<Form.Control aria-label="Loan Amount" type="amount" aria-describedby="basic-addon1" className="form-control" value={loanDetails.loan_amount} readOnly />
								</InputGroup>
							</Form.Group>
							{/* LOAN TYPE : ONLY DISPLAY */}
							<Form.Group controlId="formBasicEmail" className="col col-sm-4">
								<Form.Label><MDBBadge pill color='secondary' light>LOAN TYPE</MDBBadge></Form.Label>
								<Form.Control type="text" name="loanType" value={loanDetails.loan_type} readOnly />
							</Form.Group>
						</Row>

						<Row className="mb-3">
							{/* EMPLOYMENT STATUS */}
							<Form.Group controlId="formGridState" className="col col-sm-4">
								<Form.Label><MDBBadge pill color='secondary' light>EMPLOYMENT STATUS</MDBBadge></Form.Label>
								<Form.Control className="form-control" name="empStatus" value={loanDetails.emp_status} readOnly />
							</Form.Group>
							{/* BUSINESS NAME */}
							<Form.Group controlId="formBasicEmail" className="col col-sm-8">
								<Form.Label><MDBBadge pill color='secondary' light>FIRM/BUSINESS NAME</MDBBadge></Form.Label>
								<Form.Control type="name" name="businessName" value={loanDetails.buisness_name} readOnly />
							</Form.Group>
						</Row>

						<Row className="mb-3">
							{/* FIRM/BUSINESS ADDRESS*/}
							<Form.Group className=" col col-sm-8" controlId="formGridAddress1">
								<Form.Label><MDBBadge pill color='secondary' light>FIRM/BUSINESS ADDRESS</MDBBadge></Form.Label>
								<Form.Control className="form-control" type="text" name="firmAddress" value={loanDetails.firm_address} readOnly />
							</Form.Group>
							<Form.Group className=" col col-sm-4" controlId="formGridAddress1">
								<Form.Label><MDBBadge pill color='secondary' light>APPLICATION STATUS</MDBBadge></Form.Label>
								<Form.Control className="form-control" type="text" name="application_status" value={loanDetails.application_status} readOnly />
							</Form.Group>
						</Row>
					</Form>

					<Row className="p-2"></Row>

					{/* DOCUMENT TABLE */}

					<div>
						<div className="p-4 title"><MDBBadge pill color='secondary' light>Documents</MDBBadge></div>
						{data?.length > 0 && (<DataTable
							//title="Loan History"
							columns={columns}
							//data={loanDetails}
							data={loanDocumentDetails}
							defaultSortFieldId
							pagination={5}
							fixedHeader
							fixedHeaderScrollHeight="240px"
							onRowClicked={(d) => { let type = d.document_type; setdoc(type); handleDocShow() }}
							highlightOnHover
							pointerOnHover
							progressPending={pending}
						//progressPending
						//theme="dark"
						//customStyles={customStyles}
						//selectableRows
						/>)}

					</div>

					<div className="p-2" />

					<div className="text-center p-3 mb-1" >
						
						<Button
							className="me-4"
							variant="outline-warning" 
							size="lg" 
							onClick={handleReminder}>
							Send Reminder
						</Button>
						
						<Button 
							className="me-4" 
							variant="dark" 
							size="lg" 
							onClick={handleClick}>
						    {loanDetails.application_status === 'Accepted' ? 'View Sanction Letter' : 'Take Decision'}
						</Button>
						
					

						{/*DECISION MODAL*/}
						<Modal show={show} onHide={handleClose}>
							<Modal.Header closeButton>
								<Modal.Title><MDBBadge pill color='warning' light>Final Decision</MDBBadge></Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Form>
									<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
										<Form.Label><MDBBadge pill color='success' light>DECISION</MDBBadge></Form.Label>
										<Form.Select className="form-control" name="add-user" required onChange={(e) => setLoanDecision(e.target.value)}>
											<option defaultValue value=''>Choose...</option>
											<option className="option" value="Accepted">Accept</option>
											<option className="option" value="Rejected">Reject</option>
											<option className="option" value="Waitlist">Waitlist</option>
										</Form.Select>
									</Form.Group>
									<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
										<Form.Label><MDBBadge pill color='danger' light>STATE REASONS</MDBBadge></Form.Label>
										<Form.Control as="textarea" rows={3} />
									</Form.Group>
								</Form>
							</Modal.Body>
							<Modal.Footer>
								<Button variant="outline-secondary" onClick={handleClose}>
									Close
								</Button>
								<Button variant="outline-secondary" onClick={handleLoanStatus}>
									Save Changes
								</Button>
							</Modal.Footer>
						</Modal>
					</div>

					{/*DOCUMENT MODAL*/}
					{doc && (
						<Modal show={Doc} onHide={handleDocClose}>
							<Modal.Header closeButton>
								<Modal.Title><MDBBadge pill color='warning' light>{doc}</MDBBadge></Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<Form>
									<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
										<Form.Label><MDBBadge pill color='success' light>DECISION</MDBBadge></Form.Label>
										<Form.Select className="form-control" value={docDecision} onChange={handleApproval} name="add-user" required >
											<option defaultValue disabled>Choose...</option>
											<option className="option">Approve</option>
											<option className="option">Reject</option>
										</Form.Select>
									</Form.Group>
									<Form.Group
										className="mb-3"
										controlId="exampleForm.ControlTextarea1"
									>
										<Form.Label><MDBBadge pill color='danger' light>STATE REASONS</MDBBadge></Form.Label>
										<Form.Control as="textarea" rows={3} />
									</Form.Group>
								</Form>
							</Modal.Body>
							<Modal.Footer>
								<Button variant="outline-secondary" onClick={viewDocument}>
									View
								</Button>
								<Button variant="outline-secondary" onClick={() => {
									// setData(data.map(d => d.DocID === doc.DocID ? { ...d, VerficationStatus: doc.VerficationStatus } : d));
									handleDocSaveChange()
									handleDocClose();
								}}>
									Save Changes
								</Button>
							</Modal.Footer>
						</Modal>
					)}

				</Container>
			</div>
		</>
	)
};

export default LoanData
