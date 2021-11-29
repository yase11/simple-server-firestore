const app = require('./src/app');

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`\nServer is running on http://localhost:${port}`);
});