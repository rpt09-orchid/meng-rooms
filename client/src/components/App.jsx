import React from 'react';
import axios from 'axios';
import Heading from './Heading.jsx';
import Summary from './Summary.jsx';
import Details from './Details.jsx';
import Amenities from './Amenities.jsx';

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

    axios.get(`http://rooms.4gk2mkr3wk.us-west-2.elasticbeanstalk.com/details${id}`).then(res => {
      this.setState({
        // redundancy because axios returns data through res.data
        data: res.data.data[0]
      });
    });
  }

  render() {
    if (this.state.data !== null) {
      let {type, title, city, user, sleepingArrangements, selfCheckin, superhost, descriptions, amenities} = this.state.data;

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
    } else {
      return <Heading />;
    }
  }
}

export default App;