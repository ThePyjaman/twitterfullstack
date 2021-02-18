import React, {useState} from "react";
import { Link } from "@reach/router";
import { signInWithGoogle } from "../firebase";
import { auth } from "../firebase";
import { Form, Button, Card, Alert } from "react-bootstrap"


const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const signInWithEmailAndPasswordHandler = (event,email, password) => {
        event.preventDefault();
        auth.signInWithEmailAndPassword(email, password).catch(error => {
        setError("Error signing in with password and email!");
          console.error("Error signing in with password and email", error);
        });
      };
      
      const onChangeHandler = (event) => {
          const {name, value} = event.currentTarget;
        
          if(name === 'userEmail') {
              setEmail(value);
          }
          else if(name === 'userPassword'){
            setPassword(value);
          }
      };

   

  return (
    <div className="mt-8">
        <Card>
            <Card.Body>
                <h1 className="text-center mb-4">Sign In</h1>
                    {error !== null && <Alert variant="danger">{error}</Alert>}
                    <Form className="">
                        <Form.Group>
                            <Form.Label>
                                Email
                            </Form.Label>
                            <Form.Control
                                type="email"
                                name="userEmail"
                                value = {email}
                                placeholder="example@example.com"
                                id="userEmail"
                                onChange = {(event) => onChangeHandler(event)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Password
                            </Form.Label>
                            <Form.Control
                                type="password"
                                name="userPassword"
                                value = {password}
                                placeholder="Password"
                                id="userPassword"
                                onChange = {(event) => onChangeHandler(event)}
                            />
                        </Form.Group>

                        <Button className="w-100" onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}>
                            Sign in
                        </Button>
                    </Form>
                    <p className="text-center my-3">or</p>
                    <Button
                        className="w-100"
                        onClick={() => {
                            signInWithGoogle();
                        }}
                    >
                        Sign in with Google
                    </Button>
                    <p className="text-center my-3">
                        Don't have an account?{" "}
                        <Link to="signUp" className="text-blue-500 hover:text-blue-600">
                            Sign up here
                        </Link>{" "}
                        <br />{" "}
                        <Link to="passwordReset" className="text-blue-500 hover:text-blue-600">
                            Forgot Password?
                        </Link>
                    </p>
            </Card.Body>
        </Card>

    </div>
  );
};

export default SignIn;
