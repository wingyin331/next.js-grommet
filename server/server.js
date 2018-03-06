const express = require('express');
// const compression = require('compression');
const LRUCache = require('lru-cache');
const next = require('next');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const staticFiles = require('./static');
const routes = require('./routes');
const logger = require('./logger');
const dotenv = require('dotenv');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60, // 1hour
});
const publicEnvFilename = 'public.env';

try {
  if (fs.existsSync(path.resolve(__dirname, publicEnvFilename))) {
    const publicEnv = dotenv.parse(
      fs.readFileSync(path.resolve(__dirname, publicEnvFilename))
    );
    Object.keys(publicEnv).forEach((key) => {
      if (!process.env[key]) {
        process.env[key] = publicEnv[key];
      }
    });
  }
} catch (err) {
  // silence is golden
}
const buildStats = !dev
  ? JSON.parse(fs.readFileSync('./.next/build-stats.json', 'utf8').toString())
  : null;

const buildId = !dev
  ? fs.readFileSync('./.next/BUILD_ID', 'utf8').toString()
  : null;
const getCacheKey = function getCacheKey(req) {
  return `${req.url}`;
};

const renderAndCache = function renderAndCache(
  req,
  res,
  pagePath,
  queryParams
) {
  const key = getCacheKey(req);

  if (ssrCache.has(key) && !dev) {
    console.log(`CACHE HIT: ${key}`);
    res.send(ssrCache.get(key));
    return;
  }

  app
    .renderToHTML(req, res, pagePath, queryParams)
    .then((html) => {
      // Let's cache this page
      if (!dev) {
        console.log(`CACHE MISS: ${key}`);
        ssrCache.set(key, html);
      }

      res.send(html);
    })
    .catch((err) => {
      app.renderError(err, req, res, pagePath, queryParams);
    });
};

const routerHandler = routes.getRequestHandler(
  app,
  ({
    req, res, route, query,
  }) => {
    renderAndCache(req, res, route.page, query);
  }
);

app.prepare()
  .then(() => {
    const server = express();
    // server.use(compression({ threshold: 0 }));
    server.use(cors());
    server.use(routerHandler);
    server.use('/', staticFiles());
    server.get('/sw.js', (req, res) =>
      app.serveStatic(req, res, path.resolve('./.next/sw.js')));

    server.get('/manifest.html', (req, res) =>
      app.serveStatic(req, res, path.resolve('./.next/manifest.html')));

    server.get('/manifest.appcache', (req, res) =>
      app.serveStatic(req, res, path.resolve('./.next/manifest.appcache')));

    if (!dev) {
      server.get('/_next/-/app.js', (req, res) =>
        app.serveStatic(req, res, path.resolve('./.next/app.js')));

      const hash = buildStats['app.js'] ? buildStats['app.js'].hash : buildId;

      server.get(`/_next/${hash}/app.js`, (req, res) =>
        app.serveStatic(req, res, path.resolve('./.next/app.js')));
    }
    server.get('*', (req, res) => handle(req, res));

    server.listen(port, (err) => {
      if (err) {
        return logger.error(err.message);
      }
      return logger.appStarted(port, 'localhost');
    });
  });
