const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const express = require("express")

import { authentificationRouter } from '../APPECLATEE/authentification/router'
import { authenticateToken } from '../middleware/authenticate'
import { authorization } from '../middleware/authorizations'

export const swaggerRouter = express.Router()

const swaggerOptions = {
    openapi: "3.0.1",
    swaggerDefinition: {
        info: {
            title: 'API TOP DOC',
            description: 'SWAGGER',
            contact: {
                name: ''
            }
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
    apis: [`./APPECLATEE/*/router.ts`]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
swaggerRouter.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

swaggerRouter.use('/auth', authentificationRouter)

// require('./routes/auth/login')(app)
// require('./routes/auth/test')(app)

swaggerRouter.use(({ res: ApiException }: any) => {
    const message = 'Ressource not found.'
    return ApiException.status(404).json({ message })
})