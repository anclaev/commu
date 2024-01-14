import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

import { Employee } from '@prisma/client';

import { Auth } from '../auth/decorators';

import { EmployeeService } from './employee.service';

import { GetEmployeeListDto } from './dtos/get-employee-list';
import { CreateEmployeeDto } from './dtos/create-employee';
import { UpdateEmployeeDto } from './dtos/update-employee';

/**
 * Employee HTTP controller
 */
@Controller('employee')
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  /**
   * Get employee by id
   * @param {string} id Employee ID
   * @returns {Employee} Found employee
   */
  @Auth(['User'])
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Employee> {
    const employee = await this.employeeService.findOneById(id);

    if (!employee) throw new NotFoundException('Employee not found');

    return employee;
  }

  @Auth(['User'])
  @Get()
  async getList(@Query() query: GetEmployeeListDto): Promise<Employee[]> {
    return await this.employeeService.getOffsetPagination(query);
  }

  /**
   * Create employee
   * @param {CreateEmployeeDto} dto Employee data
   * @returns {Employee} Created employee
   */
  @Auth(['Administrator'])
  @Post()
  async create(@Body() dto: CreateEmployeeDto): Promise<Employee> {
    return await this.employeeService.create(dto);
  }

  /**
   * Update employee
   * @param {string} id Employee ID
   * @param {UpdateEmployeeDto} dto Updated employee fields
   * @returns {Employee} Updated employee
   */
  @Auth(['Administrator'])
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateEmployeeDto
  ): Promise<Employee> {
    const employee = await this.employeeService.update(id, dto);

    if (!employee) throw new NotFoundException('Employee not found');

    return employee;
  }

  /**
   * Delete employee
   * @param {string} id Employee ID
   * @returns {Employee} Deleted employee
   */
  @Auth(['Administrator'])
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Employee> {
    console.log('hi!');
    return await this.employeeService.remove(id);
  }
}
