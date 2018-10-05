/* eslint-disable import/extensions,import/no-unresolved */
import { packages, categories } from '../lookups';
import { _starter } from './_starter';
import { search } from './search';

export const DataTable = {
  category: categories.visualization,
  package: packages.grommet,
  examples: {
    _starter,
    search,
  },
};

