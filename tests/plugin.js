define(function (require) {
  var registerSuite = require('intern!object'),
      assert        = require('intern/chai!assert'),
      plugin        = require('intern/dojo/node!../index'),
      fs            = require('intern/dojo/node!fs'),
      gonzales      = require('intern/dojo/node!../node_modules/gonzales-pe');

  registerSuite({
    name: 'polish-use-border-mixin',

    message: function () {
      assert.strictEqual(plugin.message, 'Border should not be set explicitly. Use "@include border".');
    }
  });

  registerSuite({
    name: 'polish-use-border-mixin SCSS tests',
    test: function() {
      var deferred = this.async(3000),
          errors;

      fs.readFile('./tests/scss.scss', deferred.callback(function(error, stylesheet) {
        if (error) {
          throw error;
        }

        errors = plugin.test(gonzales.parse(stylesheet.toString('utf8'), { syntax : 'scss' }));

        assert.strictEqual(errors.length, 12);
        assert.equal(errors[0].node.toString().trim(), 'border: 13px');
        assert.equal(errors[1].node.toString().trim(), 'border-left: 10%');
        assert.equal(errors[2].node.toString().trim(), 'border-top: 3px dashed red');
        assert.equal(errors[3].node.toString().trim(), 'border-color: red');
        assert.equal(errors[4].node.toString().trim(), 'border-style: dotted');
        assert.equal(errors[5].node.toString().trim(), 'border-bottom-width: 2px');
        assert.equal(errors[6].node.toString().trim(), 'border: 13px');
        assert.equal(errors[7].node.toString().trim(), 'border-left: 10%');
        assert.equal(errors[8].node.toString().trim(), 'border-top: 3px dashed red');
        assert.equal(errors[9].node.toString().trim(), 'border-color: red');
        assert.equal(errors[10].node.toString().trim(), 'border-style: dotted');
        assert.equal(errors[11].node.toString().trim(), 'border-bottom-width: 2px');
      }));
    }
  });
});
