import mongoose from "mongoose"

mongoose.connect("mongodb+srv://mongodb:Mongodb123456@cluster0.qonew.mongodb.net/livraria");

let db = mongoose.connection;

export default db;