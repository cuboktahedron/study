(function() {
  module('Array_Function_Test');

  test('first_先頭からN個の要素を返すこと', function() {
    equal(_.first([2, 1, 3, 4]), 2);
    deepEqual(_.first([2, 1, 3, 4], 3), [2, 1, 3]);
  });

  test('initial_後ろからN個の要素を取り除いた配列を返すこと', function() {
    deepEqual(_.initial([2, 1, 3, 4]), [2, 1, 3]);
    deepEqual(_.initial([2, 1, 3, 4], 3), [2]);
  });

  test('last_後ろからN個の要素を返すこと', function() {
    equal(_.last([2, 1, 3, 4]), 4);
    deepEqual(_.last([2, 1, 3, 4], 3), [1, 3, 4]);
  });

  test('rest_指定したindex以降の要素を含んだ配列を返すこと', function() {
    deepEqual(_.rest([2, 1, 3, 4]), [1, 3, 4]);
    deepEqual(_.rest([2, 1, 3, 4], 3), [4]);
  });

  test('compact_偽値を除いた配列を返すこと', function() {
    deepEqual(_.compact([true, false, null, 1, "", undefined]), [true, 1]);
  });

  test('flatten_平坦化された配列を返すこと', function() {
    deepEqual(_.flatten([1, [2], [3, [4]]]), [1, 2, 3, 4]);
    deepEqual(_.flatten([1, [2], [3, [4]]], true), [1, 2, 3, [4]]);
  });

  test('without_指定した値を取り除いた配列を返すこと', function() {
    deepEqual(_.without([1, 1, 2, 3, 5], 1), [2, 3, 5]);
  });

  test('uniq_重複する値を取り除いた配列を返すこと', function() {
    deepEqual(_.uniq([1, 2, 3, 2, 3, 4], false), [1, 2, 3, 4]);
    deepEqual(_.uniq([1, 2, 2, 3, 3, 4], true), [1, 2, 3, 4], 'already sorted version');
  });

  test('union_複数の配列を一つの配列にマージすること', function() {
    deepEqual(_.union([1, 2, 3], [4, 5], [2, 5, 6]), [1, 2, 3, 4, 5, 6]);
  });

  test('intersection_すべての配列が共通に保持している要素の配列を返すこと', function() {
    deepEqual(_.intersection([1, 2, 3], [2, 3, 4], [4, 2]), [2]);
  });

  test('difference_先頭の配列の要素の内その他の配列の要素に含まれない値の配列を返すこと', function() {
    deepEqual(_.difference([1, 2, 3, 4, 5], [2, 3, 4], [4, 2]), [1, 5]);
  });

  test('zip_各配列から同一インデックスの要素を要素として保持する配列の配列を返すこと', function() {
    deepEqual(_.zip([1, 2], ['one', 'two'], [true, false]), [[1, 'one', true], [2, 'two', false]]);
    deepEqual(_.zip([1, 2, 3], ['one', 'two'], [true, false]), [[1, 'one', true], [2, 'two', false], [3, undefined, undefined]]);
  });

  test('indexOf_値が一致する最初の要素のインデックスを返すこと', function() {
    deepEqual(_.indexOf([1, 2, 3, 4, 5], 3), 2);
    deepEqual(_.indexOf([1, 2, 3, 4, 5], 6), -1);
  });

  test('lastIndexOf_値が一致する最後の要素のインデックスを返すこと', function() {
    deepEqual(_.lastIndexOf([1, 2, 3, 4, 5, 3, 6], 3), 5);
    deepEqual(_.lastIndexOf([1, 2, 3, 4, 5], 0), -1);
  });

  test('range_指定した範囲の値を含む配列を返すこと', function() {
    deepEqual(_.range(5), [0, 1, 2, 3, 4]);
    deepEqual(_.range(1, 5), [1, 2, 3, 4]);
    deepEqual(_.range(1, 30, 5), [1, 6, 11, 16, 21, 26]);
  });
})();

