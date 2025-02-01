import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function Footer() {
    return (
        <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
            <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
                <div className='me-5 d-none d-lg-block'>
                    <span>Get connected with us on social networks:</span>
                </div>

                <div>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon color='secondary' fab icon='facebook-f' />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon color='secondary' fab icon='twitter' />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon color='secondary' fab icon='google' />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon color='secondary' fab icon='instagram' />
                    </a>
                    <a href='' className='me-4 text-reset'>
                        <MDBIcon color='secondary' fab icon='linkedin' />
                    </a>
                    <a href='https://github.com/aryan-michael/los-final' className='me-4 text-reset'>
                        <MDBIcon color='secondary' fab icon='github' />
                    </a>
                </div>
            </section>

            <section className=''>
                <MDBContainer className='text-center text-md-start mt-5'>
                    <MDBRow className='mt-3'>
                        <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>
                                <MDBIcon color='secondary' icon='gem' className='me-3' />
                                AD LOS
                            </h6>
                            <p>
                                A basic loan origination system mock-up brought to you by 2 final year B.Tech students from Indus University, Ahmedabad.
                            </p>
                        </MDBCol>

                        <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Technologies</h6>
                            <p>
                                <a href='https://beta.reactjs.org/' className='text-reset'>
                                    React
                                </a>
                            </p>
                            <p>
                                <a href='https://www.javascript.com/' className='text-reset'>
                                    Javascript
                                </a>
                            </p>
                            <p>
                                <a href='https://nodejs.org/en/docs/' className='text-reset'>
                                    Node
                                </a>
                            </p>
                            <p>
                                <a href='https://www.mongodb.com/docs/' className='text-reset'>
                                    MongoDB
                                </a>
                            </p>
                        </MDBCol>

                        <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                            <p>
                                <a href='/creators' className='text-reset'>
                                    Meet the developers
                                </a>
                            </p>
                            <p>
                                <a href='/policy' className='text-reset'>
                                    Policy Agreement
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Settings
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Help
                                </a>
                            </p>
                        </MDBCol>

                        <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
                            <h6 className='text-uppercase fw-bold mb-4'>Contact Us</h6>
                            <p>
                                <MDBIcon color='secondary' icon='home' className='me-3' />
                                Ahmedabad, Gujarat, IND
                            </p>
                            <p>
                                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                                endsemproject@zohomail.in
                            </p>
                            <p>
                                <MDBIcon color='secondary' icon='phone' className='me-3' /> +91 XXXXX XXXXX
                            </p>
                            <p>
                                <MDBIcon color='secondary' icon='phone' className='me-3' /> +91 XXXXX XXXXX
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                &copy; {new Date().getFullYear()} Copyright:{' '}
                <a className='text-black' href='https://adlos.com/'>
                    ADlos.com
                </a>
            </div>

            {/* <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2021 Copyright:
                <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
                    MDBootstrap.com
                </a>
            </div> */}
        </MDBFooter>
    );
}


// import {
//     MDBFooter,
//     MDBContainer,
//     MDBCol,
//     MDBRow,
//     MDBBtn,
//     MDBInput
// } from 'mdb-react-ui-kit';

// export default function Footer() {
//     return (
//         <MDBFooter bgColor='dark' className='fixed-bottom text-center text-white text-lg-left'>
//             <MDBContainer className='p-4 pb-0'>
//                 <form action=''>
//                     <MDBRow className='d-flex justify-content-center'>
//                         <MDBCol size='auto' className='mb-4 mb-md-0'>
//                             <p className='pt-2'>
//                                 <strong>Sign up for our newsletter</strong>
//                             </p>
//                         </MDBCol>

//                         <MDBCol md='5' size='12' className='mb-4 mb-md-0'>
//                             <MDBInput type='text' id='form5Example2' label='Email address' contrast />
//                         </MDBCol>

//                         <MDBCol size='auto' className='mb-4 mb-md-0'>
//                             <MDBBtn outline color='light'>
//                                 Subscribe
//                             </MDBBtn>
//                         </MDBCol>
//                     </MDBRow>
//                 </form>
//             </MDBContainer>

//             <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
//                 &copy; {new Date().getFullYear()} Copyright:{' '}
//                 <a className='text-white' href='https://adlos.com/'>
//                     ADlos.com
//                 </a>
//             </div>
//         </MDBFooter>
//     );
// }
