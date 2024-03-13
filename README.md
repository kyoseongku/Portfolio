# Henlo world

I do a demonstrate of my work. [Do a viewing](https://www.kyoseong.com).

I've only been updating text since I threw this together a long time ago. It does not reflect my current front-end skills.

## TODO

Major refresh?

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
