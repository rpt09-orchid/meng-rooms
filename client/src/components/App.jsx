import React from 'react';
import axios from 'axios';
import Heading from './Heading';
import Summary from './Summary';
import Details from './Details';
import Amenities from './Amenities';
import '../../styles/App.css';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    let id = '/1';
    let URL = 'http://localhost:3001/details';
    if (process.env.NODE_ENV === 'production') {
      URL = 'http://rooms.4gk2mkr3wk.us-west-2.elasticbeanstalk.com/details'
    } else if (process.env.NODE_ENV === 'heroku') {
      URL = 'https://firebnb-rooms.herokuapp.com/details'
    }
    if (window.location.pathname !== '/') {
      id = window.location.pathname;
    }

    axios.get(`${URL}${id}`).then((res) => {
      this.setState({
        // redundancy because axios returns data through res.data
        data: res.data.data[0],
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
        amenities,
      } = data;

      return (
        <div id="main">
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
      <div>Loading...</div>
    );
  }
}

export default App;
