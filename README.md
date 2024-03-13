# Henlo world

I do a demonstrate of my work. [Do a viewing](https://www.kyoseong.com).

The portfolio code is NOT representative of my front-end work. Just something I threw together a while back.

## TODO

## Demos

### Optimal string alignment distance using Damerau–Levenshtein distance algorithm

```
// Sample request
curl
  -X POST
  -H "Content-Type: application/json"
  -d '{
        "strings": [
          "I am one sentence",
          "I am another sentence"
        ]
      }'
  https://[REMOVED].execute-api.us-west-2.amazonaws.com/1/osad

// Sample response
{
  // Remove the 4 characters ['a', 't', 'h', 'r'] from "another" in the second string and swap 'n' and 'o'
  result: 5
}
```

## Notes

### Development

AWS CLI needed, used 2.15.2

Use Node 16.20.2
