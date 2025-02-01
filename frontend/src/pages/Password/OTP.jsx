import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MDBContainer, MDBInput, MDBBtn, MDBIcon, MDBValidation, MDBValidationItem, MDBBadge } from 'mdb-react-ui-kit';
import { Form } from 'react-bootstrap';
import axios from 'axios';

function OTP({ setLoginToken, loginToken }) {

    const [data, setData] = useState({ otp : '' })
    
    const Navigate = useNavigate();

    const handleChange = (e) => {
        const { value, name } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    const ConfirmOTP = async (e) => {
        if (!data.otp) {
            return
        }
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/v1/proxyUser/create/check-otp', data, {
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
        <MDBValidation>
        
        <MDBContainer>
        	<div className="title p-2"><MDBBadge pill color='primary' light>AN OTP HAS BEEN SENT TO YOUR EMAIL</MDBBadge></div>
        </MDBContainer>
        
        <MDBContainer className="my-5 d-flex flex-column w-50">
			<div className="d-flex mx-auto">
                <h5><MDBBadge pill color='primary' light>Please enter the 6 character OTP</MDBBadge></h5>
            </div>
        </MDBContainer>
        
        <MDBContainer className="p-3 my-5 d-flex flex-column w-25" >
            
            <MDBValidationItem feedback='Please enter OTP' invalid>
                    <MDBInput wrapperClass='mb-4' label='Enter OTP' id='form1' type='text' value={data.otp} name='otp' onChange={handleChange} required />
            </MDBValidationItem>
            
            <MDBBtn type="submit" color="primary" className="mb-4" onClick={ConfirmOTP}>Check OTP</MDBBtn>
            

            <div className="text-center">
                <h5><MDBBadge pill color='info' light className="mb-2"><a href="#!">Resend OTP</a></MDBBadge></h5>

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
    );
}

export default OTP;
