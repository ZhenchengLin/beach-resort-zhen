import React from "react";
import { useParams } from "react-router-dom";
import SingleRoom from "./SingleRoom";

const SingleRoomWrapper = (props) => {
  const { slug } = useParams(); // Extract slug from URL parameters
  console.log("Slug from useParams:", slug); // Debugging
  return <SingleRoom {...props} slug={slug} />;
};

export default SingleRoomWrapper;
