const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0.jjlmg.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {
      type: String,
      minlength: 3,
      required: true,
  },
  number: {
      type: String,
      minlength: 8,
      required: true,
  }
})

personSchema.plugin(uniqueValidator)

const Person = mongoose.model('Person', personSchema)

if (process.argv.length<4) {
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
      })
    return
}
else{
    const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
    })

    person.save().then(result => {
    console.log('person saved!', result)
    mongoose.connection.close()
    })
    return
}
