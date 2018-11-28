{
	"id": number,
	"user": string,
	"title": string,
  "type": string,
  "city": string,
	"self_checkin": boolean,
	"superhost": boolean,
	"descriptions": [
    {
      "title": string,
      "text":  string
    }
  ],
	"amenities": array (of strings),
	"rooms": [
    {
      "type_of_room": string,
      "furniture" : [
        {
        "type_of_furniture": string,
        "qty": number
        }
      ]
    }
  ]
}