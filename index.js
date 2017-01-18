function SetAsyncExtension() {
    this.tags = ['setAsync'];

    this.parse = function(parser, nodes, lexer) {
        var tok = parser.nextToken();
        var args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);

        return new nodes.CallExtensionAsync(this, 'run', args);
    };

    this.run = function(context, variable, func, args, callback) {
      args.push(function(err, data) {
          context.ctx[variable] = data;

          callback(err, null)
      });

      func.apply(null, args);
    };
}

module.exports = SetAsyncExtension;
