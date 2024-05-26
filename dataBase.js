import mongoose from "mongoose"

const uri = "mongodb+srv://n7110315:pY6nXx7sKnkGo6aN@cluster0.hgiep68.mongodb.net/TinyUrlDB?retryWrites=true&w=majority&appName=Cluster0"

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
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected')
})

export default connectDB
