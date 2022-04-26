import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
    {
        id: {type: String},
        nome: {type: String, required: true},
        nacionalidade: {type: String}
    },

    {
        verionKey: false
    }
);

const autores = mongoose.model("autores", autorSchema)

export default autores;