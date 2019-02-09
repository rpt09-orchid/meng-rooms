import React from 'react';
import axios from 'axios';
import Heading from './Heading';
import Summary from './Summary';
import Details from './Details';
import Amenities from './Amenities';
import '../../styles/App.css';
let URL = 'http://localhost:3001/details';
let id = '/1';
if (process.env.NODE_ENV === 'production') {
  // URL = 'http://rooms.4gk2mkr3wk.us-west-2.elasticbeanstalk.com/details'
  URL = 'https://firebnb-rooms.herokuapp.com/details'
}
if (window.location.pathname !== '/') {
  id = window.location.pathname;
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      is404: false,
      isIdDeleted: false
    };
    this.deleteRecordHandler = this.deleteRecordHandler.bind(this);
  }

  componentDidMount() {
    axios.get(`${URL}${id}`).then((res) => {
      this.setState({data: res.data.data[0]});
    })
    .catch( () => {
      this.setState({
        is404: true
      })
    });
  }

  deleteRecordHandler () {
    axios.delete(`${URL}${id}`).then((res) => {
      if(res.statusText === "OK"){
        this.setState({
          data: null,
          isIdDeleted: true
        })
      }
    })
  }
  render() {
    console.log(process.env);
    const { data, is404, isIdDeleted } = this.state;

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
            deleteRecordHandler = {this.deleteRecordHandler}
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
    } else if(is404){
      return (
        <div>No such id exists - try again!</div>
      );
    } else if(isIdDeleted){
      return (
        <div>Succesfully Deleted!</div>
      );
    }
    return (
      <div>Loading...</div>
    );
  }
}

export default App;
