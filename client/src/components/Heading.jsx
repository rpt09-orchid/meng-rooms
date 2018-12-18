import React from 'react';

const Heading = ({type, title, city}) => (
  <div>
    <div>{type}</div>
    <div>{title}</div>
    <div>{city}</div>
  </div>
);

export default Heading;