const { mergeTypes, fileLoader } = require('merge-graphql-schemas');
const ExpressAppCore = require('@cbtnuggets/lib-express-app-core-nodejs');
const { createResolverMap } = require('./resolvers');
const { buildFederatedSchema } = require('@apollo/federation');
const { gql } = require('apollo-server-express');
const path = require('path');
const {
    createRateLimitDirective,
    createRateLimitTypeDef,
  } = require('graphql-rate-limit-directive');

const createSchema = () => {
    const typesArray = fileLoader(path.join(__dirname, './**/*.graphql'), { recursive: true });
    typesArray.push(createRateLimitTypeDef());
    const typeDefs = gql`${mergeTypes(typesArray)}`;
    const resolvers = createResolverMap();
    try {
        return buildFederatedSchema([{
            typeDefs,            
            resolvers,
            schemaDirectives: {
                rateLimit: createRateLimitDirective(),
            }
        }]);
    } catch (e) {
        const { logger } = ExpressAppCore.getInstance();
        logger.error(`Error creating graphql schema: ${e}`);
        process.exit(1);
    }
};

module.exports = {
    createSchema
};