import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../app.js';

describe('App', () => {
  it('should be initialized', () => {
    expect(app).not.toBeNull();
  });

  it('should return 200 for the root route', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Computer Says No Engine API');
  });
});
