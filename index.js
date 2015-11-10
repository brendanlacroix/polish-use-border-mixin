module.exports = {
  name: 'use-border-mixin',
  message: 'Border should not be set explicitly. Use "@include border".',
  test: function(ast){
    var errors = [];

    ast.traverse(function(declaration) {
      if (declaration.type !== 'declaration') {
        return;
      }

      declaration.traverse(function (ident) {
        var string;

        if (ident.type !== 'ident') {
          return;
        }

        string = ident.toString();

        if (string.indexOf('radius') === -1 && string.indexOf('border') === 0) {
          errors.push({
            node: declaration
          });
        }
      });
    });

    return errors;
  }
};
