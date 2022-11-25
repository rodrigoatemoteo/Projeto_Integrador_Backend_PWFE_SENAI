import express from "express";
import cors from "cors";
import * as fs from 'node:fs';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

var data = fs.readFileSync('./Data/data.json');
var meuObjeto = JSON.parse(data);

const usuarios = meuObjeto;

const gravarUsuario = async (user) => {
  usuarios.push(user);
  var DadosAtualizados = JSON.stringify(usuarios);
  fs.writeFile("./Data/data.json", DadosAtualizados, (err) => {
  if(err){
    throw err;
  }
})
};

app.post("/usuarios/", (req, res) => {
  let user = req.body;
  gravarUsuario(user);
  res.status(200).send("Usuário: "+user.email+" - Senha: "+user.password);
});

app.get("/usuarios/:email", (req, res) => {
  usuarios.map((user)=>{
    if(""+user.email === ""+req.params.email){
      res.json(user);
      res.status(200).send("Usuário: "+user.email+" - Senha: "+user.senha);
    }
  });
  res.status(404).send("Usuário não encontrado!");
});

app.listen(port, () => {
  console.log("Servidor está sendo executado na porta: ", port);
});

/*https://medium.com/xp-inc/https-medium-com-tiago-jlima-developer-criando-uma-api-restful-com-nodejs-e-express-9cc1a2c9d4d8
    https://ezdevs.com.br/comecando-uma-api-rest-com-node-js/
    https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Statements/for...in
    https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status
    https://acervolima.com/como-ler-e-escrever-um-arquivo-json-usando-node-js/*/
