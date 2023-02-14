const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const FilmSchema = new Schema ({
    uuid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    }
})

mongoose.model('films', FilmSchema)