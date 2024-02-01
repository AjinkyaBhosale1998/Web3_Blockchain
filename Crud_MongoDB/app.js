const express = require("express");
const app = express();
const db = require("./connection");
const postmodel = require("./postmodel");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// crud application

app.post('/', async (req, res) => {
  const { title, content } = req.body;

  try {
    const newPost = await postmodel.create({ title, content });
    res.json(newPost);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/', async(req, res) => {
    try {
        const posts = await postmodel.find();
        res.json(posts);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/:id', async(req , res) => {
    const {id} = req.params;
    try {
        const post = await postmodel.findById(id);
        res.json(post);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.put('/:id', async(req, res)=> {
    const {id} = req.params;
    const {title, content} = req.body;
    try {
        const post = await postmodel.findByIdAndUpdate (id, {title, content});
        res.json(post)
        console.log(post);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.listen(3001, () => {
  console.log("Listening to 3001");
});
