import React, { useEffect, useState } from "react";
import SideBar from "../../components/Sidebar/SideBar";
import PostLoginNavBar from "../../components/NavBar/PostLoginNavBar";
import { Alert, Form, Row, Button } from 'react-bootstrap';
import axios from 'axios'
import { MDBBadge } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";


function validateAccountNumber(value) {
    let error = ''
    let status = true
    if (value.length > 14 || value.length === '') {
        status = false
        // error = 'Account Number: Cannot be empty or accept more than 14 digits'
    }
    for (let number of value) {
        if (isNaN(number)) {
            error = "Account Number: Number expected"
            status = false
            break
        }
    }
    return {
        status,
        value,
        error
    }
}

function validateCardNumber(value) {
    let error = ''
    let status = true
    if (value.length > 12 || value.length === '') {
        status = false
        // error = 'Card Number: Cannot be empty or accept more than 12 digits'
    }
    for (let number of value) {
        if (isNaN(number)) {
            error = "Card Number: Number expected"
            status = false
            break
        }
    }
    return {
        status,
        value,
        error
    }
}

function validateCVV(value) {
    let error = ''
    let status = true
    if (value.length > 3 || value.length === '') {
        status = false
        // error = 'CVV: Cannot be empty or accept more than 3 digits'
    }
    for (let number of value) {
        if (isNaN(number)) {
            error = "CVV: Number expected"
            status = false
            break
        }
    }
    return {
        status,
        value,
        error
    }
}

function validateCardHolder(value) {
    let error = ''
    let status = true
    // for (let letter of value) {
    //     if (!isNaN(letter)) {
    //         error = "Name: Letter expected"
    //         status = false
    //         break
    //     }
    // }
    return {
        status,
        value: value.toLocaleUpperCase(),
        error
    }
}

function validateExpiryDate(value) {
    let error = ''
    let status = true
    var expiry_date = new Date(value)
    var diff_ms = Date.now() - expiry_date.getTime();
    var age_dt = new Date(diff_ms);
    const age = Math.abs(age_dt.getUTCFullYear() - 1970);
    console.log(age);
    if (age < 1) {

        error = "Expiry Date: Invalid"
        status = false
    }
    return {
        value,
        error,
        status
    }
}

const fieldValidations = {
    account_number: validateAccountNumber,
    card_number: validateCardNumber,
    cvv: validateCVV,
    cardholder: validateCardHolder,
    expiry_date: validateExpiryDate
}


