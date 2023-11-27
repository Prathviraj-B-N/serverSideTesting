const chai =  require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');

chai.use(chaiHttp);
chai.should();

describe("Health check", () => {
    describe("GET /", () => {
        it("should run main api", (done) => {
            chai.request(app)
                .get('/api/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    chai.expect(res.body).to.deep.equal({ txt: 'Hello World!' });
                    done();
                 });
        });
    })
})