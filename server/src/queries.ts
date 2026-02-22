import { and, eq, inArray, type SQL } from 'drizzle-orm';
import { db } from './db.js';
import * as schema from './schema.js';

export type EmployeeFilters = {
  roleIds?: number[]
  countryIds?: number[]
  departmentIds?: number[]
};

export async function getEmployees(filters: EmployeeFilters = {}) {
  const conditions: SQL[] = [];

  if (filters.roleIds?.length) {
    conditions.push(inArray(schema.employees.roleId, filters.roleIds));
  }

  if (filters.countryIds?.length) {
    conditions.push(inArray(schema.employees.countryId, filters.countryIds));
  }

  if (filters.departmentIds?.length) {
    conditions.push(inArray(schema.employees.departmentId, filters.departmentIds));
  }

  return db
    .select({
      id: schema.employees.id,
      firstName: schema.employees.firstName,
      lastName: schema.employees.lastName,
      role: schema.roles.name,
      country: schema.countries.name,
      department: schema.departments.name,
    })
    .from(schema.employees)
    .innerJoin(schema.roles, eq(schema.employees.roleId, schema.roles.id))
    .innerJoin(schema.countries, eq(schema.employees.countryId, schema.countries.id))
    .innerJoin(schema.departments, eq(schema.employees.departmentId, schema.departments.id))
    .where(conditions.length ? and(...conditions) : undefined);
}

export async function getFilterOptions() {
  const [roles, countries, departments] = await Promise.all([
    db.select().from(schema.roles),
    db.select().from(schema.countries),
    db.select().from(schema.departments),
  ]);

  return {
    roles,
    countries,
    departments,
  };
}
