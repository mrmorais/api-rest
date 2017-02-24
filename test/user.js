process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../lib/index');
let should = chai.should();

chai.use(chaiHttp);

describe('Users', ()=>{
	it('should add a new user', (done)=>{
		chai.request(server)
		.put('/user')
		.send({first_name: 'Maradona', last_name: 'Morais', age: 19})
		.end((error, res)=>{
			res.should.have.status(200);
			res.body.data.first_name.should.equal('Maradona');
			res.body.data.last_name.should.equal('Morais');
			res.body.data.age.should.equal(19);
			res.body.status.should.equal('success');
			done();
		});
	});
	
	it('should not allow a empty field', (done)=>{
		chai.request(server)
		.put('/user')
		.send({})
		.end((error, res)=>{
			res.should.have.status(400);
			res.body.status.should.equal('fail');
			done();
		});
		
	});

	it('must return ok', (done)=>{
		chai.request(server)
		.get('/user')
		.end((error, res)=>{
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('object');
			res.body.ok.should.equal('ok');
			done();
		});
	});
});
