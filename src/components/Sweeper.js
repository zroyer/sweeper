import React, { Component } from 'react';
import Table from './Table'

const degreeDictionary = {
  'easy' : {
    mines: 4,
    rows: 6,
    columns: 6,
    degree: 'easy',
    displayName: '😇',
  },
  'medium' : {
    mines: 10,
    rows: 9,
    columns: 9,
    degree: 'medium',
    displayName: '😅',
  },
  'hard' : {
    mines: 40,
    rows: 16,
    columns: 16,
    degree: 'hard',
    displayName: '😤',
  },
  'insane' : {
    mines: 99,
    rows: 30,
    columns: 16,
    degree: 'insane',
    displayName: '🤯',
  },
}

class Sweeper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mines: 10,
      rows: 9,
      columns: 9,
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
        <select
          className="degree-select"
          value={this.state.degree}
          onChange={(e) => this.onSelectChange(e)}
        >
          {Object.entries(degreeDictionary).map(entry => {
            return (
              <option value={entry[1].degree} key={entry[1].degree}>{entry[1].displayName}</option>
            )
          })}
        </select>
      </div>
    );
  }
}

export default Sweeper;
