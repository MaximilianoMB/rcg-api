const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: "87900ac6b34b4e95af7d63d5fee166ad",
   });

const handleApiCall = (req, res) => {
    app.models
    .predict(
        Clarifai.FACE_DETECT_MODEL,
    // THE JPG
    req.body.input
    )
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
   .increment('entries', 1)
   .returning('entries')
   .then(entries => {
       res.json(entries[0].entries);
   })
   .catch(err => res.status(400).json('invalid count'))
}

module.exports = {
    handleImage : handleImage,
    handleApiCall : handleApiCall
}