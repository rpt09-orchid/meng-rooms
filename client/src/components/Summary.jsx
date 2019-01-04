import React from 'react';
import PropTypes from 'prop-types';
import SleepSummary from './SleepSummary';
import Superhost from './Superhost';
import SelfCheckin from './SelfCheckin';

const Summary = ({
  sleepingArrangements, type, user, selfCheckin, superhost,
}) => (
  <div>
    <SleepSummary
      sleepingArrangements={sleepingArrangements}
      type={type}
    />
    {selfCheckin && <SelfCheckin />}
    {superhost && <Superhost user={user} />}
    <div className="line-break"></div>
  </div>

);


Summary.propTypes = {
  sleepingArrangements: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  selfCheckin: PropTypes.bool.isRequired,
  superhost: PropTypes.bool.isRequired,
};

export default Summary;
