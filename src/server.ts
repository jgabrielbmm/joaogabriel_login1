import fastify from 'fastify'
import { registerUserController } from './http/controllers/register-user'
import { fetchStudentUserController } from './http/controllers/fetch-students'

const app = fastify()

app.post('/users', registerUserController)
app.get('/students', fetchStudentUserController)

app
  .listen({ port: 3333, host: '0.0.0.0' })
  .then(() => console.log('HTTP Server Running'))
