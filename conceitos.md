# Conceitos nodejs
- O que é
    - Plataforma open-source que permite execução js do lado servidor (backend)
    - v8 (criado pra rodar no chrome, permite execução mais rápida) + libuv (multiplaforma com foco assincrono) + conjunto de módulos (modulos que ja vem dentro do node)

- O que veio resolver
    - Criado por Ryan Dahl
    - Tecnologias da época não davam bom suporte ao processo I/O
        - Resolver problema de I/O assincrono

- Caracteristicas
    - Arquitetura event loop (baseado em eventos)
        - Call stack (Pilha de funções)
    - Single - Thread
    - No-blocking I/O
        - Quando chama função *a* e *b*, para qeu a função *b* seja executada não é necessário que *a* função termine por completo
            - Diferente de outras linguagens como java
    - Módulos próprios
        - Http
        - Dns
        - Fs
        - Buffer
        - Dentro outros

- Event Loop
    - Event loop fica ouvindo call stack
        - Event loop Escuta uma coisa por vez (Single - Thread), e distribui para as threads disponíveis
            - Escutou uma, manda pra uma thread
        - Por padrão
            - tem quatro threads disponíveis para serem executadas
    - Call stack
        - Por ser uma call stack (pilha) quem entra por ultimo sai primeiro
            - De 3 funções, a 3º sai primeiro

- Gerenciadores de pacotes
    - Npm e yarn
    - Pode disponibilizar nossas libs tbm

- Frameworks
    - Express
    - Egg.js
    - Nest.js
    - Adonis.js
    - Dentro outros

# Conceitos sobre api rest  
- Api (Application Programming Interface) -> Interface de programação de apps
    - Conjunto de especificações de possíveis interações entre apps
    - Documentação para desenvolvidor
        - Rotas, params, retornos
        - Quando criar uma é importante ter boas informações
- Rest (Representation state transfer) -> Transerência representacional de estado)
    - Modelo de arquitetura
        - Utilizando conceitos rest, temos uma api rest
    - 6 Regras
        1. Client-server
            - Separar responsabilidades
        2. Stateless
            - Client realizar quantas requisições quiser para servidor, porém servidor não armazena estado ou seção das requisições
        3. Cache
            - Construida de modo que o cache possa ser implementado
        4. Interface Uniforme
            - Forma que client server compartilham essa interface
            - Identificação de recursos
                - https://enderecoservidor.com/products
                - https://enderecoservidor.com/clients
            - Representação dos recursos (json, xml)
            - Mensagens auto-descritivas
            - HATEOS (Hypertext as the engine of application state) 
                - Poder retornar links dentro da nossa requisição
        5. Camadas
            - Permitir camadas entre camadas e server
        6. Código sob demanda
            - Permite que as funcionalidades do cliente sejam estendidas na forma de scripts ou mini apps

# Métodos de requisição - HTTP verbs
- Alguns métodos
    - GET -> leitura
    - POST -> criação
    - PUT -> Atualização
    - DELETE -> deletar
    - PATCH -> atualização parcial
        - Ex: atualizar somente avatar do user
- Http codes
    - 1XX - Informativo
        - Solicitação aceita ou o processo continua em andamento
    - 2XX - Request bem sucedida
        - Confirmação
        - 200 -> Request bem sucedida
        - 201 -> created -> geralmente usado para POST após uma inserção
    - 3XX - Redirecionamento
        - 301 -> movido permanentemente
        - 302 -> movido
    - 4XX - Erro do cliente
        - 400 -> bad request
        - 401 -> unauthorized
        - 403 -> Forbidden
        - 404 -> not found
        - 422 -> unprocessable entity
    - 5XX - Erro servidor
        - Servidor falhou ao concluir solicitação
        - 500 -> internal server error
        - 502 -> bad bateway
- Parametros das requisições
    - Header params
        - Parametros que vão no cabeçalho (ex: token, controle seção)
    - Query params
        - Parametros inseridos no final de uma url
            - Ex: ?page=12&limit=50
                - Chave, valor e separação (&)
    - Route params
        - No meio da url
        - Ex: http://url.com/post/{id}
    - Body params
        - parametros no corpo da requisição
            - Envia dentro do body
            - Ex
            ```json
            {
                "name": "leonardo"
            }
            ```
- **Boas práticas API REST**
    - Utilização correta dos métodos HTTP
    - Utilização correta dos status no retorno das respostas
    - Padrão de nomenclatura (get, post, delete, put, patch)