const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../server");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
});

/* Closing database connection after each test. */
afterEach(async () => {
  await mongoose.connection.close();
});

describe("GET /Properties", () => {
  it("should return all properties", async () => {
    const res = await request(app).get("/properties");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /properties/:id", () => {
    it("should return a property", async () => {
      const res = await request(app).get("/properties/65c3e8948f25d3cdae5184f2");
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe("available");
    });
  });
  