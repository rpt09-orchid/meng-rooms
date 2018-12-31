import React from 'react';
import PropTypes from 'prop-types';
import DetailsItem from './DetailsItem';


class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false,
    };
    this.handleReadMore = this.handleReadMore.bind(this);
  }

  handleReadMore() {
    this.setState(prevState => ({
      isClicked: !prevState.isClicked,
    }));
  }

  render() {
    const { isClicked } = this.state;
    const { descriptions } = this.props;
    if (!isClicked) {
      return (
        <div>
          <DetailsItem description={descriptions[0]} />
          <br />
          <div onClick={this.handleReadMore}>
            Read More about the space
          </div>
        </div>
      );
    }
    return (
      <div>
        {descriptions.map(description => (
          <DetailsItem
            description={description}
            key={description.title}
          />
        ))
        }
        <br />
        <div onClick={this.handleReadMore}>
          Hide
        </div>
      </div>
    );
  }
}

Details.propTypes = {
  descriptions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Details;
