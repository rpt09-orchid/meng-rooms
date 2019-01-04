import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import '../../styles/SelfCheckin.css';

const SelfCheckin = () => (
  <div className="selfcheckin">
    <div className="header">
      <FontAwesomeIcon icon={faDoorOpen} />
      Self check-in
    </div>
    <div className="text">
      Check yourself in with the keypad.
    </div>
  </div>
);

export default SelfCheckin;
