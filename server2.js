// let jsonString = '{"name":"John","age":30,"email":"john@example.com","isAdmin":true}'
// let jsonObject = JSON.parse(jsonString)
// console.log('Original JSON:', jsonObject.name)

let obj = {
    name: 'John',
    age: 30,
    email: 'john@example.com'
}

const json = JSON.stringify(obj)

console.log('JSON String:', json)