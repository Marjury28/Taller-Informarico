import request from "supertest";
import app from "../app.js";

describe("GET /health", () => {
  it("responde 200 con ok:true", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});
