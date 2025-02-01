import { useState, useEffect } from "react";
import PostLoginNavBar from "../../components/NavBar/PostLoginNavBar";
import SideBar from "../../components/Sidebar/SideBar";
import { Form, Col, Row, Button, InputGroup, Container } from "react-bootstrap";
import DocRequirements from "./DocRequirements";
import { MDBBadge } from "mdb-react-ui-kit";
import "./KYC.css";
import axios from "axios";

export default function KYC() {

  const common_documents = [
    { name: 'Photo Identity Proof', value: 'document_photoID' },
    { name: 'Address Proof', value: 'document_addressProof' },
    { name: 'Bank Statements (max 1 year old)', value: 'document_bankStatement' },
    { name: 'Income Tax Returns', value: 'document_ITR' },
    { name: 'Income Proof', value: 'document_incomeProof' },
    { name: 'List of existing loans and debts', value: 'document_loans_debts' },
    { name: 'List of Accounts', value: 'document_accounts' },
  ]

  const business_documents = [
    { name: 'Certificate of Incorporation', value: 'document_COI' },
    { name: 'GST Returns', value: 'document_GST' },
    { name: 'Cash Flow Statements', value: 'document_cashFlow' },
    { name: 'Cancelled Cheque', value: 'document_cancelledCheque' }
  ]



  const home_documents = [
    { name: 'Business Existence Proof (COI)', value: 'document_COI' },
    { name: 'Employment Appointment Letter', value: 'document_employmentLetter' },
    { name: 'Employment Appointment Letter', value: 'document_employmentLetter' },
    { name: 'Salary slip (3 months old)', value: 'document_salarySlip' },
    { name: 'Form 16 (2 years)', value: 'document_form16' },
    { name: 'Property Document (Sale deed, Khata)', value: 'document_propertyDoc' },
    { name: 'Office Address Proof', value: 'document_officeAddressProof' },
    { name: 'Office Ownership Proof', value: 'document_officeOwnershipProof' },
  ]


  const education_documents = [
    { name: 'Proof of Admission', value: 'document_proofOfAdmission' },
    { name: 'Marksheet (S.S.C./H.S.C./Degree/Diploma)', value: 'document_marksheet' },
    { name: 'Collateral Property Document', value: 'document_marksheet' }
  ]


  const personal_documents = [
    { name: 'Job Continuity Proof', value: 'document_jobContinuityProof' },
    { name: 'Form 16 (2 years)', value: 'document_form16' },
    { name: 'Salary slip (3 months old)', value: 'document_salarySlip' },
  ]
  const [modalShow, setModalShow] = useState(false);

  const [value, setValue] = useState([1]);
  const handleAdd = () => {
    const x = [...value, []]
    setValue(x)
  }
  const handleChange = (onChangeValue, i) => {
    const inputdata = [...value]
    inputdata[i] = onChangeValue.target.value;
    setValue(inputdata)
  }
  const handleDelete = (i) => {
    const deleteValue = [...value]
    deleteValue.splice(i, 1)
    setValue(deleteValue)
  }
  console.log(value, "data-");


  // state that will hold the Array of objects
  // initialized with empty array
  const [files, setFiles] = useState([]);
  // onChange function that reads files on uploading them
  // files read are encoded as Base64
  async function onFileUpload(event) {
    event.preventDefault();

    console.log(">", event.target.value);
    // Create an instance of FileReader API
    // let file_reader = new FileReader();

    // Get the actual file itself
    const formData = new FormData()
    let file = event.target.files[0];
    formData.append('document', file)
    console.log(files.length);
    // const name = document.getElementsByClassName("doc")
    // console.log(name.doc.value);
    // if (files.length === 0) {
    //   await setFiles([...files, { documentType: name.doc.value, uploaded_file: file, file_name: file.name }]);
    // }

    const name = value[files.length]
    await setFiles([...files, { documentType: name, uploaded_file: file, file_name: file.name }]);


    // setFiles([...files, {formData}]);
    // reading the actual uploaded file
    // file_reader.readAsDataURL(file);
  }
  // handle submit button for form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    console.log(files);

    files.forEach(file => {
      formData.append('fileList', file.uploaded_file)
    })

    try {
      await axios.post("http://localhost:5000/api/v1/file/upload/cloud", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }).then(response => {
        console.log(response);
      })
    } catch (err) {
      console.log(err);
      return
    }
    try {
      await axios.post("http://localhost:5000/api/v1/file/upload/details", files, {
        withCredentials: true
      }).then(response => {
        console.log(response);
      })
    } catch (err) {
      console.log(err);
    }
    window.location.reload()
  }
  // button state whether it's disabled or enabled
  const [enabled, setEnabled] = useState(false);
  // using useEffect we can detect if user uploaded any file,
  // so enable submit button
  useEffect(() => {
    if (files.length === 0) {
      setEnabled(false);
    } else {
      setEnabled(true);
    }
  }, [files]);

  return (
    <>
      <PostLoginNavBar />
      <div style={{ display: 'flex' }}>
        <SideBar />

        <div className="container-fluid">

          <div className="p-4 title"><MDBBadge pill color='secondary' light>KYC Documents</MDBBadge></div>

          <Form onSubmit={handleSubmit} className="container mt-3 mb-3">

            {/* DOC UPLOAD ROW */}
            <Row className="drop p-3 mb-3" >

              {/* MAP FUNCTION */}
              {value.map((data, i) => {
                return (
                  <>
                    <div className="mt-2">

                      {/* MAIN DOC UPLOAD COLUMN */}
                      <Col style={{
                        paddingLeft: "5px",
                        paddingRight: "5px",
                        backgroundColor: "#212529",
                        borderRadius: '10px',
                      }}>
                        <Row>

                          {/* CHOOSE DOCUMENT */}
                          <Col className="col-md-4">
                            <Form.Group controlId="formGridState">
                              <Form.Label><MDBBadge pill color='info' light>CHOOSE DOCUMENT</MDBBadge></Form.Label>

                              <Form.Select value={data} onChange={e => handleChange(e, i)} name="documentType" className="form-control" required >
                                <option defaultValue value=''>Choose...</option>
                                <option disabled>-----------------COMMON FOR ALL-------------------</option>
                                {common_documents.map((option) => <option value={option.value} className="doc" name="doc" >{option.name}</option>)}
                                <option disabled>-------------------BUSINESS LOAN-------------------</option>
                                {business_documents.map((option) => <option value={option.value}  >{option.name}</option>)}
                                <option disabled>---------------------HOME LOAN--------------------</option>
                                {home_documents.map((option) => <option value={option.value} >{option.name}</option>)}
                                <option disabled>-----------------EDUCATION LOAN------------------</option>
                                {education_documents.map((option) => <option value={option.value} >{option.name}</option>)}
                                <option disabled>------------------PERSONAL LOAN------------------</option>
                                {personal_documents.map((option) => <option value={option.value} >{option.name}</option>)}
                              </Form.Select>
                              <Form.Control.Feedback type='valid'>Looks good!</Form.Control.Feedback>
                              <Form.Control.Feedback type='invalid'>Please provide a document!</Form.Control.Feedback>
                            </Form.Group>
                          </Col>

                          {/* TEXT ABOVE DOCUMENT */}
                          <Col className="col-md-8">
                            <label
                              style={{ color: "white" }}
                              className="form-label" for="customFile"><MDBBadge pill color='info' light>LOOKS GOOD / PLEASE UPLOAD</MDBBadge>
                            </label>
                            <input
                              onChange={onFileUpload}
                              id={1}
                              accept=".jpeg, .pdf"
                              type="file"
                              className="form-control"
                              required />
                          </Col>

                        </Row>

                      </Col>

                      {/* BLANK SPACE */}
                      <div className="p-1" />

                      {/* DELETE & REQUIREMENTS BUTTONS */}
                      <div className="text-center p-3 mb-3" >
                        <Button
                          onClick={() => handleDelete(i)}
                          type="button"
                          variant="outline-danger"
                          className="me-4 btn btn-sm">Delete
                        </Button>

                        <Button
                          variant="outline-primary"
                          className="me-4 btn btn-sm"
                          onClick={() => setModalShow(true)}>Requirements
                        </Button>

                        <DocRequirements
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                        />
                      </div>

                    </div>

                  </>
                )
              })}

            </Row>


            {/* ADD DOC & SUBMIT BUTTON */}
            <div className="text-center p-3 mb-3" >
              <Button
                onClick={() => handleAdd()}
                type="button"
                variant="dark"
                className="me-4 btn btn-sm">Add Document</Button>


              <Button
                type="submit"
                variant="success"
                className="me-4 btn btn-sm">Submit</Button>
            </div>

          </Form>

        </div>
      </div>
    </>
  );
};
