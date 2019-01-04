import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import '../../styles/Superhost.css';

const Superhost = ({ user }) => (
  <div className="superhost">
    <div className="header">
      <FontAwesomeIcon icon={faMedal} />
      {user}
      &nbsp;is a Superhost
    </div>
    <div className="text">
      Superhosts are experienced,
      highly rated hosts who are committed to providing great stays for guests.
    </div>
  </div>
);

Superhost.propTypes = {
  user: PropTypes.string.isRequired,
};

export default Superhost;
