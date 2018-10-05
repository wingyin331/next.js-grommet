/* eslint-disable import/extensions,import/no-unresolved */
import { packages, categories } from '../lookups';
import { _starter } from './_starter';
import { color } from './color';
import { level } from './level';
import { margin } from './margin';
import { size } from './size';

export const Heading = {
  category: categories.type,
  package: packages.grommet,
  examples: {
    _starter,
    color,
    level,
    margin,
    size,
  },
};

