import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/DetailsItem.css';

const DetailsItem = ({ description: { title, text } }) => (
  <div>
    <div className="header">
      {title !== 'headline' && title}
    </div>
    <div className="text">
      {text}
    </div>
  </div>
);

DetailsItem.propTypes = {
  description: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
};

export default DetailsItem;
