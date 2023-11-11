import React from "react";
import "./searchCard.css";
import { useNavigate } from "react-router-dom";

const SearchCard = (props) => {
  const navigate = useNavigate();
  return (
    <div id="search-card-content" onClick={props.onclick}>
      <i class="bx bx-search"></i>
      <p>{props.productname}</p>
    </div>
  );
};

export default SearchCard;
