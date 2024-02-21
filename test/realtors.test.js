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

describe("GET /Realtors", () => {
  it("should return all realtors", async () => {
    const res = await request(app).get("/realtors");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /realtors/:id", () => {
  it("should return a user", async () => {
    const res = await request(app).get("/realtors/65c826067eeca0113225bef4");
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Luis");
  });
});

describe("POST /realtors", () => {
  it("should create a realtor", async () => {
    const res = await request(app).post("/realtors").send({
      name: "Peter",
      lastname: "Parker",
      email: "realtor@test.com"
  
    });
    expect(res.statusCode).toBe(401);
    
  });
});