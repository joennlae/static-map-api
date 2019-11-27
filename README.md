## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## test url

`http://localhost:3000/staticmap?size=300x200&path=color:0x0000ff|weight:5|40.737102,-73.990318|40.749825,-73.987963|40.752946,-73.987384|40.755823,-73.986397`

## documentation

Insomnia file is in repe!!

### GET request

`http://localhost:3000/staticmap?size=300x200&path=color:0x0000ff|weight:5|40.737102,-73.990318|40.749825,-73.987963|40.752946,-73.987384|40.755823,-73.986397`

### POST request

```
{
	"size": {
		"height": 200,
		"width": 300
	},
	"color": "FF0000",
	"weight": 2,
	"waypoints": [
		[ 40.737102, -73.990318 ],
  [ 40.749825, -73.987963 ],
  [ 40.752946, -73.987384 ],
  [ 40.755823, -73.986397 ]
	]
}
```