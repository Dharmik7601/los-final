import { React, useState, useEffect } from 'react';
import { Form, Row, Col, InputGroup, Button, Container } from 'react-bootstrap';
import SideBar from "../../components/Sidebar/SideBar";
import PostLoginNavBar from "../../components/NavBar/PostLoginNavBar";
import axios from 'axios';
import { MDBBadge } from "mdb-react-ui-kit";
import { useNavigate } from 'react-router-dom';

const LoanInfo = () => {
    const Navigate = useNavigate()
    const [userDetail, setUserDetails] = useState({})

    const logoutUser = async () => {
        try {
            await axios.get("http://localhost:5000/api/v1/user/logout", {
                withCredentials: true
            }).then(response => {
                Navigate('/')
            })
        } catch (err) {
            Navigate('/')
        }
    }

    const getUserDetails = async () => {
        try {
            await axios.get("http://localhost:5000/api/v1/user/getUser1", {
                withCredentials: true
            }).then(response => {
                setUserDetails(response.data.user)
                return
            })
        } catch (err) {
            Navigate('/')
            return
        }
    }

    useEffect(() => {
        getUserDetails()
    }, [])
    return (
        <>
            <PostLoginNavBar />
            <div style={{ display: 'flex' }}>
                <SideBar />
                <Container fluid>
                    <Row>
                        <Col>
                            <div className="p-4 title"><MDBBadge pill color='secondary' light>Loan Information</MDBBadge></div>
                            <Form className="container mt-3 mb-3 loan" autoComplete='off'>
                                <Row className="mb-3">
                                    {/* LOAN AMOUNT */}
                                    <Form.Group controlId="formBasicNumber" className="col col-sm-8">
                                        <Form.Label>Desired Loan Amount</Form.Label>
                                        <InputGroup>
                                            <InputGroup.Text id="basic-addon1">₹</InputGroup.Text>
                                            <Form.Control aria-label="Loan Amount" type="number" aria-describedby="basic-addon1" className="form-control" name="loanAmount" value={userDetail.loanAmount} readOnly />
                                        </InputGroup>
                                    </Form.Group>
                                    {/* LOAN TYPE : ONLY DISPLAY */}
                                    <Form.Group controlId="formBasicEmail" className="col col-sm-4">
                                        <Form.Label>Loan Type</Form.Label>
                                        <Form.Control type="text" name="loanType" value={userDetail.loanType} readOnly />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    {/* EMPLOYMENT STATUS */}
                                    <Form.Group controlId="formGridState" className="col col-sm-4">
                                        <Form.Label>Employment Status</Form.Label>
                                        <Form.Control type="text" name="empStatus" value={userDetail.empStatus} readOnly />
                                    </Form.Group>
                                    {/* BUSINESS NAME */}
                                    <Form.Group controlId="formBasicEmail" className="col col-sm-8">
                                        <Form.Label>Firm Name / Business Name</Form.Label>
                                        <Form.Control type="name" name="businessName" className="form-control" value={userDetail.businessName} readOnly />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    {/* FIRM/BUSINESS ADDRESS*/}
                                    <Form.Group className=" col col-sm-12" controlId="formGridAddress1">
                                        <Form.Label>Firm Address / Business Address</Form.Label>
                                        <Form.Control className="form-control" type="text" name="firmAddress" value={userDetail.firmAddress} readOnly />
                                    </Form.Group>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default LoanInfo 
