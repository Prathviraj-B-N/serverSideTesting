
const chai =  require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const expect = chai.expect;

chai.use(chaiHttp);
chai.should();

describe('Server Initialization', () => {
    it('should initialize the server without errors', () => {
      expect(app).to.exist;
      expect(app).to.be.a('function');
    });
});

describe("Health check", () => {
    describe("GET /", () => {
        it("should run main api", (done) => {
            chai.request(app)
                .get('/api/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    expect(res.body).to.deep.equal({ txt: 'Hello World!' });
                    done();
                 });
        });
    })
})