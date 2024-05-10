import { useState, useRef, useEffect } from "react";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Button,
  Form
} from "react-bootstrap";
import { useLocalStorage, useWindowSize } from "react-use";
import Donation from "./components/Donation";
import UserRequest from "./components/UserRequest";
import RequestManagement from "./components/RequestManagement";
import ItemManagement from "./components/ItemManagement";
import DonationManagement from "./components/DonationManagement";
import UserItemManagement from "./components/UserItemManagement";
import UserDonationManagement from "./components/UserDonationManagement";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Login } from "./components/Login";
import { LoggedIn } from "./components/LoggedIn";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [user, setUser] = useState();
  const [logInMode, setLogInMode] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUsername, setUsername] = useState();

  const handleLogin = (data) => {
    console.log('handleLogin',data)
    fetch(`${API_URL}/users/login`, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        window.alert("Error:"+ data.error)
      } else {
        window.alert("Welcome "+ data.username)
        if (data.admin === true) {
          console.log(data.admin)
          setLogInMode(false);
          window.localStorage.setItem('logInMode', false);
          window.localStorage.setItem('isAdmin', true);

          setIsAdmin(true);
        } else if (data.admin === false) {
          setLogInMode(false);
          window.localStorage.setItem('logInMode', false);
          window.localStorage.setItem('isAdmin', false);
          //window.location.reload();
          //window.location.href = "/smile-givers/user-item-management";
          setIsAdmin(false);
        }
        console.log("data:", data)
        setUser(data)
        setUsername(data.username)
        console.log("current login mode", localStorage.getItem('logInMode'))
        console.log("current admin mode", localStorage.getItem('isAdmin'))
      }
    })
    ;
  };
  
  if (JSON.parse(window.localStorage.getItem('logInMode'))) {
    return (
    <Router>
      <Navbar style={{backgroundColor:"#FFA199", padding:"10px", fontFamily:"segoe print", color:"black", fontSize:"120%"}}>
        <Container>
          <Navbar.Brand href="#home" style={{fontSize:"150%", fontWeight:"bold"}}>SMILE GIVERS</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/smile-givers">
              Log-In
            </Nav.Link>
            <Nav.Link href="/smile-givers/user-item-management">
              Item
            </Nav.Link>
            <Nav.Link href="/smile-givers/user-donation-management">
              Donation
            </Nav.Link>
            <Nav.Link href="/smile-givers/donation">
              Donate
            </Nav.Link>
            <Nav.Link href="/smile-givers/user-request">
              Request
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/smile-givers/user-item-management"
          element={<UserItemManagement />}
        />
        <Route
          path="/smile-givers/user-donation-management"
          element={<UserDonationManagement />}
        />

        <Route path="/smile-givers/donation" element={<Donation />} />
        <Route path="/smile-givers/user-request" element={<UserRequest />} />
        <Route
          path="/smile-givers/"
          element={
            <Container>
              { user ? (
                <div> Hello {user.username} </div>
              ) : (
                // Login Page
                <Login onLogin={handleLogin} />
              )}
            </Container>

          }
        />
      </Routes>
    </Router>
    );

  } else if (!JSON.parse(window.localStorage.getItem('logInMode'))) {
    if (JSON.parse(window.localStorage.getItem('isAdmin'))) {
      return (
      <Router>
        <Navbar style={{backgroundColor:"#FFA199", padding:"10px", fontFamily:"segoe print", color:"black", fontSize:"120%"}}>
        <Container>
          <Navbar.Brand href="#home" style={{fontSize:"150%", fontWeight:"bold"}}>SMILE GIVERS</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/smile-givers">
                Log-In
              </Nav.Link>
              <Nav.Link href="/smile-givers/item-management">
                Item Management
              </Nav.Link>
              <Nav.Link href="/smile-givers/donation-management">
                Donation Management
              </Nav.Link>
              <Nav.Link href="/smile-givers/request-management">
                Request Management
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <Routes>
          <Route
            path="/smile-givers/item-management"
            element={<ItemManagement />}
          />
          <Route
            path="/smile-givers/donation-management"
            element={<DonationManagement />}
          />
          <Route
            path="/smile-givers/request-management"
            element={<RequestManagement />}
          />
          <Route
          path="/smile-givers/"
          element={<LoggedIn />}
        />
        </Routes>
      </Router>
      );
    } else if (!JSON.parse(window.localStorage.getItem('isAdmin'))) {
      return (
    <Router>
      <Navbar style={{backgroundColor:"#FFA199", padding:"10px", fontFamily:"segoe print", color:"black", fontSize:"120%"}}>
        <Container>
          <Navbar.Brand href="#home" style={{fontSize:"150%", fontWeight:"bold"}}>SMILE GIVERS</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/smile-givers">
              Log-In
            </Nav.Link>
            <Nav.Link href="/smile-givers/user-item-management">
              Item
            </Nav.Link>
            <Nav.Link href="/smile-givers/user-donation-management">
              Donation
            </Nav.Link>
            <Nav.Link href="/smile-givers/donation">
              Donate
            </Nav.Link>
            <Nav.Link href="/smile-givers/user-request">
              Request
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/smile-givers/user-item-management"
          element={<UserItemManagement />}
        />
        <Route
          path="/smile-givers/user-donation-management"
          element={<UserDonationManagement />}
        />

        <Route path="/smile-givers/donation" element={<Donation />} />
        <Route path="/smile-givers/user-request" element={<UserRequest />} />
        <Route
          path="/smile-givers/"
          element={<LoggedIn />}
        />
      </Routes>
    </Router>
    );
    }
  }

}

export default App;
