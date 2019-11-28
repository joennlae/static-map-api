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

## memory usage

report with

```js
  const used = process.memoryUsage();
  for (let key in used) {
      console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
  }
```
reported usage
```bash
rss 44.53 MB
heapTotal 22.75 MB
heapUsed 16.69 MB
external 1.34 MB
```

## deploy

on sentry server currently

`ssh root@206.81.18.151`

