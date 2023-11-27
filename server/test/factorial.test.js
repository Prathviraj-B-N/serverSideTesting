const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Assuming 'server.js' exports the Express app
const expect = chai.expect;

chai.use(chaiHttp);
chai.should();

describe('Factorial Route', () => {
  it('should calculate factorial and return the correct result (p1->p3->p5->p6->p7->p8->p9->p11)', (done) => {
    console.log('Test Path: p1->p3->p5->p6->p7->p8->p9->p11');

    // Path 1: Valid factorial calculation
    chai.request(app)
      .post('/api/factorial')
      .send({
        "userId": "6563120f522e357f2bdea48c",
        "operand1": 5,
        "operator": "!"
      })
      .end((err, res) => {
        console.log('Response:', res.body);
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ result: '120' });
        done();
      });
  });

  it('should handle invalid operator input (p1->p2)', (done) => {
    console.log('Test Path: p1->p2');

    chai.request(app)
      .post('/api/factorial')
      .send({ userId: '6563120f522e357f2bdea48c', operand1: '5', operator: '+' }) // Invalid operator
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  
  it('should handle factorial for negative operand (p1->p3->p4)', (done) => {
    console.log('Test Path: p1->p3->p4');

    chai.request(app)
      .post('/api/factorial')
      .send({ userId: '6563120f522e357f2bdea48c', operand1: '-5', operator: '!' }) // Negative operand
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should handle factorial for zero and return 1 (p1->p3->p5->p6->p7->p8->p9->p11)', (done) => {
    console.log('Test Path: p1->p3->p5->p6->p7->p8->p9->p11');

    
    chai.request(app)
      .post('/api/factorial')
      .send({
        "userId": "6563120f522e357f2bdea48c",
        "operand1": 0,
        "operator": "!"
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ result: '1' });
        done();
      });
  });

  it('should handle factorial for one and return 1 (p1->p3->p5->p6->p7->p8->p9->p11)', (done) => {
    console.log('Test Path: p1->p3->p5->p6->p7->p8->p9->p11');

    
    chai.request(app)
      .post('/api/factorial')
      .send({
        "userId": "6563120f522e357f2bdea48c",
        "operand1": 1,
        "operator": "!"
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ result: '1' });
        done();
      });
  });

  it('should handle factorial for a large number and return the correct result (p1->p3->p5->p6->p7->p8->p9->p11)', (done) => {
    console.log('Test Path: p1->p3->p5->p6->p7->p8->p9->p11');

    // Path 10: Factorial for a large number
    chai.request(app)
      .post('/api/factorial')
      .send({
        "userId": "6563120f522e357f2bdea48c",
        "operand1": 10,
        "operator": "!"
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ result: '3628800' });
        done();
      });
  });

  // Add more test cases to cover additional paths or edge cases
});

