import request from 'supertest';
import app from '../app.js';
import { getEmployees, getFilterOptions } from '../queries.js';

jest.mock('../queries.js');

const mockGetEmployees = jest.mocked(getEmployees);
const mockGetFilterOptions = jest.mocked(getFilterOptions);

const EMPLOYEE_FIXTURES = [
  { id: 1, firstName: 'Alice', lastName: 'Smith', role: 'Manager', country: 'Japan', department: 'Marketing' },
  { id: 2, firstName: 'Bob', lastName: 'Jones', role: 'Analyst', country: 'Germany', department: 'Engineering' },
];

const FILTER_FIXTURES = {
  roles: [{ id: 1, name: 'Manager' }, { id: 2, name: 'Analyst' }],
  countries: [{ id: 1, name: 'Japan' }, { id: 2, name: 'Germany' }],
  departments: [{ id: 1, name: 'Marketing' }, { id: 2, name: 'Engineering' }],
};

beforeEach(() => {
  jest.resetAllMocks();
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

describe('GET /api/v1/employees', () => {
  it('returns all employees when no filters provided', async () => {
    mockGetEmployees.mockResolvedValue(EMPLOYEE_FIXTURES);

    const res = await request(app).get('/api/v1/employees');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(EMPLOYEE_FIXTURES);
    expect(mockGetEmployees).toHaveBeenCalledWith({
      roleIds: undefined,
      countryIds: undefined,
      departmentIds: undefined,
    });
  });

  it('passes parsed filter IDs to query', async () => {
    mockGetEmployees.mockResolvedValue(EMPLOYEE_FIXTURES.slice(0, 1));

    const res = await request(app).get('/api/v1/employees?roles=1&countries=1,2&departments=3');

    expect(res.status).toBe(200);
    expect(mockGetEmployees).toHaveBeenCalledWith({
      roleIds: [1],
      countryIds: [1, 2],
      departmentIds: [3],
    });
  });

  it('ignores invalid filter values', async () => {
    mockGetEmployees.mockResolvedValue(EMPLOYEE_FIXTURES);

    await request(app).get('/api/v1/employees?roles=abc&countries=');

    expect(mockGetEmployees).toHaveBeenCalledWith({
      roleIds: undefined,
      countryIds: undefined,
      departmentIds: undefined,
    });
  });

  it('returns 500 when query fails', async () => {
    mockGetEmployees.mockRejectedValue(new Error('DB down'));

    const res = await request(app).get('/api/v1/employees');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Internal server error' });
  });
});

describe('GET /api/v1/filters', () => {
  it('returns all filter options', async () => {
    mockGetFilterOptions.mockResolvedValue(FILTER_FIXTURES);

    const res = await request(app).get('/api/v1/filters');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(FILTER_FIXTURES);
  });

  it('returns 500 when query fails', async () => {
    mockGetFilterOptions.mockRejectedValue(new Error('DB down'));

    const res = await request(app).get('/api/v1/filters');

    expect(res.status).toBe(500);
    expect(res.body).toEqual({ error: 'Internal server error' });
  });
});
