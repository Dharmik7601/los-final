import { Container, Row, Col } from "react-bootstrap";
import './Home.css';
import { Link, Outlet } from 'react-router-dom';
import { FaBusinessTime, FaHome } from 'react-icons/fa';
import { MdCastForEducation } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";

const Home = () => {

    return (
        <>
            <NavBar />
            <Container>
                <Row className="text-center ">
                    <Col className="p-3" xs={12} md={6} lg={3}>
                        <div className="tag px-5 pt-5 pb-3">
                            <Link to={`loan/business`} className="text-black text-decoration-none ">
                                <FaBusinessTime className="icons" />
                                <h4 className="mt-2">Business Loan</h4>
                            </Link>
                        </div>
                    </Col>
                    <Col className="p-3" xs={12} md={6} lg={3}>
                        <div className="tag px-5 pt-5 pb-3">
                            <Link to={`loan/home`} className="text-black text-decoration-none ">
                                <FaHome className="icons" />
                                <h4 className="mt-2">Home Loan</h4>
                            </Link>
                        </div>
                    </Col> 
                    <Col className="p-3" xs={12} md={6} lg={3}>
                        <div className="tag px-4 pt-5 pb-3">

                            <Link to={`loan/education`} className="text-black text-decoration-none ">
                                <MdCastForEducation className="icons" />
                                <h4 className="mt-2">Education Loan</h4>
                            </Link>
                        </div>
                    </Col>
                    <Col className="p-3" xs={12} md={6} lg={3}>
                        <div className="tag px-5 pt-5 pb-3">

                            <Link to={`loan/personal`} className="text-black text-decoration-none ">
                                <BsFillPersonFill className="icons" />
                                <h4 className="mt-2">Personal Loan</h4>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
            <Footer />
            <Outlet />
        </>
    );
}

export default Home;
