import React from "react";
import { useForm } from "react-hook-form";

import PropTypes from "prop-types";
import { Form, Button, Row, Container } from "react-bootstrap";

export function LoggedIn() {

  const logOut = () => {
    if (window.confirm("Are you sure to log out?")) {
      window.localStorage.setItem('logInMode', true);
      window.location.reload();
    }
  }

  return (
    <Container style={{ padding: "30px", fontFamily:"century gothic" }}>
      <Row style={{textAlign: "center"}}>
        {/*<h2>{window.localStorage.getItem('currentUsername')}</h2>*/}
        <h1> You are logged in. </h1>
        <h3> Have a warming visit! </h3>
        &nbsp;
        <Button variant="danger" style={{fontWeight:"bold"}} onClick={logOut}> Log Out </Button>
      </Row>
   </Container>
  );
}
