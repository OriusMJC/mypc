const server = require('./src/app');
const { conn } = require('./src/db');

// Syncing all the models at once.
conn.sync({ force: true}).then(() => {
  server.listen(process.env.PORT || 3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});