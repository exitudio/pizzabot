var populateInput = require('./populateInput.js')
var NotWellFormError = require('./populateInput.js').NotWellFormError
var DestinationIsOutOfRangeError = require('./populateInput.js').DestinationIsOutOfRangeError

 describe('Test checkInput()', function(){
     
    it('should throw NotWellFormError when input is undefined', function(){
        expect(populateInput).toThrowError(NotWellFormError.message)
    })
 
    //size
    it('should throw NotWellFormError when input is no size', function(){
        expect(function(){populateInput('(1,)')}).toThrowError(NotWellFormError.message)
    })
    it('should throw NotWellFormError when "size" is not "x"', function(){
        expect(function(){populateInput('55 (1,1))}')}).toThrowError(NotWellFormError.message)
    })
    it('should throw NotWellFormError when "size" is not well form 2', function(){
        expect(function(){populateInput('5x (1,1)')}).toThrowError(NotWellFormError.message)
    })
    it('should throw NotWellFormError when row "size" is not positive integer', function(){
        expect(function(){populateInput('-1x5 (1,1)')}).toThrowError(NotWellFormError.message)
    })
    it('should throw NotWellFormError when column "size" is not positive integer', function(){
        expect(function(){populateInput('5x-1 (1,1)')}).toThrowError(NotWellFormError.message)
    })

    //destination
    it('should throw NotWellFormError when input is not destination', function(){
        expect(function(){populateInput('5x5')}).toThrowError(NotWellFormError.message)
    })
    it('should throw NotWellFormError when "destination" is wrap by blanket', function(){
        expect(function(){populateInput('5x5 [1,1]')}).toThrowError(NotWellFormError.message)
    })
    it('should not throw error when "destination" has white space before the second number', function(){
        expect(function(){populateInput('5x5 (1, 1)')}).not.toThrowError(NotWellFormError.message)
    })
    it('should throw NotWellFormError when "destination" has more than one white space before the second number', function(){
        expect(function(){populateInput('5x5 (1,  1)')}).toThrowError(NotWellFormError.message)
    })
    it('should throw NotWellFormError when the second "destination is not well form"', function(){
        expect(function(){populateInput('5x5 (1, 1) (1, 2')}).toThrowError(NotWellFormError.message)
    })
    it('should not throw error when input is well form', function(){
        expect(function(){populateInput('5x5 (1,1)')}).not.toThrowError(NotWellFormError.message)
    })
}) 
 
describe('Test populateInput()', function(){
    var object1 = populateInput('8x9 (7,8)')
    var object2 = populateInput('34x58 (1,1) (23,53)')

    //size
    it('should return column from input', function(){
        expect(object1.sizeColumn).toBe(8)
    })
    it('should return row from input', function(){
        expect(object1.sizeRow).toBe(9)
    })
    it('should return 2 digits column from input', function(){
        expect(object2.sizeColumn).toBe(34)
    })
    it('should return 2 digits row from input', function(){
        expect(object2.sizeRow).toBe(58)
    })

    //destination
    it('should return column from first destinations', function(){
        expect(object1.destinations[0].column).toBe(7)
    })
    it('should return row from first destinations', function(){
        expect(object1.destinations[0].row).toBe(8)
    })
    it('should return column from second destinations, 2 digits', function(){
        expect(object2.destinations[1].column).toBe(23)
    })
    it('should return row from second destinations, 2 digits', function(){
        expect(object2.destinations[1].row).toBe(53)
    })

    //destination out of range
    it('should not throw "DestinationIsOutOfRangeError" when column of destination is out of range', function(){
        expect(function(){populateInput('5x5 (1,1) (5,1)')}).toThrowError(DestinationIsOutOfRangeError.message)
    })
    it('should not throw "DestinationIsOutOfRangeError" when row of destination is out of range', function(){
        expect(function(){populateInput('5x5 (1,1) (1,5)')}).toThrowError(DestinationIsOutOfRangeError.message)
    })
}) 