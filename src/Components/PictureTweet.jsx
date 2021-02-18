import React, { useContext } from "react";
import {Button, Card} from "react-bootstrap";
import PostComponent from "./PostComponent";

const PictureTweet = (props) => {

  return (
      <>
          <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={props.image} />
              <Card.Body>
                  <Card.Subtitle>
                      {props.content}
                  </Card.Subtitle>
                  <Card.Text >{props.author}</Card.Text>
              </Card.Body>
          </Card>
      </>
  ) 
}

export default PictureTweet;

