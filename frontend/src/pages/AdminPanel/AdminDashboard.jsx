import React,{useState} from "react";
import AdminSideBar from "../../components/Sidebar/AdminSideBar";
import PostLoginNavBar from "../../components/NavBar/PostLoginNavBar";
import Footer from "../../components/Footer/Footer";
import { MDBBadge } from "mdb-react-ui-kit";
import { Container, Form, Row, Col } from 'react-bootstrap';
import { FaBusinessTime, FaHome } from 'react-icons/fa';
import { MdCastForEducation } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';
import "./AdminDashboard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { useEffect } from "react";

const  AdminDashboard = () => {
	const Navigate = useNavigate()

	const [loanTypeCount, setLoanTypeCount] = useState({
		Home: {
            Accepted: 0,
            Rejected: 0,
            Pending: 0,
            Waitlist: 0
        }, Personal: {
            Accepted: 0,
            Rejected: 0,
            Pending: 0,
            Waitlist: 0
        }, Business: {
            Accepted: 0,
            Rejected: 0,
            Pending: 0,
            Waitlist: 0
        }, Education: {
            Accepted: 0,
            Rejected: 0,
            Pending: 0,
            Waitlist: 0
        }
	})

			const getLoanTypeCount = async () => {
		try {
			await axios.get("http://localhost:5000/api/v1/admin/getUser/loan/details/count", {
				withCredentials: true
			}).then(response => {
				console.log(response.data);
				setLoanTypeCount(response.data);
			})
		} catch (err) {
			if (err.response) {
				alert(err.response.data.msg)
				Navigate('/')
				return
			} else {
				alert('Something went wrong')
				Navigate('/')
			}
		}
	}

	const display = async () => {
		console.log(loanTypeCount);
	}

	useEffect(() => {
		getLoanTypeCount();	
	},[])


	// useEffect(() => {
	// 	getLoanTypeCount();
	// },[])

	return (
		<>
			<PostLoginNavBar />
			<div style={{ height: '100%', display: 'flex' }}>
				<AdminSideBar />

				<Container fluid>
					
						<Row className="p-4 title"><MDBBadge pill color='secondary' light>Admin Dashboard</MDBBadge></Row>

						<Row className="tile text-center p-3 mb-1">
							<Col className="p-3" xs={16} md={10} lg={4}>
								<div className="tag px-5 pt-4 pb-2">
										<FaBusinessTime className="icons" />
								<h4 className="mt-2">Business Loan</h4>
								<div className="data">
										<h6>✅ Approved - {loanTypeCount.Business.Accepted}</h6>
								<h6>❌ Rejected - {loanTypeCount.Business.Rejected}</h6>
								<h6>⌛ Wailist - {loanTypeCount.Business.Waitlist}</h6>
									<h6>🫙 Pending - {loanTypeCount.Business.Pending}</h6>
									</div>
								</div>
							</Col>
							<Col className="p-3" xs={16} md={10} lg={4}>
								<div className="tag px-5 pt-4 pb-2">
										<FaHome className="icons" />
										<h4 className="mt-2">Home Loan</h4>
											<h6>✅ Approved - {loanTypeCount.Home.Accepted}</h6>
								<h6>❌ Rejected - {loanTypeCount.Home.Rejected}</h6>
								<h6>⌛ Wailist - {loanTypeCount.Home.Waitlist}</h6>
								<h6>🫙 Pending - {loanTypeCount.Home.Pending}</h6>
								</div>
							</Col>
						</Row>
						
						<Row className="tile text-center p-3 mb-1">
							<Col className="p-3" xs={16} md={10} lg={4}>
								<div className="tag px-5 pt-4 pb-2">
										<MdCastForEducation className="icons" />
										<h4 className="mt-2">Education Loan</h4>
											<h6>✅ Approved - {loanTypeCount.Education.Accepted}</h6>
								<h6>❌ Rejected - {loanTypeCount.Education.Rejected}</h6>
								<h6>⌛ Wailist - {loanTypeCount.Education.Waitlist}</h6>
								<h6>🫙 Pending - {loanTypeCount.Education.Pending}</h6>
								</div>
							</Col>
							<Col className="p-3" xs={16} md={10} lg={4}>
								<div className="tag px-5 pt-4 pb-2">
										<BsFillPersonFill className="icons" />
										<h4 className="mt-2">Personal Loan</h4>
											<h6>✅ Approved - {loanTypeCount.Personal.Accepted}</h6>
								<h6>❌ Rejected - {loanTypeCount.Personal.Rejected}</h6>
								<h6>⌛ Wailist - {loanTypeCount.Personal.Waitlist}</h6>
								<h6>🫙 Pending - {loanTypeCount.Personal.Pending}</h6>
								</div>
							</Col>
						</Row>

						{/* <Row className="text-center p-3"></Row>  */}

						<Row className="text-center p-3 mb-3"> 
							<Footer />
						</Row>


				</Container>

			</div>
		</>
	);
}

export default AdminDashboard








						
