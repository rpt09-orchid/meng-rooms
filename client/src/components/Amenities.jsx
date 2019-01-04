import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faSuitcase, faParking, faWifi, faWarehouse, faLaptop } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Amenities.css';


const Amenities = ({ amenities }) => {
  const iconGuide = {
    "Kitchen": faUtensils,
    "Iron": faSuitcase,
    "Free parking on premises": faParking,
    "Wifi": faWifi,
    "Hangers": faWarehouse,
    "Laptop friendly workspace": faLaptop,
  }

  return (
  <div className="amenities-component">
    <div className="header">Amenities</div>
      <div className="column">
        <div className="amenity">
          <FontAwesomeIcon icon={iconGuide[amenities[0]]} className="icon"/>
          {amenities[0]}
        </div>
        <div className="amenity">
          <FontAwesomeIcon icon={iconGuide[amenities[1]]} className="icon"/>
          {amenities[1]}
        </div>
        <div className="amenity">
          <FontAwesomeIcon icon={iconGuide[amenities[2]]} className="icon"/>
          {amenities[2]}
        </div>
      </div>
      <div className="column">
        <div className="amenity">
          <FontAwesomeIcon icon={iconGuide[amenities[3]]} className="icon"/>
          {amenities[3]}
        </div>
        <div className="amenity">
          <FontAwesomeIcon icon={iconGuide[amenities[4]]} className="icon"/>
          {amenities[4]}
        </div>
        <div className="amenity">
          <FontAwesomeIcon icon={iconGuide[amenities[5]]} className="icon"/>
          {amenities[5]}
        </div>
      </div>
  </div>
  );
}

Amenities.propTypes = {
  amenities: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Amenities;
