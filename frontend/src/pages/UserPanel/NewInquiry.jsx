import React, { useState } from "react";
import LoanDetails from "../Register/LoanDetails";
import { useNavigate } from 'react-router-dom';
import './NewInquiry.css';
import { Button } from "react-bootstrap";
import { MDBBadge } from "mdb-react-ui-kit";
import axios from 'axios'

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

//ASSIGNING VALIDATION FUCNTIONS//
const fieldValidations = {
    loanAmount: validateLoanAmount,
}

//MAIN CONTENT FOR FORMS STARTS HERE//
function NewInquiry({ loan_type, country, setLoginToken }) {

    const [error, setError] = useState({
        pin: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        mobile: '',
        dob:''
    });

    const [loanDetails, setLoanDetails] = useState({
        loanAmount: '',
        loanType: loan_type, //display | not input
        empStatus: '', //professional | business
        firmAddress: '',
        businessName: ''
    })  //loan details

    const [loanValidated, setLoanValidated] = useState(false);

    const handleLoanDetails = (e) => {
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        let isFormEmpty = false;
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

        if (isFormEmpty === false) {
            console.log(loanDetails);
            const user = {
                loanAmount: loanDetails.loanAmount,
                loanType: loanDetails.loanType, //display | not input
                empStatus: loanDetails.empStatus, //professional | business
                firmAddress: loanDetails.firmAddress,
                businessName: loanDetails.businessName
            }

            try {
                await axios.post('http://localhost:5000/api/v1/loan/add-inquiry', loanDetails, {
                    withCredentials:true
                }).then(response => {
                    // setLoginToken(response.data.user)
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
            alert('Inquiry added')
            window.location.reload()
        }
    };

    const pageDisplay = () => {
            return <LoanDetails loanDetails={loanDetails} setLoanDetails={handleLoanDetails} loanValidated={loanValidated} error={error} />;
        };

    return (
        <>
        <div className="form">
            
            <div className="form-container">
                
                <div className="header text-center">
                    <div className="p-4 title"><MDBBadge pill color='secondary' light>Loan Details</MDBBadge></div>
                </div>
                <div className="body">{pageDisplay()}</div>
                <div className="footer text-center">
                    
                    <Button
                        type="submit"
                        className="me-4 btn btn-success btn-lg"
                        //  disabled={!validated}
                        onClick={handleSubmit}
                    >Submit</Button>
                </div>
            </div>
            </div>
            </>
    );
};

export default NewInquiry