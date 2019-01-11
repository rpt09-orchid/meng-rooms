# Project Name

> Rooms component for an AirBnB-Clone

## Related Projects

[[Proxy]](https://github.com/rpt09-mulder/proxy-allen) with all components running together

- [Rooms (Current Component)](https://github.com/rpt09-mulder/rooms)
- [Gallery](https://github.com/rpt09-mulder/gallery)
- [Booking](https://github.com/rpt09-mulder/booking)
- [Reviews](https://github.com/rpt09-mulder/reviews)

## Table of Contents

1. [Requirements](#Requirements)
1. [Style Guide](#Style-Guide)
1. [Installation](#Installation)
1. [API Routes](#API-Routes)
1. [Examples](#Examples)
   - [/details/:id](#/details/:id)
   - [/users/:id](#/users/:id)
1. [Development](#Development)

## Requirements

- Node v10.12.0
- MongoDB v4.0.3
- NPM v6.5.0

## Style Guide

Refer to the [AirBnb Style Guide](https://github.com/airbnb/javascript).

## Installation

After cloning the project, go to the root directory then install all required dependencies by running

```sh
npm install
```

If you haven't already, start your MongoDB service then seed the database by running

```sh
npm run seed-database
```

Build the webpack bundle by running

```sh
npm run react-dev
```

Wait for the build to complete then start the server by running

```sh
npm run server-dev
```

and finally, on your browser go to http://localhost:3001

## API Routes

Each API route requires an ID

| Endpoint       | Type | Operation                                        |
| -------------- | ---- | ------------------------------------------------ |
| `/details/:id` | GET  | Get all room information matching the `:id`      |
| `/users/:id`   | GET  | Get user information for room matching the `:id` |

## Examples

The REST API will serve `JSON` data for all `IDs` between `1` to `100`.

### /details/:id

Below is an example of the shape of data returned for a request `/details/1`

```json
{
  "data": [
    {
      "descriptions": [
        {
          "title": "headline",
          "text": "Aspernatur distinctio eius. Nemo doloremque omnis fuga optio ut et debitis voluptatem illum. At dolores aliquid suscipit eos sint. Pariatur ut mollitia quis odit facilis temporibus."
        },
        {
          "title": "The space",
          "text": "Repudiandae molestiae dolorem eum quia sapiente nisi eum. Deleniti ut est tempora. Dignissimos et et reprehenderit voluptas ea aliquid. Sed delectus est cum qui vero eaque facilis voluptatem. Dicta et distinctio optio voluptatem quibusdam sequi corporis iste consequuntur. Quidem vero repellendus eaque minima quia."
        },
        {
          "title": "Guest Access",
          "text": "Autem accusantium quos veniam aperiam maxime a quis commodi. Voluptas eum neque tenetur nulla quae quibusdam illo et voluptas. Voluptates quis nobis. Sed facere nobis est porro laborum impedit voluptatem. Non totam harum ipsa earum quo aliquam labore est qui. Pariatur quia nulla et quis autem tenetur."
        },
        {
          "title": "Interaction with guests",
          "text": "Optio neque rerum dolores. Qui fugit placeat rerum porro. Suscipit provident hic similique eligendi est assumenda perspiciatis iure quibusdam. Hic nihil sed optio veritatis. Velit eaque enim."
        },
        {
          "title": "Other things to note",
          "text": "Aut illum laudantium et sunt velit qui molestias doloremque. Natus quis ducimus expedita dignissimos deserunt. Molestiae sapiente at quo incidunt et. Fugit omnis facere eius ex. Rerum nisi aut voluptatem molestiae ipsum. Veniam minima quas."
        }
      ],
      "amenities": [
        "Kitchen",
        "Iron",
        "Free parking on premises",
        "Wifi",
        "Hangers",
        "Laptop friendly workspace"
      ],
      "sleepingArrangements": [
        {
          "typeOfRoom": "Bedroom",
          "furniture": {
            "typeOfFurniture": "double bed",
            "qty": 2
          }
        }
      ],
      "_id": "5c2c15b0d10d0b0b5b76c6d0",
      "id": 1,
      "user": "Earnestine Haag Jr.",
      "avatar": "https://s3-us-west-2.amazonaws.com/rpt-09-mulder-avatars/person1.jpg",
      "title": "sequi",
      "type": "Private Room",
      "city": "New Harry",
      "selfCheckin": false,
      "superhost": false,
      "__v": 0
    }
  ]
}
```

### /users/:id

Below is an example of the shape of data returned for a request `/users/1`

```json
{
  "data": {
    "id": 1,
    "user": "Earnestine Haag Jr.",
    "avatar": "https://s3-us-west-2.amazonaws.com/rpt-09-mulder-avatars/person1.jpg"
  }
}
```