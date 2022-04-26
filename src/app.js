import express from "express";
import db from "./config/dbConnect.js";
import livros from "./models/Livro.js"

db.on("error", console.log.bind(console, 'Erro de conexão'));
db.once("open", () =>{
    console.log("conexão com o banco feita com sucesso");
});

const app = express();

app.use(express.json());

/*const livros = [
    {id: 1, "titulo": "Harry Potter", "editora": "Editora Abril"},
    {id: 2, "titulo": "Game of Thrones", "editora": "Editora Maio"}
];*/

app.get('/', (req, res) => {
    res.status(200).send("Home Livraria");
});

//listar livros
app.get('/livros', (req, res) => {
    livros.find((err,livros) => {
        res.status(200).json(livros)
    })
});

//listar um livro
app.get('/livros/:id', (req, res) =>{
    const id = req.params.id;

    livros.findById(id, (err, livros) => {
        if(err){
            res.status(400).send({message: `${err.message} - Id do livro não localizado`});
        }else{
            res.status(200).send(livros);
        }
    })
    
    //let index = buscaLivro(req.params.id);
    //res.status(200).json(livros[index]);
});

//cadastrar um livro
app.post('/livros', (req, res) => {
    
    let livro = new livros(req.body);

    livro.save((err) => {    
        if(err){
            res.status(500).send({mensage: `${err.message} - falha ao cadastrar livro`});
        }else{
            res.status(201).send(livro.toJSON());
        }

    });

    //livros.push(req.body);
    //res.status(201).json(livros);
});

app.put('/livros/:id', (req, res) =>{
    const id = req.params.id;

        livros.findByIdAndUpdate(id, {$set: req.body}, (err) =>{
            if(err){
                res.status(500).send({message: err.message});
            }else{
                res.status(200).send({message: "Livro atualizado com sucesso"});                
            }
        })
    
    /*let index = buscaLivro(req.params.id);
    livros[index].titulo = req.body.titulo;
    livros[index].editora = req.body.editora;
    res.status(200).json(livros);*/
});

app.delete('/livros/:id', (req, res) =>{
    
    const id = req.params.id;
       
       livros.findByIdAndDelete(id, (err) =>{
           if(err){
                res.status(500).send({message: err.message})
           }else{
               res.status(200).send({message: 'Livro removido com sucesso'})
           }
       })

    /*let index = buscaLivro(req.params.id);
    livros.splice(index, 1);
    res.send(`Livro ${index} removivdo com sucesso`);*/
});

/*function buscaLivro(id){
    return livros.findIndex(livros => livros.id == id);
}*/

export default app;
