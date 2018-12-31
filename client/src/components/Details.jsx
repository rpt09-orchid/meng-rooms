import React from 'react';
import PropTypes from 'prop-types';
import DetailsItem from './DetailsItem';

const Details = ({ descriptions }) => (
  <div>
    {descriptions.map(description => (
      <DetailsItem
        description={description}
        key={description.title}
      />
    ))
    }
  </div>
);

Details.propTypes = {
  descriptions: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Details;
