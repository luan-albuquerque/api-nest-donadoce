import { Controller, Get, Post, Body, Put, Param, Delete, Query, DefaultValuePipe, ParseIntPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';


@ApiTags("Dashboard")
@ApiBearerAuth()
@Controller('dashboard')
export class DashboardController {
  constructor(

    ) {}

  @Post()
  async create() {
    
  }

}
