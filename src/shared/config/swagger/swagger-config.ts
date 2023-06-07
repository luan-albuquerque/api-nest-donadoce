import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Documentação de API Dona Doce')
  .setDescription('')
  .setContact('Dona Doce', '', '')
  .setVersion('1.0')
  .addServer(`http://localhost:${3100}`)
  .addServer(`https://api.doce.gedroid.com`)
  .addServer(`http://api.doce.gedroid.com`)
  .addBearerAuth()
  .build();

export { swaggerConfig };
