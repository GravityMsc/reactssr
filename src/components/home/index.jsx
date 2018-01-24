import React from 'react';
import propTypes from 'prop-types';

export default class Home extends React.Component {
  static propTypes = {
    content: propTypes.string,
  };
  static defaultProps = {
    content: 'ReactSSR',
  }
  constructor(props) {
    super(props);
    this.state = {
      clickCount: 0,
    };
  }
  clickToChange = () => {
    this.setState(prevState => ({
      clickCount: prevState.clickCount + 1,
    }));
  }
  render() {
    return (
      <div>
        <button onClick={this.clickToChange}>
          {this.props.content}
        </button>
        <p>
          You have clicked {this.state.clickCount} times
        </p>
      </div>
    );
  }
}
