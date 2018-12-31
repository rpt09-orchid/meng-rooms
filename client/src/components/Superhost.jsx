import React from 'react';
import PropTypes from 'prop-types';

const Superhost = ({ user }) => (
  <div>
    <h4>
      {user}
      &nbsp;is a Superhost
    </h4>
    <div>
      Superhosts are experienced,
      highly rated hosts who are committed to providing great stays for guests.
    </div>
  </div>
);

Superhost.propTypes = {
  user: PropTypes.string.isRequired
};

export default Superhost;
