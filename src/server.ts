import fastify from 'fastify'
import { registerUserController } from './http/controllers/register-user'
import { fetchStudentUserController } from './http/controllers/fetch-students'
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifySwagger from "@fastify/swagger";
import {string} from "zod";

const app = fastify()

const swaggerOptions = {
  swagger: {
    info: {
      title: "Up Base API",
      description: "Api documentation",
      version: "1.0.0",
    },
    host: "localhost",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [{ name: "Default", description: "Default" }],
  },
};

const swaggerUiOptions = {
  routePrefix: "/docs",
  exposeRoute: true,
};


app.register(fastifySwagger, swaggerOptions);
app.register(fastifySwaggerUi, swaggerUiOptions);


app.register((app, options, done) => {
  app.put("/users", {
    schema: {
      tags: ["Default"],
      body:{
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          username: { type: 'string' },
          email: { type: 'string' },
          password: {type: 'string'},
          repeat_password: {type: 'string'},
          role: {type: 'string'}
        }
      },
      response: {
        201: {
          type: "object",
          properties: {
            user: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                username: { type: 'string' },
                email: { type: 'string' },
                role: {type: 'string'}
              }
            }
          },
        },
      },
    },
    handler: (req, res) => {
      res.send({ anything: "meaningfull" });
    },
  });
  done();
});


app.post('/users', registerUserController)
app.get('/students', fetchStudentUserController)

app
  .listen({ port: 3333, host: '0.0.0.0' })
  .then(() => console.log('HTTP Server Running'))

