export const registerUserSchema = {
  schema: {
    tags: ["users"],
    description: 'Create a new user',
    body:{
    type: 'object',
      properties: {
      name: { type: 'string' },
      username: { type: 'string' },
      email: { type: 'string', format: 'email' },
      password: {type: 'string'},
      repeat_password: {type: 'string'},
      role: {type: 'string' ,  enum: ['STUDENT', 'PROFESSOR']}
    }
    },
    response: {
      201: {
        description: 'User created successfully',
        type: "object",
          properties: {
          user: {
            type: 'object',
              properties: {
              id: { type: 'string', format: 'uuid' },
              name: { type: 'string' },
              username: { type: 'string' },
              email: { type: 'string', format: 'email' },
              role: {type: 'string',  enum: ['STUDENT', 'PROFESSOR']}
            }
          }
        },
      },
  },
}}

export const fetchStudentsSchema = {
  schema: {
    tags: ["students"],
    description: 'Fetch all students',
    response: {
      200: {
        description: 'Search completed successfully',
        type: 'object',
        properties: {
          users: {
            type: "array",
            items: {
              type: 'object',
              properties: {
                id: { type: 'string', format: 'uuid' },
                name: { type: 'string' },
                username: { type: 'string'},
                email: { type: 'string', format: 'email' },
                role: {type: 'string', enum: ['STUDENT', 'PROFESSOR']}
              }
            },
          }
        },
      },
    },
  }}



