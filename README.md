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