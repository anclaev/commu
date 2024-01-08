import axios from 'axios';

describe('GET /api', () => {
  it('should return a 404 code', async () => {
    const res = await axios.get(`/api`).catch((e) => e.response);

    expect(res.status).toBe(404);
  });
});
