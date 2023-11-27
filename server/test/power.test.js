const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Assuming 'server.js' exports the Express app
const expect = chai.expect;

chai.use(chaiHttp);
chai.should();

describe('Power Route', () => {
  it('should calculate power and return the correct result (p1->p3->p5->p6->p7->p9)', (done) => {
    console.log('Test Path: p1->p3->p5->p6->p7->p9');
    // Path 1: Valid power calculation
    chai.request(app)
      .post('/api/power')
      .send({
        "userId": "6563120f522e357f2bdea48c",
        "operand1": 2,
        "operand2": 3,
        "operator": "^"
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        // expect(res.body).to.deep.equal({ result: '8' });
        expect(res.body).to.have.property('result').that.is.closeTo(8,0.001)
        done();
      });
  });

  it('should handle invalid operator input (p1->p2)', (done) => {
    console.log('Test Path: p1->p2');

    chai.request(app)
      .post('/api/power')
      .send({ userId: '6563120f522e357f2bdea48c', operand1: '2', operand2: '3', operator: '+' }) // Invalid operator
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should handle invalid operand input (p1->p3->p4)', (done) => {
    console.log('Test Path: p1->p3->p4');

    
    chai.request(app)
      .post('/api/power')
      .send({ userId: '6563120f522e357f2bdea48c', operand1: 'abc', operand2: '3', operator: '^' }) // Invalid operand
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should handle power with negative exponent and return the correct result (p1->p3->p5->p6->p7->p9)', (done) => {
    console.log('Test Path: p1->p3->p5->p6->p7->p9');
  
    // Path 9: Power with negative exponent
    chai.request(app)
      .post('/api/power')
      .send({
        userId: '6563120f522e357f2bdea48c',
        operand1: 2,
        operand2: -3,
        operator: '^'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        // expect(res.body).to.deep.equal({ result: '0.125' });
        expect(res.body).to.have.property('result').that.is.closeTo(0.125,0.001)
        done();
      });
  });
  
  it('should handle power with zero exponent and return the correct result (p1->p3->p5->p6->p7->p9)', (done) => {
    console.log('Test Path: p1->p3->p5->p6->p7->p9');
  
    // Path 9: Power with zero exponent
    chai.request(app)
      .post('/api/power')
      .send({
        userId: '6563120f522e357f2bdea48c',
        operand1: 5,
        operand2: 0,
        operator: '^'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ result: '1' });
        done();
      });
  });
  
  it('should handle power with decimal exponent and return the correct result (p1->p3->p5->p6->p7->p9)', (done) => {
    console.log('Test Path: p1->p3->p5->p6->p7->p9');
  
    // Path 9: Power with decimal exponent
    chai.request(app)
      .post('/api/power')
      .send({
        userId: '6563120f522e357f2bdea48c',
        operand1: 3,
        operand2: 0.5,
        operator: '^'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('result').that.is.closeTo(1.732, 0.001); // Close enough to the square root of 3
        done();
      });
  });
  
  
  
});
