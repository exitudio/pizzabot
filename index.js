var populateInput = require('./src/populateInput')

//process.stdout.write( true? "Prime":"Not Prime");
if(process.env.NODE_ENV !== 'test'){
    try{
        var path = getPathFromInput(process.argv[2])
        process.stdout.write(path)
    }catch(error){
        process.stdout.write(error.message)
    }
}

function getPathFromInput(input){
    var configObject = populateInput(input)
    return findPath(configObject)
}

function findPath(configObject){
    var pathString = ''
    var currentPosition = {column:0, row:0}
    for(var i=0; i<configObject.destinations.length; i++){
        var currentDestination = configObject.destinations[i]
        pathString += getSingleDestinationPathString( currentPosition, currentDestination)
        pathString += 'D'
        currentPosition = currentDestination
    }
    return pathString
}

function getSingleDestinationPathString( from, to){
    var movingString = ''
    if( from.column < to.column ){
        movingString += generateDuplicateString('E',to.column-from.column)
    }else if( from.column > to.column ){
        movingString += generateDuplicateString('W',from.column-to.column)
    }

    if( from.row < to.row ){
        movingString += generateDuplicateString('N',to.row-from.row)
    }else if( from.row > to.row ){
        movingString += generateDuplicateString('S',from.row-to.row)
    }
    return movingString
}

function generateDuplicateString( str, num){
    var generateString = ''
    for(var i=0; i<num; i++){
        generateString += str
    }
    return generateString
}

module.exports.getPathFromInput = getPathFromInput
module.exports.findPath = findPath
module.exports.getSingleDestinationPathString = getSingleDestinationPathString
module.exports.generateDuplicateString = generateDuplicateString