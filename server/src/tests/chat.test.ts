import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../app.js';
import prisma from '../db.js';

describe('POST /api/chat', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.session.deleteMany();
    await prisma.$disconnect();
  });

  it('should create a new session and return the first state response', async () => {
    const response = await request(app)
      .post('/api/chat')
      .send({ message: 'Hello' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('sessionId');
    expect(response.body.response).toContain('Computer says no');
  });

  it('should advance the state on subsequent requests', async () => {
    // First request to establish a session
    const firstResponse = await request(app)
      .post('/api/chat')
      .send({ message: 'Hello again' });

    const sessionId = firstResponse.body.sessionId;

    // Second request
    const secondResponse = await request(app)
      .post('/api/chat')
      .send({ sessionId, message: 'Are you sure?' });

    expect(secondResponse.status).toBe(200);
    expect(secondResponse.body.sessionId).toBe(sessionId);
    expect(secondResponse.body.response).toContain("Rigggggghtt, I'm checking... it says no");
  });
});
