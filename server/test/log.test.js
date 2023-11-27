const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Assuming 'server.js' exports the Express app
const expect = chai.expect;

chai.use(chaiHttp);
chai.should();

describe('Log Route', () => {
  it('should calculate log base 2 and return the correct result (p1->p3->p5->p6->p7->p9)', (done) => {
    console.log('p1->p3->p5->p6->p7->p9')
    // Path 1: Valid log base 2 calculation
    chai.request(app)
      .post('/api/log')
      .send({
        "userId": "6563120f522e357f2bdea48c",
        "operand1": 8,
        "operator": "log2"
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('result').that.is.closeTo(3, 0.001); // Close enough to log base 2 of 8
        done();
      });
  });

  it('should handle invalid operator input (p1->p2)', (done) => {
    console.log('p1->p2')
    chai.request(app)
      .post('/api/log')
      .send({ userId: '6563120f522e357f2bdea48c', operand1: '8', operator: '+' }) // Invalid operator
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should handle invalid operand input (p1->p3->p4)', (done) => {
    console.log('p1->p3->p4')
    chai.request(app)
      .post('/api/log')
      .send({ userId: '6563120f522e357f2bdea48c', operand1: '-8', operator: 'log2' }) // Invalid operand
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should handle log base 2 for operand equal to 1 (p1->p3->p5->p6->p7->p9)', (done) => {
    // console.log('Test Path: p1->p2');
    console.log('p1->p3->p5->p6->p7->p9')
    
    chai.request(app)
      .post('/api/log')
      .send({ userId: '6563120f522e357f2bdea48c', operand1: '1', operator: 'log2' }) // Log base 2 for operand equal to 1
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('result').that.is.closeTo(0, 0.001); // Close enough to log base 2 of 1
        done();
      });
  });

 

it('should handle log base 2 for operand between 0 and 1 (p1->p3->p5->p6->p7->p9)', (done) => {
    console.log('p1->p3->p5->p6->p7->p9')
    
    chai.request(app)
      .post('/api/log')
      .send({ userId: '6563120f522e357f2bdea48c', operand1: '0.5', operator: 'log2' }) // Log base 2 for operand between 0 and 1
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('result').that.is.closeTo(-1, 0.001); // Close enough to log base 2 of 0.5
        done();
      });
  });
  
  it('should handle log base 2 for large operand (p1->p3->p5->p6->p7->p9)', (done) => {
    console.log('p1->p3->p5->p6->p7->p9')
    
    chai.request(app)
      .post('/api/log')
      .send({ userId: '6563120f522e357f2bdea48c', operand1: '1024', operator: 'log2' }) // Log base 2 for a large operand
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('result').that.is.closeTo(10, 0.001); // Close enough to log base 2 of 1024
        done();
      });
  });
  
  it('should handle log base 2 for decimal operand (p1->p3->p5->p6->p7->p9)', (done) => {
    console.log('p1->p3->p5->p6->p7->p9')
    
    chai.request(app)
      .post('/api/log')
      .send({ userId: '6563120f522e357f2bdea48c', operand1: '3.5', operator: 'log2' }) // Log base 2 for a decimal operand
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('result').that.is.closeTo(1.807, 0.001); // Close enough to log base 2 of 3.5
        done();
      });
  });
  
 });
