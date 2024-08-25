import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { ENDPOINT } from 'src/common/constants';
import {
  ApiSuccessResponse,
  ApiSuccessResponseWithDataIsNull,
} from 'src/common/swaggers';
import { CreateLocationDto, UpdateLocationDto } from '../dtos';
import {
  CreateLocationUseCase,
  DeleteLocationUseCase,
  UpdateLocationUseCase,
} from 'src/modules/locations/domain/use-case';
import { SuccessResponse } from 'src/common/responses/success.response';

@ApiTags('Locations')
@Controller(ENDPOINT.LOCATION_V1)
export class LocationController {
  constructor(
    private readonly createLocationUseCase: CreateLocationUseCase,
    private readonly updateLocationUseCase: UpdateLocationUseCase,
    private readonly deleteLocationUseCase: DeleteLocationUseCase,
  ) {}

  @Post('')
  @ApiSuccessResponseWithDataIsNull({ status: 201 })
  async createLocation(@Body() createLocationDto: CreateLocationDto) {
    await this.createLocationUseCase.execute({ ...createLocationDto });
    return SuccessResponse.call(null);
  }

  @Patch(':locationId(\\d+)')
  @ApiSuccessResponseWithDataIsNull({ status: 200 })
  async updateLocation(
    @Param('locationId') locationId: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    await this.updateLocationUseCase.execute({
      locationId: Number(locationId),
      ...updateLocationDto,
    });
    return SuccessResponse.call(null);
  }

  @Delete(':locationId(\\d+)')
  @HttpCode(204)
  async deleteLocation(@Param('locationId') locationId: string) {
    await this.deleteLocationUseCase.execute(+locationId);
  }
}
