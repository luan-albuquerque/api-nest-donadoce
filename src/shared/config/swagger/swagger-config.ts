import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Documentação de API Dona Doce')
  .setDescription('')
  .setContact('Dona Doce', '', '')
  .setVersion('1.0')
  .addServer(`http://localhost:${3000}`)
  .addServer(`https://rentx.gedroid.com`)
  .addServer(`http://rentx.gedroid.com`)
  .addBearerAuth()
  .build();

export { swaggerConfig };
