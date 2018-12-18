import React from 'react';
import DetailsItem from './DetailsItem.jsx';

const Details = ({descriptions}) => (
  <div>
    {descriptions.map((description, index) =>
      <DetailsItem
        description={description}
        key ={index}
      />
    )
    }
  </div>
);

export default Details;