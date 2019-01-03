import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/SleepSummary.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const SleepSummary = ({ sleepingArrangements, type }) => {
  let guests = 0;
  sleepingArrangements.forEach((roomType) => {
    const { typeOfFurniture, qty } = roomType.furniture;
    if (typeOfFurniture === 'queen bed' || typeOfFurniture === 'double bed') {
      guests += (2 * qty);
    } else if (typeOfFurniture === 'single bed') {
      guests += qty;
    }
  });

  return (
    <div>
      <div><FontAwesomeIcon icon={faHome} />{type}</div>
      <div>
        <span className="item">
          {guests}
          &nbsp;guests
        </span>
        <span className="item">
          1&nbsp;
          {sleepingArrangements[0].typeOfRoom}
        </span>
        <span className="item">
          {sleepingArrangements[0].furniture.qty}
          {sleepingArrangements[0].furniture.qty === 1 ? ' Bed' : ' Beds'}
        </span>
        <span className="item">1 Bath</span>
      </div>
    </div>
  );
};

SleepSummary.propTypes = {
  sleepingArrangements: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
};

export default SleepSummary;
