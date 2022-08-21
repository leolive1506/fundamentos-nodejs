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

function getBalance(statement) {
    // pega informações e transforma em um unico valor
    const balance = statement.reduce((acc, operation) => {
        if (operation.type === 'credit') {
            return acc + operation.amount
        } else {
            return acc - operation.amount
        }
    }, 0) 

    return balance
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
    return response.status(201).json({ customer })
})

app.post('/withdraw', verifyIfExistsAccountCPF, (request, response) => {
    const { amount } = request.body
    const { customer } = request
    const balance = getBalance(customer.statement)

    if (balance < amount) {
        return response.status(400).json({ error: 'Insufficient balance' })
    }

    const statementOperation = {
        amount, type: 'debit', created_at: new Date()
    }

    customer.statement.push(statementOperation)
    return response.status(201).json({ customer })
})

app.get('/statement/date', verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request
    const { date } = request.query

    // pegar qualquer horário do dia
    const dateFormatted = new Date(date + ' 00:00')
    
    const statement = customer.statement.filter((statement) => {
        return statement.created_at.toDateString() === new Date(dateFormatted).toDateString()
    })

    return response.json(statement)
})

app.put('/account', verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request
    customer.name = request.body.name

    return response.status(201).json({ message: 'changed user name', customer })
})

app.get('/account', verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request
    return response.json(customer)
})

app.delete('/account', verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request
    customers.splice(customer, 1)

    return response.json(customers)
})

app.get('/balance', verifyIfExistsAccountCPF, (request, response) => {
    const { customer } = request
    const balance = getBalance(customer.statement)

    return response.json(balance)
})
// porta que vai rodar
app.listen(3333)

