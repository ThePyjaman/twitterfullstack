import React, { useState, useContext } from "react";
import { auth } from "../firebase";
import { Link } from "@reach/router";
import {Alert, Button, Card, Form} from "react-bootstrap";


const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    }
  };

  const sendResetEmail = event => {
    event.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
          setEmailHasBeenSent(true);
        setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
      })
      .catch(() => {
        setError("Error resetting password");
      });
  };
  return (
    <div className="mt-8">
      <Card>
        <Card.Body>
          <h1 className="text-xl text-center font-bold mb-3">
            Reset your Password
          </h1>
          <Form action="">
            {emailHasBeenSent && (
                <Alert variant='success'>
                  An email has been sent to you!
                </Alert>
            )}
            {error !== null && (
                <Alert variant="danger">
                  {error}
                </Alert>
            )}
            <Form.Group>
              <Form.Label>
                Email
              </Form.Label>
              <Form.Control
                  type="email"
                  name="userEmail"
                  id="userEmail"
                  value={email}
                  placeholder="Email"
                  onChange={onChangeHandler}
              />
            </Form.Group>
            <Button
                className="w-100"
                onClick={event => {
                  sendResetEmail(event);
                }}
            >
              Get reset link
            </Button>
          </Form>

          <Link
              to="/"
              className="my-2 text-blue-700 hover:text-blue-800 text-center block"
          >
            &larr; back to sign in page
          </Link>
        </Card.Body>
      </Card>

    </div>
  );
};

export default PasswordReset;
