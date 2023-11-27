const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server"); // Assuming 'server.js' exports the Express app
const expect = chai.expect;
const mongoose = require("mongoose");

chai.use(chaiHttp);
chai.should();

const dotenv = require('dotenv');
dotenv.config();

before(async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb+srv://tester:" +
    process.env.DB_PASS +
    "@cluster0.qyr7kyl.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
});

describe("Addition Route", () => {
  
  it('should handle missing userId', (done) => {
    const invalidData = {
      operand1: 8,
      operand2: 12,
      operator: '+'
    };
  
    chai.request(app)
      .post('/api/add')
      .send(invalidData)
      .end((err, res) => {
        res.should.have.status(400); 
        done();
      });
  });
  

  it("should perform addition and return the correct result", (done) => {
    // Path 1: Valid addition calculation
    chai
      .request(app)
      .post("/api/add")
      .send({
        userId: "6563120f522e357f2bdea48c",
        operand1: 10,
        operand2: 2,
        operator: "+",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ result: "12" });
        done();
      });
  });

  it("should save the calculation to the database", async () => {
    const Calculation = require("../models/Calculation");

    const calculationData = {
      userId: "6563120f522e357f2bdea48c",
      operand1: 5,
      operand2: 10,
      operator: "+",
      result: 15,
    };

    // path 2: Verify that the data was saved by checking the database
    chai
      .request(app)
      .post("/api/add")
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
  
  it("should handle invalid operator input", (done) => {
    chai
      .request(app)
      .post("/api/add")
      .send({ userId: "6563120f522e357f2bdea48c", operand1: "5", operand2: "10", operator: "-" }) // Invalid operator
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property("error");
        done();
      });
  });

  // Add more test cases to cover additional paths or edge cases
});
