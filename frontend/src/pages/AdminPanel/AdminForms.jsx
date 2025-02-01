import React, { useEffect, useState } from "react";
import PersonalDetails from "../../pages/Register/PersonalDetails";
import LoanDetails from "../../pages/Register/LoanDetails";
import { useNavigate } from 'react-router-dom';
import './AdminForms.css';
import axios from 'axios';
import { MDBBadge } from "mdb-react-ui-kit";
import { Alert, Button, Col, Container, Navbar, Row } from "react-bootstrap";
import { MultiStepProgressBar } from "../../components/MultiStepProgressBar/MultiStepProgressBar";

//PINCODE VALIDATION//
function validatePinCode(value) {
    let status = true
    let error = ''
    if (value.length < 6) {
        error = 'Pincode: Should be exactly 6 digits'
    }
    if (value.length > 6 || value === '') {
        status = false
        // error = 'Pincode: Cannot exceed 6 digits'
    }
    
    if (isNaN(value) && typeof value !== "undefined") {
        status = false
        error = 'Pincode: Number expected'
    }

    return {
        status,
        value,
        error
    }
}

// USERNAME VALIDATION//
function validateName(value) {
    let error = ''
    let status = true
    for (let letter of value) {
        if (!isNaN(letter)) {
            error = "Name: Letter expected"
            status = false
            break
        }
    }
    return {
        status,
        value: value.toLocaleUpperCase(),
        error
    }
}

