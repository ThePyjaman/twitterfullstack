import React, { useContext, useState } from "react";
import { Link } from "@reach/router";
import { auth, signInWithGoogle, generateUserDocument } from "../firebase";
import {Alert, Button, Card, Form} from "react-bootstrap";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
    event.preventDefault();
    try{
      const {user} = await auth.createUserWithEmailAndPassword(email, password);
      await generateUserDocument(user, {displayName});
    }
    catch(error){
      setError('Error Signing up with email and password');
    }
      
    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const onChangeHandler = event => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  return (
    <div className="mt-8">
      <Card>
        <Card.Body>
          <h1 className="text-3xl mb-2 text-center font-bold">Sign Up</h1>
            {error !== null && <Alert variant="danger">{error}</Alert>}
            <Form className="">
              <Form.Group>
                <Form.Label>
                  Pseudo
                </Form.Label>
                <Form.Control
                    type="text"
                    name="displayName"
                    value={displayName}
                    placeholder="LeRoiPyjaman"
                    id="displayName"
                    onChange={event => onChangeHandler(event)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Email
                </Form.Label>
                <Form.Control
                    type="email"
                    name="userEmail"
                    value={email}
                    placeholder="example@example.com"
                    id="userEmail"
                    onChange={event => onChangeHandler(event)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="userPassword" className="block">
                  Password:
                </Form.Label>
                <Form.Control
                    type="password"
                    name="userPassword"
                    value={password}
                    placeholder="Password"
                    id="userPassword"
                    onChange={event => onChangeHandler(event)}
                />
              </Form.Group>

              <Button
                  className="w-100"
                  onClick={event => {
                    createUserWithEmailAndPasswordHandler(event, email, password);
                  }}
              >
                Sign up
              </Button>
            </Form>
            <p className="text-center my-3">or</p>
            <Button
                onClick={() => {
                  try {
                    signInWithGoogle();
                  } catch (error) {
                    console.error("Error signing in with Google", error);
                  }
                }}
                className="w-100"
            >
              Sign In with Google
            </Button>
            <p className="text-center my-3">
              Already have an account?{" "}
              <Link to="/" className="text-blue-500 hover:text-blue-600">
                Sign in here
              </Link>{" "}
            </p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignUp;
