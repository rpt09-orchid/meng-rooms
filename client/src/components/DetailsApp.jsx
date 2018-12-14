import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:3001/details${window.location.pathname}`).then(res => {
      this.setState({
        data: res.data.data[0]
      });
    });
  }

  render() {
    let { descriptions, amenities, sleepingArrangements, user, title, type, city } = this.state.data;
    return (
      <div>
        <h1>This is the Rooms component</h1>
        <div>
          <h5>{type}</h5>
          <h3>{title}</h3>
          <h5>{city}</h5>
        </div>
      </div>
    );
  }
}

export default App;