import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()
const uri = process.env.DB_URI

const connectDB = async () => {
    await mongoose.connect(uri)
}
const database = mongoose.connection

mongoose.set('toJSON', {
    virtuals: true,
    transform: (doc, converted) => {
        delete converted._id
    }
})

database.on('error', (error) => {
    console.error("ERROR: " + error)
})

database.once('connected', () => {
    console.log('Database Connected')
})

export default connectDB
