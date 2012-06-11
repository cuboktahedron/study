(function() {
  module('Function_Functions_Test');

  test('bind_予め渡したオブジェクトと引数で関数が呼び出されること', function() {
    var bound = _.bind(function(greeting) {
      return greeting + ' ' + this.name;
    }, { name: 'underscore.js' }, 'Hello');
    equal(bound(), 'Hello underscore.js');
  });

  test('bindAll_オブジェクトの各メソッドが常に渡したオブジェクトをthisとして呼び出されること', function() {
    var languages = {
      first: 'javascript',
      second: 'haskell',

      getFirst: function() {
        return this.first;
      },

      getSecond: function() {
        return this.second;
      }
    };
    var bound = _.bindAll(languages);
    var getFirst = bound.getFirst;
    var getSecond = bound.getSecond;

    equal(getFirst(), 'javascript');
    equal(getSecond(), 'haskell');
  });

  test('memoize_2回目はキャッシュした値を返すこと', function() {
    var calledCount = 0;
    var square = _.memoize(function(value) {
      calledCount++;
      return value * 2;
    });

    equal(square(5, 1), 10);
    equal(calledCount, 1);
    equal(square(5, 2), 10);
    equal(calledCount, 1, 'Returned cached value and first argument is only used as key');
    equal(square(10), 20);
    equal(calledCount, 2);
  });

  test('delay_関数の実行を遅らせること', function() {
    var count = 0;
    _.delay(function() {
      count++;
      equal(count, 2);
      start();
    }, 300);
    count++;
    equal(count, 1);
    stop();
  });

  test('defer_関数の実行をカレントコールスタックの処理完了後まで遅らせること', function() {
    var count = 0;
    _.defer(function() {
      count++;
      equal(count, 2);
      start();
    });
    count++;
    equal(count, 1);
    stop();
  });

  test('throttle_指定時間以内の連続呼び出しが行われないこと', function() {
    var calledCount = 0;
    var square = _.throttle(function(value) {
      calledCount++;
      return value * 2;
    }, 100);

    square(5);
    square(5);
    equal(calledCount, 1, 'Square is called twice. But executed is 1');
    _.delay(function() {
      square(5);
      equal(calledCount, 2, 'Since throttle time is over, square is reexecuted');
      start();
    }, 200);
    stop();
  });

  test('debounce_指定時間以内に連続で呼び出された場合最後に呼び出された処理のみが実行されること', function() {
    var caller = _.debounce(function(value) {
      equal(value, 15);
      start();
    }, 100);

    caller(5);
    caller(10);
    caller(15);
    stop();
  });

  test('once_一度しか実行されないこと', function() {
    var calledCount = 0;
    var square = _.once(function(value) {
      calledCount++;
      return value * 2;
    });

    equal(square(5), 10);
    equal(calledCount, 1);
    equal(square(5), 10);
    equal(calledCount, 1);
  });

  test('wrap_関数をラップした関数が作成されること', function() {
    var wrapped = function(language) {
      return language;
    };

    var wrapFunc = _.wrap(wrapped, function(wrapped, language) {
      return 'This is ' + wrapped(language) + ".";
    });

    equal(wrapFunc('javascript'), 'This is javascript.');
  });

  test('compose_関数合成が行われること', function() {
    var f = function(v) {
      return v * v;
    };
    var g = function(v) {
      return v + 10;
    };

    var composed = _.compose(f, g);
    equal(composed(1), 121);
  });

  test('after_指定回数呼び出した後に実行されること', function() {
    var check = function() {
      return true;
    };

    var f = _.after(3, check);
    ok(!f(), 'not called');
    ok(!f(), 'not called');
    ok(f(), 'called');
  });
})();

