import Clarifai from 'clarifai'

// You must add your own API key here from Clarifai.
const app = new Clarifai.App({
    apiKey: 'c1f786682e284a3db34eeb15c6ee30bf'
});

// enhance security (move these code from frontend to backend)
export const apiCallHandler = (req,res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
    .then(data => res.json(data))
    .catch(err => res.status(400).json('unable to work with API'))
}

export const entriesHandler = (req,res,db)=>{
    const {id} = req.body
    db('users').where({id:id})
        .increment('entries',1)
        .returning('entries')
        .then(entries => {
            res.json(entries);
        })
        .catch(err => res.status(400).json('ubable to get entries'))
}


