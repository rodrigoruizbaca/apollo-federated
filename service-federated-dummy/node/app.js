const ExpressAppCore = require('@cbtnuggets/lib-express-app-core-nodejs');
const { ApolloServer } = require('apollo-server-express');
const { createSchema } = require('./graphql/schema');

const settings = {
    appDir: __dirname,
    autoSetup: {
        routes: false
    }
};

ExpressAppCore
    .construct(settings)
    .then(appCore => appCore.startServer()).
    then(() => {
        const { config: config, app, logger } = ExpressAppCore.getInstance();
        const server = new ApolloServer({
            schema: createSchema(),
            uploads: false,
            context: ({ req }) => {
                return { access_token: req.headers.access_token };
            },            
            onHealthCheck: () => {
                return new Promise((resolve, reject) => {
                  // Replace the `true` in this conditional with more specific checks!
                  if (true) {
                    resolve();
                  } else {
                    reject();
                  }
                });
            }
        });                

        app.use(logger.statsd.collect({
            status: true,
            timing: true
        }));
        
        //logger.use('graphql.querylog', { apolloServer: server });

        server.applyMiddleware({ 
            app, 
            path: `/${config.getProperty('api.prefix')}/${config.getProperty('api.version')}/graphql`  
        });

        const { properties } = config;
        const { http = {} } = properties.api;
        const { host = 'UnknownHost', port = 'UnkownPort' } = http;
        console.log(`🚀  GraphQL Server ready at http://${host}:${port}${server.graphqlPath}`);
    })
    .catch(err => console.error(err));