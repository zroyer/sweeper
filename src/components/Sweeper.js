import React, { Component } from 'react';
import Table from './Table'

class Sweeper extends Component {
  state = {
    mines: 10,
    rows: 9,
    columns: 9,
  };

  render() {
    return (
      <Table
        mines={this.state.mines}
        rows={this.state.rows}
        columns={this.state.columns}
      />
    );
  }
}

export default Sweeper;
