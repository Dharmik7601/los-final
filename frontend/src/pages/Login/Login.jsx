import React, { useState } from 'react';
//import { MDBIcon } from 'mdbreact';
import './Login.css';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox, MDBValidation, MDBValidationItem } from 'mdb-react-ui-kit';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';

function Login() {


    const Navigate = useNavigate()

    const [userOtp, setUserOtp] = useState({
        otp: ''
    })

    const [token, setToken] = useState({
        token: ''
    })

    const [isOtp, setIsOtp] = useState(false)


    const [user, setUser] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        })
        console.log(user)
    }

    const handleOtp = (e) => {
        const { name, value } = e.target;
        setUserOtp({
            ...userOtp,
            [name]: value
        })
        console.log(userOtp)
    }

    const checkLogin = async () => {
        if (!user.password || !user.email) {
            return
        }
        try {
            await axios.post('http://localhost:5000/api/v1/user/login', user, {
                withCredentials: true
            }).then(response => {
                console.log(response)
                alert(response.data.msg)
                setToken(response.data.user.token)
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
        setIsOtp(true)
    }

    const checkUserOtp = async () => {
        if (userOtp.otp === '') {
            return
        }
        try {
            await axios.post('http://localhost:5000/api/v1/user/check-login-otp', userOtp, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                withCredentials: true
            }).then(response => {
                console.log(response)
                if (response.data.user && !response.data.admin) {
                    Navigate('/user-panel/user-dashboard')
                    return
                }
                else{
                    Navigate('/admin-panel/admin-dashboard')
                    return
                }
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
    }

    return (
        <>
            <NavBar />
            <MDBContainer fluid className="p-3 my-5 h-custom">


                <MDBRow>

                    <MDBCol col='10' md='6'>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
                    </MDBCol>

                    <MDBCol col='4' md='6'>

                        <div className="d-flex flex-row align-items-center justify-content-center">

                            <p className="lead fw-normal mb-0 me-3">Connect with us</p>

                            <MDBBtn floating size='md' tag='a' className='me-2'>
                                <MDBIcon fab icon='facebook-f' />
                            </MDBBtn>

                            <MDBBtn floating size='md' tag='a' className='me-2'>
                                <MDBIcon fab icon='twitter' />
                            </MDBBtn>

                            <MDBBtn floating size='md' tag='a' className='me-2'>
                                <MDBIcon fab icon='linkedin-in' />
                            </MDBBtn>

                        </div>

                        <div className="divider d-flex align-items-center my-4">
                            <p className="text-center fw-bold mx-3 mb-0">Login</p>
                        </div>
                        <div style={{ display: !isOtp ? 'block' : 'none' }}>
                            <MDBValidation>
                                <MDBValidationItem feedback='Please enter email' invalid>
                                    <MDBInput wrapperClass='mb-4' placeholder='Email address' name='email' value={user.email} id='formControlLg' type='email' size="lg" onChange={handleChange} required />
                                </MDBValidationItem>
                                <MDBValidationItem feedback='Please enter password' invalid>
                                    <MDBInput wrapperClass='mb-4' placeholder='Password' id='formControlLg' name='password' value={user.password} type='password' size="lg" autoComplete='new-password' onChange={handleChange} required />
                                </MDBValidationItem>


                                <div className="d-flex justify-content-between mb-4">
                                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                                    <a href="/forgot-password/:id">Forgot password?</a>
                                </div>

                                <div className='text-center text-md-start mt-4 pt-2'>
                                    <MDBBtn className="mb-0 px-5" size='lg' onClick={checkLogin}>Login</MDBBtn>

                                    <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <a href="/" className="link-danger">Register</a></p>
                                </div>
                            </MDBValidation>
                        </div>
                        <div style={{ display: isOtp ? 'block' : 'none' }}>
                            <MDBValidation>
                                <MDBContainer className="p-5 my-5 d-flex flex-column w-20" >
                                    <div className="d-flex align-items-center my-10">
                                        <p className="text-center mb-0">An email has been sent with OTP</p>
                                    </div>
                                    <MDBValidationItem feedback='Please enter OTP' invalid>
                                        <MDBInput wrapperClass='mb-4' placeholder='Enter OTP' onChange={handleOtp} size="lg" id='formControlLg' type='text' name='otp' value={userOtp.otp} required />
                                    </MDBValidationItem>

                                    <MDBBtn type="submit" className="mb-4" onClick={checkUserOtp} >Check OTP</MDBBtn>
                                    <div className="text-center">
                                        <p><a href="#!">Resend OTP</a></p>
                                        <p><a href="/login/client">Back</a></p>
                                    </div>
                                </MDBContainer>
                            </MDBValidation>
                        </div>

                    </MDBCol>
                </MDBRow>



                <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">

                    <div className="text-white mb-3 mb-md-0">
                        Copyright © 2023. All rights reserved.
                    </div>

                    <div>

                        <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
                            <MDBIcon fab icon='facebook-f' size="md" />
                        </MDBBtn>

                        <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
                            <MDBIcon fab icon='twitter' size="md" />
                        </MDBBtn>

                        <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
                            <MDBIcon fab icon='google' size="md" />
                        </MDBBtn>

                        <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
                            <MDBIcon fab icon='linkedin-in' size="md" />
                        </MDBBtn>

                    </div>

                </div>

            </MDBContainer>
        </>
    );
}

export default Login