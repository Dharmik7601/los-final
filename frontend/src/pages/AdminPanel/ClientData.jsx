import { Container, Form, Row, Col, InputGroup } from 'react-bootstrap';
import DataTable, { createTheme } from "react-data-table-component";
import AdminSideBar from "../../components/Sidebar/AdminSideBar";
import PostLoginNavBar from "../../components/NavBar/PostLoginNavBar";
import { MDBBadge } from "mdb-react-ui-kit";
import './ClientData.css';
import axios from "axios"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

export default function ClientData() {

    const Navigate = useNavigate()

    const [clientData,setClientData] = useState([])

    const getClientData = async () => {
        try {
            axios.get('http://localhost:5000/api/v1/admin/getAll', {
                withCredentials:true
            }).then(response => {
                console.log(response);
                setClientData(response.data)
                console.log(clientData);
            })
        } catch (err) {
            console.log(err);
            Navigate('/')
        }
    }
    
    useEffect(() => {
        getClientData()
    },[])

    const customStyles = {
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "0.9rem"
            }
        },
    }


    const columns = [
        {
            name: <MDBBadge pill color='dark' light>Client ID</MDBBadge>,
            selector: (row) => row.client_ID,
            sortable: true
        },
        {
            name: <MDBBadge pill color='dark' light>Client Name</MDBBadge>,
            selector: (row) => row.client_name,
            sortable: true
        },
        {
            name: <MDBBadge pill color='dark' light>Client Phone</MDBBadge>,
            selector: (row) => row.client_mobile,
            sortable: true
        },
        {
            name: <MDBBadge pill color='dark' light>Client Email</MDBBadge>,
            selector: (row) => row.client_email ,
            sortable: true
        },
        {
            name: <MDBBadge pill color='dark' light>No of Inquiries</MDBBadge>,
            selector: (row) => row.client_inquiries ,
            sortable: true
        },
    ];

    

    // const conditionalRowStyles = [
    //     {
    //         when: (row) => row,
    //         style: {
    //             "&:hover": {
    //                 backgroundColor: "green",
    //                 color: "white",
    //                 cursor: "pointer"
    //             }
    //         }
    //     }
    //     // You can also pass a callback to style for additional customization
    // ];

    const handleRowClicked = (row) => {
        console.log(row);
        Navigate(`/admin-panel/client-details/${row.client_ID}/${row.client_email}`);
    };
    //outputs the name property into the console

    return (
        <>
            <PostLoginNavBar />
            <div style={{ height: '100%', display: 'flex' }}>
                <AdminSideBar />
                <Container>
                    <div>
                        <div className="p-2 title"><MDBBadge pill color='secondary' light>Client Summary</MDBBadge></div>
                        <DataTable
                            //title="Client Summary"
                            columns={columns}
                            data={clientData}
                            defaultSortFieldId
                            pagination={10}
                            fixedHeader
                            fixedHeaderScrollHeight="450px"
                            onRowClicked={handleRowClicked}
                            highlightOnHover
                            customStyles={customStyles}
                        />
                    </div>
                </Container>
            </div>
        </>
    );
}
