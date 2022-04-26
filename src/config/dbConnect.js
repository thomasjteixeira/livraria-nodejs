import mongoose from "mongoose"

mongoose.connect("mongodb+srv://mongodb:mongodb123456@cluster0.ulcgr.mongodb.net/livraria");

let db = mongoose.connection;

export default db;