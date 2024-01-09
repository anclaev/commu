import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Employee } from '@prisma/client';

import { EmployeeService } from './employee.service';

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
  @Get(':id')
  async getById(@Param('id') id: string): Promise<Employee> {
    const employee = await this.employeeService.findOneById(id);

    if (!employee) throw new NotFoundException('Employee not found');

    return employee;
  }

  /**
   * Create employee
   * @param {CreateEmployeeDto} dto Employee data
   * @returns {Employee} Created employee
   */
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
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Employee> {
    return await this.employeeService.remove(id);
  }
}
