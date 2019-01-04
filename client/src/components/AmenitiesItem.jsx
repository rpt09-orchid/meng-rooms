import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faSuitcase, faParking, faWifi, faWarehouse, faLaptop } from '@fortawesome/free-solid-svg-icons';
import "../../styles/AmenitiesItem.css"

const AmenitiesItem = ({ amenity }) => {
  const iconGuide = {
    "Kitchen": faUtensils,
    "Iron": faSuitcase,
    "Free parking on premises": faParking,
    "Wifi": faWifi,
    "Hangers": faWarehouse,
    "Laptop friendly workspace": faLaptop,
  }

  return (
  <div className="column">
    <FontAwesomeIcon icon={iconGuide[amenity]} />
    <span className="amenity">
      {amenity}
    </span>
  </div>
  );
};

AmenitiesItem.propTypes = {
  amenity: PropTypes.string.isRequired,
};

export default AmenitiesItem;
