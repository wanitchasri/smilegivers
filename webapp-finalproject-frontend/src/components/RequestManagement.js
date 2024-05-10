import React, { useEffect, useState, useRef } from "react";
import { Container, Table, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { FaTrashAlt, FaPencilAlt, FaPlus } from "react-icons/fa";
import style from "../mystyle.module.css";

export default function RequestManagement() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [requests, setRequests] = useState([]);
  const [requestRows, setRequestRows] = useState([]);
  const [show, setShow] = useState(false);
  const [modeAdd, setModeAdd] = useState(false);

  const [items, setItems] = useState([]);
  const [itemOptions, setItemOptions] = useState([]);
  const [itemNameToAdd, setItemNameToAdd] = useState();

  const [request, setRequest] = useState({
    type: "",
    requestorName: "",
    donationCode: "",
    detail: "",
    requestStatus: ""
  });

  // Input References
  const refType = useRef();
  const refRequestorName = useRef();
  const refDonationCode = useRef();
  const refDetail = useRef();
  const refRequestStatus = useRef();

  useEffect(() => {
    fetch(`${API_URL}/requests`)
      .then((res) => res.json())
      .then((data) => {
        
        const rows = data.map((e,i) => {
          return (
            <tr key={i}>
              <td style={{width: '40px'}}>
                {/* add icons (make sure to import first) */}
                <FaPencilAlt onClick={() => {handleUpdate(e)}} />
                {/* ways to create empty space */}
                {/*&nbsp;*/} {/* {' '} */}
                {/*<FaTrashAlt onClick={() => {handleDelete(e)}} />*/} 
              </td>
              <td>{e.type}</td>
              <td>{e.requestorName}</td>
              <td>{e.donationCode}</td>
              <td>{e.detail}</td>
              <td>{e.requestStatus}</td>
            </tr>
          );
        });

        console.log(data)
        setRequests(data);
        setRequestRows(rows);
      });

      fetch(`${API_URL}/items`)
      .then((res) => res.json())
      .then((data) => {

        data = data.filter((e) => "_id" in e);
        const options = data.map((v) => (
          <option key={v._id} value={v._id}>
            {v.name}
          </option>
        ));    
        setItems(data);
        setItemOptions(options);
      });
      
  }, []);

  // Set whether to show or close the Modal
  const handleClose = () => {
    setModeAdd(false);
    setShow(false);
  };

  const handleShow = () => setShow(true);

  // Show UPDATE Modal
  const handleUpdate = (request) => {
    console.log("Update Request", request)
    //refCode.current = request.code

      setShow(true);
      setRequest(request);

  };

  // Show ADD Modal
  const handleShowAdd = () => {
    setModeAdd(true);
    setShow(true);
  };

  const handleDelete = (request) => {
    console.log("Delete Request", request._id)
    // way to pop up confirmation modal (html-style)
    if (window.confirm(`Are you sure to delete "${request.itemName}"?`)) {
      // DELETE data
      fetch(`${API_URL}/requests/${request._id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
      })
      .then(res => res.json())
      .then(json => {
        // Successfully deleted
        console.log("DELETE Result", json);
        for (let i = 0; i < requests.length; i++) {
          if (requests[i]._id === request._id) {
            requests.splice(i, 1);
            break;
          }
        }

        const rows = requests.map((e, i) => {
          return (
            <tr key={i}>
              <td>
                <FaPencilAlt
                  onClick={() => {
                    handleUpdate(e);
                  }}
                />
                &nbsp;
                <FaTrashAlt
                  onClick={() => {
                    handleDelete(e);
                  }}
                />
              </td>
              <td>{e.type}</td>
              <td>{e.requestorName}</td>
              <td>{e.donationCode}</td>
              <td>{e.detail}</td>
              <td>{e.requestStatus}</td>
            </tr>
          );
        });

        setRequests(requests);
        setRequestRows(rows);     
        handleClose();
      });
    }
  };

  const handleItemName = () => {
    console.log(refType)
    let item = items.find((v) => refType.current.value === v._id);
    setItemNameToAdd(item.name);
    //console.log("itemToAdd", item.name)
  };  

  const handleFormAction = () => {
    if (modeAdd) {
      //handleItemName();
      // Add new item
      const newItem = {
        type: refType.current.value,
        requestorName: refRequestorName.current.value,
        donationCode: refDonationCode.current.value,
        detail: refDetail.current.value,
        requestStatus: refRequestStatus.current.value
      };
      //console.log(newItem);

      // POST data
      fetch(`${API_URL}/requests`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(newItem), // body data type must match "Content-Type" header
      })
      .then(res => res.json())
      .then(json => {
        console.log("POST Result", json);
          requests.push(json)
          const rows = requests.map((e, i) => {
            return (
              <tr key={i}>
                <td>
                  <FaPencilAlt
                    onClick={() => {
                      handleUpdate(e);
                    }}
                  />
                  {/* &nbsp;
                  <FaTrashAlt
                    onClick={() => {
                      handleDelete(e);
                    }} 
                  /> */}
                </td>
                <td>{e.type}</td>
                <td>{e.requestorName}</td>
                <td>{e.donationCode}</td>
                <td>{e.detail}</td>
                <td>{e.requestStatus}</td>
              </tr>
            );
          });
  
          setRequests(requests);
          setRequestRows(rows);          
          handleClose();
      });
      
    } else {
      // Update item
      const updatedItem = {
      // _id is required for updation
      _id: request._id,
      type: refType.current.value,
      requestorName: refRequestorName.current.value,
      donationCode: refDonationCode.current.value,
      detail: refDetail.current.value,
      requestStatus: refRequestStatus.current.value
      };
      console.log(updatedItem)

      // PUT data
      fetch(`${API_URL}/requests`, {
        method: "PUT", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(updatedItem), // body data type must match "Content-Type" header
      })
      .then(res => res.json())
      .then(json => {
        // Sucessfully updated the item
        console.log("PUT Result", json)
        for (let i=0; i<requests.length; i++) {
          if (requests[i]._id === updatedItem._id) {
            requests[i] = updatedItem;
            break;
          }
        }
      
        
        const rows = requests.map((e, i) => {
            return (
              <tr key={i}>
                <td>
                  <FaPencilAlt
                    onClick={() => {
                      handleUpdate(e);
                    }}
                  />
                  {/* &nbsp;
                  <FaTrashAlt
                    onClick={() => {
                      handleDelete(e);
                    }} 
                  />*/}
                </td>
            
                <td>{e.type}</td>
                <td>{e.requestorName}</td>
                <td>{e.donationCode}</td>
                <td>{e.detail}</td>
                <td>{e.requestStatus}</td>
              </tr>
            );
          });
  
          setRequests(requests);
          setRequestRows(rows);     
          handleClose();
        });
 
      }
    
    
  };

  return (
    <>
      <Container style={{ padding: "20px", fontFamily:"century gothic" }}>
        <h1>User Request Management</h1>
        {/* API_URL: {API_URL} */}
        <Button variant="success" style={{fontWeight:"bold"}} onClick={handleShowAdd}>
          <FaPlus /> Add
        </Button>
        <Table striped bordered hover variant="warning">
          <thead>
            <tr>
              <th style={{ width: "60px" }}>&nbsp;</th>
              <th className={style.textLeft}>Request Type</th>
              <th className={style.textLeft}>Donator's Name</th>
              <th className={style.textLeft}>Code</th>
              <th className={style.textLeft}>Detail</th>
              <th className={style.textLeft}>Status</th>
            </tr>
          </thead>
          <tbody>
            {requestRows}
          </tbody>
        </Table>
      </Container>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{fontFamily:"century gothic", fontWeight:"bold"}}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modeAdd ? "Add New Request" : "Update Request"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Row>
              <Col>Request Type</Col>
              <Col>
                <Form.Select type="String" ref={refType} defaultValue={request.type}>
                  <option value="Update">Update</option>
                  <option value="Delete">Delete</option>
                </Form.Select>
                {/*<input type="text" ref={refItemName} defaultValue={donation.itemName} />*/}
              </Col>
            </Row>
            <Row>
              <Col>Donator's Name</Col>
              <Col>
                <Form.Control
                type="String"
                ref={refRequestorName}
                defaultValue={request.requestorName}
                />
                {/*<input type="number" ref={refQuantity} defaultValue={donation.neededAmount} />*/}
              </Col>
            </Row>
            <Row>
              <Col>Code</Col>
              <Col>
                <Form.Control 
                type="number" 
                ref={refDonationCode}
                defaultValue={request.donationCode}
                />
                {/*<input type="text" ref={refDonatorName} defaultValue={donation.donatorName} />*/}
              </Col>
            </Row>
            <Row>
              <Col>Detail</Col>
              <Col>
                <Form.Control 
                type="String" 
                ref={refDetail}
                defaultValue={request.detail}
                />
                {/*<input type="text" ref={refDonatorName} defaultValue={donation.donatorName} />*/}
              </Col>
            </Row>
            <Row>
              <Col>Status</Col>
              <Col>
                <Form.Select type="String" ref={refRequestStatus} defaultValue={request.requestStatus}>
                  <option value="Received">Recieved</option>
                  <option value="Success">Success</option>
                  <option value="Failed">Failed</option>
                </Form.Select>
                {/*<input type="text" ref={refContactNo} defaultValue={donation.contactNo} />*/}
              </Col>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFormAction}>
            {modeAdd ? 'Add' : 'Update'}
          </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}
