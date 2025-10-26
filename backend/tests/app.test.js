const request = require('supertest');
const express = require('express');

// Simple mock of your Express app
// Replace this with: const app = require('../app');
const app = express();
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

describe('Backend API', () => {
  test('GET /health should return status ok', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('ok');
  });


});