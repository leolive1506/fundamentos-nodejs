const { response } = require('express');
const express = require('express')
const { v4: uuidv4 } = require('uuid')
const app = express();
app.use(express.json())

const customers = []

app.post('/account', (request, response) => {
    const { cpf, name } = request.body
    // some retorna true or false de acordo com a condição passada
    const customerAlreadyExists = customers.some(customer => customer.cpf === cpf)
    if (customerAlreadyExists) {
        return response.status(400).json({ error: 'Customer already exists'})
    }
 
    customers.push({ cpf, name, id: uuidv4(), statement: [] })
    return response.status(201).json({ message: 'created account' })
})

app.get('/statement', (request, response) => {
    const { cpf } = request.headers
    const customer = customers.find(customers => customers.cpf === cpf)
    if (!customer) {
        return response.status(400).json({ error: 'Customer not found' })
    }
    return response.json(customer.statement)
})
// porta que vai rodar
app.listen(3333)

