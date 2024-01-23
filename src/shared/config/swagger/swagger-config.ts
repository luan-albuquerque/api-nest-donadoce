import { DocumentBuilder } from '@nestjs/swagger';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Documentação de API Dona Doce')
  .setDescription('')
  .setContact('Dona Doce', '', '')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

export { swaggerConfig };