const LinkBankDetails = () => {

    const Navigate = useNavigate()

    //  useEffect(() => {
    //      checkIsBankAccountLinked()
    //  },[])

     const checkIsBankAccountLinked = async (req, res) => {
         try {
             await axios.get("http://localhost:5000/api/v1/user/cibal", {
                 withCredentials:true
             }).then(response => {
                 console.log(response);
                 if (!response.data.bankAccount) {
                     return
                 }
                 window.location.reload()
             })
         } catch (err) {
             Navigate('/')
             console.log(err);
             return
         }
     }

    const [placeOtp, setPlaceOtp] = useState(false)

    const [validated, setValidated] = useState(false)

    const [error, setError] = useState({
        account_number: '',
        card_number: '',
        cvv: '',
        cardholder: '',
        expiry_date: '',
    });

    const [bankDetails, setBankDetails] = useState({
        account_number: '',
        card_number: '',
        cvv: '',
        cardholder: '',
        expiry_date: '',
    });

    const [verifyOTP, setVerifyOTP] = useState({
        otp: ''
    })

    const handleBankDetails = (e) => {
        const targetName = e.target.name
        let valid = { status: true, value: e.target.value }

        const validateFn = fieldValidations[targetName]
        if (typeof validateFn === "function") {
            valid = validateFn(valid.value) // boolean value
            //console.log(valid)
        }
        if (!valid.status) {
            setError({
                ...error,
                [targetName]: valid.error
            })
            return
        } else {
            setError({
                ...error,
                [targetName]: ""
            })
        }

        let x = { ...bankDetails };
        x[targetName] = valid.value;
        setBankDetails(x);
        console.log(bankDetails)
    };

    const handleOtpChange = (e) => {
        const { name, value } = e.target
        setVerifyOTP({
            ...verifyOTP,
            [name]: value
        })
        console.log(verifyOTP);
    }

    const handleOtpSubmit = async (e) => {
        e.preventDefault()
        if (!verifyOTP.otp) {
            alert('Please enter OTP')
            return
        }
        try {
            await axios.post("http://localhost:5000/api/v1/bank/check-otp", verifyOTP, {
                withCredentials: true
            }).then(response => {
                console.log(response);
                Navigate("/user-panel/bank-details-final")
            })
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async (e) => {
        console.log("button working!")
        e.preventDefault();

        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation()
        }
        else {
            setValidated(true)
        }

        let isFormEmpty = false;

        for (let x in bankDetails) {
            if (bankDetails[x] === '') {
                console.log("bank details", x, bankDetails[x]);
                isFormEmpty = true;

                break
                //return false;
            }

        }

        if (isFormEmpty === false) {
            try {
                await axios.post("http://localhost:5000/api/v1/bank/getBankAccount", bankDetails, {
                    withCredentials: true
                }).then(response => {
                    console.log(response);
                    setPlaceOtp(true)
                })
            } catch (err) {
                console.log(err);
            }
        }

    };


    return (
        <>
            <div style={{ display: !placeOtp ? "block" : "none" }}>
                <Form className="container mt-3 mb-3" autoComplete='off' validated={validated} hasValidation>
                    <Row className="mb-3">
                        {/* <Alert>{error.expiry_date}</Alert> */}
                        <div className="p-4 title"><MDBBadge pill color='info' light>Bank Details</MDBBadge></div>
                    </Row>

                    <Row className="mb-4">
                        {/* BANK ACCOUNT NUMBER */}
                        <Form.Group controlId="formBasicEmail" className="col col-sm-12">
                            <Form.Control.Feedback style={{ display: error.account_number ? "block" : "none" }} type='invalid'>{error.account_number}</Form.Control.Feedback>
                            <Form.Label><MDBBadge pill color='info' light>BANK ACCOUNT NUMBER</MDBBadge></Form.Label>
                            <Form.Control type="account_number" name="account_number" className="form-control" value={bankDetails.account_number} onChange={handleBankDetails} required />
                            <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>Please provide your 14 digit bank account number</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-4">
                        {/* CREDIT/DEBIT CARD INFO */}
                        <Form.Group controlId="formBasicEmail" className="col col-sm-8">
                            <Form.Control.Feedback style={{ display: error.card_number ? "block" : "none" }} type='invalid'>{error.card_number}</Form.Control.Feedback>
                            <Form.Label><MDBBadge pill color='info' light>CREDIT / DEBIT CARD NUMBER</MDBBadge></Form.Label>
                            <Form.Control type="card_number" name="card_number" className="form-control" value={bankDetails.card_number} onChange={handleBankDetails} required />
                            <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>Please provide your credit/debit card number</Form.Control.Feedback>
                        </Form.Group>
                        {/* CVV */}
                        <Form.Group controlId="formBasicEmail" className="col col-sm-4">
                            <Form.Control.Feedback style={{ display: error.cvv ? "block" : "none" }} type='invalid'>{error.cvv}</Form.Control.Feedback>
                            <Form.Label><MDBBadge pill color='info' light>CVV</MDBBadge></Form.Label>
                            <Form.Control type="password" name="cvv" className="form-control" value={bankDetails.cvv} onChange={handleBankDetails} required />
                            <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>Please enter your cvv</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        {/* CARD HOLDER"S NAME*/}
                        <Form.Group controlId="formGridpin" className="col col-sm-8">
                            <Form.Control.Feedback style={{ display: error.cardholder ? "block" : "none" }} type='invalid'>{error.cardholder}</Form.Control.Feedback>
                            <Form.Label><MDBBadge pill color='info' light>CARD HOLDER'S NAME</MDBBadge></Form.Label>
                            <Form.Control className="form-control" type="text" name="cardholder" value={bankDetails.cardholder} onChange={handleBankDetails} required />
                            <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>Please provide the name on the card</Form.Control.Feedback>
                        </Form.Group>
                        {/* CARD EXPIRY DATE */}
                        <Form.Group controlId="formGridpin" className="col col-sm-4">
                            <Form.Control.Feedback style={{ display: error.expiry_date ? "block" : "none" }} type='invalid'>{error.expiry_date}</Form.Control.Feedback>
                            <Form.Label><MDBBadge pill color='info' light>EXPIRY DATE</MDBBadge></Form.Label>
                            <Form.Control className="form-control" type="date" name="expiry_date" value={bankDetails.expiry_date} onChange={handleBankDetails} required />
                            <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>Please provide the expiry date of your card</Form.Control.Feedback>
                        </Form.Group>
                    </Row>

                    <div className="p-2"></div>

                    {/* SUBMIT BUTTON */}
                    <div className="text-center p-3 mb-3" >
                        <Button variant="outline-primary" size="lg  " onClick={handleSubmit}>
                            Submit
                        </Button>
                    </div>

                </Form>
            </div>

            <div style={{ display: placeOtp ? "block" : "none" }}>

                {/* OTP */}
                <Form>
                    <Row>
                        <Form.Group controlId="formGridpin" className="col col-sm-6">
                            <Form.Label>A mail containing the OTP has been sent to your email address registered with the bank account</Form.Label>
                            <Form.Control className="form-control" type="text" name="otp" value={verifyOTP.otp} onChange={handleOtpChange} />
                        </Form.Group>
                    </Row>

                    <Row>
                        <Form.Group controlId="formGridCheckbox" className="col col-sm-5">
                            <Button onClick={handleOtpSubmit} className="me-4 mt-4 btn-xs">Check OTP</Button>
                        </Form.Group>
                    </Row>
                </Form>

            </div>

        </>
    );
}

export default LinkBankDetails

// 1. bank account number >> check button
// 2. credit/debit card number >> check button
// 3. cvv >> check button
// 4. expiry date >> check button
