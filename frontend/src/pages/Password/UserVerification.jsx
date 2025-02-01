import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    MDBContainer,
    MDBInput,
    MDBBtn,
    MDBIcon,
    MDBValidation,
    MDBValidationItem,
    MDBBadge
}
    from 'mdb-react-ui-kit';
import { Form } from 'react-bootstrap';
import axios from 'axios';

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
    mobile: validateMobile,
    dob: validateDob,
    email: validateEmail
}


function UserVerification() {
    const {userToken} = useParams()

    const [data, setData] = useState({
        email: '',
        mobile: '',
        dob:''
    })

    const [error, setError] = useState({
        email: '',
        mobile: '',
        dob:''
    })

    const Navigate = useNavigate();

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
        let x = { ...data };
        x[targetName] = valid.value;
        setData(x);
    }

    const confirmData = async (e) => {
        if (!data.email || !data.mobile || !data.dob) {
            return
        }
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/api/v1/admin/verify/user/${userToken}`, data, {
                withCredentials:true
            }).then(response => {
                console.log(response)
            })
        } catch (err) {
            if (err.response) {
                alert(err.response.data.msg)
                return
            } else {
                alert('Something went wronggg')
                return
            }
        }
        Navigate('/set-password');
    };

    return (
        <>
        	<MDBContainer>
        		<div className="title p-2"><MDBBadge pill color='primary' light>USER VERIFICATION</MDBBadge></div>
        	</MDBContainer>
        	
        	<MDBContainer className="p-1 my-5 d-flex flex-column w-50">
				<div className="d-flex mx-auto">
		            <h5><MDBBadge pill color='primary' light>Please enter the details which were used to register your inquiry</MDBBadge></h5>
		        </div>
        	</MDBContainer>

        <MDBValidation>
        <MDBContainer className="p-3 my-5 d-flex flex-column w-25" >
            <MDBValidationItem feedback='Please enter email' invalid>
                        <MDBInput wrapperClass='mb-5' label='Enter Email' id='form1' type='text' value={data.email} name='email' onChange={handleChange} required />
                        <p className="error" style={{
                            display: error.email ? 'block' : 'none', color: 'red'
                        }}>{error.email}</p>
                </MDBValidationItem>
                <MDBValidationItem feedback='Please enter mobile number' invalid>
                        <MDBInput wrapperClass='mb-5' label='Enter Mobile Number' id='form1' type='text' value={data.mobile} name='mobile' onChange={handleChange} required />
                        <p className="error" style={{
                            display: error.mobile ? 'block' : 'none', color: 'red'
                        }}>{error.mobile}</p>
                </MDBValidationItem>
                <MDBValidationItem feedback='Please enter date of birth' invalid>
                        <MDBInput wrapperClass='mb-4' label='Enter Date of Birth' id='form1' type='date' value={data.dob} name='dob' onChange={handleChange} required />
                        <p className="error" style={{
                            display: error.dob ? 'block' : 'none', color: 'red'
                        }}>{error.dob}</p>
            </MDBValidationItem>
            
            <MDBBtn type="submit" className="mb-4" onClick={confirmData}>Check Information</MDBBtn>
            

            <div className="text-center">

                <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='facebook-f' size="sm" />
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='twitter' size="sm" />
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='google' size="sm" />
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='github' size="sm" />
                    </MDBBtn>

                </div>
            </div>

            </MDBContainer>
            </MDBValidation>
        </>
    );
}

export default UserVerification;
