const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server'); // Assuming 'server.js' exports the Express app
const expect = chai.expect;

chai.use(chaiHttp);
chai.should();

describe('Addition Route', () => {
  it('should perform addition and return the correct result', (done) => {
    // Path 1: Valid addition calculation
    chai.request(app)
      .post('/api/add')
      .send({
        "userId": "6563120f522e357f2bdea48c",
        "operand1": 10,
        "operand2": 2,
        "operator": "+"
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.deep.equal({ result: '12' });
        done();
      });
  });

//   it('should save the calculation to the database', (done) => {
//     // Path 2: Save calculation to the database
//     chai.request(app)
//       .post('/api/add')
//       .send({
//         "userId": "1234567890",
//         "operand1": 10,
//         "operand2": 2,
//         "operator": "+"
//       })
//       .end((err, res) => {
//         // Validate database interaction here (if applicable)
//         // For example, check if the calculation was saved to the database
//         done();
//       });
//   });
it('should handle invalid operator input', (done) => {
    chai.request(app)
      .post('/api/add')
      .send({ userId: '123', operand1: '5', operand2: '10', operator: '-' }) // Invalid operator
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
  

  // Add more test cases to cover additional paths or edge cases
});
