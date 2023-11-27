const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Assuming 'server.js' exports the Express app
const expect = chai.expect;

chai.use(chaiHttp);
chai.should();

describe('Multiplication Route', () => {
  it('should perform multiplication and return the correct result (p1->p3->p5->p6->p7->p8->p10)', (done) => {
    console.log('Test Path: p1->p3->p5->p6->p7->p8->p10');

    // Path 1: Valid multiplication calculation
    chai.request(app)
      .post('/api/multiply')
      .send({
        "userId": "6563120f522e357f2bdea48c",
        "operand1": 5,
        "operand2": 2,
        "operator": "*"
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ result: '10' });
        done();
      });
  });

  it('should handle missing input and return an error (p1->p2)', (done) => {
    console.log('Test Path: p1->p2');

    // Path 2: Invalid request, missing operands
    chai.request(app)
      .post('/api/multiply')
      .send({
        "userId": "6563120f522e357f2bdea48c",
        "operator": "*"
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error').that.includes('Invalid request');
        done();
      });
  });

  it("should save the calculation to the database", async () => {
    const Calculation = require("../models/Calculation");
    console.log('Test Path: p1->p3->p5->p6->p7->p8');

    const calculationData = {
      userId: "6563120f522e357f2bdea48c",
      operand1: 8,
      operand2: 2,
      operator: "*",
      result: 16,
    };

    // path 2: Verify that the data was saved by checking the database
    chai
      .request(app)
      .post("/api/multiply")
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

  

  it('should handle invalid input and return an error (p1->p3->p4)', (done) => {
    console.log('Test Path: p1->p3->p4');

    // Path 4: Invalid numbers for multiplication
    chai.request(app)
      .post('/api/multiply')
      .send({
        userId: '6563120f522e357f2bdea48c',
        operand1: 'abc',
        operand2: 2,
        operator: '*'
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error').that.includes('Please provide valid numbers');
        done();
      });
  });

 
  it('should handle negative valid input and return the correct result (p1->p3->p5->p6->p7->p10)', (done) => {
    console.log('Test Path: p1->p3->p5->p6->p7->p10');

    // Path 10: Valid multiplication calculation with negative numbers
    chai.request(app)
      .post('/api/multiply')
      .send({
        userId: '6563120f522e357f2bdea48c',
        operand1: -4,
        operand2: 3,
        operator: '*'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ result: '-12' });
        done();
      });
  });
  it('should handle multiplication with zero and return zero (p1->p3->p5->p6->p7->p10)', (done) => {
    console.log('Test Path: p1->p3->p5->p6->p7->p10');

    // Path : Multiplication with zero
    chai.request(app)
      .post('/api/multiply')
      .send({
        "userId": "6563120f522e357f2bdea48c",
        "operand1": 0,
        "operand2": 5,
        "operator": "*"
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ result: '0' });
        done();
      });
  });

  it('should handle multiplication with one operand as zero and return zero (p1->p3->p5->p6->p7->p8->p10)', (done) => {
    console.log('Test Path: p1->p3->p5->p6->p7->p8->p10');

    // Path 15: Multiplication with one operand as zero
    chai.request(app)
      .post('/api/multiply')
      .send({
        "userId": "6563120f522e357f2bdea48c",
        "operand1": 5,
        "operand2": 0,
        "operator": "*"
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ result: '0' });
        done();
      });
  });

  it('should handle multiplication with large numbers and return the correct result (p1->p3->p5->p6->p7->p8->p10)', (done) => {
    console.log('Test Path: p1->p3->p5->p6->p7->p8->p10');

    // Path 16: Multiplication with large numbers
    chai.request(app)
      .post('/api/multiply')
      .send({
        "userId": "6563120f522e357f2bdea48c",
        "operand1": 1000,
        "operand2": 10000,
        "operator": "*"
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ result: '10000000' });
        done();
      });
  });

  it('should handle multiplication with large numbers and return the correct result (p1->p3->p5->p6->p7->p10)', (done) => {
    console.log('Test Path: p1->p3->p5->p6->p7->p8->p10');

    // Path 16: Multiplication with large numbers
    chai.request(app)
      .post('/api/multiply')
      .send({
        "userId": "6563120f522e357f2bdea48c",
        "operand1": 1000,
        "operand2": 10000,
        "operator": "*"
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ result: '10000000' });
        done();
      });
  });

  // Add more test cases to cover additional paths or edge cases
});
