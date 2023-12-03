import request from "supertest";
import { app } from "../../app";

it("returns a 201 status code on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password1$",
    })
    .expect(201);
});

it("returns a 400 status code with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "invalidemail.com",
      password: "password1$",
    })
    .expect(400);
});

it("returns a 400 status code with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "pas",
    })
    .expect(400);
});

it("returns a 400 status code with missing email and password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com" })
    .expect(400);

  await request(app)
    .post("/api/users/signup")
    .send({ password: "pas" })
    .expect(400);
});

it("disallows duplicate email", async () => {
  // creates a new user
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password1$",
    })
    .expect(201);
  // tries to create another user with the same email
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password1$",
    })
    .expect(400);
});


it('sets a cookie after successful signup', async () => {
    const res = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password1$",
    })
    .expect(201);

    // checks if Set-Cookie header is defined
    expect(res.get('Set-Cookie')).toBeDefined();

})