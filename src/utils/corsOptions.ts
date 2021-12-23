import * as cors from 'cors';

//options for cors midddleware
const corsOptions: cors.CorsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'x-auth-token',
      'User-Agent'
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: ['https://salty-plateau-20578.herokuapp.com'],
    preflightContinue: false,
  };

  export default corsOptions;