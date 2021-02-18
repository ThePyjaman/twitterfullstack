import React, {useContext} from "react";
import { UserContext } from "../Provider/UserProvider";
import {getTweetDocument, getUsername} from "../firebase";
import PictureTweet from "./PictureTweet";
import 'firebase/auth'
import 'firebase/firestore'
import {ListGroup, ListGroupItem} from "react-bootstrap";
import PostComponent from "./PostComponent";

const HomePage = () => {


    const user = useContext(UserContext);
    const {photoURL, displayName, email} = user;
    console.log(user);
    const [tweets, setTweets] = React.useState([])

    React.useEffect(()=> {
        const touites = []
        const fetchdata  = async() =>{
            await getTweetDocument().then(
                (querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                            touites.push(
                                {
                                    author: doc.data().author,
                                    content: doc.data().content,
                                    image: doc.data().image,
                                    postId: doc.id
                                }
                            )
                        }
                    )
                    console.log(touites.length)
                    setTweets(touites)
                }
            )
        }
        fetchdata()

    }, [])


    console.log(tweets.length)
    return (
            <ListGroup>
                <PostComponent/>
                {tweets.map((item) => (
                        <ListGroup.Item>
                            <PictureTweet
                                author =  {item.author}
                                content = {item.content}
                                image =   {item.image}
                                postId =  {item.postId}
                            >
                            </PictureTweet>
                        </ListGroup.Item>
                    )
                )

                }
            </ListGroup>
    )

};

export default HomePage;

