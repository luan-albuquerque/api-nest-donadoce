import { Controller, Get, Post, Body, Put, Param,Query,ParseIntPipe, DefaultValuePipe } from '@nestjs/common';

import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { CreatePersonService } from './services/create-person.service';
import { FindAllPersonService } from './services/find-all-person.service';
import { UpdatePersonService } from './services/update-person.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags("Person")
@ApiBearerAuth()
@Controller('person')
export class PersonController {
  constructor(
    private readonly createPersonService: CreatePersonService,
    private readonly findAllPersonService: FindAllPersonService,
    private readonly updatePersonService: UpdatePersonService,
    ) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto) {
    return this.createPersonService.execute(createPersonDto);
  }

  @Get()
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'skip',
    required: false,
    type: Number,
  })
  async findAll(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip = 0,
  ) {
    limit = limit > 10 ? 10 : limit;
    
    return await this.findAllPersonService.execute({limit, skip});
  }


  @Put(':id')
  @ApiOperation({summary: "Atualizar Usuario"})
  @ApiBody({
    type: UpdatePersonDto,
  })
  update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto) {
    return this.updatePersonService.execute(id, updatePersonDto);
  }


}
