import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PostLoginNavBar from "../../components/NavBar/PostLoginNavBar";
import SideBar from "../../components/Sidebar/SideBar";
import { MDBBadge } from "mdb-react-ui-kit";
import { Container, Form, Row, Col } from 'react-bootstrap';
import DataTable from "react-data-table-component";
import './CheckStatus.css';
import axios from "axios"

const CheckStatus = () => {
	
	const customStyles = {
        headCells: {
            style: {
                fontWeight: "bold",
                fontSize: "0.9rem",
            }
        },
    }
	
	const documentList = [
		{
			DocID: 1,
			DocName: "Aston Villa",
			VerficationStatus:'Approve',
			Status: <MDBBadge pill color='success' light>Received</MDBBadge>,
		},
		{
			DocID: 2,
			DocName: "Manchester United",
			VerficationStatus:'Reject',
			Status: <MDBBadge pill color='danger' light>Pending</MDBBadge>,
		},
		{
			DocID: 3,
			DocName: "Everton",
			VerficationStatus:'Approve',
			Status: <MDBBadge pill color='success' light>Received</MDBBadge>,
		},
		{
			DocID: 4,
			DocName: "Spurs",
			VerficationStatus:'Reject',
			Status: <MDBBadge pill color='danger' light>Pending</MDBBadge>,
		},
		{
			DocID: 5,
			DocName: "Aston Villa",
			VerficationStatus:'Approve',
			Status: <MDBBadge pill color='success' light>Received</MDBBadge>,
		},
		{
			DocID: 6,
			DocName: "Manchester City",
			VerficationStatus:'Reject',
			Status: <MDBBadge pill color='danger' light>Pending</MDBBadge>,
		},
		{
			DocID: 7,
			DocName: "Wolves",
			VerficationStatus:'Approve',
			Status: <MDBBadge pill color='success' light>Received</MDBBadge>,
		},
		{
			DocID: 8,
			DocName: "Manchester United",
			VerficationStatus:'Reject',
			Status: <MDBBadge pill color='danger' light>Pending</MDBBadge>,
		},
		{
			DocID: 9,
			DocName: "Manchester United",
			VerficationStatus:'Approve',
			Status: <MDBBadge pill color='success' light>Received</MDBBadge>,
		},
		{
			DocID: 10,
			DocName: "Chelsea",
			VerficationStatus:'Reject',
			Status: <MDBBadge pill color='danger' light>Pending</MDBBadge>,
		},
		{
			DocID: 11,
			DocName: "Manchester United",
			VerficationStatus:'Approve',
			Status: <MDBBadge pill color='success' light>Received</MDBBadge>,
		},
		{
			DocID: 12,
			DocName: "Manchester United",
			VerficationStatus:'Reject',
			Status: <MDBBadge pill color='danger' light>Pending</MDBBadge>,
		},
		{
			DocID: 13,
			DocName: "Chelsea",
			VerficationStatus:'Approve',
			Status: <MDBBadge pill color='success' light>Received</MDBBadge>,
		}
	];

	
	
	const Navigate = useNavigate();
	
	const viewDocument = async (row) => {
		let url = ''
		try {
			await axios.get(`http://localhost:5000/api/v1/user/document/link/${row.document_type}`, {
				withCredentials: true
			}).then(response => {
				url = response.data;
				window.open(url)
			})
		} catch (err) {
			if (err.response.data.msg) {
				alert(err.response.data.msg)
				return
			}
			alert('Something went wrong')
		}
		// window.open(`/hello`);
	}
		
	const[documentDetails,setDocumentDetails] = useState([])

	const [columns, setColumns] = useState([]);
    const [pending, setPending] = useState(true);

	useEffect(() => {
		getUserDocumentsDetails()
    }, []);
		

	const getUserDocumentsDetails = async () => {
		try {
			await axios.get('http://localhost:5000/api/v1/user/documents/getAll', {
				withCredentials: true
			}).then(response => {
				console.log(response.data);
				setDocumentDetails(response.data)
			})
		} catch (err) {
			console.log(err);
			Navigate('/')
		}
		const timeout = setTimeout(() => {
            setColumns([
				{
					name: <MDBBadge pill color='dark' light>Document Name</MDBBadge>,
					selector: (row) => row.document_type,
					sortable: true
				},
				{
					name: <MDBBadge pill color='dark' light>Status</MDBBadge>,
					selector: (row) => row.document_status === 'Uploaded' ?<MDBBadge pill color='success' light>Uploaded</MDBBadge> : <MDBBadge pill color='danger' light>Pending</MDBBadge> ,
					sortable: true,
				},
				{
					name: <MDBBadge pill color='dark' light>Verification</MDBBadge>,
					selector: (row) => row.document_verification === 'Verified' ?<MDBBadge pill color='success' light>Verified</MDBBadge> : <MDBBadge pill color='danger' light>Unverified</MDBBadge> ,
					sortable: true,
				},
            ]);
            setPending(false);
        }, 2000);
        return () => clearTimeout(timeout);
	}

  return (
    <>
      <PostLoginNavBar />
      <div style={{ display: 'flex' }}>
        <SideBar />
        <Container>
        	<Row className="p-4 title"><MDBBadge pill color='secondary' light>Check Document Status</MDBBadge></Row>
        	
        	<Row>
						<DataTable	
							columns={columns}
							data={documentDetails}
							defaultSortFieldId
							pagination={5}
							fixedHeader
							fixedHeaderScrollHeight="400px"
							onRowClicked={viewDocument}
							highlightOnHover
							pointerOnHover
							progressPending={pending}
                           	customStyles={customStyles}
						/>
        	</Row>
      	</Container>
      </div>
    </>
  )
};

export default CheckStatus
