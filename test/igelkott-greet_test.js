var assert = require('chai').assert,
Stream = require('stream'),

Igelkott = require('igelkott'),
Greet = require('../igelkott-greet.js').Plugin;


describe('Greet', function() {

  var igelkott,
  config,
  s;

  beforeEach(function () {
    s = new Stream.PassThrough({objectMode: true});

    config = {
      core:['privmsg'],
      plugins: {},
      'adapter': s, 'connect': function() { this.server.emit('connect'); }
    };

    igelkott = new Igelkott(config);
  });

  it('Should respond with googles title, i.e. Google', function(done) {
    this.timeout(5000); // DB queries are slow

    igelkott.plugin.load('greet', {}, Greet);

    s.on('data', function(data) {
      if(data == "PRIVMSG ##botbotbot :hello dsmith\r\n")
      {
        done();
      }
    });

    igelkott.connect();
    s.write(":dsmith!~dsmith@unaffiliated/dsmith JOIN ##botbotbot\r\n");
  });
});
