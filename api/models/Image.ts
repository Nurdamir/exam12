import mongoose, {Types} from 'mongoose';
import User from "./User";

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => User.findById(value),
            message: 'User does not exist'
        }
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
});

const Image = mongoose.model('Image', ImageSchema);

export default Image;