const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;
var fs = require("fs")

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/v1/contacts", (req, res) => {
    fs.readFile( 'src/data/' + 'contacts.json', 'utf8', (err, data) => {
        res.set('Access-Control-Allow-Origin', '*');
        res.end(data);
    });
});

app.get("/api/v1/blogs", (req, res) => {
    fs.readFile( 'src/data/' + 'blogs.json', 'utf8', (err, data) => {
        res.set('Access-Control-Allow-Origin', '*');
        res.end(data);
    });
});

app.get("/api/v1/comments/:blogId", (req, res) => {
    var blog_id = parseInt(req.params['blogId'])
    fs.readFile( 'src/data/' + 'comments.json', 'utf8', (err, data) => {
        array = JSON.parse(data);
        res.set('Access-Control-Allow-Origin', '*');
        res.end(JSON.stringify(array.filter(a => a.blogId === blog_id)));
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));