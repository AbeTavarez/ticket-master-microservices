import request from "supertest";
import { app } from "../../app";

it("fails when an email does not exist", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password1$",
    })
    .expect(400);
});

it("fails when an incorrect password is supplied", async () => {
  // creates a new account
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password1$",
    })
    .expect(201);

  // now it tries to sign in with wrong password
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "test@test.com",
      password: "password1",
    })
    .expect(400);
});

// it("sign in and responds with a cookie", async () => {
//   // creates a new account
//   const response = await request(app)
//     .post("/api/users/signup")
//     .send({
//       email: "test@test.com",
//       password: "password",
//     })
//     .expect(201);

//     console.log(response.body);
    

//   // now it tries to sign in with wrong password
//   const res =  await request(app)
//     .post("/api/users/signin")
//     .send({
//         email: "test@test.com",
//         password: "password",
//       })
//     .expect(200);

//   expect(res.get("Set-Cookie")).toBeDefined();
// });
