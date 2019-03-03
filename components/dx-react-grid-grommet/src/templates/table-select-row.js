import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { activeStyle } from 'grommet/utils';
import { TableRow as TableRowGrommet } from 'grommet';


const StyledSelectRow = styled(TableRowGrommet)`
  ${props => props.isSelected && activeStyle}
`;

export const TableSelectRow = withTheme(({
  selected, selectByRowClick, onToggle,
  row, tableRow, tableColumn,
  children, theme,
  ...restProps
}) => (
  <StyledSelectRow
    theme={theme}
    isSelected={selected}
    onClick={(e) => {
      if (!selectByRowClick) return;
      e.stopPropagation();
      onToggle();
    }}
    {...restProps}
  >
    {children}
  </StyledSelectRow>
));

TableSelectRow.propTypes = {
  children: PropTypes.node,
  onToggle: PropTypes.func,
  selected: PropTypes.bool,
  selectByRowClick: PropTypes.bool,
  row: PropTypes.any,
  tableColumn: PropTypes.object,
  tableRow: PropTypes.object,
};

TableSelectRow.defaultProps = {
  children: undefined,
  onToggle: () => {},
  selected: false,
  selectByRowClick: false,
  row: undefined,
  tableColumn: undefined,
  tableRow: undefined,
};
