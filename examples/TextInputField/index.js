/* eslint-disable import/extensions,import/no-unresolved */
import doc from 'grommet-controls/components/withFormField/doc.js';
import { packages, categories } from '../lookups.js';
import { _starter } from './_starter.js';
import { inField } from './inField.js';
import { validation } from './validation.js';


export const TextInputField = {
  name: 'TextInputField',
  category: categories.validation,
  package: packages.grommetControls,
  doc: doc({}, 'TextInputField', 'A TextInput field with form validation.').toJSON(),
  examples: {
    _starter,
    inField,
    validation,
  },
};

