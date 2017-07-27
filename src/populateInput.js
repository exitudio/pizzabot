// 5x5 (1, 3) (4, 4)
function populateInput(input){
    checkInput(input)
    
    var populatedObject = {
        sizeColumn: -1,
        sizeRow: -1,
        destinations: []
    }
    var inputArray = input.split(' ')

    //size of row column
    var inputArraySize = inputArray[0].split('x')
    populatedObject.sizeColumn = parseInt(inputArraySize[0], 10)
    populatedObject.sizeRow = parseInt(inputArraySize[1], 10)

    //destinations
    var destinationStringArray = input.match(/\(\d+,\s?\d+\)/g)
    for(var i=0; i<destinationStringArray.length; i++){
        var columnRowStringArray = destinationStringArray[i].match(/\d+/g)
        var column = parseInt(columnRowStringArray[0])
        var row = parseInt(columnRowStringArray[1]) 
        if(column>=populatedObject.sizeColumn || row>=populatedObject.sizeRow){
            throw new DestinationIsOutOfRangeError()
        }

        populatedObject.destinations.push({
            column: column,
            row: row,
        })
    }

    return populatedObject
}

function checkInput(input){
    var isMatch = /^\d+x\d+( \(\d+,\s?\d+\))+$/.test(input)
    if(!isMatch){
        throw new Error('Input is not well form!!!')
    } 
}

function NotWellFormError() {
  this.name = 'NotWellFormError'
  this.message = 'Input is not well form.'
}
NotWellFormError.prototype = Error.prototype

function DestinationIsOutOfRangeError() {
  this.name = 'DestinationIsOutOfRangeError'
  this.message = 'Destination is out of range.'
}
DestinationIsOutOfRangeError.prototype = Error.prototype


module.exports = populateInput
module.exports.checkInput = checkInput
module.exports.NotWellFormError = NotWellFormError
module.exports.DestinationIsOutOfRangeError = DestinationIsOutOfRangeError