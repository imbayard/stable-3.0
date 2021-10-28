import React , { useState } from 'react';
import Routes from "./Routes";
import './App.css';

import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function App() {
  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <LinkContainer to="/">
          <Navbar.Brand className="font-weight-bold text-muted">
            Title
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            <>
              <LinkContainer to="/page2">
                <Nav.Link>Page2</Nav.Link>
              </LinkContainer>
            </>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="App">
        <Routes />
      </div>
    </div>
  );
}

export default App;
