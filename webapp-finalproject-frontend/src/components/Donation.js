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
import DonationTable from "./DonationTable";

function Donation() {
  const API_URL = process.env.REACT_APP_API_URL;
  // itemName: data.itemName
  // quantity: data.quantity
  // donatorName: data.donatorName
  // contactNo: data.contactNo

  const itemRef = useRef();
 // const codeRef = useRef();
  const itemNameRef = useRef();
  const quantityRef = useRef();
  const donatorNameRef = useRef();
  const contactNoRef = useRef();
  const donationStatusRef = useRef();

  const [localDataItems, setLocalDataItems, remove] = useLocalStorage(
    "data-items",
    JSON.stringify([])
  );

  const [dataItems, setDataItems] = useState(JSON.parse(localDataItems));

  const [items, setItems] = useState([]);
  const [itemOptions, setItemOptions] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [randomCode, setRandomCode] = useState();
  //const [donationDisabled, setDonationDisabled] = useState();

  useEffect(() => {
    fetch(`${API_URL}/items`)
      .then((res) => res.json())
      .then((data) => {
        data = data.filter((e) => "_id" in e);

        //console.log(data);
        const z = data.map((v) => (
          <option key={v._id} value={v._id}>
            {v.name}
          </option>
        ));
        setItems(data);
        setItemOptions(z);
        console.log("options:", z)
      });
  }, []);

  const deleteDonation = () => {
    let item = items.find((v) => itemRef.current.value === v._id);
    console.log("Item to be deleted", item);
    fetch(`${API_URL}/donations`, {
      method: "DELETE",
      body: JSON.stringify({
        _id: item._id,
      }),
    })
      .then((res) => res.json)
      .then((data) => {
        console.log("Delete ", data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const addItem = () => {
    let item = items.find((v) => itemRef.current.value === v._id);
    //console.log(item);
    var donationObj = {
      _id: item._id,
      code: randomCode,
      itemName: item.name,
      quantity: quantityRef.current.value,
      donatorName: donatorNameRef.current.value,
      contactNo: contactNoRef.current.value,
      donationStatus: "-",
    };

    dataItems.push(donationObj);
    setDataItems([...dataItems]);
    setLocalDataItems(JSON.stringify(dataItems));
    //console.log("after", dataItems);
  };

  const donateItem = () => {
    let item = items.find((v) => itemRef.current.value === v._id);
    let randomizedCode = Math.floor(Math.random() * 1000000) + 1;
    setRandomCode(randomizedCode);
    const newDonation = {
        code: randomizedCode,
        itemName: item.name,
        quantity: quantityRef.current.value,
        donatorName: donatorNameRef.current.value,
        contactNo: contactNoRef.current.value,
        donationStatus: "-"
      };
      //console.log(newDonation);

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
        body: JSON.stringify(newDonation), // body data type must match "Content-Type" header
      })
      .then(res => res.json())
  }

  const updateDataItems = (dataItems) => {
    setDataItems([...dataItems]);
    setLocalDataItems(JSON.stringify(dataItems));
  };

  const clearDataItems = () => {
    setDataItems([]);
    setLocalDataItems(JSON.stringify([]));
  };

  const itemChange = () => {
    console.log("itemChange", itemRef.current.value);
    let item = items.find((v) => itemRef.current.value === v._id);
    console.log("itemChange", item);
  };  

  const validateDonation = () => {
    let donatorName = donatorNameRef.current.value;
    let contact = contactNoRef.current.value;
    let currentQuantity = quantityRef.current.value;

    console.log("contact=", contact);
    if (currentQuantity <= 0) {
      window.alert("Donation quantity must be at least 1.")
      return false;
    } else if (donatorName === "") {
      window.alert("Please fill the donator's name.")
      return false;
    } else if (contact === "") {
      window.alert("Please fill your contact number.");
      return false;
    } 
    return true;
  };

  function donateFunctions() {
    let donationIsValid = validateDonation();
    console.log("validation=", donationIsValid);
    
    if (donationIsValid) {
      if (window.confirm("Please confirm your donation :D")) {
        donateItem();
        addItem();
        console.log("saving donation to database");
        window.alert("Thank you for supporting us!")
      }
    } 
  };

  // const hoverStyle = {
  //   backgroundColor:"red"
  // }

  return (
    <Container style={{ padding: "20px", fontFamily:"century gothic" }}>
      <Row>
        <Col md={4} style={{ backgroundColor: "#ADD8E6", padding:"15px" }}>

          <Row style={{paddingBottom:"10px"}}>
            <Col>
              <Form.Label style={{fontWeight:"bold"}}>Item for Donation</Form.Label>
              <Form.Select ref={itemRef} onChange={itemChange}>
                {itemOptions}
              </Form.Select>
            </Col>
          </Row>

          <Row style={{paddingBottom:"10px"}}>
            <Col>
              <Form.Label style={{fontWeight:"bold"}}>Quantity</Form.Label>
              <Form.Control
                type="number"
                ref={quantityRef}
                //value={quantity}
                defaultValue="1"
                onChange={(e) => setQuantity(quantityRef.current.value)}
              />
            </Col>
          </Row>

          <Row style={{paddingBottom:"10px"}}>
            <Col>
              <Form.Label  style={{fontWeight:"bold"}}>Donator's Name</Form.Label>
              <Form.Control 
              type="String" 
              ref={donatorNameRef}
              placeholder="Name-Surname" 
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Label style={{fontWeight:"bold"}}>Contact</Form.Label>
              <Form.Control 
              type="String" 
              ref={contactNoRef}
              placeholder="0XX-XXXXXXX"
              />
            </Col>
          </Row>

          <hr />

          <div className="d-grid gap-2">
            <Button variant="success" 
            onClick={donateFunctions}
            style={{fontWeight:"bold"}}
            >
              Donate
            </Button>
            {/* <Button variant="danger" onClick={deleteDonation}>
              Delete
            </Button>  */}
          </div>

        </Col>
        <Col md={8}>
          <DonationTable
            data={dataItems}
            clearDataItems={clearDataItems}
            updateDataItems={updateDataItems}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default Donation;