import React, { useContext, useState } from "react";
import {Alert, Button, Card, Form, ListGroup} from "react-bootstrap";
import {UserContext} from "../Provider/UserProvider";
import {generateTweetDocument, } from "../firebase";

const PostComponent = () => {
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState(null);

    const user = useContext(UserContext);
    const {photoURL, displayName, email} = user;

    const createPostHandler = async (event,content, image) => {
        event.preventDefault();
        try{
            console.log('on teste le post')
            await generateTweetDocument(content, image, displayName)
        }
        catch(error){
            setError('Error Signing up with email and password');
        }

        setContent("");
        setImage("");
    };

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;

        if (name === "content") {
            setContent(value);
        } else if (name === "image") {
            setImage(value);
        }
    };


    return (
            <Card>
                <Card.Body>
                    {error !== null && <Alert variant="danger">{error}</Alert>}
                    <Form className="">
                        <Form.Group>
                            <Form.Label>
                                Content
                            </Form.Label>
                            <Form.Control
                                type="text"
                                name="content"
                                value={content}
                                placeholder="ceci est un post"
                                id="displayName"
                                onChange={event => onChangeHandler(event)}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>
                                Image
                            </Form.Label>
                            <Form.Control
                                type="test"
                                name="image"
                                value={image}
                                placeholder="ceci est un lien vers une image"
                                id="userEmail"
                                onChange={event => onChangeHandler(event)}
                            />
                        </Form.Group>

                        <Button
                            className="w-100"
                            onClick={event => {
                                createPostHandler(event,content, image);
                                window.location.reload(false);
                            }}
                        >
                            Post
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
    );
};

export default PostComponent;
