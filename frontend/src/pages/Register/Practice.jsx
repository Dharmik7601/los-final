import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

function Practice() {
    const [showMessage, setShowMessage] = useState(false);
    const [values, setValues] = useState({
        fullname: "",
        email: "",
    });
    const [formerrors, setFormErrors] = useState({});

    //this method handles the each form field changing and updates the relevant
    //state value for that input
    const handleChange = (event) => {
        console.log(
            "handleChange -> " + event.target.name + " : " + event.target.value
        );

        setValues((values) => ({
            ...values,
            [event.target.name]: event.target.value,
        }));
    };

    //this method will check each field in your form. You define
    //the rules for each field
    const validate = () => {
        console.log("Validate the form....");

        let errors = {};

        //name field
        if (!values.fullname) {
            errors.fullname = "Full name is required";
        }

        //email field
        if (!values.email) {
            errors.email = "Email address is required";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Email address is invalid";
        }

        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            return true;
        } else {
            return false;
        }
    };

    const handleSubmit = (event) => {
        if (event) event.preventDefault();

        if (validate(values)) {
            setShowMessage(true);
        } else {
            setShowMessage(false);
        }
    };

    return (
        <div>
            <header>
                <p>
                    React Bootstrap <code>Form Example</code>.
                </p>
            </header>
            <Container className="p-3">
                <Container>
                    <Row>
                        <Col>
                            <Alert show={showMessage} variant="success">
                                <Alert.Heading>Success</Alert.Heading>
                                <p>
                                    This is an alert, and these can be shown in a variety of
                                    styles provided by Bootstrap. Our form submit button simply
                                    shows this alert. Another post will go through form validation
                                    and errors.
                                </p>
                                <hr />
                                <div className="d-flex justify-content-end">
                                    <Button
                                        onClick={() => setShowMessage(false)}
                                        variant="outline-success"
                                    >
                                        Close this alert
                                    </Button>
                                </div>
                            </Alert>
                        </Col>
                    </Row>
                    <Row>
                        <Col></Col>
                        <Col>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formGridName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        placeholder="Full Name"
                                        type="text"
                                        name="fullname"
                                        value={values.fullname}
                                        onChange={handleChange}
                                    />
                                    {formerrors.fullname && (
                                        <p className="text-warning">{formerrors.fullname}</p>
                                    )}
                                </Form.Group>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            placeholder="Enter email"
                                            type="email"
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}
                                        />
                                        {formerrors.email && (
                                            <p className="text-warning">{formerrors.email}</p>
                                        )}
                                    </Form.Group>
                                </Form.Row>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    size="lg"
                                >
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                        <Col></Col>
                    </Row>
                </Container>
            </Container>
        </div>
    );
}

export default Practice;
