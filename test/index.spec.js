import { assert } from 'chai'
import getMinScore from '../src/components/getMinScore'

describe("用例：", function() {
    it('1,1,1,1,1', function() {
        assert.equal(getMinScore([1,1,1,1,1]).join(' '), [5].join(' '))
    })
    it('2,2,1,2,1', function() {
        assert.equal(getMinScore([2,2,1,2,1]).join(' '), [4, 4].join(' '))
    })
    it('3,6,6,6,3', function() {
        assert.equal(getMinScore([3,6,6,6,3]).join(' '), [4, 4, 4, 4, 4, 4].join(' '))
    })
    it('3,1,1,1', function() {
        assert.equal(getMinScore([3,1,1,1]).join(' '), [4, 1, 1].join(' '))
    })
})
