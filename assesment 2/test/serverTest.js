let chai = require('chai');
let expect = chai.expect;
let request = require('request');
let chaiHttp = require('chai-http');
let app = require('../server');
chai.use(chaiHttp);

// 200 Ok Testing

describe("Test ping API - /api/ping", () => {
	it("Return status 200", (done) => {
		chai
			.request(app)
			.get('/api/ping')
			.end((err, res) => {
				expect(res.status).to.equal(200)
				done();
			});
	});
});

describe("Test post API with tags parameter - /api/posts?tags=history,tech&sortBy=likes&direction=desc", () => {
	it("Return status: 200", (done) => {
		chai
			.request(app)
			.get('/api/posts?tags=history,tech&sortBy=likes&direction=desc')
			.end((err, res) => {
				expect(res.status).to.equal(200);
				expect(res.body.posts.length).to.not.equal(0);
				done();
			});
	});
});

// 400 Not found testing with different routes

describe("Test post API without tags parameter - /api/posts", () => {
	it("error : Tags parameter is required", (done) => {
		chai
			.request(app)
			.get('/api/posts')
			.end((err, res) => {
				expect(res.status).to.equal(400);
				expect(res.body.error).to.equal("Tags parameter is required");

				done();
			});
	});
});

describe("Test post API with empty tags parameter - /api/posts?tags=&sortBy=popularity&direction=desc", () => {
	it("error: Tags parameter is required", (done) => {
		chai
			.request(app)
			.get('/api/posts?tags=&sortBy=popularity&direction=desc')
			.end((err, res) => {
				expect(res.status).to.equal(400);
				expect(res.body.error).to.equal("Tags parameter is required");

				done();
			});
	});
});


describe("Test post API with empty sortBy parameter - api/posts?tags=history,tech&sortBy=&direction=desc", () => {
	it("sortBy parameter is invalid", (done) => {
		chai
			.request(app)
			.get('/api/posts?tags=history,tech&sortBy=&direction=desc')
			.end((err, res) => {
				expect(res.status).to.equal(400);
				expect(res.body.error).to.equal("sortBy parameter is invalid");
				done();
			});
	});
});

describe("Test post API with incorrect direction parameter - api/posts?tags=history,tech&sortBy=liked&direction=des", () => {
	it("sortBy parameter is invalid", (done) => {
		chai
			.request(app)
			.get('/api/posts?tags=history,tech&sortBy=&direction=des')
			.end((err, res) => {
				expect(res.status).to.equal(400);
				expect(res.body.error).to.equal("sortBy parameter is invalid");
				done();
			});
	});
});

describe("Test post API with incorrect sortBy parameter - api/posts?tags=history,tech&sortBy=bath&direction=desc", () => {
	it("sortBy parameter is invalid", (done) => {
		chai
			.request(app)
			.get('/api/posts?tags=history,tech&sortBy=&direction=des')
			.end((err, res) => {
				expect(res.status).to.equal(400);
				expect(res.body.error).to.equal("sortBy parameter is invalid");
				done();
			});
	});
});


