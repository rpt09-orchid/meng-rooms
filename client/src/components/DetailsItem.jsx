import React from 'react';


const DetailsItem = ({description: {title, text}}) => (
  <div>
    <h3>
      {title !== 'headline' && title}
    </h3>
    <div>
      {text}
    </div>
  </div>
);

export default DetailsItem;