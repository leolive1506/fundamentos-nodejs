const { response } = require('express');
const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express();
app.use(express.json())

const customers = []
// Middleware
function verifyIfExistsAccountCPF(request, response, next) {
    const { cpf } = request.headers
    // some retorna true or false de acordo com a condição passada
    const customer = customers.find(customers => customers.cpf === cpf)
    if (!customer) {
        return response.status(400).json({ error: 'Customer not found' })
    }

    request.customer = customer
    return next()
}
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

app.get('/statement', verifyIfExistsAccountCPF, (request, response) => {
    return response.json(request.customer.statement)
})

app.post('/deposit', verifyIfExistsAccountCPF, (request, response) => {
    const { description, amount } = request.body
    const { customer } = request
    const statementOperation = {
        description, amount, type: 'credit', created_at: new Date()
    }
    customer.statement.push(statementOperation)
    return response.status(201).json({ customer: customer })
})
// porta que vai rodar
app.listen(3333)

