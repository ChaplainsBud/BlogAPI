const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const { BlogPosts } = require('./models');

BlogPosts.create(
    'My Struggle', 'literature', 'Karl Knausgaard');
BlogPosts.create(
    'Chopin\'s Ballades', 'music', 'Leif Ove Andsnes');

// C_READ_UD 
router.get('/', (req, res) => {
    res.json(BlogPosts.get());
});

// CREATE_RUD 
router.post('/', jsonParser, (req, res) => {

    const requiredFields = ['title', 'content', 'author', 'publishDate']; // publishDate? 
    for( let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if(!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    const item = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
    res.status(201).json(item);
});

// CRU_DELETE 
router.delete('/:id', (req, res) => {
    BlogPosts.delete(req.params.id);
    console.log(`Deleted blog post \`${req.params.ID}\``);
    res.status(204).end();
});

// CR_UPDATE_D 
reouter.put('/:id', jsonParser, (req, res) => {
    const requiredFields = ['title', 'content', 'author', 'publishDate', 'id'];
    for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
            const message = `Missing \`${field}\` in request body`
            console.error(message);
            return res.status(400).send(message);
        }
    }
    if (req.params.id !== req.body.id) {
        const message = (
            `Request path id (${req.params.id}) and request body id `
            `(${req.body.id}) must match`);
            console.error(message);
            return res.status(400).send(message);
        }
        console.log(`Updating blog post \`${req.params.id}\``);
        const updatedBlogPost = BlogPost.update({
            id: req.params.id,
            title: req.body.title,
            author: req.body.author,
            publishDate: req.body.publishDate
        });
        res.status(204).end();
})