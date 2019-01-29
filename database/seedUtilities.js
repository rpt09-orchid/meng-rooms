const faker = require('faker');

const randoGenArrayFactory = (noDocsInSet) => {
  const finalArray = [];
  let i = 0;
  while (i < noDocsInSet) {
    const fakeDescriptions = [
      {
        title: 'headline',
        text: faker.lorem.paragraph(),
      },
      {
        title: 'The space',
        text: faker.lorem.paragraph(),
      },
      {
        title: 'Guest Access',
        text: faker.lorem.paragraph(),
      },
      {
        title: 'Interaction with guests',
        text: faker.lorem.paragraph(),
      },
      {
        title: 'Other things to note',
        text: faker.lorem.paragraph(),
      },
    ];

    const fakeSleeping = [
      {
        typeOfRoom: 'Bedroom',
        furniture: faker.random.arrayElement([
          {
            typeOfFurniture: 'queen bed',
            qty: faker.random.number({ min: 1, max: 2 }),
          },
          {
            typeOfFurniture: 'double bed',
            qty: faker.random.number({ min: 1, max: 2 }),
          },
          {
            typeOfFurniture: 'single bed',
            qty: faker.random.number({ min: 1, max: 3 }),
          },
        ]),
      },
    ];

    const roomDetail = {
      id: '',
      user: faker.name.findName(),
      avatar: faker.random.arrayElement(
        ['https://s3-us-west-2.amazonaws.com/rpt-09-mulder-avatars/person1.jpg', 'https://s3-us-west-2.amazonaws.com/rpt-09-mulder-avatars/person2.jpg', 'https://s3-us-west-2.amazonaws.com/rpt-09-mulder-avatars/person3.jpg'],
      ),
      title: faker.lorem.word(),
      type: faker.random.arrayElement(
        ['House', 'Tiny House', 'Apartment', 'Private Room', 'Shared Room', 'RV'],
      ),
      city: faker.address.city(),
      selfCheckin: faker.random.boolean(),
      superhost: faker.random.boolean(),
      descriptions: fakeDescriptions,
      amenities: ['Kitchen', 'Iron', 'Free parking on premises', 'Wifi', 'Hangers', 'Laptop friendly workspace'],
      sleepingArrangements: fakeSleeping,
    };

    finalArray.push(roomDetail);
    console.log(i);
    i++;
  }
  return finalArray;
};

module.exports = { randoGenArrayFactory };
