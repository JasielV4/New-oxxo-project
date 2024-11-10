import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, UseGuards, UnauthorizedException } from '@nestjs/common';
import { ProvidersService } from './providers.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { User } from 'src/auth/entities/user.entity';
import { UserData } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ROLES } from 'src/auth/constants/roles.constants';
import { ApiAuth } from 'src/auth/decorators/api.decorator';
import { ApiTags } from '@nestjs/swagger';
import { ApiResponse } from '@nestjs/swagger';
import { Provider } from './entities/provider.entity';

@ApiAuth()
@ApiTags("Providers")
@UseGuards(AuthGuard)
@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) { }

  @Auth(ROLES.MANAGER)
  @ApiResponse({
    status: 201,
    example: {
      providerId: "UUID",
      providerName: "Mau",
      providerEmail: "provider@gmail.com",
      providerPhoneNumber: "4613027231"

    } as Provider
  })
  @Post()
  create(@Body() createProviderDto: CreateProviderDto) {
    return this.providersService.create(createProviderDto);
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get()
  findAll(@UserData() user: User) {
    return this.providersService.findAll();
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get('/name/:name')
  findByName(@Param('name') name: string) {
    return this.providersService.findOneByName(name);
  }

  @Auth(ROLES.EMPLOYEE, ROLES.MANAGER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    const provider = this.providersService.findOne(id);
    if (!provider) throw new NotFoundException()
    return provider
  }

  @Auth(ROLES.MANAGER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProviderDto: UpdateProviderDto) {
    return this.providersService.update(id, updateProviderDto);
  }

  @Auth(ROLES.MANAGER)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.providersService.remove(id);
  }
}