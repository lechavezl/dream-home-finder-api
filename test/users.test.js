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

describe("GET /Users", () => {
  it("should return all users", async () => {
    const res = await request(app).get("/users");
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});

describe("GET /users/:id", () => {
  it("should return a user", async () => {
    const res = await request(app).get("/users/65c823ed7eeca0113225bee8");
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Michael");
  });
});

describe("POST /users", () => {
  it("should create a user", async () => {
    const res = await request(app).post("/users").send({
      name: "Pepito",
      lastname: "Perez",
 
      email: "realtor@gmail.com"
  
    });
    expect(res.statusCode).toBe(401);
    
  });
});