const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Assuming 'server.js' exports the Express app
const expect = chai.expect;

chai.use(chaiHttp);
chai.should();


describe('Division Route', () => {
  it('should perform division and return the correct result (p1->p3->p5->p6->p7->p9)', (done) => {
    console.log('Test Path: p1->p3->p5->p6->p7->p9');

    // Path 1: Valid division calculation
    chai.request(app)
      .post('/api/divide')
      .send({
        "userId": "6563120f522e357f2bdea48c",
        "operand1": 10,
        "operand2": 2,
        "operator": "/"
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ result: '5' });
        done();
      });
  });

  it('should handle division with decimal numbers and return the correct result (p1->p3->p5->p6->p7->p9)', (done) => {
    console.log('Test Path: p1->p3->p5->p6->p7->p9');

    // Path 2: Valid division calculation with decimal numbers
    chai.request(app)
      .post('/api/divide')
      .send({
        "userId": "6563120f522e357f2bdea48c",
        "operand1": 7.5,
        "operand2": 2.5,
        "operator": "/"
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ result: '3' });
        done();
      });
  });

  it('should handle division with zero as the second operand and return the correct result (p1->p3->p4)', (done) => {
    console.log('Test Path: p1->p3->p4');

    // Path 3: Division by zero
    chai.request(app)
      .post('/api/divide')
      .send({
        userId: '6563120f522e357f2bdea48c',
        operand1: 10,
        operand2: 0,
        operator: '/'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error').that.includes('Division by zero');
        done();
      });
  });

  it("should save the calculation to the database", async () => {
    const Calculation = require("../models/Calculation");
    console.log('Test Path: p1->p3->p5->p6->p7');

    const calculationData = {
      userId: "6563120f522e357f2bdea48c",
      operand1: 8,
      operand2: 2,
      operator: "/",
      result: 4,
    };

    // path 2: Verify that the data was saved by checking the database
    chai
      .request(app)
      .post("/api/division")
      .send(calculationData)
      .end(async (err, res) => {
        try {
          res.should.have.status(200); 

          const savedCalculation = await Calculation.findOne({
            userId: calculationData.userId,
          });
          chai.expect(savedCalculation).to.exist;
          chai
            .expect(savedCalculation.operand1)
            .to.equal(calculationData.operand1);
          chai
            .expect(savedCalculation.operand2)
            .to.equal(calculationData.operand2);
          chai
            .expect(savedCalculation.operator)
            .to.equal(calculationData.operator);
          chai.expect(savedCalculation.result).to.equal(calculationData.result);

          // Call done() to signal the completion of the asynchronous test
          done();
        } catch (error) {
          done(error); // Pass any errors to done() to signal a failed test
        }
      });
  });
  it('should handle division with negative numbers and return the correct result (p1->p3->p5->p6->p7->p9)', (done) => {
    console.log('Test Path: p1->p3->p5->p6->p7->p9');

    // Path 5: Division with negative numbers
    chai.request(app)
      .post('/api/divide')
      .send({
        userId: '6563120f522e357f2bdea48c',
        operand1: -6,
        operand2: 2,
        operator: '/'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ result: '-3' });
        done();
      });
  });
  it('should handle invalid input and return an error (p1->p2)', (done) => {
    console.log('Test Path: p1->p2');

    // Path 6: Invalid request, missing operands
    chai.request(app)
      .post('/api/divide')
      .send({
        "userId": "6563120f522e357f2bdea48c",
        "operator": "/"
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error').that.includes('Invalid request');
        done();
      });
  });

  it('should handle valid input and return the correct result with floating-point precision (p1->p3->p5->p6->p7->p9)', (done) => {
    console.log('Test Path: p1->p3->p5->p6->p7->p9');

    // Path 7: Valid division calculation with floating-point precision
    chai.request(app)
      .post('/api/divide')
      .send({
        "userId": "6563120f522e357f2bdea48c",
        "operand1": 1,
        "operand2": 3,
        "operator": "/"
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ result: '0.3333333333333333' });
        done();
      });
  });
});
