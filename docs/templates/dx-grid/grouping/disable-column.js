/*
import React from 'react';
import {
  GroupingState,
  IntegratedGrouping,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableGroupRow,
  GroupingPanel,
  DragDropProvider,
  Toolbar,
} from 'dx-react-grid-grommet';

import { generateRows } from '../../../data/dx-grid-data/generator';
*/

class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'sex', title: 'Sex' },
        { name: 'city', title: 'City' },
        { name: 'car', title: 'Car' },
      ],
      rows: generateRows({ length: 8 }),
      grouping: [{ columnName: 'city' }],
      groupingStateColumnExtensions: [
        { columnName: 'name', groupingEnabled: false },
        { columnName: 'city', groupingEnabled: false },
      ],
    };
  }

  render() {
    const {
      rows,
      columns,
      grouping,
      groupingStateColumnExtensions,
    } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <DragDropProvider />
        <GroupingState
          defaultGrouping={grouping}
          columnExtensions={groupingStateColumnExtensions}
        />
        <IntegratedGrouping />
        <Table />
        <TableHeaderRow showGroupingControls />
        <TableGroupRow />
        <Toolbar />
        <GroupingPanel showGroupingControls />
      </Grid>
    );
  }
}

render(<Demo />);
