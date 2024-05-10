import { userEvent } from "@storybook/testing-library";
import { useState, useRef, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Button,
  Form,
} from "react-bootstrap";
import { useLocalStorage } from "react-use";
// import DonationTable from "./DonationTable";

function UserRequest() {
  const API_URL = process.env.REACT_APP_API_URL;
  // itemName: data.itemName
  // quantity: data.quantity
  // donatorName: data.donatorName
  // contactNo: data.contactNo

  const itemRef = useRef();
  const typeRef = useRef();
  const requestorNameRef = useRef();
  const donationCodeRef = useRef();
  const detailRef = useRef();
  //const requestStatusRef = useRef();

  const [localDataItems, setLocalDataItems, remove] = useLocalStorage(
    "data-items",
    JSON.stringify([])
  );

  // const [dataItems, setDataItems] = useState(JSON.parse(localDataItems));

  // const [items, setItems] = useState([]);
  // const [itemOptions, setItemOptions] = useState([]);
  // const [quantity, setQuantity] = useState(0);
  //const [donationDisabled, setDonationDisabled] = useState();

  // useEffect(() => {
  //   fetch(`${API_URL}/items`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       data = data.filter((e) => "_id" in e);

  //       //console.log(data);
  //       const z = data.map((v) => (
  //         <option key={v._id} value={v._id}>
  //           {v.name}
  //         </option>
  //       ));
  //       setItems(data);
  //       setItemOptions(z);
  //       console.log("options:", z)
  //     });
  // }, []);

  // const deleteDonation = () => {
  //   let item = items.find((v) => itemRef.current.value === v._id);
  //   console.log("Item to be deleted", item);
  //   fetch(`${API_URL}/donations`, {
  //     method: "DELETE",
  //     body: JSON.stringify({
  //       _id: item._id,
  //     }),
  //   })
  //     .then((res) => res.json)
  //     .then((data) => {
  //       console.log("Delete ", data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  // const addItem = () => {
  //   let type = items.find((v) => itemRef.current.value === v._id);
  //   //console.log(item);
  //   var donationObj = {
  //     _id: type._id,
  //     requestorName: requestorNameRef.current.value,
  //     donatorCode: donationCodeRef.current.value,
  //     requestStatus: requestStatus
  //   };

  //   dataItems.push(donationObj);
  //   setDataItems([...dataItems]);
  //   setLocalDataItems(JSON.stringify(dataItems));
  //   //console.log("after", dataItems);
  // };

  const makeRequest = () => {
    
    const newRequest = {
          type: typeRef.current.value,
          requestorName: requestorNameRef.current.value,
          donationCode: donationCodeRef.current.value,
          requestStatus: "Received",
          detail: detailRef.current.value
      };
      //console.log(newDonation);

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
        body: JSON.stringify(newRequest), // body data type must match "Content-Type" header
      })
      .then(res => res.json())
  }

  // const updateDataItems = (dataItems) => {
  //   setDataItems([...dataItems]);
  //   setLocalDataItems(JSON.stringify(dataItems));
  // };

  // const clearDataItems = () => {
  //   setDataItems([]);
  //   setLocalDataItems(JSON.stringify([]));
  // };

  // const itemChange = () => {
  //   console.log("itemChange", itemRef.current.value);
  //   let item = items.find((v) => itemRef.current.value === v._id);
  //   console.log("itemChange", item);
  // };  

  const validateRequest = () => {
    let type = typeRef.current.value;
    let donationCode = donationCodeRef.current.value;
    let requestorName = requestorNameRef.current.value;
    let detail = detailRef.current.value;

    console.log(type)

    if (type === "Select your request type:") {
      window.alert("Please select your request type.")
      return false;
    } else if (requestorName === "") {
      window.alert("Please fill the requestor's name.")
      return false;
    } else if (donationCode === "") {
      window.alert("Please fill the donation code.")
      return false;
    }  else if (detail === "") {
      window.alert("Please fill the detail.")
      return false;
    }
    return true;
  };

  function requestFunctions() {
    let RequestIsValid = validateRequest();
    console.log("validation=", RequestIsValid);
    
    if (RequestIsValid) {
      if (window.confirm("Please confirm your request :D")) {
        makeRequest();
        console.log("saving request to database");
        window.alert("We have received your request. \nThank you for contacting us!")
      }
    } 
  };

  return (
    <Container>
      <Row style={{ padding: "20px", fontFamily:"century gothic" }}>
        <Col style={{ backgroundColor: "#ADD8E6", padding: "15px" }}>

          <Row>
            <Col style={{paddingBottom:"10px", fontWeight:"bold"}}>
              <Form.Label style={{fontWeight:"bold"}}>Type of Request</Form.Label>
              <div className="custom-select" >
                <Form.Select type="String" ref={typeRef}>
                  <option value="Select your request type:">Select your request type:</option>
                  <option value="Update">Update</option>
                  <option value="Delete">Delete</option>
                </Form.Select>
              </div>
            </Col>
          </Row>

          <Row>
            <Col style={{paddingBottom:"10px", fontWeight:"bold"}}>
              <Form.Label style={{fontWeight:"bold"}}>Requestor's Name</Form.Label>
              <Form.Control
                type="String"
                ref={requestorNameRef}
                //value={quantity}
                placeholder="Name-Surname"
              />
            </Col>
          </Row>

          <Row>
            <Col style={{fontWeight:"bold", paddingBottom:"10px"}}>
              <Form.Label>Donation Code</Form.Label>
              <Form.Control 
              type="number" 
              ref={donationCodeRef}
              placeholder="XXXX"
              defaultValue="1" 
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Label style={{fontWeight:"bold"}}>Detail</Form.Label>
              <Form.Control 
              type="String" 
              ref={detailRef}
              placeholder="(e.g., Increase quantity to 100)"
              />
            </Col>
          </Row>

          <hr />

          <div className="d-grid gap-2">
            <Button variant="success" 
            onClick={requestFunctions}
            style={{fontWeight:"bold"}}
            >
              Submit Request
            </Button>
            {/* <Button variant="danger" onClick={deleteDonation}>
              Delete
            </Button>  */}
          </div>

        </Col>
        {/* <Col md={8}>
          <DonationTable
            data={dataItems}
            clearDataItems={clearDataItems}
            updateDataItems={updateDataItems}
          />
        </Col> */}
      </Row>
    </Container>
  );
}

export default UserRequest;