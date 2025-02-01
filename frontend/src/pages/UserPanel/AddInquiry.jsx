import { Container, Form, Row } from 'react-bootstrap';
import SideBar from "../../components/Sidebar/SideBar";
import PostLoginNavBar from "../../components/NavBar/PostLoginNavBar";
import NewInquiry from "./NewInquiry";
import { useEffect, useState } from 'react';
import { MDBBadge } from "mdb-react-ui-kit";
import "./AddInquiry.css";

const AddInquiry = () => {

    const [loan, setLoan] = useState("Choose...");

    const [business, setBusiness] = useState(false);
    const [home, setHome] = useState(false);
    const [education, setEducation] = useState(false);
    const [personal, setPersonal] = useState(false);

    useEffect(() => {
        loan === "business" ? setBusiness(true) : setBusiness(false);
        loan === "home" ? setHome(true) : setHome(false);
        loan === "education" ? setEducation(true) : setEducation(false);
        loan === "personal" ? setPersonal(true) : setPersonal(false);
    }, [loan])

    const handleChange = (e) => {
        setLoan(e.target.value);
        /*window.open(`/admin-sidebar/add-user/loan/${e.target.value}`);*/
    }

    return (
        <>
            <PostLoginNavBar />
            <div style={{ display: 'flex' }}>

                <SideBar />

                <Container fluid>
                    <Form className="container mt-3 mb-3" autoComplete='off'>
                        <Row className="p-4 title"><MDBBadge pill color='secondary' light>Apply for a New Loan</MDBBadge></Row>
                        <Row className="drop p-3 mb-3">
                            {/* ADDING INQUIRY VIA USER */}
                            <Form.Group controlId="formGridState" className="col col-sm-3">
                                {/*<Form.Label><MDBBadge pill color='secondary' light>Choose loan type</MDBBadge></Form.Label>*/}
                                <Form.Select className="form-control" name="add-user" value={loan} onChange={handleChange} required >
                                    <option defaultValue value=''>Choose Loan Type</option>
                                    <option value="business">Business Loan</option>
                                    <option value="home">Home Loan</option>
                                    <option value="education">Education Loan</option>
                                    <option value="personal">Personal Loan</option>
                                </Form.Select>
                            </Form.Group>
                        </Row>
                    </Form>
                    <div>
                        {business && <NewInquiry loan_type={"Business"} country={"India"} />}
                        {home && <NewInquiry loan_type={"Home"} country={"India"} />}
                        {education && <NewInquiry loan_type={"Education"} country={"India"} />}
                        {personal && <NewInquiry loan_type={"Personal"} country={"India"} />}
                    </div>
                </Container>

            </div>
        </>
    );
}

export default AddInquiry
