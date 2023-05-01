import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Documentação de API Dona Doca')
  .setDescription('')
  .setContact('Dona Doce', '', '')
  .setVersion('1.0')
  .addServer(`http://localhost:${process.env.API_PORT}`)
  .addBearerAuth()
  .build();

export { swaggerConfig };
