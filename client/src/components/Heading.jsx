import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/Heading.css';

const Heading = ({ type, title, city, deleteRecordHandler }) => (
  <div className="heading">
    <div onClick = {deleteRecordHandler}>DELETE THIS ROOM</div>
    <div className="type">{type}</div>
    <h1 className="title">{title}</h1>
    <div className="city">{city}</div>
  </div>
);

Heading.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
};

export default Heading;
