/* 
Descrição:

Você deve usar o valor do campo "número de casas" para decifrar o texto e 
atualizar o arquivo JSON, no campo decifrado. 
*/



const fs = require('fs');
const fileName = './answer.json';
const file = require(fileName);
const crypto = require('crypto');
const restler = require('restler');



//lendo o arquivo criado
 fs.readFile(fileName, (err, data) => {
    if (err) throw err;

    let answer = JSON.parse(data);
    let num_casas = answer.numero_casas;
    let cifrado = answer.cifrado;
    let decifrado = '';
    let hash = '';

    cifrado = cifrado.toLowerCase();//conforme definido pelas regras

    //descriptografando a partir do número de casas
    for (var i = 0; i < cifrado.length; i++){
        let charCode = cifrado.charCodeAt(i);
        let char = cifrado[i];

        //caracteres que não são vogais não são alterados
        if(char < 'a' || char > 'z')
            decifrado += char;
        
        else  {
            let distancia = 'z'.charCodeAt(0) - charCode;

            char = String.fromCharCode(charCode);    

            //lidando com overflow da cifra de césar
            if(distancia < num_casas)
              decifrado += String.fromCharCode('a'.charCodeAt(0) + num_casas - distancia - 1);

            else decifrado += String.fromCharCode(charCode + num_casas);
        }
    }

    //criando o resumo criptográfico
    hash = crypto.createHash('sha1').update(decifrado, 'utf-8').digest('hex');

    //preparando a sobrescrita do arquivo json
    file.cifrado = cifrado;//garante que cifrado se não era minúsculo agora passa a ser
    file.decifrado = decifrado;
    file.resumo_criptografico = hash;

    //escrevendo no arquivo json
    fs.writeFile(fileName, JSON.stringify(file, null, 2), (err) => {
        if(err) 
            throw err;
    })

    

    //fazendo o post do json
     restler.post('http://localhost:4000,
                {
                    multipart: true,
                    file: 'answer',
                    data: {
                        'numero_casas': file.numero_casas,
                        'token': file.token,
                        'cifrado': file.cifrado,
                        'decifrado': file.decifrado,
                        'resumo_criptografico': file.resumo_criptografico
                    }
                }).on('complete', (data, response)=>{
                    console.log(data.message + "\n"+response.statusMessage);
                }) 

}); 




