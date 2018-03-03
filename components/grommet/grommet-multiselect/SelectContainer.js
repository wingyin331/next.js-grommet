import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { debounce } from 'grommet/utils';
import { Box, Button, Keyboard, Text, TextInput } from 'grommet';

class MultiSelectContainer extends Component {
  state = {
    selectedOptionIndex: -1,
    search: '',
  };
  static defaultProps = {
    value: '',
  };

  optionsRef = {};

  componentDidMount() {
    const { onSearch } = this.props;
    // timeout need to send the operation through event loop and allow time to the portal
    // to be available
    setTimeout(() => {
      if (onSearch) {
        findDOMNode(this.searchRef).querySelector('input').focus();
      } else {
        findDOMNode(this.selectRef).focus();
      }
    }, 0);
  }

  componentDidUpdate() {
    const { selectedOptionIndex } = this.state;
    const buttonNode = findDOMNode(this.optionsRef[selectedOptionIndex]);
    if (selectedOptionIndex >= 0 && buttonNode && buttonNode.scrollIntoView) {
      buttonNode.scrollIntoView();
    }
  }

  onInput = (event) => {
    this.setState(
      { search: event.target.value, selectedOptionIndex: -1 },
      () => this.onSearch(this.state.search)
    );
  };

  onSearch = debounce(search => this.props.onSearch(search), 150)

  selectOption = (selected) => {
    const { onChange, multiple, value } = this.props;
    if (onChange) {
      let option = selected;
      if (multiple) {
        if (Array.isArray(value)) {
          const index = value.indexOf(option);
          if (index !== -1) {
            option = value.filter(item => item !== selected);
          } else {
            option = [...value, option];
          }
        } else {
          option = [option];
        }
      }
      onChange({ target: findDOMNode(this.inputRef), option });
    }
  }

  onNextOption = (event) => {
    const { options } = this.props;
    const { selectedOptionIndex } = this.state;
    event.preventDefault();
    const index = Math.min(selectedOptionIndex + 1, options.length - 1);
    this.setState({ selectedOptionIndex: index });
  }

  onPreviousOption = (event) => {
    const { selectedOptionIndex } = this.state;
    event.preventDefault();
    const index = Math.max(selectedOptionIndex - 1, 0);
    this.setState({ selectedOptionIndex: index });
  }

  onSelectOption = (event) => {
    const { options } = this.props;
    const { selectedOptionIndex } = this.state;
    if (selectedOptionIndex >= 0) {
      event.preventDefault(); // prevent submitting forms
      this.selectOption(options[selectedOptionIndex]);
    }
  }

  render() {
    const {
      activeOptionIndex,
      children,
      dropBackground,
      dropSize,
      id,
      name,
      onKeyDown,
      onSearch,
      options,
      searchPlaceholder,
      value,
    } = this.props;
    const { selectedOptionIndex, search } = this.state;
    return (
      <Keyboard
        onEnter={this.onSelectOption}
        onUp={this.onPreviousOption}
        onDown={this.onNextOption}
        onKeyDown={onKeyDown}
      >
        <Box
          id={id ? `${id}__select-drop` : undefined}
          background={dropBackground}
        >
          {onSearch ? (
            <Box pad='xsmall'>
              <TextInput
                focusIndicator={true}
                plain={true}
                size='small'
                ref={(ref) => { this.searchRef = ref; }}
                type='search'
                value={search}
                placeholder={searchPlaceholder}
                onInput={this.onInput}
              />
            </Box>
          ) : undefined}

          <Box basis={dropSize} overflow='auto'>
            <Box
              flex={false}
              role='menubar'
              tabIndex='-1'
              ref={(ref) => { this.selectRef = ref; }}
            >
              {options.map((option, index) => (
                <Button
                  role='menuitem'
                  ref={(ref) => { this.optionsRef[index] = ref; }}
                  active={
                    activeOptionIndex === index ||
                    selectedOptionIndex === index ||
                    (option &&
                      (Array.isArray(value) ? value.indexOf(option) !== -1 : option === value))
                  }
                  key={`option_${name || ''}_${index}`}
                  onClick={() => this.selectOption(option)}
                  hoverIndicator='background'
                >
                  {children ? children(option, index, options) : (
                    <Box align='start' pad='small'>
                      <Text margin='none'>{option ? option.toString() : undefined}</Text>
                    </Box>
                  )}
                </Button>
              ))}
            </Box>
          </Box>
        </Box>
      </Keyboard>
    );
  }
}

export default MultiSelectContainer;
