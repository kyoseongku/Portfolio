#! /bin/bash

if [[ $1 == "" ]]; then
  echo "Deploy which function?";
  exit;
fi

file=$(ls functions | grep "$1");
if [[ ($file != $1) && ($file != $1".go") ]]; then
  echo "Function not found";
  exit;
fi

echo "Building "$file;
bin=$(sed s/\.go// <<< $file);
GOOS=linux go build -o $bin functions/$file;
zip $bin.zip $bin;

echo "Deploying to AWS Lambda...";
aws lambda update-function-code --function-name portfolio$bin --zip-file fileb://$bin.zip --publish &&

echo "Cleaning up...";
rm $bin $bin.zip;
echo $bin" has been updated";
