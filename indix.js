const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number },
  favoriteFoods: { type: [String] }
});

const Person = mongoose.model('Person', personSchema);

require('dotenv').config();
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));
 
//Create and Save a Record:

const person = new Person({
    name: 'John Doe',
    age: 25,
    favoriteFoods: ['Pizza', 'Burgers']
  });
  
  person.save(function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log('Person saved:', data);
    }
  });

//Create Many Records:

const arrayOfPeople = [
    { name: 'Alice', age: 30, favoriteFoods: ['Salad', 'Sushi'] },
    { name: 'Bob', age: 35, favoriteFoods: ['Tacos', 'Steak'] }
  ];
  
  Person.create(arrayOfPeople, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log('Many people saved:', data);
    }
  });

//Use model.find() to Search Your Database:

Person.find({ name: 'John Doe' }, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log('Found people:', data);
    }
  });

//Use model.findOne() to Return a Single Matching Document:

const food = 'Pizza';
Person.findOne({ favoriteFoods: food }, function(err, person) {
  if (err) {
    console.log(err);
  } else {
    console.log('Found person with favorite food:', person);
  }
});

//Use model.findById() to Search by _id:
const personId = '_id';
Person.findById(personId, function(err, person) {
  if (err) {
    console.log(err);
  } else {
    console.log('Found person by ID:', person);
  }
});


//Perform Classic Updates (Find, Edit, Save):

const personId = '_id';
Person.findById(personId, function(err, person) {
  if (err) {
    console.log(err);
  } else {
    person.favoriteFoods.push('Hamburger');
    person.save(function(err, updatedPerson) {
      if (err) {
        console.log(err);
      } else {
        console.log('Updated person:', updatedPerson);
      }
    });
  }
});


//Perform New Updates on a Document Using findOneAndUpdate():

const personName = 'Alice';
Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true }, function(err, updatedPerson) {
  if (err) {
    console.log(err);
  } else {
    console.log('Updated person:', updatedPerson);
  }
});


//Delete One Document Using findByIdAndRemove():

const personId = '_id';
Person.findByIdAndRemove(personId, function(err, removedPerson) {
  if (err) {
    console.log(err);
  } else {
    console.log('Removed person:', removedPerson);
  }
});


//Delete Many Documents Using remove():

Person.remove({ name: 'Mary' }, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log('Deleted people:', result);
    }
  });

//Chain Search Query Helpers:

Person.find({ favoriteFoods: 'Burritos' })
  .sort({ name: 1 })
  .limit(2)
  .select('-age')
  .exec(function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log('Filtered and sorted people:', data);
    }
  });

