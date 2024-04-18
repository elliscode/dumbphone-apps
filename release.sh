#!/bin/bash
if [ "$ENV" = "dev" ]; then
    BUCKET_SUFFIX="-dev"
    FUNCTION_SUFFIX="test"
    sed -i '' 's/const API_DOMAIN.*/const API_DOMAIN = "https:\/\/test.dumbphoneapps.com";/' s3/js/utils.js
    sed -i '' 's/const UI_DOMAIN.*/const UI_DOMAIN = "https:\/\/aws.dumbphoneapps.com";/' s3/js/utils.js
else
    BUCKET_SUFFIX=""
    FUNCTION_SUFFIX="prod"
    sed -i '' 's/const API_DOMAIN.*/const API_DOMAIN = "https:\/\/api.dumbphoneapps.com";/' s3/js/utils.js
    sed -i '' 's/const UI_DOMAIN.*/const UI_DOMAIN = "https:\/\/www.dumbphoneapps.com";/' s3/js/utils.js
fi
lambda=false;
s3=false;
for flag in "$@"
do
    case "${flag}" in
        "l") lambda=true;;
        "s") s3=true;;
        "ls") s3=true;lambda=true;;
        "sl") s3=true;lambda=true;;
    esac
done
if $lambda; then
    echo "Lambda selected";
fi
if $s3; then
    echo "S3 selected";
fi
if ! $lambda && ! $s3; then
    echo "You can supply either l or s, or ls, you supplied nothing, so i will assume you meant ls";
    lambda=true;
    s3=true;
fi

if $lambda; then
    cd lambda/dumbphoneapps-monolith/
    TIMESTAMP=$(date +%s)
    zip -vr ../../lambda-release-${ENV}-${TIMESTAMP}.zip . -x "*.DS_Store"
    cd ../../
    aws lambda update-function-code --function-name=dumbphoneapps-${FUNCTION_SUFFIX} --zip-file=fileb://lambda-release-${ENV}-${TIMESTAMP}.zip --no-cli-pager
fi

if $s3; then
    aws s3 sync s3 s3://daniel-townsend-dumbphoneapps${BUCKET_SUFFIX}
fi