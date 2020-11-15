'use strict'
const dialogFlow = require('dialogflow');
const { query } = require('express');
const { Mongoose } = require('mongoose');
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

const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);
// const Registration = mongoose.model('registration');




module.exports =  {
    textQuery:  async function(text, userID, parameters = {}) {
        
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
        let self = module.exports
        let queryResult =  responses[0].queryResult;
        console.log(queryResult.action)

        switch (queryResult.action) {
            case 'recommendcourses-yes':
                if (queryResult.allRequireParamsPresent) {
                    self.saveRegistration(queryResult.parameters.fields)
                }
            break;
        }
        return responses;
    } ,
    
    saveRegistration : async function(fields) {
        const registration = new Registration ({
            name: fields.name.stringValue,
            address: fields.address.stringValue,
            phone: fields.phone.stringValue,
            email: fields.email.stringValue,
            dataSent: Date.now()
        });
        try{
            let reg = await registration.save();
                console.log(reg)
        } catch (err) {
            console.log(err)
        }
    }
}