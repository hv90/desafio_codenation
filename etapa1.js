/* 
Descrição:

Escrever programa, em qualquer linguagem de programação, que faça uma requisição HTTP para a url abaixo:

https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token=SEU_TOKEN

(Para encontrar o seu token , acesse a plataforma Codenation, faça o login e a informação estará na tela)

O resultado da requisição vai ser um JSON.

Salvar o conteúdo do JSON em um arquivo com o nome answer.json, que irá usar no restante do desafio. 

*/


const https = require('https');
const fs = require('fs');

let token = '';//entre seu token aqui

https.get('https://api.codenation.dev/v1/challenge/dev-ps/generate-data?token='+ token, (resp) => {
  let data = '';

  // criando os resultados
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // imprimindo resultados
  resp.on('end', () => {
    console.log(data);
    fs.writeFile('answer.json', data, (err) => {
        if(err) throw err;
      });
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});


