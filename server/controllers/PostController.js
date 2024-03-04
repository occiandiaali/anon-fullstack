const PostSchema = require('../db/DBSchema');

const getPosts = async (req, res) => {
    let results = await PostSchema.find({}).catch((e) => res.send(e));
    res.send(results).status(200);
};

const createPost = (req, res) => {
    const post = new PostSchema({
        title: req.body.title,
        content: req.body.content
    });

    post.save(res.json(post)).catch((err) => res.send(err));
};

const getPost = async (req, res) => {
    const query = { _id: req.params.postID };

    let result = await PostSchema.findOne(query).catch((e) => res.send(e));
    res.send(result).status(200);
};

const updatePost = async (req, res) => {
    const query = { _id: req.params.postID };
    const update = {
        $set: {
            title: req.body.title,
            content: req.body.content
        }
    };

    let result = await PostSchema.updateOne(query, update).catch((e) => res.send(e));
    res.send(result).status(200);
};

const deletePost = (req, res) => {
    PostSchema.deleteOne({ _id: req.params.postID })
        .then(() => res.json({ message: "Post Deleted" }))
        .catch((err) => res.send(err));
};

module.exports = {
    getPosts,
    createPost,
    getPost,
    updatePost,
    deletePost
}
