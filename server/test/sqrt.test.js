const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Assuming 'server.js' exports the Express app
const expect = chai.expect;

chai.use(chaiHttp);
chai.should();

describe('Square Root Route', () => {
  it('should calculate square root and return the correct result (p1->p3->p5->p6->p7->p9)', (done) => {
    console.log('Test Path: p1->p3->p5->p6->p7->p9');

    // Path 1: Valid square root calculation
    chai.request(app)
      .post('/api/sqrt')
      .send({
        "userId": "6563120f522e357f2bdea48c",
        "operand1": 25,
        "operator": "sqrt"
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
      
        expect(res.body).to.have.property('result').that.is.closeTo(5, 0.001);
        
        done();
      });
  });

  it('should handle invalid operator input (p1->p2)', (done) => {
    console.log('Test Path: p1->p2');

    chai.request(app)
      .post('/api/sqrt')
      .send({ userId: '6563120f522e357f2bdea48c', operand1: '25', operator: '+' }) // Invalid operator
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should handle negative operand input (p1->p3->p4)', (done) => {
    console.log('Test Path: p1->p3->p4');

    chai.request(app)
      .post('/api/sqrt')
      .send({ userId: '6563120f522e357f2bdea48c', operand1: '-25', operator: 'sqrt' }) // Negative operand
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should handle square root for zero and return 0 (p1->p3->p5->p6->p7->p9)', (done) => {
    console.log('Test Path: p1->p3->p5->p6->p7->p9');

    chai.request(app)
      .post('/api/sqrt')
      .send({
        "userId": "6563120f522e357f2bdea48c",
        "operand1": 0,
        "operator": "sqrt"
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('result').that.is.closeTo(0, 0.001); // Close enough to 0
        done();
      });
  });
 


  

  it('should handle square root for a large positive number (p1->p3->p5->p6->p7->p9)', (done) => {
    console.log('Test Path: p1->p3->p5->p6->p7->p9');
  
    chai.request(app)
      .post('/api/sqrt')
      .send({
        "userId": "6563120f522e357f2bdea48c",
        "operand1": 1000000,
        "operator": "sqrt"
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.result).to.be.a('number').closeTo(1000, 0.001); // Close enough to 1000
        done();
      });
  });
  it('should handle square root for a decimal number (p1->p3->p5->p6->p7->p9)', (done) => {
    console.log('Test Path: p1->p3->p5->p6->p7->p9');
  
    chai.request(app)
      .post('/api/sqrt')
      .send({
        "userId": "6563120f522e357f2bdea48c",
        "operand1": 9.25,
        "operator": "sqrt"
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.result).to.be.a('number').closeTo(3.041, 0.001); // Close enough to the square root of 9.25
        done();
      });
  });
  
  });
