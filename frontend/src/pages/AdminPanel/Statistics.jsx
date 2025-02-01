import { useState } from 'react';
import { Container, Button, Form, Modal } from 'react-bootstrap';
import { MDBBadge } from "mdb-react-ui-kit";
import PostLoginNavBar from "../../components/NavBar/PostLoginNavBar";
import AdminSideBar from "../../components/Sidebar/AdminSideBar";
import "./Statistics.css";

export default function Statistics() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <PostLoginNavBar />
      <div style={{ display: 'flex' }}>
        <AdminSideBar />

        <Container fluid>
        	<div className="p-4 title"><MDBBadge pill color='secondary' light>Statistics</MDBBadge></div>
          <div>
		      <div className= "text-center">
		        <Button variant="primary" onClick={handleShow}>
		          Launch demo modal
		        </Button>
			  </div>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label><MDBBadge pill color='success' light>DECISION</MDBBadge></Form.Label>
                    <Form.Select className="form-control" name="add-user" required >
                      <option defaultValue value=''>Choose...</option>
                      <option className="option">Accept</option>
                      <option className="option">Reject</option>
                      <option className="option">Waitlist</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label><MDBBadge pill color='danger' light>STATE REASONS</MDBBadge></Form.Label>
                    <Form.Control as="textarea" rows={3} />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="outline-primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>

          </div>
        </Container>

      </div>
    </>
  );
}


//<>
//      <PostLoginNavBar />
//      <div style={{ display: 'flex' }}>
//        <SideBar />
//        <Container fluid>
//        	<Row className="p-4 title"><MDBBadge pill color='secondary' light>Analytics</MDBBadge></Row>
//      	</Container>
//      </div>
//    </>


