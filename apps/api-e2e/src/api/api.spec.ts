import axios from 'axios';

describe('GET /api', () => {
  it('should return a 404 code', async () => {
    try {
      const res = await axios.get(`/api`);

      expect(res.status).toBe(404);
    } catch (e) {
      expect(e.response.status).toBe(404);
    }
  });
});
