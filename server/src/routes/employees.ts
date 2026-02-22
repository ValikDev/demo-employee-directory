import { Router } from 'express';
import { getEmployees, getFilterOptions } from '../queries.js';

const router = Router();

function parseIds(param: unknown): number[] | undefined {
  if (typeof param !== 'string' || !param) {
    return;
  }

  const ids = param.split(',').map(Number).filter((n) => !Number.isNaN(n));

  return ids.length ? ids : undefined;
}

router.get('/api/v1/employees', async (req, res) => {
  try {
    const data = await getEmployees({
      roleIds: parseIds(req.query.roles),
      countryIds: parseIds(req.query.countries),
      departmentIds: parseIds(req.query.departments),
    });

    res.json(data);
  } catch (err) {
    console.error('Failed to fetch employees:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/api/v1/filters', async (_req, res) => {
  try {
    const data = await getFilterOptions();

    res.json(data);
  } catch (err) {
    console.error('Failed to fetch filters:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
