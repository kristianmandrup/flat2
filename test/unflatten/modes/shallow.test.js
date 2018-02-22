const assert = require('assert')
const {
  unflatten
} = require('../../flat')

suite('.shallow', function () {
  test('Should leave nested objects untouched', function () {
    let unflatObj = unflatten({
      'hello.world': {
        'foo.fiz': 'bar'
      }
    }, {
      shallow: true
    })

    assert.deepEqual(unflatObj, {
      'hello': {
        'world': {
          'foo.fiz': 'bar'
        }
      }
    })
  });

  test('Should preserve object identity', function () {
    const object = {
      'hello.world': {
        foo: 'bar'
      }
    }

    const unflattened1 = unflatten(object, {
      shallow: true
    })
    const unflattened2 = unflatten(object, {
      shallow: true
    })

    assert.deepEqual(unflattened1.hello.world, {
      foo: 'bar'
    })
    assert.strictEqual(unflattened1.hello.world, unflattened2.hello.world)
  })

  test('Identity', function () {
    const object = {
      foo: {
        "ir.re.le.vant": 'baz'
      }
    }

    assert.strictEqual(
      unflatten(object, {
        shallow: true
      }),
      unflatten(object, {
        shallow: true
      })
    )
  });

  test('Isomorphism 1', function () {
    const object = {
      foo: {
        "ir.re.le.vant": 'baz'
      }
    }

    assert.strictEqual(
      object,
      flatten(unflatten(object, {
        shallow: true
      }), {
        maxDepth: 1
      })
    )
  });
});
