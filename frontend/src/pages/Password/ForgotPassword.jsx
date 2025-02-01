import React from 'react';
import { MDBContainer, MDBInput, MDBBtn, MDBIcon, MDBBadge } from 'mdb-react-ui-kit';

function ForgotPassword() {
    return (
    <>
    	<MDBContainer>
        	<div className="title p-2"><MDBBadge pill color='primary' light>RESET PASSWORD</MDBBadge></div>
        </MDBContainer>
        
        <MDBContainer className="p-1 my-5 d-flex flex-column w-50">
			<div className="d-flex mx-auto">
                <h5><MDBBadge pill color='primary' light>Please enter your Registered Email</MDBBadge></h5>
            </div>
        </MDBContainer>
    	
        <MDBContainer className="p-3 my-5 d-flex flex-column w-25">

            <MDBInput wrapperClass='mb-4' label='Registered Email' id='form1' type='email' />

            <MDBBtn className="mb-4">Send Link</MDBBtn>

            

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
        
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        	<div className="d-flex text-center mx-auto">
                <h5><MDBBadge pill color='primary' light>A password reset link will be sent to your registered email</MDBBadge></h5>
            </div>
        </MDBContainer>
        </>
    );
}

export default ForgotPassword;
