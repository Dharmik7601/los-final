import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable, { createTheme } from "react-data-table-component";
import SideBar from "../../components/Sidebar/SideBar";
import PostLoginNavBar from "../../components/NavBar/PostLoginNavBar";
import Footer from "../../components/Footer/Footer";
import { MDBBadge } from "mdb-react-ui-kit";
import './UserDashboard.css';
import axios from "axios";
import { Container, Form, Row, Col } from 'react-bootstrap';
import { Link, Outlet } from 'react-router-dom';
import { FaBusinessTime, FaHome } from 'react-icons/fa';
import { MdCastForEducation } from 'react-icons/md';
import { BsFillPersonFill } from 'react-icons/bs';

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

export default function UserDashboard() {

    const customStyles = {
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "0.9rem",
            }
        },
    }

    const [loanDetails, setLoanDetails] = useState([])

    useEffect(() => {
        getloanDetails()
    }, [])

    const getloanDetails = async () => {
        try {
            await axios.get("http://localhost:5000/api/v1/user/getUser1", {
                withCredentials: true
            }).then(response => {
                console.log(response)
                setLoanDetails(response.data.user.loanInquiries)
            })
        } catch (err) {
            console.log(err);
        }
    }

    console.log(loanDetails);

    const Navigate = useNavigate();

    const [columns, setColumns] = useState([]);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setColumns([
                {
                    name: <MDBBadge pill color='dark' light>Loan ID</MDBBadge>,
                    selector: (row) => row._id,
                    sortable: true
                },
                {
                    name: <MDBBadge pill color='dark' light>Loan Type</MDBBadge>,
                    selector: (row) => row.loanType,
                    sortable: true
                }, 
                {
                    name: <MDBBadge pill color='dark' light>Amount (₹)</MDBBadge>,
                    selector: (row) => row.loanAmount,
                    sortable: true
                },
                // {
                //     name: "Interest (%)",
                //     selector: (row) => row.Interest,
                //     sortable: true
                // },
                {
                    name: <MDBBadge pill color='dark' light>Loan Status</MDBBadge>,
                    selector: (row) => row.applicationStatus === 'Pending' || row.applicationStatus === 'Waitlist' ? <MDBBadge pill color='danger' light>{row.applicationStatus}</MDBBadge> : <MDBBadge pill color='success' light>{row.applicationStatus}</MDBBadge>,
                    sortable: true,
                },
            ]);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, []);

    //    const columns = [
    //        {
    //            name: "Loan ID",
    //            selector: (row) => row._id,
    //            sortable: true
    //        },
    //        {
    //            name: "Loan Type",
    //            selector: (row) => row.Loan,
    //            sortable: true
    //        },
    //        {
    //            name: "Amount (₹)",
    //            selector: (row) => row.loanAmount,
    //            sortable: true
    //        },
    //        {
    //            name: "Loan Status",
    //            selector: (row) => row.applicationStatus,
    //            sortable: true,
    //        },
    //    ];

    const clientSummary = [
        {
            _id: 1,
            ClientName: "Aaron Ramsey",
            ProfilePicture:
                "https://resources.premierleague.com/premierleague/photos/players/40x40/p119765.png",
            loanAmount:
                "https://resources.premierleague.com/premierleague/badges/50/t11.png",
            Loan: "Aston Villa",
            Interest: "FWD",
            applicationStatus: <MDBBadge pill color='success' light>Completed</MDBBadge>
        },
        {
            _id: 2,
            ClientName: "Alex Telles",
            ProfilePicture:
                "https://resources.premierleague.com/premierleague/photos/players/40x40/p152590.png",
            Loan: "Manchester United",
            loanAmount:
                "https://resources.premierleague.com/premierleague/badges/50/t1.png",
            Gender: "Brazil",
            Age:
                "https://www.countryflags.com/wp-content/uploads/brazil-flag-png-large.png",
            Interest: "DEF",
            applicationStatus: <MDBBadge pill className='mx-2' color='danger' light>Rejected</MDBBadge>
        },
        {
            _id: 3,
            ClientName: "Allan",
            ProfilePicture:
                "https://resources.premierleague.com/premierleague/photos/players/40x40/p119765.png",
            Loan: "Everton",
            loanAmount:
                "https://resources.premierleague.com/premierleague/badges/50/t11.png",
            Gender: "England",
            Age:
                "https://www.countryflags.com/wp-content/uploads/england-flag-jpg-xl.jpg",
            Interest: "MID",
            applicationStatus: <MDBBadge pill color='warning' light>Waitlisted</MDBBadge>
        },
        {
            _id: 4,
            ClientName: "Dele Alli",
            ProfilePicture:
                "https://resources.premierleague.com/premierleague/photos/players/40x40/p108823.png",
            Loan: "Spurs",
            loanAmount:
                "https://resources.premierleague.com/premierleague/badges/50/t6.png",
            Gender: "Brazil",
            Age:
                "https://www.countryflags.com/wp-content/uploads/brazil-flag-png-large.png",
            Interest: "MID",
            applicationStatus: <MDBBadge pill className='mx-2' color='danger' light>Rejected</MDBBadge>
        },
        {
            _id: 5,
            ClientName: "Leon Bailey",
            ProfilePicture:
                "https://resources.premierleague.com/premierleague/photos/players/40x40/p215711.png",
            Loan: "Aston Villa",
            loanAmount:
                "https://resources.premierleague.com/premierleague/badges/50/t7.png",
            Gender: "Jamaica",
            Age:
                "https://www.countryflags.com/wp-content/uploads/jamaica-flag-png-large.png",
            Interest: "FWD",
            applicationStatus: <MDBBadge pill className='mx-2' color='danger' light>Rejected</MDBBadge>
        },
        {
            _id: 6,
            ClientName: "Bernando Silva",
            ProfilePicture:
                "https://resources.premierleague.com/premierleague/photos/players/40x40/p165809.png",
            Loan: "Manchester City",
            loanAmount:
                "https://resources.premierleague.com/premierleague/badges/50/t43.png",
            Gender: "Portugal",
            Age:
                "https://www.countryflags.com/wp-content/uploads/portugal-flag-400.png",
            Interest: "MID",
            applicationStatus: <MDBBadge pill color='success' light>Completed</MDBBadge>
        },
        {
            _id: 7,
            ClientName: "Willy Boly",
            ProfilePicture:
                "https://resources.premierleague.com/premierleague/photos/players/40x40/p90585.png",
            Loan: "Wolves",
            loanAmount:
                "https://resources.premierleague.com/premierleague/badges/50/t39.png",
            Gender: "Cote D’Ivoire",
            Age:
                "https://www.countryflags.com/wp-content/uploads/cote-d-ivoire-flag-png-large.png",
            Interest: "DEF",
            applicationStatus: <MDBBadge pill color='success' light>Completed</MDBBadge>
        },
        {
            _id: 8,
            ClientName: "Bruno Fernandes",
            ProfilePicture:
                "https://resources.premierleague.com/premierleague/photos/players/40x40/p141746.png",
            Loan: "Manchester United",
            loanAmount:
                "https://resources.premierleague.com/premierleague/badges/50/t1.png",
            Gender: "Portugal",
            Age:
                "https://www.countryflags.com/wp-content/uploads/portugal-flag-400.png",
            Interest: "MID",
            applicationStatus: <MDBBadge pill color='success' light>Completed</MDBBadge>
        },
        {
            _id: 9,
            ClientName: "Edinson Cavani",
            ProfilePicture:
                "https://resources.premierleague.com/premierleague/photos/players/40x40/p40720.png",
            Loan: "Manchester United",
            loanAmount:
                "https://resources.premierleague.com/premierleague/badges/50/t1.png",
            Gender: "Uruguay",
            Age:
                "https://www.countryflags.com/wp-content/uploads/uruguay-flag-png-large.png",
            Interest: "FWD",
            applicationStatus: <MDBBadge pill color='success' light>Completed</MDBBadge>
        },
        {
            _id: 10,
            ClientName: "Ben Chilwell",
            ProfilePicture:
                "https://resources.premierleague.com/premierleague/photos/players/40x40/p172850.png",
            Loan: "Chelsea",
            loanAmount:
                "https://resources.premierleague.com/premierleague/badges/50/t8.png",
            Gender: "England",
            "Gender Image":
                "https://www.countryflags.com/wp-content/uploads/england-flag-jpg-xl.jpg",
            Interest: "DEF",
            applicationStatus: <MDBBadge pill color='warning' light>Waitlisted</MDBBadge>
        },
        {
            _id: 11,
            ClientName: "Bruno Fernandes",
            ProfilePicture:
                "https://resources.premierleague.com/premierleague/photos/players/40x40/p141746.png",
            Loan: "Manchester United",
            loanAmount:
                "https://resources.premierleague.com/premierleague/badges/50/t1.png",
            Gender: "Portugal",
            Age:
                "https://www.countryflags.com/wp-content/uploads/portugal-flag-400.png",
            Interest: "MID",
            applicationStatus: <MDBBadge pill color='success' light>Completed</MDBBadge>,
        },
        {
            _id: 12,
            ClientName: "Edinson Cavani",
            ProfilePicture:
                "https://resources.premierleague.com/premierleague/photos/players/40x40/p40720.png",
            Loan: "Manchester United",
            loanAmount:
                "https://resources.premierleague.com/premierleague/badges/50/t1.png",
            Gender: "Uruguay",
            Age:
                "https://www.countryflags.com/wp-content/uploads/uruguay-flag-png-large.png",
            Interest: "FWD",
            applicationStatus: <MDBBadge pill color='success' light>Completed</MDBBadge>,
        },
        {
            _id: 13,
            ClientName: "Ben Chilwell",
            ProfilePicture:
                "https://resources.premierleague.com/premierleague/photos/players/40x40/p172850.png",
            Loan: "Chelsea",
            loanAmount:
                "https://resources.premierleague.com/premierleague/badges/50/t8.png",
            Gender: "England",
            "Gender Image":
                "https://www.countryflags.com/wp-content/uploads/england-flag-jpg-xl.jpg",
            Interest: "DEF",
            applicationStatus: <MDBBadge pill color='warning' light>Waitlisted</MDBBadge>,
        },
        {
            _id: 14,
            ClientName: "Willy Boly",
            ProfilePicture:
                "https://resources.premierleague.com/premierleague/photos/players/40x40/p90585.png",
            Loan: "Wolves",
            loanAmount:
                "https://resources.premierleague.com/premierleague/badges/50/t39.png",
            Gender: "Cote D’Ivoire",
            Age:
                "https://www.countryflags.com/wp-content/uploads/cote-d-ivoire-flag-png-large.png",
            Interest: "DEF",
            applicationStatus: <MDBBadge pill color='warning' light>Waitlisted</MDBBadge>,
        },
        {
            _id: 15,
            ClientName: "Bruno Fernandes",
            ProfilePicture:
                "https://resources.premierleague.com/premierleague/photos/players/40x40/p141746.png",
            Loan: "Manchester United",
            loanAmount:
                "https://resources.premierleague.com/premierleague/badges/50/t1.png",
            Gender: "Portugal",
            Age:
                "https://www.countryflags.com/wp-content/uploads/portugal-flag-400.png",
            Interest: "MID",
            applicationStatus: <MDBBadge pill color='warning' light>Waitlisted</MDBBadge>,
        },
        {
            _id: 16,
            ClientName: "Edinson Cavani",
            ProfilePicture:
                "https://resources.premierleague.com/premierleague/photos/players/40x40/p40720.png",
            Loan: "Manchester United",
            loanAmount:
                "https://resources.premierleague.com/premierleague/badges/50/t1.png",
            Gender: "Uruguay",
            Age:
                "https://www.countryflags.com/wp-content/uploads/uruguay-flag-png-large.png",
            Interest: "FWD",
            applicationStatus: <MDBBadge pill className='mx-2' color='danger' light>Rejected</MDBBadge>,
        },
        {
            _id: 17,
            ClientName: "Ben Chilwell",
            ProfilePicture:
                "https://resources.premierleague.com/premierleague/photos/players/40x40/p172850.png",
            Loan: "Chelsea",
            loanAmount:
                "https://resources.premierleague.com/premierleague/badges/50/t8.png",
            Gender: "England",
            "Gender Image":
                "https://www.countryflags.com/wp-content/uploads/england-flag-jpg-xl.jpg",
            Interest: "DEF",
            applicationStatus: <MDBBadge pill className='mx-2' color='danger' light>Rejected</MDBBadge>,
        }
    ];

    const handleRowClicked = (row) => {
        console.log(row.ClientName);
        Navigate(`/user-panel/my-info/loan-info/${row._id}`);
    };
    //outputs the name property into the console

    return (
        <>
            <PostLoginNavBar />
            <div style={{ height: '100%', display: 'flex' }}>
                <SideBar />
                <Container>
                    <div>
                        <div className="p-2 title "><MDBBadge pill color='secondary' light>User Dashboard</MDBBadge></div>
                        <DataTable
                            //title="Client Summary"
                            columns={columns}
                            //data={loanDetails}
                            data={loanDetails}
                            defaultSortFieldId
                            pagination={10}
                            fixedHeader
                            fixedHeaderScrollHeight="450px"
                            onRowClicked={handleRowClicked}
                            highlightOnHover
                            progressPending={pending}
                           	customStyles={customStyles}
                        />
                    </div>

                    {/* SPACING */}
                    <div className="text-center p-3 mb-4"></div>

                    <div className="text-center p-3 mb-3">
                        <Footer />
                    </div>


                </Container>
            </div>
        </>
    );
}




