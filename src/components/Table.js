import React, { Component } from 'react';

class Table extends Component {

  render() {
    return (
      <div>
        {this.props.rows}
      </div>
    );
  }
}

export default Table;
