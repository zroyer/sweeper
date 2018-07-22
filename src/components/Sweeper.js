import React, { Component } from 'react';
import Table from './Table'

const degreeDictionary = {
  'easy' : {
    mines: 5,
    columns: 4,
    rows: 4,
    degree: 'easy'
  },
  'medium' : {
    mines: 10,
    columns: 9,
    rows: 9,
    degree: 'medium'
  },
  'hard' : {
    mines: 40,
    columns: 16,
    rows: 16,
    degree: 'hard'
  },
}

class Sweeper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mines: 10,
      columns: 9,
      rows: 9,
      degree: 'medium'
    };
  }

  onSelectChange(e) {
    this.setState(degreeDictionary[e.target.value])
  }

  render() {
    return (
      <div className="table-wrapper">
        <Table
          mines={this.state.mines}
          rows={this.state.rows}
          columns={this.state.columns}
          degree={this.state.degree}
        />
        <select value={this.state.degree} onChange={(e) => this.onSelectChange(e)}>
          {Object.keys(degreeDictionary).map(key => {
            return (
              <option value={key} key={key}>{key}</option>
            )
          })}
        </select>
      </div>
    );
  }
}

export default Sweeper;
