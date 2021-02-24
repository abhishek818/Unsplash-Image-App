
// import('dotenv').config();

import React, { Fragment, useEffect, useState } from "react";

const API_URL = "https://api.unsplash.com";
const ListImages = () => {

  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("beach");
  const [loading, setLoading] = useState(true);
   
  useEffect(() => {
 
  const getImages = async () => {
    try {
      const response = await fetch(`${API_URL}/search/photos?client_id=${process.env.REACT_APP_CLIENT_ID}`
      +`&query=${query}&per_page=20`);
      const data = await response.json();
      setImages(data.results);
      setLoading(false);
      
    } catch (err) {
      console.error(err.message);
    }
  };

    getImages();
  });


  return (
    <Fragment>
      <span>
      <select className="select mt-5"
       value={query} onChange = {(e) =>
      {
        setQuery(e.target.value);
      }}>
        <option value=""> Select an Option </option>
        <option value="Bangalore"> Bangalore </option>
        <option value="Mumbai"> Mumbai </option>
        <option value="Kolkata"> Kolkata </option>
        <option value="Delhi"> Delhi </option>
        <option value="Ahmedabad"> Ahmedabad </option>
      </select>
      
      <input type="text" className="search" placeholder="Search" 
        value={query} onChange = {(e) =>
      {
        setQuery(e.target.value);
      }} />
      <i className="fa fa-search" />
    
    </span>

      <h4 className="header"> Search Results for "<span style={{ color:"red" }}>{query}</span>" </h4>
       
      { loading ? <h2>Loading....</h2> : images.map(image =>
        ( <>
          <div className="img-col">          
            
            <img src={image.urls.thumb} 
              alt={image.alt_description}
              key={image.id}>
            </img>
            
            <div className="img-content">
              {image.user.name} 
              <br></br> Likes : {image.likes}
            </div>
          
          </div>
          </>
        )
      )}
     
    </Fragment>
  );
};

export default ListImages;

 

      