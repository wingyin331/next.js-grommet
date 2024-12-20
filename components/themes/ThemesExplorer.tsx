/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import { withRouter, Router } from 'next/router';
import JSONPretty from 'react-json-pretty';
import {
  Grommet, Box, Grid, Heading, Text, Markdown, Button, ResponsiveContext,
} from 'grommet';
import { deepMerge } from 'grommet/utils';
import { base } from 'grommet/themes';
import { VerticalMenu, Tag, Card } from 'grommet-controls';
import RoutedAnchor from '../app/RoutedAnchor';
import ThemePath from './ThemePath';
import ThemeEditor from './editors/ThemeEditor';
import ComponentsList from '../components/ComponentsList';
import { assignProp, getProp, getArrayProp } from './utils';
import ThemeSource from './ThemeSource';
import pushRoute from '../app/PushRoute';

interface itemsTreeProps {
  path: string,
  items: object,
}
const itemsTree = (items: object, path: string): object => {
  if (typeof items === 'object' && !Array.isArray(items)) {
    return Object.keys(items).sort().map((item) => {
      const themePath = `${path}${path ? '-' : ''}${item}`;
      return {
        id: themePath,
        label: <Text truncate={true}>{item}</Text>,
        name: item,
        items: itemsTree(items[item], themePath),
        children: items[item],
        themePath,
        widget: (Array.isArray(items[item]) ? (
          <Tag
            round='small'
            border='all'
            pad={{
              horizontal: 'small',
            }}
            label={items[item].length}
          />
        ) : undefined),
      };
    });
  }
  return undefined;
};

interface DescribeProps {
  label: string,
  children: React.ReactNode,
}

const Describe: React.FC<DescribeProps> = ({ label, children }) => {
  let text;
  if (typeof children === 'string') {
    try {
      // eslint-disable-next-line no-eval
      const obj = eval(`(${children.trim()})`);

      if (typeof obj === 'object') {
        text = <JSONPretty json={obj} />;
      } else {
        text = (
          <Markdown>
            {children}
          </Markdown>
        );
      }
    } catch (e) {
      text = (
        <Markdown>
          {children}
        </Markdown>
      );
    }
  } else {
    text = <JSONPretty json={children} />;
  }
  return (
    <Box gap='xxsmall'>
      <Text weight='bold'>{`${label}:`}</Text>
      {text}
    </Box>
  );
};

interface ThemeComponentProps {
  component: string,
  defaultValue: string,
  description: string,
  type: string,
}
const ThemeComponent: React.FC<ThemeComponentProps> = ({
  component,
  defaultValue,
  description,
  type,
  ...rest
}) => (
  <Card {...rest}>
    <Card.CardTitle>
      <Heading level={3} margin='none'>
        <RoutedAnchor
          route='documentation'
          params={{
            library: 'grommet', component,
          }}
        >
          {component}
        </RoutedAnchor>
      </Heading>
    </Card.CardTitle>
    <Card.CardContent gap='small' overflow='auto'>
      <Describe label='description'>
        {description}
      </Describe>
      <Describe label='type'>
        {type}
      </Describe>
      <Describe label='default'>
        {defaultValue}
      </Describe>

    </Card.CardContent>
  </Card>
);

interface ThemesExplorerProps {
  themeDocs: object,
  router: Router
  fonts: string[],
}

interface PathType {
  children?: any,
}
const ThemesExplorer: React.FC<ThemesExplorerProps> = ({
  themeDocs,
  router: { query: { path } },
  fonts,
}) => {
  if (themeDocs === undefined) {
    return null;
  }
  const [items] = React.useState(itemsTree(themeDocs, ''));
  let selected = [];
  const pathItem = path && getArrayProp(items, path as string) as PathType;
  if (pathItem) {
    selected = pathItem.children;
  }
  const [theme, setTheme] = React.useState({});
  const onThemeChange = (newValue) => {
    const oldValue = getProp(deepMerge(base, theme), path as string);
    if (JSON.stringify(oldValue) !== JSON.stringify(newValue)) {
      const newTheme = assignProp(theme, path as string, newValue);
      setTheme(newTheme);
    }
  };

  const [viewTheme, setViewTheme] = React.useState(false);
  let themeModal;
  if (viewTheme) {
    themeModal = <ThemeSource theme={theme} onClose={() => setViewTheme(false)} />;
  }

  const [viewDocs, setViewDocs] = React.useState(false);
  let view;
  if (viewDocs) {
    view = Array.isArray(selected) && selected.length > 0 && (
    <Grid columns='medium' gap='small'>
      {selected.map(component => (
        <ThemeComponent key={component.component} {...component} />
      ))}
    </Grid>
    );
  } else {
    view = (
      <Grommet
        theme={theme as any}
        style={{
          background: 'transparent',
        }}
      >
        <Grid columns='medium' gap='small'>
          <ComponentsList
            components={selected.map(component => ({
              name: component.component,
              package: 'grommet',
            }))}
          />
        </Grid>
      </Grommet>
    );
  }


  return (
    <Box
      direction='row-responsive'
      gap='large'
      pad={{
        vertical: 'medium',
      }}
    >
      <ResponsiveContext.Consumer>
        {size => (
          <Box basis={size !== 'small' && 'medium'} overflow='auto' background='light-1'>
            <VerticalMenu
              activeItem={{
                id: path,
              }}
              items={items}
              onSelect={(item) => {
                pushRoute({
                  route: 'theme_explorer',
                  params: {
                    path: item.themePath,
                  },
                });
              }}
            />
          </Box>
        )}
      </ResponsiveContext.Consumer>
      <Box pad='small' fill='horizontal'>
        <Box
          pad={{
            vertical: 'small',
          }}
          border='bottom'
          direction='row-responsive'
          justify='between'
        >
          <Box direction='row' gap='small'>
            <Button label='live' onClick={() => setViewDocs(false)} active={!viewDocs} />
            <Button label='docs' onClick={() => setViewDocs(true)} active={viewDocs} />
          </Box>
          <Box direction='row'>
            <Button label='theme' onClick={() => setViewTheme(true)} />
            {themeModal}
          </Box>
        </Box>
        <Box
          pad={{
            vertical: 'small',
          }}
          border='bottom'
          direction='row-responsive'
          justify='between'
          align='center'
        >
          <ThemePath path={path as string} />
          <Text size='large'>
            {selected.length ? `${selected.length} affected components` : ''}
          </Text>
        </Box>
        {path && (
          <Box
            pad={{
              vertical: 'small',
            }}
            border='bottom'
            direction='row-responsive'
            justify='between'
            align='center'
          >
            <ThemeEditor
              path={path as string}
              onChange={onThemeChange}
              theme={theme}
              fonts={fonts}
            />
          </Box>
        )}
        <Box
          pad={{
            vertical: 'small',
          }}
        >
          {view}
        </Box>
      </Box>
    </Box>
  );
};

ThemesExplorer.propTypes = {
  themeDocs: PropTypes.object.isRequired,
};


export default withRouter(ThemesExplorer);
