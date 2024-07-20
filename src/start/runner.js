require("dotenv/config");

const runner = (app) => {
  const PORT = process.env.PORT || 8080;

  app.listen(PORT, () => { 
    console.log(`server start on http://localhost:${PORT}`);
  });
  
};

module.exports = runner;
