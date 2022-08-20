const express = require('express')
const app = express();

app.get('/', (request, response) => {
    return response.json({ message: 'Hello word - fundamentos' })
})
// porta que vai rodar
app.listen(3333)

