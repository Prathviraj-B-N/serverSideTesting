const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Assuming 'server.js' exports the Express app
const expect = chai.expect;

chai.use(chaiHttp);
chai.should();

describe('Subtraction Route', () => {
  it('should perform subtraction and return the correct result (p1->p3->p5->p6->p7->p9)', (done) => {
    console.log('Test Path: p1->p3->p5->p6->p7->p9');

    // Path 1: Valid subtraction calculation
    chai.request(app)
      .post('/api/subtract')
      .send({
        "userId": "6563120f522e357f2bdea48c",
        "operand1": 10,
        "operand2": 2,
        "operator": "-"
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ result: '8' });
        done();
      });
  });

  it('should handle invalid input and return a 400 status code (p1->p2)', (done) => {
    console.log('Test Path: p1->p2');

    // Path 2: Invalid input (e.g., non-numeric operand)
    chai.request(app)
      .post('/api/subtract')
      .send({
        userId: '123',
        operand1: 'invalid',
        operand2: 10,
        operator: '-'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should handle missing user ID and return a 400 status code (p1->p2)', (done) => {
    console.log('Test Path: p1->p2');

    // Path 3: Missing user ID
    chai.request(app)
      .post('/api/subtract')
      .send({
        operand1: 5,
        operand2: 2,
        operator: '-'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should handle missing operands and return a 400 status code (p1->p2)', (done) => {
    console.log('Test Path: p1->p2');

    // Path 4: Missing operands
    chai.request(app)
      .post('/api/subtract')
      .send({
        userId: '6563120f522e357f2bdea48c',
        operator: '-'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('should handle invalid operator and return a 400 status code (p1->p2)', (done) => {
    console.log('Test Path: p1->p2');

    // Path 5: Invalid operator
    chai.request(app)
      .post('/api/subtract')
      .send({
        userId: '6563120f522e357f2bdea48c',
        operand1: 8,
        operand2: 2,
        operator: '+'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('should handle valid input and save the calculation to the database (p1->p3->p5->p6->p7)', (done) => {
    console.log('Test Path: p1->p3->p5->p6->p7');

    // Path 6: Valid input and save to the database
    chai.request(app)
      .post('/api/subtract')
      .send({
        userId: '6563120f522e357f2bdea48c',
        operand1: 8,
        operand2: 3,
        operator: '-'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        // Add additional validation logic based on your database interactions
        done();
      });
  });

  it('should handle NaN operands and return a 400 status code (p1->p2->p3->p4)', (done) => {
    console.log('Test Path: p1->p3->p4');

    // Path 7: NaN operands
    chai.request(app)
      .post('/api/subtract')
      .send({
        userId: '6563120f522e357f2bdea48c',
        operand1: 'invalid',
        operand2: 10,
        operator: '-'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('should handle subtraction with zero and return the correct result (p1->p3->p5->p6->p7->p9)', (done) => {
    console.log('Test Path: p1->p3->p5->p6->p7->p9');

    // Path 8: Subtraction with zero
    chai.request(app)
      .post('/api/subtract')
      .send({
        userId: '6563120f522e357f2bdea48c',
        operand1: 5,
        operand2: 0,
        operator: '-'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ result: '5' });
        done();
      });
  });

  it('should handle subtraction with negative numbers and return the correct result (p1->p3->p5->p6->p7->p9)', (done) => {
    console.log('Test Path: p1->p3->p5->p6->p7->p9');

    // Path 9: Subtraction and getting negative numbers
    chai.request(app)
      .post('/api/subtract')
      .send({
        userId: '6563120f522e357f2bdea48c',
        operand1: 5,
        operand2: 8,
        operator: '-'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ result: '-3' });
        done();
      });
  });

  it('should handle subtraction with large negative numbers and return the correct result (p1->p3->p5->p6->p7->p9)', (done) => {
    console.log('Test Path: p1->p3->p5->p6->p7->p9');

    // Path 10: Subtraction with large negative numbers
    chai.request(app)
      .post('/api/subtract')
      .send({
        userId: '6563120f522e357f2bdea48c',
        operand1: -1000000000,
        operand2: -999999999,
        operator: '-'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ result: '-1' });
        done();
      });
  });
  it('should handle subtraction with operands as negative numbers and return the correct result (p1->p3->p5->p6->p7->p9)', (done) => {
    console.log('Test Path: p1->p3->p5->p6->p7->p9');

    // Path 11: Subtraction with operands as negative numbers
    chai.request(app)
      .post('/api/subtract')
      .send({
        userId: '6563120f522e357f2bdea48c',
        operand1: -5,
        operand2: -3,
        operator: '-'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ result: '-2' });
        done();
      });
  });
 

  // Add more test cases to cover additional paths or edge cases
});
