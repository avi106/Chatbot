'use strict'
const dialogFlow = require('dialogflow');
const structJson = require('../chatbot/structJson');
const config = require('../config/keys')


const projectId = config.googleProjectID;
const sessionId =  config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode

const credentials = {
    client_email : config.googleClientEmail,
    private_key: config.googlePrivateKey
}

const sessionClient = new dialogFlow.SessionsClient({projectId, credentials})




module.exports =  {
    textQuery:  async function(text, userID, parameters = {}) {
        const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID + userID);
        let self = module.exports;
       
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: text,
                    languageCode: config.dialogFlowSessionLanguageCode
                },
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };
        let responses = await sessionClient.detectIntent(request);
        responses =  await self.handleAction(responses)
           return responses     
    },

    eventQuery:  async function(event, userID, parameters = {}) {
        let self = module.exports;
        const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID + userID);
        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    name: event,
                    parameters: structJson.structProtoToJson(parameters),
                    languageCode: config.dialogFlowSessionLanguageCode
                },
            },
        };

        let responses = await sessionClient.detectIntent(request);
        responses =  await self.handleAction(responses)
           return responses
    },
    handleAction: function(responses) {
        return responses;
    }  
}