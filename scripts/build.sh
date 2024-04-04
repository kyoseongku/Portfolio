#! /bin/bash

if [ $(node --version) != "v16.20.2" ]; then
  source ~/.nvm/nvm.sh
  nvm use 16.20.2;
fi

echo "Building React bundle";
node node_modules/react-scripts/scripts/build.js &&

echo "Uploading bundle to S3";
aws s3 sync build s3://kks.portfolio --acl public-read &&

echo "Invalidating CDN cache";
aws cloudfront create-invalidation --distribution-id EQYHJW6UVQEA3 --paths "/*" &&

nvm use default;

echo "Done";
