import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

export const departments = mysqlTable('departments', {
  id: int('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
});

export const roles = mysqlTable('roles', {
  id: int('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
});

export const countries = mysqlTable('countries', {
  id: int('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
});

export const employees = mysqlTable('employees', {
  id: int('id').primaryKey(),
  firstName: varchar('first_name', { length: 255 }).notNull(),
  lastName: varchar('last_name', { length: 255 }).notNull(),
  roleId: int('role_id').notNull().references(() => roles.id),
  countryId: int('country_id').notNull().references(() => countries.id),
  departmentId: int('department_id').notNull().references(() => departments.id),
});
