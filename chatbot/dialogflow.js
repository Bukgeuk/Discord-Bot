const dialogflow = require('dialogflow');
const config = require('../config')
const fs = require('fs')

class Dialogflow {
    constructor (ProjectID, keyFile) {
        this.projectId = ProjectID

        const keyfile = JSON.parse(fs.readFileSync(keyFile))

        let privateKey = keyfile['private_key']
        let clientEmail = keyfile['client_email']

        let send_config = {
            credentials: {
                private_key: privateKey,
                client_email: clientEmail
            }
        }

        this.sessionClient = new dialogflow.SessionsClient(send_config)
    }

    async sendToDialogflow (text, sessionId) {
        const sessionPath = this.sessionClient.sessionPath(this.projectId, sessionId)

        const send_request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: text,
                    languageCode: 'ko-KR'
                }
            }
        }

        return await this.sessionClient.detectIntent(send_request)
    }
}

module.exports = Dialogflow


/*const sessionClient = new dialogflow.SessionsClient();

async function detectIntent(sessionId, query, contexts) {
    // The path to identify the agent that owns the created intent.
    const sessionPath = sessionClient.sessionPath(config.Dialogflow.ProjectID, sessionId);

    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: query,
                languageCode: 'ko'
            },
        },
    };

    if (contexts && contexts.length > 0) {
        request.queryParams = {
            contexts: contexts,
        };
    }

    const responses = await sessionClient.detectIntent(request);
    return responses[0];
}

exports.run = async function (sessionId, query) {
    // Keeping the context across queries let's us simulate an ongoing conversation with the bot
    let context;
    let intentResponse;
    try {
        console.log(`Sending Query: ${query}`);
        intentResponse = await detectIntent(sessionId, query, context);
        console.log('Detected intent');
        console.log(
          `Fulfillment Text: ${intentResponse.queryResult.fulfillmentText}`
        );
        // Use the context from this response for next queries
        return intentResponse.queryResult.outputContexts;
    } catch (error) {
        console.log(error);
        return error
    }
}*/