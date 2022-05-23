import chai from "chai";
import chaiHttp from "chai-http";
import "mocha";

chai.use(chaiHttp);
const expect = chai.expect;
const should = chai.should();
const baseUrl = "/api/v1";
const server = "localhost:2900";
const tokenInvalido =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTAwMjQ1MzgsImV4cCI6MTY1MDAyNTQzOCwic3ViIjoiMDAwZDFlMTQtNjE3ZS00MjNlLThhMWEtZjYzZDRmYTVhZjZhIn0.b0U-__cRpH8YBsAtZEtClr0fAj4t9IOwDAcI2R3j-qk";
const idMarca = "d9017634-c824-423d-96a3-6da7f162917a";
let token = "";

describe("Teste registar treinadores numa marca:", () => {
  beforeEach((done) => {
    chai
      .request(server)
      .post("/auth/login")
      .send({
        email: "admin@admin.com",
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
        .post("/admin/marca/" + idMarca + "/treinadores/")
        .send({
          email: "treinador10@treinador.pt",
          nome: "treinador Berto",
          password: "treinador",
          dataNasc: "1999-04-09",
          dataEntrada: "2022-03-24",
          genero: 0,
        })

        .then((res) => {
          res.should.have.status(401);
          chai.expect(res.body).to.be.an("object");
        });
    });
  });
  describe("-Registar aluno corretamente", () => {
    it("Deve retornar aluno criado", () => {
      return chai
        .request(server)
        .post("/admin/marca/" + idMarca + "/treinadores/")
        .set("Authorization", token)

        .send({
          email: "treinador10@treinador.pt",
          nome: "treinador Berto",
          password: "treinador",
          dataNasc: "1999-04-09",
          dataEntrada: "2022-03-24",
          genero: 0,
        })

        .then((res) => {
          res.should.have.status(200);

          chai.expect(res.body).to.be.an("object");

          //verificar se é um objeto
          //verificar se as propriedades todas existem

          chai.expect(res.body).to.have.property("uid");
          chai.expect(res.body).to.have.property("email");
          chai.expect(res.body).to.have.property("nome");
          chai.expect(res.body).to.have.property("password");
          chai.expect(res.body).to.have.property("data_nasc");
          chai.expect(res.body).to.have.property("hashtag");
          chai.expect(res.body).to.have.property("data_entrada");
          chai.expect(res.body).to.have.property("funcao_id");
          chai.expect(res.body).to.have.property("refresh_token");
          chai.expect(res.body).to.have.property("genero");
          chai.expect(res.body).to.have.property("pontos");
          chai.expect(res.body).to.have.property("descricao");
          chai.expect(res.body).to.have.property("isDeleted");
          chai.expect(res.body).to.have.property("imagem_url");

          chai.expect(res.body["uid"]).to.be.a("string");
          chai.expect(res.body["email"]).to.be.a("string");
          chai.expect(res.body["nome"]).to.be.a("string");
          chai.expect(res.body["password"]).to.be.a("string");
          chai.expect(res.body["data_nasc"]).to.be.a("string");
          chai.expect(res.body["hashtag"]).to.be.a("string");
          chai.expect(res.body["data_entrada"]).to.be.a("string");
          chai.expect(res.body["funcao_id"]).to.be.a("string");
          chai.expect(res.body["genero"]).to.be.a("number");
          chai.expect(res.body["pontos"]).to.be.a("number");

          if (res.body["isDeleted"] != null) {
            chai.expect(res.body["isDeleted"]).to.be.a("boolean");
          }

          if (res.body["refresh_token"] != null) {
            chai.expect(res.body["refresh_token"]).to.be.a("string");
          }

          if (res.body["descricao"] != null) {
            chai.expect(res.body["descricao"]).to.be.a("string");
          }

          if (res.body["imagem_url"] != null) {
            chai.expect(res.body["imagem_url"]).to.be.a("string");
          }
        });
    });
  });
});
