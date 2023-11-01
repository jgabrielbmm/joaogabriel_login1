import fastify from 'fastify'
import { registerUserController } from './http/controllers/register-user'
import { fetchStudentUserController } from './http/controllers/fetch-students'
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifySwagger from "@fastify/swagger";
import {swaggerOptions, swaggerUiOptions} from "./docs/swagger-config";
import {fetchStudentsSchema, registerUserSchema} from "./docs/swagger-schemas";

const app = fastify()

app.register(fastifySwagger, swaggerOptions);
app.register(fastifySwaggerUi, swaggerUiOptions);


app.register((app, options, done) => {
  app.post('/users', registerUserSchema,  registerUserController)
  app.get('/students', fetchStudentsSchema,fetchStudentUserController)
  done();
});



// app.post('/users', registerUserSchema,  registerUserController)
// app.get('/students', fetchStudentUserController)

app
  .listen({ port: 3333, host: '0.0.0.0' })
  .then(() => console.log('HTTP Server Running'))

