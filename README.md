# testcafe-reporter-json-complete

This is a fork the **JSON** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

This fork tries to proivde as much information as posible, while beeing compatible with the original testcafe-reporter-json.

There will be come kind of redundancy.

## Install

```
npm install testcafe-reporter-json-complete
```

## Usage

When you run tests from the command line, specify the reporter name by using the `--reporter` option:

```
testcafe chrome 'path/to/test/file.js' --reporter json-complete
```

When you use API, pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('json-complete') // <-
    .run();
```
Hauke Thorenz (https://github.com/htho/)
