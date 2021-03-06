import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1";
const server = "localhost:2900";
const idPost = "60b07b4b-bc6b-4b6d-9e12-9170f1419818";
const idComentario = "3ce12b73-3d44-47f0-84a8-a39a2d28d8bb";
const tokenInvalido =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk";

let token = "";

describe("Teste criar gosto comentario post", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post("/auth/login")
      .send({
        email: "admin2@admin.com",
        password: "admin",
      })
      .end((err, res) => {
        token = `Bearer ${res.body.token}`;
        res.should.have.status(200);
        done();
      });
  });

  describe("- Sem token", () => {
    it("Deve retornar erro de authToken invalido", () => {
      return chai
        .request(server)
        .post("/posts/" + idPost + "/comentario/" + idComentario + "/gosto")
        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Token invalido", () => {
    it("Deve retornar erro de authToken invalido", () => {
      return chai
        .request(server)
        .post("/posts/" + idPost + "/comentario/" + idComentario + "/gosto")
        .set("Authorization", tokenInvalido)
        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });

  describe("- Criar gosto comentario post", () => {
    it("Deve retornar criar gosto comentario post com sucesso", () => {
      return chai
        .request(server)
        .post("/posts/" + idPost + "/comentario/" + idComentario + "/gosto")
        .set("Authorization", token)
        .then((res) => {
          res.should.have.status(200);

          // verificar se ?? um object
          chai.expect(res.body).to.be.an("object");

          //verificar se as propriedades todas existem
          chai.expect(res.body).to.have.property("gosto_id");
          chai.expect(res.body).to.have.property("criador_id");
          chai.expect(res.body).to.have.property("comentario_id");

          //verificar tipos das propriedades

          chai.expect(res.body["gosto_id"]).to.be.a("string");
          chai.expect(res.body["criador_id"]).to.be.a("string");
          chai.expect(res.body["comentario_id"]).to.be.a("string");
        });
    });
  });
});
