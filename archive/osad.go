package main

import (
  "encoding/json"
  "log"
  "math"
  "strconv"

  "github.com/aws/aws-lambda-go/events"
  "github.com/aws/aws-lambda-go/lambda"
)



// OSAD = optimal string alignment distance using Damerau–Levenshtein distance algorithm
func osad(s1, s2 string) int {
  dist := make([][]int, len(s1)+1)
  for i := 0; i < len(dist); i++ {
    dist[i] = make([]int, len(s2)+1)
  }

  for i := 0; i < len(s1)+1; i++ {
    dist[i][0] = i
  }
  for i := 0; i < len(s2)+1; i++ {
    dist[0][i] = i
  }

  var cost int
  var tempMin float64
  for i := 1; i < len(s1)+1; i++ {
    for j := 1; j < len(s2)+1; j++ {
      if s1[i-1] == s2[j-1] {
        cost = 0
      } else {
        cost = 1
      }

      tempMin = math.Min(float64(dist[i-1][j]+1), float64(dist[i][j-1]+1))
      dist[i][j] = int(math.Min(tempMin, float64(dist[i-1][j-1]+cost)))

      if i > 1 && j > 1 && s1[i-1] == s2[j-2] && s1[i-2] == s2[j-1] {
        dist[i][j] = int(math.Min(float64(dist[i][j]), float64(dist[i-2][j-2]+cost)))
      }
    }
  }

  return dist[len(s1)][len(s2)]
}



func Adapter(request events.APIGatewayProxyRequest) (events.APIGatewayProxyResponse, error) {
  res := events.APIGatewayProxyResponse{
    Headers: map[string]string{
      "Access-Control-Allow-Origin": "*",
    },
  }

  type validParams struct {
    Strings []string `json:"strings"`
  }
  var params validParams

  if err := json.Unmarshal([]byte(request.Body), &params); err != nil {
    res.StatusCode = 400
    res.Body = "{\"error\":\"Could not parse body\"}"
    log.Println("Could not parse body", err)
    return res, nil
  }
  log.Printf("Got params %+v\n", params)
  if len(params.Strings) != 2 || len(params.Strings[0]) == 0 || len(params.Strings[1]) == 0 {
    res.StatusCode = 400
    res.Body = "{\"error\":\"Invalid args\"}"
    log.Println("Invalid args")
    return res, nil
  }

  log.Println("Start")
  dist := osad(params.Strings[0], params.Strings[1])
  log.Printf("Done, distance: %d\n", dist)

  res.StatusCode = 200
  res.Body = "{\"result\":"+strconv.Itoa(dist)+"}"
  return res, nil
}



func main() {
  lambda.Start(Adapter)
}
