import React from 'react';
import { Box, Text, Button, Select, FormField } from 'grommet';
import { Close, Add } from 'grommet-icons';


const BoxChild = ({ allChildProps, childProps, idx, onRemove }) => (
  <Box
    border='all'
    background={{
      color: 'accent-2', opacity: 'strong',
    }}
    key={`child_${idx}`}
    {...allChildProps}
    {...childProps}
  >
    <Box
      direction='row-responsive'
      justify='between'
      align='center'
      pad={{
        horizontal: 'small',
      }}
    >
      <Text margin='none' size='large' weight='bold'>
        {idx}
      </Text>
      <Button
        icon={(
          <Close
            style={{
              display: 'block',
            }}
          />
)}
        onClick={onRemove}
      />
    </Box>
  </Box>
);

const optionToValue = (option) => {
  if (option === '-') {
    return undefined;
  }
  if (option === 'true') {
    return true;
  }
  if (option === 'false') {
    return false;
  }
  return option;
};
const valueToOption = (value) => {
  if (value === undefined) {
    return '-';
  }
  if (typeof value === 'boolean') {
    if (value === true) {
      return 'true';
    }
    return 'false';
  }
  return value;
};
const valuesToOptions = values => values.map(value => valueToOption(value));

interface FlexBoxState {
  container: {
    align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch',
    alignContent?: 'start' | 'center' | 'end' | 'between' | 'around' | 'stretch',
    direction: 'row' | 'column' | 'row-responsive' | 'row-reverse' | 'column-reverse',
    flex: boolean,
    gap?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string,
    justify?: 'start' | 'center' | 'between' | 'around' | 'evenly' | 'end',
    pad?: 'none' | 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | {bottom?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string, horizontal?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string, left?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string, right?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string, top?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string, vertical?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | string} | string,
    wrap: boolean,

  },
  child: {
    alignSelf?: 'start' | 'center' | 'end' | 'stretch',
    basis: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | 'full' | '1/2' | '1/3' | '2/3' | '1/4' | '2/4' | '3/4' | 'auto' | string,
    flex: boolean,
    height: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' | string;
    width?: 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge' |string,
  },
  children: object[],
}
export default () => {
  const [state, setState] = React.useState<FlexBoxState>({
    container: {
      flex: true,
      direction: 'row',
      wrap: true,
    },
    child: {
      basis: 'small',
      height: 'small',
      flex: false,
    },
    children: [
      { },
      { },
      { },
      { },
    ],
  });
  return (
    <Box gap='medium'>
      <Box
        gap='small'
        border={{
          color: 'brand', size: 'medium',
        }}
      >
        <Box pad='small' background='brand'>
          container:
        </Box>
        <Box pad='small' direction='row-responsive' gap='medium' wrap={true}>
          <FormField
            label='direction'
          >
            <Select
              options={valuesToOptions(['row', 'column', 'row-responsive', 'row-reverse', 'column-reverse'])}
              value={valueToOption(state.container.direction)}
              onChange={({ target: { value } }) => setState({
                ...state,
                container: {
                  ...state.container, direction: optionToValue(value),
                },
              })}
            />
          </FormField>
          <FormField
            label='justify'
          >
            <Select
              options={valuesToOptions([undefined, 'start', 'center', 'between', 'around', 'evenly', 'end'])}
              value={valueToOption(state.container.justify)}
              onChange={({ target: { value } }) => setState({
                ...state,
                container: {
                  ...state.container, justify: optionToValue(value),
                },
              })}
            />
          </FormField>
          <FormField
            label='align'
          >
            <Select
              options={valuesToOptions([undefined, 'start', 'center', 'end', 'baseline', 'stretch'])}
              value={valueToOption(state.container.align)}
              onChange={({ target: { value } }) => setState({
                ...state,
                container: {
                  ...state.container, align: optionToValue(value),
                },
              })}
            />
          </FormField>
          <FormField
            label='alignContent'
          >
            <Select
              options={valuesToOptions([undefined, 'start', 'center', 'end', 'between', 'around', 'stretch'])}
              value={valueToOption(state.container.alignContent)}
              onChange={({ target: { value } }) => setState({
                ...state,
                container: {
                  ...state.container, alignContent: optionToValue(value),
                },
              })}
            />
          </FormField>
          <FormField
            label='gap'
          >
            <Select
              options={valuesToOptions([undefined, 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'])}
              value={valueToOption(state.container.gap)}
              onChange={({ target: { value } }) => setState({
                ...state,
                container: {
                  ...state.container, gap: optionToValue(value),
                },
              })}
            />
          </FormField>
          <FormField
            label='pad'
          >
            <Select
              options={valuesToOptions([undefined, 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge'])}
              value={valueToOption(state.container.pad)}
              onChange={({ target: { value } }) => setState({
                ...state,
                container: {
                  ...state.container, pad: optionToValue(value),
                },
              })}
            />
          </FormField>
          <FormField
            label='wrap'
          >
            <Select
              options={valuesToOptions([undefined, true, false, 'reverse'])}
              value={valueToOption(state.container.wrap)}
              onChange={({ target: { value } }) => setState({
                ...state,
                container: {
                  ...state.container, wrap: optionToValue(value),
                },
              })}
            />
          </FormField>
        </Box>
      </Box>
      <Box
        gap='small'
        border={{
          color: 'brand', size: 'medium',
        }}
      >
        <Box pad='small' background='brand'>
          children:
        </Box>
        <Box pad='small' direction='row-responsive' gap='medium'>

          <FormField
            label='basis'
          >
            <Select
              options={valuesToOptions([undefined, 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge',
                'full', '1/2', '1/3', '2/3', '1/4', '2/4', '3/4', 'auto',
              ])}
              value={valueToOption(state.child.basis)}
              onChange={({ target: { value } }) => setState({
                ...state,
                child: {
                  ...state.child, basis: optionToValue(value),
                },
              })}
            />
          </FormField>
          <FormField
            label='height'
          >
            <Select
              options={valuesToOptions([undefined, 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'])}
              value={valueToOption(state.child.height)}
              onChange={({ target: { value } }) => setState({
                ...state,
                child: {
                  ...state.child, height: optionToValue(value),
                },
              })}
            />
          </FormField>
          <FormField
            label='width'
          >
            <Select
              options={valuesToOptions([undefined, 'xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', 'xxlarge'])}
              value={valueToOption(state.child.width)}
              onChange={({ target: { value } }) => setState({
                ...state,
                child: {
                  ...state.child, width: optionToValue(value),
                },
              })}
            />
          </FormField>
          <FormField
            label='alignSelf'
          >
            <Select
              options={valuesToOptions([undefined, 'start', 'center', 'end', 'stretch'])}
              value={valueToOption(state.child.alignSelf)}
              onChange={({ target: { value } }) => setState({
                ...state,
                child: {
                  ...state.child, alignSelf: optionToValue(value),
                },
              })}
            />
          </FormField>
          <FormField
            label='flex'
          >
            <Select
              options={valuesToOptions([undefined, true, false, 'grow', 'shrink'])}
              value={valueToOption(state.child.flex)}
              onChange={({ target: { value } }) => setState({
                ...state,
                child: {
                  ...state.child, flex: optionToValue(value),
                },
              })}
            />
          </FormField>
        </Box>

      </Box>
      <Box
        gap='small'
        margin={{
          top: 'large',
        }}
      >
        <Box align='start'>
          <Button
            primary={true}
            icon={<Add />}
            label='add child'
            onClick={() => setState({
              ...state, children: [...state.children, []],
            })}
          />
        </Box>
        <Box
          background={{
            color: 'accent-2', opacity: 'weak',
          }}
          border='all'
          {...state.container}
        >
          {state.children.map((props, idx) => (
            <BoxChild
              idx={idx}
              key={`box_child_${idx}`}
              allChildProps={state.child}
              childProps={props}
              onRemove={() => setState({
                ...state,
                children: state.children.filter((_, index) => idx !== index),
              })}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};
