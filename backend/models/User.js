import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
        required: true, 
    },

    phone :{
        type: Number,
        require : true
    },

})

const User = mongoose.model('userSchema',User);
export default User;
