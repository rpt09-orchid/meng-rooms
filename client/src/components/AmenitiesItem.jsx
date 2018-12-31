import React from 'react';
import PropTypes from 'prop-types';

const AmenitiesItem = ({ amenity }) => (
  <div>
    {amenity}
  </div>
);

AmenitiesItem.propTypes = {
  amenity: PropTypes.string.isRequired,
};

export default AmenitiesItem;
