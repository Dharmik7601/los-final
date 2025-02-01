import { useEffect, useState } from 'react';
import { Form, Row, Col, InputGroup, Button, Container } from 'react-bootstrap';
import SideBar from "../../components/Sidebar/SideBar";
import PostLoginNavBar from "../../components/NavBar/PostLoginNavBar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MDBBadge } from "mdb-react-ui-kit";


const PersonalInfo = () => {

    const Navigate = useNavigate()


    const [userDetail, setUserDetails] = useState({})

    const getUserDetails = async () => {
        try {
            await axios.get("http://localhost:5000/api/v1/user/getUser", {
                withCredentials: true
            }).then(response => {
                console.log(response.data.user)
                setUserDetails(response.data.user)
                return
            })
        } catch (err) {
            Navigate('/')
            return
        }
    }

   

    const dob = new Date(userDetail.dob).toDateString()
    useEffect(() => {
        getUserDetails()
    }, [])

    return (
        <>
            <PostLoginNavBar />
            <div style={{ display: 'flex' }}>
                <SideBar />
                <Container fluid>
                    <Row>
                        <Col>
                            <div className="p-4 title"><MDBBadge pill color='secondary' light>User ID: {userDetail._id}</MDBBadge></div>
                            <Form className="container mt-3 mb-3 personal" autoComplete='off'>
                                <Row className="mb-3">
                                    {/* SALUTATION */}
                                    <Form.Group controlId="formGridState" className="col col-sm-2">
                                        <Form.Label><MDBBadge pill color='secondary' light>SALUTATION</MDBBadge></Form.Label>
                                        <Form.Control className="form-control" type="text" name="salutation" value={userDetail.salutation} readOnly />
                                    </Form.Group>
                                    {/* FIRSTNAME */}
                                    <Form.Group controlId="formBasicEmail" className="col col-sm-3">
                                        <Form.Label><MDBBadge pill color='secondary' light>FIRST NAME</MDBBadge></Form.Label>
                                        <Form.Control type="name" name="first_name" value={userDetail.first_name} className="form-control" readOnly />
                                    </Form.Group>
                                    {/* MIDDLENAME */}
                                    <Form.Group controlId="formBasicEmail" className="col col-sm-3">
                                        <Form.Label><MDBBadge pill color='secondary' light>MIDDLE NAME</MDBBadge></Form.Label>
                                        <Form.Control type="name" name="middle_name" value={userDetail.middle_name} className="form-control" readOnly />
                                    </Form.Group>
                                    {/* LASTNAME */}
                                    <Form.Group controlId="formBasicEmail" className="col col-sm-4">
                                        <Form.Label><MDBBadge pill color='secondary' light>LAST NAME</MDBBadge></Form.Label>
                                        <Form.Control type="name" name="last_name" value={userDetail.last_name} className="form-control" readOnly />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    {/* GENDER */}
                                    <Form.Group controlId="formGridState" className="col col-sm-6">
                                        <Form.Label><MDBBadge pill color='secondary' light>GENDER</MDBBadge></Form.Label>
                                        <Form.Control className="form-control" type="text" name="gender" value={userDetail.gender} readOnly />
                                    </Form.Group>
                                    {/* DOB */}
                                    <Form.Group controlId="formGridpin" className="col col-sm-6">
                                        <Form.Label><MDBBadge pill color='secondary' light>DATE OF BIRTH</MDBBadge></Form.Label>
                                        <Form.Control className="form-control" type="string" name="dob" value={dob} readOnly />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    {/* MOBILE */}
                                    <Form.Group controlId="formBasicMobile" className="col col-sm-6">
                                        <Form.Label><MDBBadge pill color='secondary' light>MOBILE NUMBER</MDBBadge></Form.Label>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                                            <Form.Control aria-label="Mobile Number" type="mobile" aria-describedby="basic-addon1" className="form-control" name="mobile" value={userDetail.mobile} readOnly />
                                        </InputGroup>
                                    </Form.Group>
                                    {/* EMAIL */}
                                    <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                                        <Form.Label><MDBBadge pill color='secondary' light>EMAIL</MDBBadge></Form.Label>
                                        <Form.Control aria-label="Recipient's username" type="email" name="email" value={userDetail.email} readOnly />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    {/* ADDRESS*/}
                                    <Form.Group className=" col col-sm-8" controlId="formGridAddress1">
                                        <Form.Label><MDBBadge pill color='secondary' light>ADDRESS</MDBBadge></Form.Label>
                                        <Form.Control className="form-control" type="text" name="address" value={userDetail.address} readOnly />
                                    </Form.Group>
                                    {/* PINCODE */}
                                    <Form.Group controlId="formGridpin" className="col col-sm-4">
                                        <Form.Label><MDBBadge pill color='secondary' light>PIN CODE</MDBBadge></Form.Label>
                                        <Form.Control className="form-control" type="pin" name="pin" value={userDetail.pin} readOnly />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    {/* CITY */}
                                    <Form.Group controlId="formGridCity" className="col col-sm-4">
                                        <Form.Label><MDBBadge pill color='secondary' light>CITY</MDBBadge></Form.Label>
                                        <Form.Control className="form-control" type="text" name="city" value={userDetail.city} readOnly />
                                    </Form.Group>
                                    {/* STATE */}
                                    <Form.Group controlId="formGridState" className="col col-sm-4">
                                        <Form.Label><MDBBadge pill color='secondary' light>STATE</MDBBadge></Form.Label>
                                        <Form.Control className="form-control" type="text" name="state" value={userDetail.state} readOnly />
                                    </Form.Group>
                                    {/* Country */}
                                    <Form.Group controlId="formGridpin" className="col col-sm-4">
                                        <Form.Label><MDBBadge pill color='secondary' light>COUNTRY</MDBBadge></Form.Label>
                                        <Form.Control className="form-control" type="country" value={userDetail.country} name="country" readOnly />
                                    </Form.Group>
                                </Row>


                                {/* <div className="text-center p-1 mb-3" >
                                    <Button variant="dark" size="lg" onClick={logoutUser}>
                                        Log Out
                                    </Button>
                                </div> */}

                            </Form>
                        </Col>
                    </Row>
                </Container>
            </div>

        </>
    );
}

export default PersonalInfo
