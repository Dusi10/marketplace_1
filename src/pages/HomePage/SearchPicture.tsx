import React from 'react'
import { Container } from 'react-bootstrap'

const SearchPicture = () => {
  return (
    <Container className="search mb-5">
            <div>        
        <img
    src="https://firebasestorage.googleapis.com/v0/b/szakdoga-25f1b.appspot.com/o/1705181358532usm-cover-photo.jpg?alt=media&token=ecb7c575-228b-40f0-8e58-123355e94200"
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
  </Container>

  )
}

export default SearchPicture