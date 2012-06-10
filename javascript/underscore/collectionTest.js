(function() {
  module('Collection_Function_Test');

  test('each_全要素繰り返すこと', function() {
    var array = [];
    _.each([1, 2, 3], function(v, index) {
      array[index] = v;
    });
    deepEqual(array, [1, 2, 3]);

    var obj = {};
    _.each({
      name: '名前',
      age: '歳'
    }, function(v, key) {
      obj[key] = v;
    });
    deepEqual(obj, {
      name: '名前',
      age: '歳'
    });
  });

  test('map_各要素に関数適用されること', function() {
    var array = _.map([1, 2, 3], function(v, index) {
      return v + 10; 
    });
    deepEqual(array, [11, 12, 13]);
  });

  test('reduce_隣合う要素に対して左から右に関数適用していき単一の値を返すこと', function() {
    var value = _.reduce([1, 2, 3, 4], function(memo, value) {
      return memo + value;
    });
    equal(value, 10);
  });

  test('reduceRight_隣合う要素に対して右から左に関数適用していき単一の値を返すこと', function() {
    var value = _.reduceRight([1, 2, 3, 4], function(memo, value) {
      return memo - value;
    });
    equal(value, -2);
  });

  test('find_最初に条件を満たした時の要素を返すこと', function() {
    var value = _.find([1, 2, 3], function(value, index) {
      return value === 2;
    });
    equal(value, 2);
  });

  test('filter_条件を満たす要素の配列を返すこと', function() {
    var values = _.filter([1, 2, 3, 4, 5, 6], function(value, index) {
      return value % 2 === 0;
    });
    deepEqual(values, [2, 4, 6]);
  });

  test('reject_条件を満たさない要素の配列を返すこと', function() {
    var values = _.reject([1, 2, 3, 4, 5, 6], function(value, index) {
      return value % 2 === 0;
    });
    deepEqual(values, [1, 3, 5]);
  });

  test('every_全要素が条件を満たしているかを返すこと', function() {
    var isEven = _.every([2, 4, 6], function(value, index) {
      return value % 2 === 0;
    });
    ok(isEven);

    var isNotEven = !_.every([2, 4, 5], function(value, index) {
      return value % 2 === 0;
    });
    ok(isNotEven);
  });

  test('any_条件を満たす要素が存在するかを返すこと', function() {
    var exists = _.any([false, false, true], function(value, index) {
      return !!value;
    });
    ok(exists);

    var notExists = !_.any([false, false, false], function(value, index) {
      return !!value;
    });
    ok(notExists);
  });

  test('include_指定した要素が含まれているかを返すこと', function() {
    var isIncluded = _.include([1, 2, 3], 3);
    ok(isIncluded);

    var isNotIncluded = !_.include([1, 2, 3], 4);
    ok(isNotIncluded);
  });

  test('invoke_各要素に対して指定したメソッドを実行した結果を返す', function() {
    var chars = _.invoke(["abc", "de", "fghi"], 'charAt', 1);
    deepEqual(chars, ['b', 'e', 'g']);
  });

  test('pluck_各要素から指定したプロパティ名の要素を取り出した配列を返すこと', function() {
    var names = _.pluck([
                        { name: 'taro', age: 20 },
                        { name: 'hanako', age: 18 }
    ], 'name');
    deepEqual(names, ['taro', 'hanako']);
  });

  test('max_各要素野中から最大値となる要素を返すこと', function() {
    var max = _.max([3, 1, 5, 2, 4]);
    equal(max, 5);

    var maxOfObj = _.max([
                         {value: 5},
                         {value: 4},
                         {value: 1},
                         {value: 3},
                         {value: 2}
    ], function(obj) {
      return obj.value;
    });
    deepEqual(maxOfObj, {value: 5});
  });

  test('min_各要素野中から最小値となる要素を返すこと', function() {
    var min = _.min([3, 1, 5, 2, 4]);
    equal(min, 1);

    var minOfObj = _.min([
                         {value: 5},
                         {value: 4},
                         {value: 1},
                         {value: 3},
                         {value: 2}
    ], function(obj) {
      return obj.value;
    });
    deepEqual(minOfObj, {value: 1});
  });

  test('shuffle_配列の要素がシャッフルされること', function() {
    var values = [1, 2, 3, 4, 5];
    var shuffled = _.shuffle(values);
    shuffled.sort();
    notStrictEqual(shuffled, values);
    deepEqual(shuffled, values);
  });

  test('sortBy_指定した順番の昇順にソートされること', function() {
    var sorted = _.sortBy([3, 1, 2, 5, 4], function(value) {
      return value % 5;
    });
    deepEqual(sorted, [5, 1, 2, 3, 4]);

    var sortedByValue = _.sortBy([
                                 { value: 5},
                                 { value: 1},
                                 { value: 3},
                                 { value: 2},
                                 { value: 4}
    ], 'value');
    deepEqual(sortedByValue, [
              { value: 1},
              { value: 2},
              { value: 3},
              { value: 4},
              { value: 5}
    ]);
  });

  test('groupBy_グループ毎に分類されたオブジェクトを返すこと', function() {
    var groupBy = _.groupBy(['abc', 'defgh', 'ifg'], function(value) {
      return value.length;
    });
    deepEqual(groupBy, { 3: ['abc', 'ifg'], 5: ['defgh']});

    var groupByLength = _.groupBy(['abc', 'defgh', 'ifg'], 'length');
    deepEqual(groupByLength, { 3: ['abc', 'ifg'], 5: ['defgh']});
  });

  test('sortedIndex_挿入先のインデックスが返されること', function() {
    var index = _.sortedIndex([10, 20, 30, 40, 50], 35);
    equal(index, 3);

    var index2 = _.sortedIndex([50, 40, 30, 20, 10], 35, function(value) {
      return -value;
    });
    equal(index2, 2);
  });

  test('toArray_配列に変換されること', function() {
    var argumentsArray = (function() {
      ok(!_.isArray(arguments));
      return _.toArray(arguments);
    })(1, 2, 3, 4);
    ok(_.isArray(argumentsArray)); 
    deepEqual(argumentsArray, [1, 2, 3, 4]);
  });

  test('size_サイズを返すこと', function() {
    var arraySize = _.size([1, 2, 3, 4, 5]);
    equal(arraySize, 5);

    var objSize = _.size({
      name: '名前',
      age: '歳'
    });
    equal(objSize, 2);
  });
})();
