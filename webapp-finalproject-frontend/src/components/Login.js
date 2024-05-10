import React from "react";
import { useForm } from "react-hook-form";

import PropTypes from "prop-types";
import { Form, Button, Row, Col} from "react-bootstrap";

export function Login({ email, password, onLogin }) {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);
  //console.log(errors);

  return (
    <Form onSubmit={handleSubmit(onLogin)} style={{ padding: "20px", fontFamily:"century gothic"}}>
      <Form.Group className="mb-3" controlId="formLabels">
        <Col md={20} style={{ backgroundColor: "#FFD099", padding:"10px"}}>
          <Row style={{ textAlign: "center", fontFamily:"century gothic"}}>
            <h1 style={{fontSize:"250%"}}> SMILE GIVERS </h1>
            <h2> FOUNDATION </h2>
          </Row>
          <Row style={{textAlign: "center", fontFamily:"century gothic"}}>
              <h2 style={{fontWeight:"bold", fontSize:"200%"}}> LOG-IN </h2>
          </Row>
        </Col>

      </Form.Group>
        
      <Form.Group className="mb-3" controlId="formFilling" style={{backgroundColor:"#AFD6AD", transform: "translateY(-5%)"}}>
        <Col style={{padding: "30px"}}>
          <Form.Label style={{fontWeight:"bold"}}>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            defaultValue={email}
            {...register("email", { required: true })}
          />

          {/* <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text> */}

          <Form.Label style={{fontWeight:"bold", paddingTop:"10px"}}>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            //defaultValue={password}
            {...register("password", { required: true, min: 8 })}
          />
          {/* <Form.Text className="text-muted">
            We'll never share your password with anyone else.
          </Form.Text> */}
        </Col>
        {/* <input type="submit" /> */}
        <div className="d-grid gap-2" style={{padding:"30px", paddingTop:"0px"}}>
          <Button type="submit" variant="dark">
            Login
          </Button>
        </div>
      </Form.Group>
      
      <Col style={{padding: "15px", paddingTop:"0px"}}>
        <Row style={{padding:"20px", width:"45%", fontSize:"12px", fontWeight:"bold", outlineStyle:"dashed"}}>
            <h6 style={{fontWeight:"bold"}}>FOR ADMIN:</h6>
            <h8>email: admin@hotmail.com</h8>
            <h8>password: adminishere</h8>
            &nbsp;
            <h6 style={{fontWeight:"bold"}}>FOR DONATOR:</h6>
            <h8>email: donator@hotmail.com</h8>
            <h8>password: donatorishere</h8>
        </Row>
      </Col>

    </Form>
    
  );
}

Login.propTypes = {
  email: PropTypes.string,
  password: PropTypes.string,
  onLogin: PropTypes.func,
};

Login.defaultProps = {
  email: null,
  password: null, //false??
  onLogin: undefined,
};
