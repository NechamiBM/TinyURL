import mongoose from "mongoose"

const LinkSchema = mongoose.Schema({
    originalUrl: {
        type: String,
        require: true
    }
})

export default mongoose.model("links", LinkSchema)
