require('dotenv').config()

const cors = require('cors')
const express = require("express")

const app = express()
const router = express.Router()

app.use(cors())

import { ApiException } from './src/type/exception'
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const sequelize = require('./src/database/connect')

import { Response, Request } from 'express'

app.use(express.json())
app.disable('x-powered-by')
app.use('/api', router)

import { personRouter } from './src/APPECLATEE ENTITITES/persons/router'

import { authentificationRouter } from './src/APPECLATEE ENTITITES/authentification/router'
import { authenticateToken } from './src/middleware/authenticate'
import { authorization } from './src/middleware/authorizations'

// To reset database, comment otherwise.
sequelize.initDb()

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Listening to port ${port}...`)
})

app.get("/", (req: Request, res: Response) => {
    res.send("SWAGGER : /api/docs")
})
const swaggerOptions = {
    openapi: "3.0.1",
    swaggerDefinition: {
        info: {
            title: 'API TOP DOC',
            description: 'SWAGGER',
            contact: {
                name: ''
            },
            servers: [{
                url: `http://localhost:${port}`,
                description: 'localhost'
            },],
        },
        securityDefinitions: {
            bearerAuth: {
                type: 'apiKey',
                name: 'Authorization',
                scheme: 'bearer',
                in: 'header',
            },
        },
        security: [
            {
                bearerAuth: []
            }
        ],
    },
    apis: [`./src/modules/*/router.ts`]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

router.use('/persons', personRouter)

router.use('/auth', authentificationRouter)

// require('./routes/auth/login')(app)
// require('./routes/auth/test')(app)

app.use(({ res: ApiException }: any) => {
    const message = 'Ressource not found.'
    return ApiException.status(404).json({ message })
})