const mongoose = require('mongoose');
const faker = require('faker');
const Rooms = require('./models/room.js');

mongoose.connect('mongodb://localhost/rooms');

for (let i = 1; i < 101; i++) {
  let fakeDescriptions = [
    {
      title: 'headline',
      text: faker.lorem.paragraph()
    },
    {
      title: 'The space',
      text: faker.lorem.paragraph()
    },
    {
      title: 'Guest Access',
      text: faker.lorem.paragraph()
    },
    {
      title: 'Interaction with guests',
      text: faker.lorem.paragraph()
    },
    {
      title: 'Other things to note',
      text: faker.lorem.paragraph()
    }
  ];

  let fakeSleeping = [
    {
      typeOfRoom: 'Bedroom',
      furniture: faker.random.arrayElement([
        {
          typeOfFurniture: 'queen bed',
          qty: faker.random.number({min: 1, max: 2})
        },
        {
          typeOfFurniture: 'double bed',
          qty: faker.random.number({min: 1, max: 2})
        },
        {
          typeOfFurniture: 'single bed',
          qty: faker.random.number({min: 1, max: 3})
        }
      ])
    }
  ];

  let roomDetail = {
    id: i,
    user: faker.name.findName(),
    title: faker.lorem.word(),
    type: faker.random.arrayElement(
      ['House', 'Tiny House', 'Apartment', 'Private Room', 'Shared Room', 'RV']
    ),
    city: faker.address.city(),
    selfCheckin: faker.random.boolean(),
    superhost: faker.random.boolean(),
    descriptions: fakeDescriptions,
    amenities: ['Kitchen', 'Iron', 'Free parking on premises', 'Wifi', 'Hangers', 'Laptop friendly workspace'],
    sleepingArrangements: fakeSleeping
  };

  Rooms.insertOne(roomDetail, (err, rooms) => {
    if (err) {
      console.log('error adding Room detail', err);
    } else {
      console.log('Room added');
    }
  });
}