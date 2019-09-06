const ExpressAppCore = require('@cbtnuggets/lib-express-app-core-nodejs');

class BasicLogging {

    constructor() {
        const { logger } = ExpressAppCore.getInstance();
        this.logger = logger;
    }

    requestDidStart({ queryString, parsedQuery, variables }) {
        const query = queryString || print(parsedQuery);
        //this.logger.info(`Executing query ${query}`);
        //console.log(`Executing query ${query}`);
    }

    willSendResponse({ graphqlResponse }) {
        //this.logger.info(`Response ${JSON.stringify(graphqlResponse, null, 2)}`);
        //console.log(`Response ${JSON.stringify(graphqlResponse, null, 2)}`);
    }
}

module.exports = { BasicLogging };