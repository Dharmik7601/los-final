import { Container, Form, Row, InputGroup, Button } from 'react-bootstrap';
import { MDBBadge } from "mdb-react-ui-kit";
import PostLoginNavBar from "../../components/NavBar/PostLoginNavBar";
import AdminSideBar from "../../components/Sidebar/AdminSideBar";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import SanctionLetter from './SanctionLetter';

function validateDate(value) {
    let error = ''
    let status = true
    var dob = new Date(value)
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms); 
    const age = Math.abs(age_dt.getUTCFullYear() - 1970);
    if (age < 0) {
        error = "Date: Invalid"
    }
    return {
        value,
        error,
        status
    }
}

//LOAN AMOUNT VALIDATION//
function validateNumber(value) {
    let error = ''
    let status = true
    // if (value.length > 10) {
    //     status = false
    //     error = 'Loan Amount: Cannot exceed 10 digits'
    // }
    for (let number of value) {
        if (isNaN(number)) {
            error = 'Number expected'
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

const fieldValidations = {
    loanTenor: validateNumber,
    // rateOfInterest: validateNumber,
    // totalProcessingCharges: validateNumber,
    originationFee: validateNumber,
    sanctionLetterValidity: validateDate,
    emi: validateNumber
}

const SanctionLetterForm = ({ setSanctionDetails }) => {
    
    const Navigate = useNavigate()

    const [loanDetails,setLoanDetails] = useState({})

    const { userId, email,loanId} = useParams()

    const [data, setData] = useState({
    loanTenor: '',
    rateOfInterest: '',
    totalProcessingCharges: '',
    originationFee:'',
    sanctionDate: new Date(Date.now()).toDateString(),
    sanctionLetterValidity: '',
    emi: ''
    })

    const [error, setError] = useState({
        loanTenor: '',
        rateOfInterest: '',
        totalProcessingCharges: '',
        originationFee:'',
        sanctionLetterValidity: '',
        emi: ''
    });

    useEffect(() => {
        getLoanDetails()
    },[])

    const getLoanDetails = async () => {
        try {
                await axios.get(`http://localhost:5000/api/v1/admin/getUser/loan/details/saction/${userId}/${email}/${loanId}`, {
                    withCredentials:true
                }).then(response => {
                    console.log(response);
                    setLoanDetails(response.data)
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
    }

    const handleChange = async (e) => {
        const targetName = e.target.name
        let valid = { status: true, value: e.target.value }
        const validateFn = fieldValidations[targetName]
        if (typeof validateFn === "function") {
            valid = validateFn(valid.value) // boolean value
        }
        if (!valid.status) {
            setError({
                ...error,
                [targetName]:valid.error
            })
            return
        } else if (valid.status && valid.error) {
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
        // console.log(error.email);
        let x = { ...data };
        x[targetName] = valid.value;
        setData(x);
        console.log(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let isFormEmpty = false;
        // const form = e.currentTarget;
        // if (form.checkValidity() === false) {
        //     e.stopPropagation()
        // }
        // setLoanValidated(true)
        for (let x in data) {
            if (data[x] === '') {
                console.log("ld data showing", x, data[x]);
                isFormEmpty = true;
                alert('Form is Empty')
                break
            }
            else {
                let sanctionDetails = {
                    loanId: loanDetails.loanId,
                    loanAmount: loanDetails.loanAmount,
                    applicantsName: loanDetails.applicantsName,
                    mobile: loanDetails.mobile,
                    email: loanDetails.email,
                    sanctionDate: data.sanctionDate,
                    sanctionLetterValidity: data.sanctionLetterValidity,
                    rateOfInterest: data.rateOfInterest,
                    loanTenor: data.loanTenor,
                    totalProcessingCharges: data.totalProcessingCharges,
                    originationFee: data.originationFee,
                    emi: data.emi,
                    loanType: loanDetails.loanType
                }
                try {
                    await axios.post(`http://localhost:5000/api/v1/admin/getUser/loan/details/saction/update/${userId}/${email}/${loanId}`, data, {
                        withCredentials: true
                    }).then(response => {
                        alert(response.data.msg);
                    })
                } catch (err) {
                    if (err.response) {
                        alert(err.response.data.msg)
                        Navigate('/')
                        return
                    } else {
                        alert('Something went wrong!!')
                        Navigate('/')
                        return
                    }
                }
            
                await setSanctionDetails(sanctionDetails)
                window.open(`/admin-panel/sanction-letter/${userId}/${email}/${loanId}`)
            }
                
        }
    }

    
            /////////////////////////////////////////Backend Code ///////////////////////////////////////////
    

    return (
        <>
            <PostLoginNavBar />
            <div style={{ display: 'flex' }}>
                <AdminSideBar />

                <Container fluid="sm" className="mt-3 mb-3">
                    <div className="p-2 title"><MDBBadge pill color='secondary' light>SANCTION LETTER FORM</MDBBadge></div>
                    <div className="p-2"></div>

                    <Row className="mb-3">

                        {/* LOAN ID */}
                        <Form.Group controlId="formBasicEmail" className="col col-sm-4">
                            <Form.Label><MDBBadge pill color='secondary' light>LOAN ID</MDBBadge></Form.Label>
                            <Form.Control type="name" name="loan_id" className="form-control" value={loanDetails.loanId} readOnly />
                        </Form.Group>

                        {/* LOAN AMOUNT */}
                        <Form.Group controlId="formGridpin" className="col col-sm-5">
                            <Form.Label><MDBBadge pill color='secondary' light>LOAN AMOUNT SANCTIONED</MDBBadge></Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="basic-addon1">₹</InputGroup.Text>
                                <Form.Control aria-label="loan amount" type="number" aria-describedby="basic-addon1" className="form-control" name="loan_amount" value={loanDetails.loanAmount} readOnly />
                            </InputGroup>
                        </Form.Group>

                        {/* SANCTION DATE */}
                        <Form.Group controlId="formGridpin" className="col col-sm-3">
                            <Form.Label><MDBBadge pill color='secondary' light>SANCTION DATE</MDBBadge></Form.Label>
                            <Form.Control className="form-control" type="text" name="sanction_date" value={new Date(Date.now()).toDateString()} readOnly />
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">
                        {/* APPLICANT NAME */}
                        <Form.Group controlId="formGridpin" className="col col-sm-6">
                            <Form.Label><MDBBadge pill color='secondary' light>APPLICANT'S NAME</MDBBadge></Form.Label>
                            <Form.Control className="form-control" type="name" name="name" value={loanDetails.applicantsName} readOnly />
                        </Form.Group>

                        {/* MOBILE */}
                        <Form.Group controlId="formBasicMobile" className="col col-sm-6">
                            <Form.Label><MDBBadge pill color='secondary' light>APPLICANT'S MOBILE NUMBER</MDBBadge></Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                                <Form.Control aria-label="Mobile Number" type="mobile" aria-describedby="basic-addon1" className="form-control" name="mobile" value={loanDetails.mobile} readOnly />
                            </InputGroup>
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        {/* APPLICANT'S EMAIL */}
                        <Form.Group controlId="formBasicEmail" className="col col-sm-8">
                            <Form.Label><MDBBadge pill color='secondary' light>APPLICANT'S EMAIL</MDBBadge></Form.Label>
                            <Form.Control type="name" name="email" className="form-control" value={loanDetails.email} readOnly />
                        </Form.Group>

                        {/* LOAN TENOR */}
                        <Form.Group controlId="formBasicMobile" className="col col-sm-4">
                            <Form.Label><MDBBadge pill color='secondary' light>LOAN TENOR</MDBBadge></Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control aria-label="Loan Tenor" type="text" aria-describedby="basic-addon1" className="form-control" name="loanTenor" onChange={handleChange} value={data.loanTenor} required />
                                <InputGroup.Text id="basic-addon1">years</InputGroup.Text>
                                <Form.Control.Feedback style={{ display: error.loanTenor ? 'block' : 'none' }} type='invalid'>{error.loanTenor}</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        {/* RATE OF INTEREST */}
                        <Form.Group className=" col col-sm-8" controlId="formGridAddress1">
                            <Form.Label><MDBBadge pill color='secondary' light>RATE OF INTEREST</MDBBadge></Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control aria-label="roi" type="number" aria-describedby="basic-addon1" className="form-control" name="rateOfInterest" value={data.rateOfInterest} onChange={handleChange} required />
                                <InputGroup.Text id="basic-addon1">%</InputGroup.Text>
                            </InputGroup>
                            <Form.Control.Feedback type='invalid'>Please provide this information.</Form.Control.Feedback>
                            <Form.Control.Feedback style={{ display: error.rateOfInterest ? 'block' : 'none' }} type='invalid'>{error.rateOfInterest}</Form.Control.Feedback>
                        </Form.Group>

                        {/* TOTAL PROCESSING CHARGES */}
                        <Form.Group controlId="formGridpin" className="col col-sm-4">
                            <Form.Label><MDBBadge pill color='secondary' light>TOTAL PROCESSING CHARGES</MDBBadge></Form.Label>
                            <InputGroup hasValidation>
                                
                                <Form.Control aria-label="processing charges" type="number" aria-describedby="basic-addon1" className="form-control" name="totalProcessingCharges" value={data.totalProcessingCharges} onChange={handleChange} required />
                                <InputGroup.Text id="basic-addon1">% of loan amount</InputGroup.Text>
                            </InputGroup>
                            <Form.Control.Feedback style={{ display: error.totalProcessingCharges ? 'block' : 'none' }} type='invalid'>{error.totalProcessingCharges}</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>Please provide this information.</Form.Control.Feedback>
                        </Form.Group>

                    </Row>

                    <Row className="mb-3">

                        {/* ORIGINATION FEE (INCLUSIVE OF GST) */}
                        <Form.Group controlId="formGridCity" className="col col-sm-4">
                            <Form.Label><MDBBadge pill color='secondary' light>ORIGINATION FEE (INCLUSIVE OF GST)</MDBBadge></Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="basic-addon1">₹</InputGroup.Text>
                                <Form.Control aria-label="originationFee" value={data.originationFee} type="text" aria-describedby="basic-addon1" className="form-control" onChange={handleChange} name="originationFee" required />
                            </InputGroup>
                            <Form.Control.Feedback style={{ display: error.originationFee ? 'block' : 'none' }} type='invalid'>{error.originationFee}</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>Please provide this information.</Form.Control.Feedback>
                        </Form.Group>

                        {/* SANCTION LETTER VALIDITY */}
                        <Form.Group controlId="formGridState" className="col col-sm-4">
                            <Form.Label><MDBBadge pill color='secondary' light>SANCTION LETTER VALIDITY</MDBBadge></Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control aria-label="validity" type="date" aria-describedby="basic-addon1" className="form-control" name="sanctionLetterValidity" value={data.sanctionLetterValidity} required onChange={handleChange} />
                                {/* <InputGroup.Text id="basic-addon1">months</InputGroup.Text> */}
                            </InputGroup>
                            <Form.Control.Feedback style={{ display: error.sanctionLetterValidity ? 'block' : 'none' }} type='invalid'>{error.sanctionLetterValidity}</Form.Control.Feedback>
                            <Form.Control.Feedback type='invalid'>Please provide this information.</Form.Control.Feedback>
                        </Form.Group>

                        {/* EMI (INR) */}
                        <Form.Group controlId="formGridpin" className="col col-sm-4">
                            <Form.Label><MDBBadge pill color='secondary' light>EMI</MDBBadge></Form.Label>
                            <InputGroup hasValidation>
                                <InputGroup.Text id="basic-addon1">₹</InputGroup.Text>
                                <Form.Control aria-label="emi (inr)" type="text" aria-describedby="basic-addon1" className="form-control" name="emi" value={data.emi} required onChange={handleChange}/>
                                <Form.Control.Feedback style={{ display: error.emi ? 'block' : 'none' }} type='invalid'>{error.emi}</Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                    </Row>

                    <div className="p-2"></div>

                    <div className="footer text-center">
                        <Button type="submit" className="me-4 btn-secondary btn-lg" onClick={handleSubmit} >Submit</Button>
                    </div>

                </Container>

            </div>
        </>
    );
}

export default SanctionLetterForm
