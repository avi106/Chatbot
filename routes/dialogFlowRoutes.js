const { response } = require("express");
const chatbot = require("../chatbot/chatbot");

module.exports = (app) => {
  //Routes
  app.get("/", (req, res) => {
    res.send({ hello: "There" });
  });

  app.post("/api/df_text_query", async(req, res) => {
      let responses = await chatbot.textQuery(req.body.text, req.body.parameters)
        res.send(responses[0].queryResult)
  });

  app.post("/api/df_event_query", async(req, res) => {
    let responses = await chatbot.eventQuery(req.body.event, req.body.parameters)
    res.send(responses[0].queryResult)   
  });
};
