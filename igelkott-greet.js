var Greet = function Greet() {
  this.listeners = {'JOIN': this.greet};

  this.name = 'greet';
  this.help = {
    "default": "This simply greets anyone joining the channel",
  };
};

Greet.prototype.greet = function greet(message) {
  var obj = {
    command: 'PRIVMSG',
    parameters: [message.parameters[0], 'hello '+message.prefix.nick]
  };
  this.igelkott.push(obj);
};

exports.Plugin = Greet;
