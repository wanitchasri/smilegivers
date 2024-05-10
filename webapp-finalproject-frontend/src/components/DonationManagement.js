import React, { useEffect, useState, useRef } from "react";
import { Container, Table, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { FaTrashAlt, FaPencilAlt, FaPlus } from "react-icons/fa";
import style from "../mystyle.module.css";

export default function DonationManagement() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [donations, setDonations] = useState([]);
  const [donationRows, setDonationRows] = useState([]);
  const [show, setShow] = useState(false);
  const [modeAdd, setModeAdd] = useState(false);

  const [items, setItems] = useState([]);
  const [itemOptions, setItemOptions] = useState([]);
  const [itemNameToAdd, setItemNameToAdd] = useState();

  const [donation, setDonation] = useState({
    code: 0,
    itemName: "",
    quantity: 0,
    donatorName: "",
    contactNo: "",
    donationStatus: ""
  });

  // Input References
  const refCode = useRef();
  const refItemName = useRef();
  const refQuantity = useRef();
  const refDonatorName = useRef();
  const refContactNo = useRef();
  const refDonationStatus = useRef();

  useEffect(() => {
    fetch(`${API_URL}/donations`)
      .then((res) => res.json())
      .then((data) => {
        
        const rows = data.map((e,i) => {
          return (
            <tr key={i}>
              <td style={{width: '40px'}}>
                {/* add icons (make sure to import first) */}
                <FaPencilAlt onClick={() => {handleUpdate(e)}} />
                {/* ways to create empty space */}
                &nbsp; {/* {' '} */}
                <FaTrashAlt onClick={() => {handleDelete(e)}} /> 
              </td>
              <td>{e.code}</td>
              <td>{e.itemName}</td>
              <td>{e.quantity}</td>
              <td>{e.donatorName}</td>
              <td>{e.contactNo}</td>
              <td>{e.donationStatus}</td>
            </tr>
          );
        });

        setDonations(data);
        setDonationRows(rows);
      });

      fetch(`${API_URL}/items`)
      .then((res) => res.json())
      .then((data) => {

        data = data.filter((e) => "_id" in e);
        const options = data.map((v) => (
          <option key={v._id} value={v.itemName}>
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
  const handleUpdate = (donation) => {
    console.log("Update Donation", donation)
    //refCode.current = donation.code

    setShow(true);
    setDonation(donation);
  };

  // Show ADD Modal
  const handleShowAdd = () => {
    setModeAdd(true);
    setShow(true);
  };

  const handleDelete = (donation) => {
    console.log("Delete Donation", donation._id)
    // way to pop up confirmation modal (html-style)
    if (window.confirm(`Are you sure to delete Donation ID "${donation.code}"?`)) {
      // DELETE data
      fetch(`${API_URL}/donations/${donation._id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
      })
      .then(res => res.json())
      .then(json => {
        // Successfully deleted
        console.log("DELETE Result", json);
        for (let i = 0; i < donations.length; i++) {
          if (donations[i]._id === donation._id) {
            donations.splice(i, 1);
            break;
          }
        }

        const rows = donations.map((e, i) => {
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
              <td>{e.code}</td>
              <td>{e.itemName}</td>
              <td>{e.quantity}</td>
              <td>{e.donatorName}</td>
              <td>{e.contactNo}</td>
              <td>{e.donationStatus}</td>
            </tr>
          );
        });

        setDonations(donations);
        setDonationRows(rows);     
        handleClose();
      });
    }
  };

  // const handleItemName = () => {
  //   console.log(refItemName)
  //   if (refItemName.current.value === "Select item name:") {
  //     window.alert("Please select 1 item name");
  //   } else {
  //     let item = items.find((v) => refItemName.current.value === v._id);
  //     setItemNameToAdd(item.name);
  //     console.log("itemToAdd", item.name)
  //   }
  // };  

  const validateDonation = () => {
    let updatedQuantity = refQuantity.current.value;
    let updatedDonatorName = refDonatorName.current.value;
    let updatedContact = refContactNo.current.value;
    let updatedStatus = refDonationStatus.current.value;

    if (updatedQuantity <= 0) {
      window.alert("Donation quantity must be at least 1.")
      return false;
    } else if (updatedDonatorName === "") {
      window.alert("Donator name is empty")
      return false;
    } else if (updatedContact === "") {
      window.alert("Contact number is empty")
      return false;
    } else if (updatedStatus === "-") {
      window.alert("Status is now unspecified")
      if (!window.confirm("Are you sure to proceed?")) {
        return false
      }
    } 
    return true;
  };

  const handleFormAction = () => {
    let donationIsValid = validateDonation();
    if (donationIsValid) {
      if (modeAdd) {
      // handleItemName();
      let randomizedCode = Math.floor(Math.random() * 1000000) + 1;
      // Add new item
      const newItem = {
        code: randomizedCode,
        itemName: refItemName.current.value,
        quantity: refQuantity.current.value,
        donatorName: refDonatorName.current.value,
        contactNo: refContactNo.current.value,
        donationStatus: refDonationStatus.current.value
      };
      //console.log(newItem);

      // POST data
      fetch(`${API_URL}/donations`, {
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
          donations.push(json)
          const rows = donations.map((e, i) => {
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
                <td>{e.code}</td>
                <td>{e.itemName}</td>
                <td>{e.quantity}</td>
                <td>{e.donatorName}</td>
                <td>{e.contactNo}</td>
                <td>{e.donationStatus}</td>
              </tr>
            );
          });
  
          setDonations(donations);
          setDonationRows(rows);          
          handleClose();
      });
      
      } else {
        // Update item
        const updatedItem = {
          // _id is required for updation
          _id: donation._id,
          code: refCode.current.value,
          itemName: refItemName.current.value,
          quantity: refQuantity.current.value,
          donatorName: refDonatorName.current.value,
          contactNo: refContactNo.current.value,
          donationStatus: refDonationStatus.current.value
        };
        console.log(updatedItem)

        // PUT data
        fetch(`${API_URL}/donations`, {
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
          for (let i=0; i<donations.length; i++) {
            if (donations[i]._id === updatedItem._id) {
              donations[i] = updatedItem;
              break;
            }
          }
        
          
          const rows = donations.map((e, i) => {
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
                  <td>{e.code}</td>
                  <td>{e.itemName}</td>
                  <td>{e.quantity}</td>
                  <td>{e.donatorName}</td>
                  <td>{e.contactNo}</td>
                  <td>{e.donationStatus}</td>
                </tr>
              );
            });
    
            setDonations(donations);
            setDonationRows(rows);     
            handleClose();
          }); 
        }
      
    } 
    
  };

  return (
    <>
      <Container style={{ padding: "20px", fontFamily:"century gothic" }}>
        <h1>Donation Management</h1>
        {/* API_URL: {API_URL} */}
        <Button variant="success" style={{fontWeight:"bold"}} onClick={handleShowAdd}>
          <FaPlus /> Add
        </Button>
        <Table striped bordered hover variant="warning">
          <thead>
            <tr>
              <th style={{ width: "60px" }}>&nbsp;</th>
              <th className={style.textLeft}>Donation Code</th>
              <th className={style.textLeft}>Item Name</th>
              <th className={style.textLeft}>Item Quantity</th>
              <th className={style.textLeft}>Donator Name</th>
              <th className={style.textLeft}>Contact Number</th>
              <th className={style.textLeft}>Donation Status</th>
            </tr>
          </thead>
          <tbody>
            {donationRows}
          </tbody>
        </Table>
      </Container>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{fontFamily:"century gothic", fontWeight:"bold" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {modeAdd ? "Add New Donation" : "Update Donation"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col>Donation Code</Col>
              <Col>
                <Form.Control
                type="number"
                ref={refCode}
                placeholder="<Auto random>"
                defaultValue={donation.code}
                disabled
                />
                {/*<input type="number" ref={refQuantity} defaultValue={donation.neededAmount} />*/}
              </Col>
            </Row>
            <Row>
              <Col>Item Name</Col>
              <Col>
                <Form.Select type="String" defaultValue={donation.itemName} ref={refItemName}>
                    {itemOptions}
                </Form.Select>
                {/*<input type="text" ref={refItemName} defaultValue={donation.itemName} />*/}
              </Col>
            </Row>
            <Row>
              <Col>Item Quantity</Col>
              <Col>
                <Form.Control
                type="number"
                ref={refQuantity}
                defaultValue={donation.quantity}
                />
                {/*<input type="number" ref={refQuantity} defaultValue={donation.neededAmount} />*/}
              </Col>
            </Row>
            <Row>
              <Col>Donator Name</Col>
              <Col>
                <Form.Control 
                type="String" 
                ref={refDonatorName}
                defaultValue={donation.donatorName}
                />
                {/*<input type="text" ref={refDonatorName} defaultValue={donation.donatorName} />*/}
              </Col>
            </Row>
            <Row>
              <Col>Contact Number</Col>
              <Col>
                <Form.Control 
                type="String" 
                ref={refContactNo}
                defaultValue={donation.contactNo}
                />
                {/*<input type="text" ref={refContactNo} defaultValue={donation.contactNo} />*/}
              </Col>
            </Row>
            <Row>
              <Col>Donation Status</Col>
              <Col>
                <Form.Select type="String" ref={refDonationStatus} defaultValue={donation.donationStatus}>
                  <option value="-">-</option>
                  <option value="In-Progress">In-Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Canceled">Canceled</option>
                </Form.Select>
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
