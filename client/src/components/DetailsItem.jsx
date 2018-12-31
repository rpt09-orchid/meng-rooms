import React from 'react';
import PropTypes from 'prop-types';

const DetailsItem = ({ description: { title, text } }) => (
  <div>
    <h3>
      {title !== 'headline' && title}
    </h3>
    <div>
      {text}
    </div>
  </div>
);

DetailsItem.propTypes = {
  description: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string
  }).isRequired
};

export default DetailsItem;
