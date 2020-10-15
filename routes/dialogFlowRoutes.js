const dialogFlow = require('dialogflow');
const { response } = require('express');
const config = require('../config/keys')

const sessionClient = new dialogFlow.SessionsClient();

const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID);

module.exports = (app) => {
  //Routes
  app.get("/", (req, res) => {
    res.send({ hello: "World" });
  });

  app.post("/api/df_text_query", async(req, res) => {
     const request = {
         session: sessionPath,
         queryInput: {
             text: {
                 text: req.body.text,
                 languageCode: config.dialogFlowSessionLanguageCode,
             },
         },
     };
     const responses = await sessionClient
        .detectIntent(request);
      
        res.send(responses[0].queryResult)
  });

  app.get("/api/df_event_query", (req, res) => {
    res.send({ do: "event query" });
  });
};
