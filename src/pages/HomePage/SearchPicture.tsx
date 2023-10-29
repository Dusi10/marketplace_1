import React from 'react'

const SearchPicture = () => {
  return (
    <div>        
        <img
    src="src\pictures\usm-cover-photo.jpg"
    alt="USM Cover Photo"
    style={{
      width: "100%",
      height: "auto",
      objectFit: "cover",
      maxHeight: "370px",
      borderRadius: "20px"
    }}
  />
  <span className="texts message">Cseréld le a ruhatárad, találj igazlmas ruhadarabokat.</span>
  <input
    type="input"
    placeholder="Mit keresel?"
    width={"80%"}
    className="search-field"
  /></div>
  )
}

export default SearchPicture