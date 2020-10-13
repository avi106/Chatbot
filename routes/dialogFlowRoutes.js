module.exports = (app) => {
  //Routes
  app.get("/", (req, res) => {
    res.send({ hello: "World" });
  });

  app.get("/api/df_text_query", (req, res) => {
    res.send({ do: "text query" });
  });

  app.get("/api/df_event_query", (req, res) => {
    res.send({ do: "event query" });
  });
};