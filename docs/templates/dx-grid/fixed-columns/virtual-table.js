/*
import React from 'react';
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  TableFixedColumns,
} from 'dx-react-grid-grommet';

import {
  generateRows,
  globalSalesValues,
} from '../../../data/dx-grid-data/generator';
*/


class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'region', title: 'Region' },
        { name: 'sector', title: 'Sector' },
        { name: 'channel', title: 'Channel' },
        { name: 'customer', title: 'Customer' },
        { name: 'product', title: 'Product' },
        { name: 'saleDate', title: 'Sale date' },
        { name: 'amount', title: 'Sale Amount' },
      ],
      rows: generateRows({ columnValues: globalSalesValues, length: 1000 }),
      tableColumnExtensions: [
        { columnName: 'region', width: 180 },
        { columnName: 'sector', width: 120 },
        { columnName: 'channel', width: 180 },
        { columnName: 'customer', width: 200 },
        { columnName: 'product', width: 200 },
        { columnName: 'saleDate', width: 120 },
        { columnName: 'amount', align: 'right', width: 140 },
      ],
      leftColumns: ['region', 'sector'],
      rightColumns: ['amount'],
    };
  }

  render() {
    const {
      rows, columns, tableColumnExtensions,
      leftColumns, rightColumns,
    } = this.state;

    return (
      <Grid
        rows={rows}
        columns={columns}
      >
        <VirtualTable
          columnExtensions={tableColumnExtensions}
        />
        <TableHeaderRow />
        <TableFixedColumns
          leftColumns={leftColumns}
          rightColumns={rightColumns}
        />
      </Grid>
    );
  }
}

render(<Demo />);
