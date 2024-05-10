import React, { useEffect, useState, useRef } from "react";
import { Container, Table, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { FaTrashAlt, FaPencilAlt, FaPlus } from "react-icons/fa";
import style from "../mystyle.module.css";

export default function ItemManagement() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [items, setItems] = useState([]);
  const [itemRows, setItemRows] = useState([]);
  const [show, setShow] = useState(false);
  const [modeAdd, setModeAdd] = useState(false);

  const [item, setItem] = useState({
    name: "",
    neededAmount: 0
  });

  // Input References
  const refName = useRef();
  const refNeed = useRef();

  useEffect(() => {
    fetch(`${API_URL}/items`)
      .then((res) => res.json())
      .then((data) => {

        data.sort((a, b) => {
          return b.neededAmount - a.neededAmount;
        });
        
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
              <td>{e.name}</td>
              <td>{e.neededAmount}</td>
            </tr>
          );
        });

        setItems(data);
        setItemRows(rows);
      });
  }, []);

  // Set whether to show or close the Modal
  const handleClose = () => {
    setModeAdd(false);
    setShow(false);
  };

  const handleShow = () => setShow(true);

  // Show UPDATE Modal
  const handleUpdate = (item) => {
    console.log("Update Item", item)
    //console.log(refCode)
    //refCode.code = item.code

    setShow(true);
    setItem(item);
  };

  // Show ADD Modal
  const handleShowAdd = () => {
    setModeAdd(true);
    setShow(true);
  };

  const handleDelete = (item) => {
    console.log("Delete item", item)
    // way to pop up confirmation modal (html-style)
    if (window.confirm(`Are you sure to delete Item "${item.name}"?`)) {
      // DELETE data
      fetch(`${API_URL}/items/${item._id}`, {
        method: "DELETE", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
      })
      .then(res => res.json())
      .then(json => {
        // Successfully deleted
        console.log("DELETE Result", json);
        for (let i = 0; i < items.length; i++) {
          if (items[i]._id === item._id) {
            items.splice(i, 1);
            break;
          }
        }

        const rows = items.map((e, i) => {
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
              <td>{e.name}</td>
              <td>{e.neededAmount}</td>
            </tr>
          );
        });

        setItems(items);
        setItemRows(rows);     
        handleClose();
      });
    }
  };

  const ItemIsValid = (u) => {
    let data = items;
    console.log("Data", data);
    let newItem = u;

    for (let i = 0; i < data.length; i++) {
      if (newItem.name === "") {
        window.alert("Item name is empty")
        return false;
      }
      if (newItem.name === data[i].name) {
        window.alert("This item already exists.")
        return false;
      }
      if (newItem.neededAmount <= 0) {
        window.alert("Item's need amount must be at least 1.")
        return false;
      }
    } 
    return true;
  };

  const updatedItemIsValid = () => {
    let updatedName = refName.current.value;
    let updatedNeededAmount = refNeed.current.value;

    if (updatedName === "") {
      window.alert("Item name is empty")
      return false;
    } else if (updatedNeededAmount <= 0) {
      window.alert("Item's need amount must be at least 1.")
      return false;
    } 
    
    // let counter = 0;
    // for (let i = 0; i < items.length; i++) {
    //   if (updatedName === items[i].name) {
    //     counter += 1
    //   }
    // }
    // if ((counter === 1)) {
    //   window.alert("This item already exists.")
    //   return false;
    // }
    return true;
  };

  const handleFormAction = () => {
    if (modeAdd) {
      // Add new item
      const newItem = {
        name: refName.current.value,
        neededAmount: refNeed.current.value
      };
      console.log("New Item", newItem);

      if (ItemIsValid(newItem)) {
      
        // POST data
        fetch(`${API_URL}/items`, {
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
            items.push(json)
            const rows = items.map((e, i) => {
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
                  <td>{e.name}</td>
                  <td>{e.neededAmount}</td>
                </tr>
              );
            });

            setItems(items);
            setItemRows(rows);          
            handleClose();
          });
        }
    } else {
      // Update item
      const updatedItem = {
        // _id is required for updation
        _id: item._id,
        name: refName.current.value,
        neededAmount: refNeed.current.value
      };
      console.log(updatedItem)

      if (updatedItemIsValid()) {
        // PUT data
        fetch(`${API_URL}/items`, {
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
          for (let i=0; i<items.length; i++) {
            if (items[i]._id === updatedItem._id) {
              items[i] = updatedItem;
              break;
            }
          }
          
          const rows = items.map((e, i) => {
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
              
                  <td>{e.name}</td>
                  <td>{e.neededAmount}</td>
                </tr>
              );
            });
    
            setItems(items);
            setItemRows(rows);     
            handleClose();
          });
        }
    }
  };

  return (
    <>
      <Container style={{ padding: "20px", fontFamily:"century gothic" }}>
        <h1>Item Management</h1>
        {/* API_URL: {API_URL} */}
        <Button variant="success" style={{fontWeight:"bold"}} onClick={handleShowAdd}>
          <FaPlus /> Add
        </Button>
        <Table striped bordered hover variant="warning">
          <thead>
            <tr>
              <th style={{ width: "60px" }}>&nbsp;</th>
          
              <th className={style.textLeft}>Name</th>
              <th className={style.textLeft}>Need</th>
            </tr>
          </thead>
          <tbody>
            {itemRows}
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
            {modeAdd ? "Add New Item" : "Update item"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Row>
              <Col>Name</Col>
              <Col>
                <Form.Control 
                type="String" 
                ref={refName}
                defaultValue={item.name}
                />
                {/* <input type="text" ref={refName} defaultValue={item.name} /> */}
              </Col>
            </Row>
            <Row>
              <Col>Need</Col>
              <Col>
                <Form.Control 
                type="number" 
                ref={refNeed}
                defaultValue={item.neededAmount}
                />
                {/* <input type="number" ref={refNeed} defaultValue={item.neededAmount} /> */}
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
