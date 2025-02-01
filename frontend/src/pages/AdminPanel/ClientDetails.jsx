import { Container, Form, Row, Col, InputGroup } from 'react-bootstrap';
import PostLoginNavBar from '../../components/NavBar/PostLoginNavBar';
import AdminSideBar from "../../components/Sidebar/AdminSideBar";
import { useEffect, useState } from "react";
import axios from "axios";
import DataTable, { createTheme } from "react-data-table-component";
import { MDBBadge } from "mdb-react-ui-kit";
import { useNavigate,useParams } from "react-router-dom";

createTheme("solarized", {
    text: {
        primary: "#268bd2",
        secondary: "#2aa198"
    },
    background: {
        default: "#002b36"
    },
    context: {
        background: "#cb4b16",
        text: "#FFFFFF"
    },
    divider: {
        default: "#073642"
    },
    action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)"
    }
}); //color scheme system

const ClientDetails = () => {

    const [userDetails,setUserDetails] = useState({})

    const {id,email} = useParams()

    const [loanInquiries,setLoanInquiries] = useState([])

    const Navigate = useNavigate();
	
	const [columns, setColumns] = useState([]);
	const [pending, setPending] = useState(true);

    useEffect(() => {
        getUserDetails();
        userLoanInquiries();
    }, []);
	
    const userLoanInquiries = async () => {

        try {
            await axios.get(`http://localhost:5000/api/v1/admin/getUser/loan/${id}/${email}`, {
                withCredentials:true
            }).then(response => {
                console.log(response);
                setLoanInquiries(response.data)
            })
        } catch(err) {
            console.log(err);
        }

        const timeout = setTimeout(() => {
			setColumns([
				{
				    name: <MDBBadge pill color='dark' light>Loan ID</MDBBadge>,
				    selector: (row) => row.loan_id,
				    sortable: true
				},
				{
				    name: <MDBBadge pill color='dark' light>Type</MDBBadge>,
				    selector: (row) => row.loan_type,
				    sortable: true
				},
				{
				    name: <MDBBadge pill color='dark' light>Amount</MDBBadge>,
				    selector: (row) => row.loan_amount,
				    sortable: true
				},
				{
				    name: <MDBBadge pill color='dark' light>Status</MDBBadge>,
				    selector: (row) => row.loan_status === 'Pending' || row.loan_status === 'Waitlist' ?<MDBBadge pill color='danger' light>{row.loan_status}</MDBBadge> : <MDBBadge pill color='success' light>{row.loan_status}</MDBBadge>,
				    sortable: true,
				},
			]);
			setPending(false);
		}, 2000);
		return () => clearTimeout(timeout);
    }

//    const columns = [
//        {
//            name: <MDBBadge pill color='dark' light>Loan ID</MDBBadge>,
//            selector: (row) => row.LoanID,
//            sortable: true
//        },
//        {
//            name: <MDBBadge pill color='dark' light>Type</MDBBadge>,
//            selector: (row) => row.LoanType,
//            sortable: true
//        },
//        {
//            name: <MDBBadge pill color='dark' light>Amount</MDBBadge>,
//            selector: (row) => <img src={row.LoanAmount} alt="MDN logo" />,
//            sortable: true
//        },
//        {
//            name: <MDBBadge pill color='dark' light>ROI (%)</MDBBadge>,
//            selector: (row) => row.Interest,
//            sortable: true
//        },
//        {
//            name: <MDBBadge pill color='dark' light>Status</MDBBadge>,
//            selector: (row) => row.Status,
//            sortable: true,
//        },
//    ];

    // const clientSummary = [
    //     {
    //         LoanID: 1,
    //         LoanType: "Aston Villa",
    //         LoanAmount: "https://resources.premierleague.com/premierleague/badges/50/t7.png",
    //         Interest: "MID",
    //         Status: <MDBBadge pill color='success' light>Completed</MDBBadge>
    //     },
    //     {
    //         LoanID: 2,
    //         LoanType: "Manchester United",
    //         LoanAmount: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
    //         Interest: "DEF",
    //         Status: <MDBBadge pill className='mx-2' color='danger' light>Rejected</MDBBadge>
    //     },
    //     {
    //         LoanID: 3,
    //         LoanType: "Everton",
    //         LoanAmount: "https://resources.premierleague.com/premierleague/badges/50/t11.png",
    //         Interest: "MID",
    //         Status: <MDBBadge pill color='warning' light>Waitlisted</MDBBadge>
    //     },
    //     {
    //         LoanID: 4,
    //         LoanType: "Spurs",
    //         LoanAmount: "https://resources.premierleague.com/premierleague/badges/50/t6.png",
    //         Interest: "MID",
    //         Status: <MDBBadge pill className='mx-2' color='danger' light>Rejected</MDBBadge>
    //     },
    //     {
    //         LoanID: 5,
    //         LoanType: "Aston Villa",
    //         LoanAmount: "https://resources.premierleague.com/premierleague/badges/50/t7.png",
    //         Interest: "FWD",
    //         Status: <MDBBadge pill className='mx-2' color='danger' light>Rejected</MDBBadge>
    //     },
    //     {
    //         LoanID: 6,
    //         LoanType: "Manchester City",
    //         LoanAmount: "https://resources.premierleague.com/premierleague/badges/50/t43.png",
    //         Interest: "MID",
    //         Status: <MDBBadge pill color='success' light>Completed</MDBBadge>
    //     },
    //     {
    //         LoanID: 7,
    //         LoanType: "Wolves",
    //         LoanAmount: "https://resources.premierleague.com/premierleague/badges/50/t39.png",
    //         Interest: "DEF",
    //         Status: <MDBBadge pill color='success' light>Completed</MDBBadge>
    //     },
    //     {
    //         LoanID: 8,
    //         LoanType: "Manchester United",
    //         LoanAmount: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
    //         Interest: "MID",
    //         Status: <MDBBadge pill color='success' light>Completed</MDBBadge>
    //     },
    //     {
    //         LoanID: 9,
    //         LoanType: "Manchester United",
    //         LoanAmount: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
    //         Interest: "FWD",
    //         Status: <MDBBadge pill color='success' light>Completed</MDBBadge>
    //     },
    //     {
    //         LoanID: 10,
    //         LoanType: "Chelsea",
    //         LoanAmount: "https://resources.premierleague.com/premierleague/badges/50/t8.png",
    //         Interest: "DEF",
    //         Status: <MDBBadge pill color='warning' light>Waitlisted</MDBBadge>
    //     },
    //     {
    //         LoanID: 11,
    //         LoanType: "Manchester United",
    //         LoanAmount:
    //             "https://resources.premierleague.com/premierleague/badges/50/t1.png",
    //         Gender: "Portugal",
    //         Age:
    //             "https://www.countryflags.com/wp-content/uploads/portugal-flag-400.png",
    //         Interest: "MID",
    //         Status: <MDBBadge pill color='success' light>Completed</MDBBadge>,
    //     },
    //     {
    //         LoanID: 12,
    //         LoanType: "Manchester United",
    //         LoanAmount: "https://resources.premierleague.com/premierleague/badges/50/t1.png",
    //         Interest: "FWD",
    //         Status: <MDBBadge pill color='success' light>Completed</MDBBadge>,
    //     },
    //     {
    //         LoanID: 13,
    //         LoanType: "Chelsea",
    //         LoanAmount: "https://resources.premierleague.com/premierleague/badges/50/t8.png",
    //         Interest: "DEF",
    //         Status: <MDBBadge pill color='warning' light>Waitlisted</MDBBadge>,
    //     },

    // ];

    const handleRowClicked = (row) => {
        Navigate(`/admin-panel/client-details/loan-data/${id}/${email}/${row.loan_id}`);
    };

    const getUserDetails = async (req, res) => {
        
        try {
            axios.get(`http://localhost:5000/api/v1/admin/getUser/${id}/${email}`, {
                withCredentials:true
            }).then(response => {
                setUserDetails(response.data)
            })
        } catch (err) {
            console.log(err);
            Navigate('/')
        }
    }

    return (
        <>
            <PostLoginNavBar />
            <div style={{ display: 'flex' }}>
                <AdminSideBar />
                <Container>
                    <Row>
                        
                        <div className="p-2 title"><MDBBadge pill color='secondary' light>User ID: {id}</MDBBadge></div>
                            <Form className="container mt-3 mb-3 personal" autoComplete='off'>
                                <Row className="mb-3">
                                
                                    {/* SALUTATION */}
                                    <Form.Group controlId="formGridState" className="col col-sm-3">
                                        <Form.Label><MDBBadge pill color='secondary' light>SALUTATION</MDBBadge></Form.Label>
                                        <Form.Control type="name" name="salutation" className="form-control" value={userDetails.salutation} readOnly />
                                    </Form.Group>
                                    
                                    {/* FIRSTNAME */}
                                    <Form.Group controlId="formBasicEmail" className="col col-sm-5">
                                        <Form.Label><MDBBadge pill color='secondary' light>FIRST NAME</MDBBadge></Form.Label>
                                        <Form.Control type="name" name="first_name" className="form-control" value={userDetails.first_name} readOnly />
                                    </Form.Group>

                                    {/* MIDDLENAME */}
                                    <Form.Group controlId="formBasicEmail" className="col col-sm-4">
                                        <Form.Label><MDBBadge pill color='secondary' light>MIDDLE NAME</MDBBadge></Form.Label>
                                        <Form.Control type="name" name="middle_name" className="form-control" value={userDetails.middle_name} readOnly />
                                    </Form.Group>
                                </Row>
                                   
                                <Row className="mb-3">
                                
                                    {/* LASTNAME */}
                                    <Form.Group controlId="formBasicEmail" className="col col-sm-6">
                                        <Form.Label><MDBBadge pill color='secondary' light>LAST NAME</MDBBadge></Form.Label>
                                        <Form.Control type="name" name="last_name" className="form-control" value={userDetails.last_name} readOnly />
                                    </Form.Group>
                                    
                                    {/* DOB */}
                                    <Form.Group controlId="formGridpin" className="col col-sm-6">
                                        <Form.Label><MDBBadge pill color='secondary' light>DATE OF BIRTH</MDBBadge></Form.Label>
                                        <Form.Control className="form-control" type="text" name="dob" value={userDetails.dob}  readOnly />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                
                                    {/* GENDER */}
                                    <Form.Group controlId="formGridState" className="col col-sm-4">
                                        <Form.Label><MDBBadge pill color='secondary' light>GENDER</MDBBadge></Form.Label>
                                        <Form.Control name="gender" className="form-control" value={userDetails.gender}readOnly />
                                    </Form.Group>
                                    
                                    {/* MOBILE */}
                                    <Form.Group controlId="formBasicMobile" className="col col-sm-8">
                                        <Form.Label><MDBBadge pill color='secondary' light>MOBILE NUMBER</MDBBadge></Form.Label>
                                        <InputGroup hasValidation>
                                            <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                                            <Form.Control aria-label="Mobile Number" type="mobile" aria-describedby="basic-addon1" className="form-control" name="mobile" value={userDetails.mobile} readOnly />
                                        </InputGroup>
                                    </Form.Group>   
                                </Row>

                                <Row className="mb-3">                                   
                                    {/* EMAIL */}
                                    <Form.Group controlId="formBasicEmail" className="col col-sm-8">
                                        <Form.Label><MDBBadge pill color='secondary' light>EMAIL</MDBBadge></Form.Label>
                                        <Form.Control aria-label="Recipient's username" type="email" name="email" value={userDetails.email} readOnly />
                                    </Form.Group>
                                    
                                    {/* PINCODE */}
                                    <Form.Group controlId="formGridpin" className="col col-sm-4">
                                        <Form.Label><MDBBadge pill color='secondary' light>PIN CODE</MDBBadge></Form.Label>
                                        <Form.Control className="form-control" type="pin" name="pin" value={userDetails.pin} readOnly />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    {/* ADDRESS*/}
                                    <Form.Group className=" col col-sm-12" controlId="formGridAddress1">
                                        <Form.Label><MDBBadge pill color='secondary' light>ADDRESS</MDBBadge></Form.Label>
                                        <Form.Control className="form-control" type="text" name="address" value={userDetails.address} readOnly />
                                    </Form.Group>
                                    
                                </Row>

                                <Row className="mb-3">
                                    {/* CITY */}
                                    <Form.Group controlId="formGridCity" className="col col-sm-4">
                                        <Form.Label><MDBBadge pill color='secondary' light>CITY</MDBBadge></Form.Label>
                                        <Form.Control className="form-control" type="text" name="city" value={userDetails.city} readOnly />
                                    </Form.Group>
                                    {/* STATE */}
                                    <Form.Group controlId="formGridState" className="col col-sm-4">
                                        <Form.Label><MDBBadge pill color='secondary' light>STATE</MDBBadge></Form.Label>
                                        <Form.Control className="form-control" type="text" name="state" value={userDetails.state} readOnly />
                                    </Form.Group>
                                    {/* Country */}
                                    <Form.Group controlId="formGridpin" className="col col-sm-4">
                                        <Form.Label><MDBBadge pill color='secondary' light>COUNTRY</MDBBadge></Form.Label>
                                        <Form.Control className="form-control" type="text" name="country" value={userDetails.country} readOnly />
                                    </Form.Group>
                                </Row>
                            </Form>

                        <Row className="p-2"></Row>
                            <div className="p-2 title"><MDBBadge pill color='secondary' light>Loan History</MDBBadge></div>
                            
                                <div>
                                    <DataTable
                                        //title="Loan History"
                                        columns={columns}
                                        //data={loanDetails}
                                        data={loanInquiries}
                                        defaultSortFieldId
                                        pagination={10}
                                        fixedHeader
                                        fixedHeaderScrollHeight="455px"
                                        onRowClicked={handleRowClicked}
                                        highlightOnHover
                                        progressPending={pending}
                                    />
                                </div>
                       
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default ClientDetails

{/* {data ? Object.keys(data).map((d) => (
 <option key={d} value={d}>{d}</option>)) : null} */}
