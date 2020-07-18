import React from 'react';

class Loader extends React.Component {
  render() {
    return (
      <div class="ui active inverted dimmer">
        <div class="ui large text loader">...Loading</div>
      </div>
    );
  }
}

export default Loader;
