# começar projeto
- Cria package.json pra iniciar projeto com alguns padrões pre definidos
```shell
yarn init -y
```

# Express
- Install express
```shell
yarn add express
```

- start express
```js
const express = require('express')
const app = express();
// porta que vai rodar
app.listen(3333)
// testar pra ver se ta rodando node src/index.js
```

- Criar uma rota
```js
app.get('/', (request, response) => {
    return response.json({ message: 'Hello word'})
})
```

- Express não trabalha somente com json
    - Precisa informar tipo de parametro que vai receber
```js
app.use(express.json())
```

- Criar middlware simples
```js
function verifyIfExistsAccountCPF(request, response, next) {
    const { cpf } = request.headers
    // some retorna true or false de acordo com a condição passada
    const customer = customers.find(customers => customers.cpf === cpf)
    if (!customer) {
        return response.status(400).json({ error: 'Customer not found' })
    }
    // passar customer pra dentro do request pra não buscar dps dnv
    request.customer = customer
    return next()
}
// use
app.get('/statement', verifyIfExistsAccountCPF, (request, response) => {})
// ou e tudo abaixo tem qeu pasasr nesse middlware
app.use(verifyIfExistsAccountCPF)
```

# Nodemon
- Assim qeu tiver alteração, da reload no server
- Install
```shell
# -D pq é somente pra desenvolvimento
yarn add nodemon -D
```

- Package.json
```json
// use -> yarn dev
"scripts": {
    "dev": "nodemon src/index.js"
},
```

- UUID (id)
```shell
yarn add uuid
```

- Usar
```js
// gerar um num aleatório
const { v4 } = require('uuid')
```

# Dicas gerais JS
```js
// some retorna true or false de acordo com a condição passada
const customerAlreadyExists = customers.some(customer => customer.cpf === cpf)
```