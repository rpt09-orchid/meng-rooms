import React from 'react';
import AmenitiesItem from './AmenitiesItem.jsx';

const Amenities = ({amenities}) => (
  <div>
    <h3>Amenities</h3>
    {amenities.map((amenity, index) => (
      <AmenitiesItem
        amenity={amenity}
        key={index}
      />
    ))
    }
  </div>
);

export default Amenities;