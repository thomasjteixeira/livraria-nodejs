import express from "express";
import db from "./config/dbConnect.js";
import livros from "./models/Livro.js"
import autores from "./models/Autor.js"

db.on("error", console.log.bind(console, 'Erro de conexão'));
db.once("open", () =>{
    console.log("conexão com o banco feita com sucesso");
});

const app = express();

app.use(express.json());


app.get('/', (req, res) => {
    res.status(200).send("Home Livraria");
});

//listar livros
app.get('/livros', (req, res) => {
    livros.find()
    .populate('autor')
    .exec((err,livros) => {
        res.status(200).json(livros)
    })
});

//listar livro por editora
app.get('/livros/busca', (req, res) =>{
    const editora = req.query.editora;


    livros.find({'editora': editora})
    .populate('autor', 'nome') 
    .exec((err, livros) => {
        if(err){
            res.status(400).send({message: `${err.message} - Id do livro não localizado`});
        }else{
            res.status(200).send(livros);
        }
    })
    
});


//listar um livro
app.get('/livros/:id', (req, res) =>{
    const id = req.params.id;

    livros.findById(id)
    .populate('autor', 'nome') 
    .exec((err, livros) => {
        if(err){
            res.status(400).send({message: `${err.message} - Id do livro não localizado`});
        }else{
            res.status(200).send(livros);
        }
    })
    
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

});

//-----------------CRUD Autores------------

//listar Autores
app.get('/autores', (req, res) => {
    autores.find((err,autores) => {
        res.status(200).json(autores)
    })
});

//listar um autor
app.get('/autores/:id', (req, res) =>{
    const id = req.params.id;

    autores.findById(id, (err, autores) => {
        if(err){
            res.status(400).send({message: `${err.message} - Id do autor não localizado`});
        }else{
            res.status(200).send(autores);
        }
    })
    
});

//cadastrar um autor
app.post('/autores', (req, res) => {
    
    let autor = new autores(req.body);

    autor.save((err) => {    
        if(err){
            res.status(500).send({mensage: `${err.message} - falha ao cadastrar autor`});
        }else{
            res.status(201).send(autor.toJSON());
        }

    });

});

app.put('/autores/:id', (req, res) =>{
    const id = req.params.id;

        autores.findByIdAndUpdate(id, {$set: req.body}, (err) =>{
            if(err){
                res.status(500).send({message: err.message});
            }else{
                res.status(200).send({message: "Autor atualizado com sucesso"});                
            }
        })
    

});

app.delete('/autores/:id', (req, res) =>{
    
    const id = req.params.id;
       
       autores.findByIdAndDelete(id, (err) =>{
           if(err){
                res.status(500).send({message: err.message})
           }else{
               res.status(200).send({message: 'Autor removido com sucesso'})
           }
       })

});

export default app;
