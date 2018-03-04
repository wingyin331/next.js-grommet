import { describe, PropTypes } from 'react-desc';
import getAvailableAtGitHub from '../utils/doc';

export default (Select) => {
  const DocumentedSelect = describe(Select)
    .availableAt(getAvailableAtGitHub({ url: 'https://github.com/atanasster/grommet-nextjs' }))
    .description(
      'A multi-select clone of Grommet 2 Select.'
    ).usage(`
    $ npm install grommet-controls 
    import { GrommetSelect } from 'grommet-controls';
    <Select />
    `);

  DocumentedSelect.propTypes = {
    multiple: PropTypes.bool.description('Whether to allow multiple options to be selected.'),
    label: PropTypes.func.description('A function to render the selected items. `({ placeholder, value, onChange }) => {}`'),
  };

  return DocumentedSelect;
};
