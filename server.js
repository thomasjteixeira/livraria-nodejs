import app from './src/app.js'

const port = 3000; // process.env.PORT || 3000;


app.listen(port, () => {
    console.log("Servidor online em http://localhost:" + port)
});
