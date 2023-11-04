import React from 'react'
import { Button, Container } from 'react-bootstrap'

const SearchHome = () => {
  return (
    <div>
        <Container className="search mb-5 " >
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
          />
          <Button className="input-submit rounded-circle " variant="outline-primary"  type="submit">➜</Button>
          <span className="input-submit-search">🔍</span>

      </Container>
    </div>
  )
}

export default SearchHome