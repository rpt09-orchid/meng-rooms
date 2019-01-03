import React from 'react';
import PropTypes from 'prop-types';
import DetailsItem from './DetailsItem';
import '../../styles/Details.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

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
          <div className="readBtn" onClick={this.handleReadMore}>
            Read More about the space <FontAwesomeIcon icon={faChevronDown} />
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
        <div className="readBtn" onClick={this.handleReadMore}>
          Hide <FontAwesomeIcon icon={faChevronUp} />
        </div>
      </div>
    );
  }
}

Details.propTypes = {
  descriptions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Details;
