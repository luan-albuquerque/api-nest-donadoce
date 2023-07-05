import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Documentação de API Dona Doce')
  .setDescription('')
  .setContact('Dona Doce', '', '')
  .setVersion('1.0')
  .addServer(`https://api.donadoce.gedroid.com`)
  .addServer(`http://localhost:${3100}`)
  .addBearerAuth()
  .build();

export { swaggerConfig };
