import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import prisma from '../db.js';

describe('Database', () => {
  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    // Clean up
    await prisma.session.deleteMany();
    await prisma.$disconnect();
  });

  it('should be able to create and retrieve a session', async () => {
    const session = await prisma.session.create({
      data: {
        state: 1,
      },
    });

    expect(session).toHaveProperty('id');
    expect(session.state).toBe(1);

    const retrieved = await prisma.session.findUnique({
      where: { id: session.id },
    });

    expect(retrieved).not.toBeNull();
    expect(retrieved?.id).toBe(session.id);
  });
});
