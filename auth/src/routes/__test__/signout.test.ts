import request from "supertest";
import { app } from "../../app";

it("clears the cookie after signin out", async () => {
  // creates a new account
  request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  // now it tries to sign in with wrong password
  const res = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200);

  expect(res.get("Set-Cookie")).toBeDefined();
  expect(res.get("Set-Cookie")[0]).toEqual(
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly",
  );
});
