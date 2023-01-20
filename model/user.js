const mongoose= require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        // type: Object,
        type: String,
        require: true
    },
    choices: {
        type: Array,
        // require:true,
    },
    prompt: {
        type: String,
        // require: true,
    }
})

const User = new mongoose.model('User', userSchema);

module.exports = User;