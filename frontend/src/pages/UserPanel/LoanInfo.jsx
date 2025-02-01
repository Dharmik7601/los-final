import { React, useState, useEffect } from 'react';
import { Form, Row, Col, InputGroup, Button, Container } from 'react-bootstrap';
import SideBar from "../../components/Sidebar/SideBar";
import PostLoginNavBar from "../../components/NavBar/PostLoginNavBar";
import axios from 'axios';
import { MDBBadge } from "mdb-react-ui-kit";
import { useNavigate, useParams } from 'react-router-dom';

const LoanInfo = () => {

    const { loanId } = useParams()

    const Navigate = useNavigate()
    const [loanDetails, setLoanDetails] = useState({})

    const handleSubmit = () => {
        console.log("downloaded");
        window.open(`/user-panel/sanction-letter/${loanId}`);
    }

    const getLoanInquiryDetails = async () => {
        try {
            await axios.get(`http://localhost:5000/api/v1/user/loan/inquiry/${loanId}`, {
                withCredentials: true
            }).then(response => {
                setLoanDetails(response.data)
            })
        } catch (err) {
            Navigate('/')
            return
        }
    }

    useEffect(() => {
        getLoanInquiryDetails()
    }, [])
    return (
        <>
            <PostLoginNavBar />
            <div style={{ display: 'flex' }}>
                <SideBar />
                <Container fluid>
                    <Row>
                        <Col>
                            <div className="p-4 title"><MDBBadge pill color='secondary' light>Loan ID: {loanId}</MDBBadge></div>
                            <Form className="container mt-3 mb-3 loan" autoComplete='off'>
                                <Row className="mb-3">
                                    {/* LOAN AMOUNT */}
                                    <Form.Group controlId="formBasicNumber" className="col col-sm-8">
                                        <Form.Label><MDBBadge pill color='secondary' light>DESIRED LOAN AMOUNT</MDBBadge></Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text id="basic-addon1">₹</InputGroup.Text>
                                            <Form.Control aria-label="Loan Amount" type="number" aria-describedby="basic-addon1" className="form-control" name="loanAmount" value={loanDetails.loanAmount} readOnly />
                                        </InputGroup>
                                    </Form.Group>
                                    {/* LOAN TYPE : ONLY DISPLAY */}
                                    <Form.Group controlId="formBasicEmail" className="col col-sm-4">
                                        <Form.Label><MDBBadge pill color='secondary' light>LOAN TYPE</MDBBadge></Form.Label>
                                        <Form.Control type="text" name="loanType" value={loanDetails.loanType} readOnly />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    {/* EMPLOYMENT STATUS */}
                                    <Form.Group controlId="formGridState" className="col col-sm-4">
                                        <Form.Label><MDBBadge pill color='secondary' light>EMPLOYMENT STATUS</MDBBadge></Form.Label>
                                        <Form.Control type="text" name="empStatus" value={loanDetails.empStatus} readOnly />
                                    </Form.Group>
                                    {/* BUSINESS NAME */}
                                    <Form.Group controlId="formBasicEmail" className="col col-sm-8">
                                        <Form.Label><MDBBadge pill color='secondary' light>FIRM NAME / BUSINESS NAME</MDBBadge></Form.Label>
                                        <Form.Control type="name" name="businessName" className="form-control" value={loanDetails.businessName} readOnly />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    {/* FIRM/BUSINESS ADDRESS*/}
                                    <Form.Group className=" col col-sm-6" controlId="formGridAddress1">
                                        <Form.Label><MDBBadge pill color='secondary' light>FIRM ADDRESS / BUSINESS ADDRESS</MDBBadge></Form.Label>
                                        <Form.Control className="form-control" type="text" name="firmAddress" value={loanDetails.firmAddress} readOnly />
                                    </Form.Group>
                                    <Form.Group className=" col col-sm-6" controlId="formGridAddress1">
                                        <Form.Label><MDBBadge pill color='secondary' light>LOAN STATUS</MDBBadge></Form.Label>
                                        <Form.Control className="form-control" type="text" name="applicationStatus" value={loanDetails.applicationStatus} readOnly />
                                    </Form.Group>
                                </Row>

                                {/* SUBMIT BUTTON */}
                                <div className="text-center p-3 mb-3" >
                                    <Button variant="primary" size="lg" onClick={handleSubmit} style={{display:loanDetails.applicationStatus === 'Accepted'?'block':'none' }}>
                                        View Sanction Letter
                                    </Button>
                                </div>

                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default LoanInfo 
