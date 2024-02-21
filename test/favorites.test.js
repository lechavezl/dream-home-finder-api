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

describe("GET /favorites", () => {
  it("should return all favorites", async () => {
    const res = await request(app).get("/favorites");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /favorites/:id", () => {
  it("should return a user", async () => {
    const res = await request(app).get("/favorites/65c825087eeca0113225beee");
    expect(res.statusCode).toBe(200);
    expect(res.body.userId).toBe("user123");
  });
});

describe("POST /favorites", () => {
  it("should create a realtor", async () => {
    const res = await request(app).post("/favorites").send({
      userId: "user001",
      propertyId: "property002"
  
    });
    expect(res.statusCode).toBe(401);
    
  });
});