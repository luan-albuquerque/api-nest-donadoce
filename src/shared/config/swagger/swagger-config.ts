import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Documentação de API Dona Doca')
  .setDescription('')
  .setContact('Dona Doce', '', '')
  .setVersion('1.0')
  .addServer(`http://localhost:${8000}`)
  .addServer(`https://rentx.gedroid.com`)
  .addBearerAuth()
  .build();

export { swaggerConfig };
