const {
    ApolloServer
} = require('apollo-server');
const {
    ApolloGateway, RemoteGraphQLDataSource
} = require("@apollo/gateway");
const { MemcachedCache } = require('apollo-server-cache-memcached');

let numRequests = 0;

const gateway = new ApolloGateway({
    serviceList: [{
            name: 'forum',
            url: 'http://localhost:3002/federated-forum/v1/graphql'
        },
        {
            name: 'user',
            url: 'http://localhost:3001/user-profile/v1/graphql'
        },
        {
            name: 'dummy',
            url: 'http://localhost:3003/federated-dummy/v1/graphql'
        }
        // more services
    ],
    buildService({name, url}) {
        return new RemoteGraphQLDataSource({
            url,
            willSendRequest({request, context}) {
                //request.http.headers.set('x-user-id', context.userId);
                numRequests++;
                console.log(`Request ${JSON.stringify(request)}`);
                console.log(`${numRequests}`);
            },
        });
    },
    debug: true
});

/*gateway.load().then(g => {
    console.log(JSON.stringify(g))
});*/


const server = new ApolloServer({
    gateway,
    // Currently, subscriptions are enabled by default with Apollo Server, however,
    // subscriptions are not compatible with the gateway.  We hope to resolve this
    // limitation in future versions of Apollo Server.  Please reach out to us on
    // https://spectrum.chat/apollo/apollo-server if this is critical to your adoption!
    subscriptions: false,
});

server.listen().then(({
    url
}) => {
    console.log(`🚀 Server ready at ${url}`);
});