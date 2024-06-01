import mongoose from "mongoose"

const LinkSchema = mongoose.Schema({
    originalUrl: {
        type: String,
        require: true
    },
    clicks: [
        {
            insertedAt: {
                type: Date,
                default: Date.now
            },
            ipAddress: String
        }
    ]
})

export default mongoose.model("links", LinkSchema)
