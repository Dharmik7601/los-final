import PostLoginNavBar from "../../components/NavBar/PostLoginNavBar";
import AdminSideBar from "../../components/Sidebar/AdminSideBar";
import { MDBBadge } from "mdb-react-ui-kit";
import { Container, Form, Row, Col } from 'react-bootstrap';

const Analytics = () => {
  return (
    <>
      <PostLoginNavBar />
      <div style={{ display: 'flex' }}>
        <AdminSideBar />
        <Container fluid>
        	<Row className="p-4 title"><MDBBadge pill color='secondary' light>Analytics</MDBBadge></Row>
      	</Container>
      </div>
    </>
  )
};

export default Analytics
