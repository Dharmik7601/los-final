import React, { useEffect, useState } from "react";
import SideBar from "../../components/Sidebar/SideBar";
import PostLoginNavBar from "../../components/NavBar/PostLoginNavBar";
import { Form, Row } from 'react-bootstrap';
import axios from "axios"
import { Navigate } from "react-router-dom";
import { MDBBadge } from "mdb-react-ui-kit";

const DisplayBankDetails = () => {

    const [bankDetails,setBankDetails] = useState({})

    const getBankDetails = async () => {
        try {
            await axios.get("http://localhost:5000/api/v1/user/get-bank-details", {
                withCredentials: true
            }).then(response => {
                console.log(response.data.user);
                setBankDetails(response.data.user)
            })
        } catch (err) {
            if (err.response) {
                alert(err.response.data.msg)
            }
            alert("Something went wrong")
            Navigate('/')
        }
    }

    // const [error, setError] = useState({
    //     account_number: '',
    //     card_number: '',
    //     cvv: '',
    //     cardholder: '',
    //     expiry_date: '',
    // });

    // const [bankDetails, setBankDetails] = useState({
    //     account_number: '',
    //     card_number: '',
    //     cvv: '',
    //     cardholder: '',
    //     expiry_date: '',
    // });

    useEffect(() => {
        getBankDetails()
    },[])

    return (
        <>
            <Form className="container mt-3 mb-3" autoComplete='off'>

                <Row className="mb-3">
                    {/* <Alert>{error}</Alert> */}
                    <div className="p-4 title"><MDBBadge pill color='secondary' light>Bank Details</MDBBadge></div>
                </Row>

                <Row className="mb-3">
                    {/* BANK ACCOUNT NUMBER */}
                    <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                        <Form.Label>Account Holders Name</Form.Label>
                        <Form.Control type="number" name="account_number" value={bankDetails.cardholder} className="form-control" readOnly />
                    </Form.Group>

                    {/* OTP */}
                    {/* <Form.Group controlId="formGridpin" className="col col-sm-3">
                        <Form.Label>Enter OTP</Form.Label>
                        <Form.Control className="form-control" type="text" name="bank_otp" readOnly />
                    </Form.Group>
                    <Form.Group controlId="formGridCheckbox" className="col col-sm-2">
                        <Button type="submit" className="me-4 mt-4 btn-xs">Check OTP</Button>
                    </Form.Group> */}
                </Row>

                <Row className="mb-3">
                    {/* CREDIT/DEBIT CARD INFO */}
                    <Form.Group controlId="formBasicEmail" className="col col-sm-4">
                        <Form.Label>Credit / Debit Card Number</Form.Label>
                        <Form.Control type="number" name="card_number" className="form-control" readOnly />
                    </Form.Group>
                    {/* CVV */}
                    <Form.Group controlId="formBasicEmail" className="col col-sm-1">
                        <Form.Label>CVV</Form.Label>
                        <Form.Control type="password" name="cvv" className="form-control" readOnly />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    {/* CARD HOLDER"S NAME*/}
                    <Form.Group controlId="formGridpin" className="col col-sm-3">
                        <Form.Label>Card Holder's Name</Form.Label>
                        <Form.Control className="form-control" type="text" name="cardholder" readOnly />
                    </Form.Group>
                    {/* CARD EXPIRY DATE */}
                    <Form.Group controlId="formGridpin" className="col col-sm-2">
                        <Form.Label>Expiry Date</Form.Label>
                        <Form.Control className="form-control" type="date" name="expiry_date" readOnly />
                    </Form.Group>
                </Row>

            </Form>
        </>
    );
}

export default DisplayBankDetails

// 1. bank account number >> check button
// 2. credit/debit card number >> check button
// 3. cvv >> check button
// 4. expiry date >> check button