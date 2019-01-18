/* eslint-disable import/extensions,import/no-unresolved */
import doc from 'grommet/components/Carousel/doc';
import { packages, categories } from '../lookups';
import { _starter } from './_starter';


export const Carousel = {
  name: 'Carousel',
  category: categories.media,
  package: packages.grommet,
  doc: doc.doc({}).toJSON(),
  themeDoc: doc.themeDoc,
  examples: {
    _starter,
  },
};

