import React from 'react';
import axios from 'axios';
import Heading from './Heading';
import Summary from './Summary';
import Details from './Details';
import Amenities from './Amenities';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentDidMount() {
    let id = '/1';
    if (window.location.pathname !== '/') {
      id = window.location.pathname;
    }

    axios.get(`http://rooms.4gk2mkr3wk.us-west-2.elasticbeanstalk.com/details${id}`).then((res) => {
      this.setState({
        // redundancy because axios returns data through res.data
        data: res.data.data[0]
      });
    });
  }

  render() {
    const { data } = this.state;
    if (data !== null) {
      const {
        type,
        title,
        city,
        user,
        sleepingArrangements,
        selfCheckin,
        superhost,
        descriptions,
        amenities
      } = data;

      return (
        <div>
          <Heading
            type={type}
            title={title}
            city={city}
            user={user}
          />
          <Summary
            sleepingArrangements={sleepingArrangements}
            type={type}
            user={user}
            superhost={superhost}
            selfCheckin={selfCheckin}
          />
          <Details
            descriptions={descriptions}
          />
          <Amenities
            amenities={amenities}
          />
        </div>
      );
    }
    return (
      <Heading
        type="Default Type"
        title="Default Title"
        city="Default City"
      />
    );
  }
}

export default App;
