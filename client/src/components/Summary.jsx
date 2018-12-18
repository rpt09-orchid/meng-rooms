import React from 'react';
import SleepSummary from './SleepSummary.jsx';
import Superhost from './Superhost.jsx';
import SelfCheckin from './SelfCheckin.jsx';

const Summary = ({sleepingArrangements, type, user, selfCheckin, superhost}) => {
  return (
    <div>
      <SleepSummary
        sleepingArrangements = {sleepingArrangements}
        type = {type}
      />
      {superhost && <Superhost user={user} />}
      {selfCheckin && <SelfCheckin />}
    </div>
  );
};

export default Summary;