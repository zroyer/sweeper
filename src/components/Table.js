import React, { Component } from 'react';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mines: this.props.mines,
    };
  }

  render() {
    return (
      <div>
        <div>
          Mines remaining: {this.state.mines}
        </div>
      </div>
    );
  }
}

export default Table;
