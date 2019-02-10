const routes = require('next-routes')();

routes.add({ name: 'examples', pattern: '/examples/:library?/:group/:example', page: '/examples' });
routes.add({ name: 'documentation', pattern: '/documentation/:library?/:component', page: '/documentation' });
routes.add({ name: 'template', pattern: '/template/:folder/:file', page: '/template' });

module.exports = routes;
