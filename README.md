# nunjucks-set-async

Like set, but for async functions.

# Usage
You can use this extension in the following 4 easy steps:

- Create a new nunjucks Environment.
`let env = new nunjucks.Environment();`
- Add the nunjucks-set-async to the environment.
`env.addExtension('SetAsyncExtension', new SetAsyncExtension())`
- In your template, call the extension as follow:
`{% setAsync 'variable', functionName, [functionArguments] %}`
`variable` is the name of the variable that will hold the results of `functionName` with `[functionArguments]`. If the function `functionName` does not take any arguments, you need to still pass an empty array `{% setAsync 'variable', functionName, [] %}`.
- Use `{{ variable }}` to render the value of  `variable` anywhere after the `setAsync` block.

# Example
In this example we are simulating getting the number of astronauts currently on the moon:

- index.js
```
let getNumberOfAstronauts =  function(cb) {
  setTimeout(function() {
    cb(null, 12);
  }, 10);
}
env.addGlobal('getNumberOfAstronauts', getNumberOfAstronauts);
env.addExtension('SetAsyncExtension', new SetAsyncExtension())
```

- template.html
```
{% setAsync 'numberofAstronauts', getNumberOfAstronauts, [] %}
<p> There are {{numberofAstronauts}} in the moon right now! </p>
```
- index.js
```
env.render('template.html', function(err, res) {
  console.log(res);
});
```
