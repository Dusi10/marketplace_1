// SearchHome.js

import React from 'react';

const SearchHome = () => {
  const text1 = "Cseréld le a ruhatárad, találj igazlmas ruhadarabokat.";

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingBottom: '20px' }}>
      <img
        src="src\pictures\usm-cover-photo.jpg"
        alt="USM Cover Photo"
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          maxHeight: '450px',
        }}
      />
      <span className="texts message" style={{ display: "block", textAlign: "center", marginTop: '5%' }}>
        {text1}
      </span>
      
    </div>
  );
};

export default SearchHome;