//MOBILE NUMBER VALIDATION//
function validateMobile(value) {
    let error = ''
    let status = true
    if (value.length < 10) {
        error= 'Mobile: should be of exact 10 digits'
    }
    if (value.length > 10 || value.length === '') {
        status = false
        // error = 'Mobile: Cannot be empty or accept more than 10 digits'
    }
    for (let number of value) {
        if (isNaN(number)) {
            error = "Mobile: Number expected"
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

//DATE OF BIRTH VALIDATION//
function validateDob(value) {
    let error = ''
    let status = true
    var dob = new Date(value)
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
    const age = Math.abs(age_dt.getUTCFullYear() - 1970);
    if (age < 21) {
        error = "Age: Should be above 20"
    }
    return {
        value,
        error,
        status
    }
}

//LOAN AMOUNT VALIDATION//
function validateLoanAmount(value) {
    let error = ''
    let status = true
    if (value.length > 10) {
        status = false
        error = 'Loan Amount: Cannot exceed 10 digits'
    }
    for (let number of value) {
        if (isNaN(number)) {
            error = 'Loan Amount: Number expected'
            status = false
            break
        }
    }
    return {
        value,
        error,
        status
    }
}

//EMAIL VALIDATION//
function validateEmail(value) {
    let error = ''
    let status = true
    if (!value.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
        // status = false
        error = 'Email: Please enter a valid email'
    }
    return {
        status,
        value,
        error
    }
}

//ASSIGNING VALIDATION FUCNTIONS//
const fieldValidations = {
    pin: validatePinCode,
    first_name: validateName,
    middle_name: validateName,
    last_name: validateName,
    mobile: validateMobile,
    dob: validateDob,
    loanAmount: validateLoanAmount,
    email: validateEmail
}

//MAIN CONTENT FOR FORMS STARTS HERE//
function AdminForms({ loan_type, country, setLoginToken }) {
    const [page, setPage] = useState(0); 
    const [error, setError] = useState({
        pin: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        mobile: '',
        dob:''
    });
    const [personalDetails, setPersonalDetails] = useState({
        //personal details
        salutation: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        gender: '',
        dob: '',
        mobile: '',
        email: '',
        address: '',
        pin: '',
        city: '',
        state: '',
        country: country,
    });
    const [loanDetails, setLoanDetails] = useState({
        loanAmount: '',
        loanType: loan_type, //display | not input
        empStatus: '', //professional | business
        firmAddress: '',
        businessName: ''
    })  //loan details

    const [check, setCheck] = useState({
        mobile: '',
        email:''
    })

    const [validated,setValidated] = useState(false)
    const [loanValidated, setLoanValidated] = useState(false)
    
    const [progressStep, setProgressStep] = useState(1);

    const handlePersonalDetails = async (e) => {
        const targetName = e.target.name
        let valid = { status: true, value: e.target.value }
        const validateFn = fieldValidations[targetName]
        if (targetName === 'mobile' || targetName === 'email') {
            let error = ''
            const data = {
                [targetName] : e.target.value
            }
            const tag = targetName.toLocaleUpperCase()
            await axios.post("http://localhost:5000/api/v1/user/cia", data).then(response => {
            console.log(response.data.available)
            if (!response.data.available) {
                console.log("here");
                error = `${tag}: already taken.`
            }
            })
            setCheck({
                    ...check, 
                    [targetName]:error
                })
        }
        if (typeof validateFn === "function") {
            valid = validateFn(valid.value) // boolean value
        }
        if (!valid.status) {
            setError({
                ...error,
                [targetName]:valid.error
            })
            return
        } else if ((targetName === 'mobile' || targetName === 'pin' || targetName ==='dob' || targetName ==='email') && valid.status && valid.error) {
            setError({
                ...error,
                [targetName]:valid.error
            })
        }
        else {
            setError({
                ...error,
                [targetName]:''
            })
        }
        let x = { ...personalDetails };
        x[targetName] = valid.value;
        setPersonalDetails(x);
    };

    const handleLoanDetails = async (e) => {
        const targetName = e.target.name
        let valid = { status: true, value: e.target.value }

        const validateFn = fieldValidations[targetName]
        
        if (typeof validateFn === "function") {
            valid = validateFn(valid.value) 
        }
        if (!valid.status) {
            console.log(valid.error);
            setError({
                ...error,
                [targetName]:valid.error
            })
            return
        } else {
            setError({
                ...error,
                [targetName]: ''
            })
        }

        let x = { ...loanDetails };
        x[targetName] = valid.value;
        setLoanDetails(x);
    };

    const Navigate = useNavigate();

    const handleSubmit = async (step, e) => {
        e.preventDefault();

        
        let isFormEmpty = false;

        if (step === "Next") {
            const form = e.currentTarget;
            if (form.checkValidity() === false) {
                e.stopPropagation()
            }
            else {
                setValidated(true)
            }
            for (let x in personalDetails) {
                if (personalDetails[x] === '') {
                    console.log("pd data showing", x, personalDetails[x]);
                    isFormEmpty = true;
                    break
                }
                else {
                    // return true;
                }
            }
        }
        if (step === "Submit") {
            const form = e.currentTarget;
            if (form.checkValidity() === false) {
                e.stopPropagation()
            }
            setLoanValidated(true)
            for (let x in loanDetails) {
                if (loanDetails[x] === '') {
                    console.log("ld data showing", x, loanDetails[x]);
                    isFormEmpty = true;
                    break
                }
                else {
                    // return true;
                }
            }
        }

        if (page === FormTitles.length - 1 && isFormEmpty === false) {
            console.log(personalDetails);
            console.log(loanDetails);
            const user = {
                salutation: personalDetails.salutation,
                first_name: personalDetails.first_name,
                middle_name: personalDetails.middle_name,
                last_name: personalDetails.last_name,
                gender: personalDetails.gender,
                dob: personalDetails.dob,
                mobile: personalDetails.mobile,
                email: personalDetails.email,
                address: personalDetails.address,
                pin: personalDetails.pin,
                city:personalDetails.city,
                state:personalDetails.state,
                country: personalDetails.country,
                loanAmount: loanDetails.loanAmount,
                loanType: loanDetails.loanType, //display | not input
                empStatus: loanDetails.empStatus, //professional | business
                firmAddress: loanDetails.firmAddress,
                businessName: loanDetails.businessName
            }
            /////////////////////////////////////////Backend Code ///////////////////////////////////////////
            try {
                await axios.post('http://localhost:5000/api/v1/admin/create/user', personalDetails, {
                    withCredentials:true
                }).then(response => {
                    console.log(response);
                    // setLoginToken(response.data.user)
                })
            } catch (err) {
                if (err.response) {
                    alert(err.response.data.msg)
                    return
                } else {
                    alert('Something went wrong!!')
                    return
                }
            }

            try {
                await axios.post('http://localhost:5000/api/v1/loan/create', {loanDetails,email:personalDetails.email}, {
                    withCredentials:true
                }).then(response => {
                    alert(response.data.msg)
                    window.location.reload()
                })
            } catch (err) {
                if (err.response) {
                    alert(err.response.data.msg)
                    return
                } else {
                    alert('Something went wrong 222!!')
                    return
                }
            }

             /////////////////////////////////////////Backend Code ///////////////////////////////////////////
        } else {
            if (!isFormEmpty) {
                if (personalDetails.pin.length < 6 || personalDetails.mobile.length < 10 || error.dob || error.email) {
                    return
                }
                console.log('form is not empty')
                setValidated(false)
                setPage((currentPage) => currentPage + 1);
                if (progressStep < 2) {
                    setProgressStep(progressStep => progressStep + 1);
                }
            }
        }

    };

    const FormTitles = ["Personal Details", "Loan Details"];

    

    const pageDisplay = () => {
        if (page === 0) {
            return <PersonalDetails personalDetails={personalDetails} setPersonalDetails={handlePersonalDetails} validated={validated} error={error} check={check} />;
        } else {
            return <LoanDetails loanDetails={loanDetails} setLoanDetails={handleLoanDetails} loanValidated={loanValidated} error={error} chech={check} />;
        }
    };
    return (
        <>
        <div className="form">
            
            <div className="form-container">
                
                <Container className="h-100">
                    <Row className="h-100">
                        <Col className="align-self-center">
                            <MultiStepProgressBar step={progressStep} />
                        </Col>
                    </Row>
                </Container>
                <div className="header text-center">
                    <div className="p-2 title"><MDBBadge pill color='secondary' light>{FormTitles[page]}</MDBBadge></div>
                </div>
                <div className="body">{pageDisplay()}</div>
                <div className="footer text-center">
                    <button
                        type="button"
                        //onClick={submitButton} 
                        className="me-4 btn btn-danger btn-lg"
                        disabled={page === 0}
                        onClick={() => {
                            setPage((currentPage) => currentPage - 1);
                            if (progressStep === 2) {
                                setProgressStep(1);
                            }
                        }}>Previous</button> 

                    <Button
                        type="submit"
                        className="me-4 btn btn-success btn-lg"
                        //  disabled={!validated}
                        onClick={(e) => handleSubmit(page === FormTitles.length - 1 ? "Submit" : "Next", e)}
                    >
                        {page === FormTitles.length - 1 ? "Submit" : "Next"}
                    </Button>
                </div>
            </div>
            </div>
            </>
    );
}

export default AdminForms


// PAN number validation

// function validatePAN(value) {
//     let status = true
//     let error = ''
//     if (value.length > 10) {
//         status = false
//         error = 'Pincode: can not accept more than 10.'
//     }
//     if (isNaN(value[5]) && typeof value[5] !== "undefined") {
//         status = false
//         error = 'Pincode: number expected'
//     }

//     if (value[9] && !isNaN(value[9])) {
//         status = false
//         error = 'Pincode: letter expected'
//     }

//     return {
//         status,
//         value: value.toLocaleUpperCase(),
//         error
//     }
// }
