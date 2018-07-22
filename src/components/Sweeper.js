import React, { Component } from 'react';
import Table from './Table'

class Sweeper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mines: 1,
      columns: 3,
      rows: 3,
    };
  }

  render() {
    return (
      <div className="table-wrapper">
        <Table
          mines={this.state.mines}
          columns={this.state.columns}
          rows={this.state.rows}
        />
      </div>
    );
  }
}

export default Sweeper;
