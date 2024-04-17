cd lambda/dumbphoneapps-monolith/
TIMESTAMP=$(date +%s)
zip -vr ../../lambda-release-${TIMESTAMP}.zip . -x "*.DS_Store"