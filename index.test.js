var getPathFromInput = require('./index.js').getPathFromInput
var findPath = require('./index.js').findPath
var getSingleDestinationPathString = require('./index.js').getSingleDestinationPathString
var generateDuplicateString = require('./index.js').generateDuplicateString

 describe('Test generateDuplicateString()', function(){
    it('should return NNN', function(){
        expect(generateDuplicateString('N', 3)).toBe('NNN')
    })
    it('should return ""', function(){
        expect(generateDuplicateString('N', 0)).toBe('')
    })
 })

 describe('Test getSingleDestinationPathString()', function(){
    it('should return NNN', function(){
        var from = { column:3, row:5}
        var to = { column:5, row:1}
        expect(getSingleDestinationPathString(from, to)).toBe('EESSSS')
    })
    it('should return ""', function(){
        var from = { column:10, row:11}
        var to = { column:10, row:11}
        expect(getSingleDestinationPathString(from, to)).toBe('')
    })
 })

 describe('Test findPath()', function(){
    it('should return EENDSD', function(){
        var configObject = {
            destinations: [{column:2, row:1}, {column:2, row:0}]
        }
        expect(findPath(configObject)).toBe('EENDSD')
    })
    it('should double drop if two destinations are the same point', function(){
        var configObject = {
            destinations: [{column:3, row:1}, {column:3, row:1}]
        }
        expect(findPath(configObject)).toBe('EEENDD')
    })
 })

 describe('Test all()', function(){
    it('should return EENDSD', function(){
        expect(getPathFromInput('5x5 (1, 3) (4, 4)')).toBe('ENNNDEEEND')
    })
    it('should return DENNNDEEENDSSDDWWWWSDEEENDWNDEESSD', function(){
        expect(getPathFromInput('5x5 (0, 0) (1, 3) (4, 4) (4, 2) (4, 2) (0, 1) (3, 2) (2, 3) (4, 1)'))
            .toBe('DENNNDEEENDSSDDWWWWSDEEENDWNDEESSD')
    })
 })