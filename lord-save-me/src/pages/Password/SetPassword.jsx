import React, { useState } from 'react';
import {
    MDBContainer,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon,
    MDBValidationItem,
    MDBValidation,
    MDBModalContent
}
    from 'mdb-react-ui-kit';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SetPassword({ setLoginToken, loginToken }) {
    
    const Navigate = useNavigate()
    const [error, setError] = useState('')
    const [password, setPassword] = useState({
        pass: '',
        re_pass: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(name,value)
        setPassword({
            ...password,
            [name]:value
        })
        console.log(password);
    }

    const sendPass = async (e) => {
        if (password.pass !== password.re_pass) {
            setError('Password does not match')
            return
        }
        try {
            await axios.put('http://localhost:5000/api/v1/user/set-password', password, {
                withCredentials:true
            }).then(response => {
                console.log(response)
            })
        } catch (err) {
            if (err.response) {
                alert(err.response.data.msg)
                return
            } else {
                alert('Something went wrong')
                return
            }
        }
        Navigate('/login/client')
    }

    return (
        <div>
        <MDBValidation>
        <MDBContainer className="p-3 my-5 d-flex flex-column w-25">
            <div className="d-flex mx-auto">
                <p>Set a Strong Password</p>
            </div>
            <MDBValidationItem feedback='Please enter your password' invalid >
                    <MDBInput wrapperClass='mb-4' id='form1' type='password' onChange={handleChange} name='pass' value={password.pass} autoComplete='off' placeholder='Password' required />
                </MDBValidationItem>
            <MDBValidationItem feedback='Please Re-enter your password' invalid >
                    <MDBInput wrapperClass='mb-4' placeholder='Re-enter Password' onChange={handleChange} name='re_pass' value={password.re_pass} id='form2' type='password' autoComplete='off' required />
            </MDBValidationItem>        

            <div className="d-flex justify-content-between mx-3 mb-4">
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Show Password' />
            </div>

            <MDBBtn className="mb-4" onClick={sendPass}>Confirm New Password</MDBBtn>

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
    </div>
    );
}

export default SetPassword;