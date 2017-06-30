describe("A suite is just a function", function() {
    const add = (a, b)=>{
        return a + b
    }
    it('1 加 1 应该等于 2', function() {
        expect(add(1, 1)).toBe(2)
    })
})
