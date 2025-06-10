import mongoose from "mongoose";
const schema = mongoose.Schema;

const coustomerReviewSchema = new schema({
    type: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const coustomerReviews = mongoose.model("coustomerReviews", coustomerReviewSchema);

export default coustomerReviews;