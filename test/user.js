process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../lib/index');
let should = chai.should();

chai.use(chaiHttp);

describe('Users', ()=>{

	it('GET /user should return a users array', (done)=>{
		chai.request(server)
		.get('/user')
		.end((error, res)=>{
			res.should.have.status(200);
			res.body.status.should.equal('success');
			res.body.data.should.be.a('array');
			done();
		});
	});

	it('GET /user/:id should return a user', (done)=>{
		chai.request(server)
		.get('/user/58b07283abee6f412783caf6')
		.end((error, res)=>{
			res.should.have.status(200);
			res.body.status.should.equal('success');
			res.body.data.should.be.a('object');
			res.body.data.first_name.should.equal('Maradona');
			done();
		});
	});

	it('GET /user/:id?fields= should return a result with fields', (done)=>{
		chai.request(server)
		.get('/user/58b07283abee6f412783caf6?fields=first_name')
		.end((error, res)=>{
			res.should.have.status(200);
			res.body.status.should.equal('success');
			res.body.data.should.be.a('object');
			res.body.data.first_name.should.equal('Maradona');
			chai.expect(res.body.data.last_name).to.be.undefined;
			chai.expect(res.body.data.age).to.be.undefined;
			done();
		});
	});

	describe('New user', ()=>{
		it('PUT /user should add a new user', (done)=>{
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
	
		it('PUT /user should not allow a empty field', (done)=>{
			chai.request(server)
			.put('/user')
			.send({})
			.end((error, res)=>{
				res.should.have.status(400);
				res.body.status.should.equal('fail');
				done();
			});
		
		});
	});
	

	
});
