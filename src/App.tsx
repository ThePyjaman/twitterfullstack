import React, { useContext } from "react";
import Application from "./Components/Application";
import UserProvider from "./Provider/UserProvider"
import { Container } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {

  return (
      <Container
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
      >
        <UserProvider>
            <Application />
        </UserProvider>
      </Container>
  );
}

export default App;
