# gas-cf-restart
Cloud Foundry restart API using Google Apps Script

## Description
This script provides simple "cf restart" API by using Google Apps Script as a serverless environment. The API wraps cloud foundry APIs to make it easy to be called from IFTTT.

## Requirement
Goolge Drive

## Usage

Make a POST call as follows to restart a Cloud Foundery app:

|part   |value   |
|-------|--------|
|URL   |`https://script.google.com/macros/s/SCRIPT_ID/exec`|
|Method|POST|
|Content-Type|application/json|
|Body|`{"guid": "CF_APP_GUID"}`|

Caveate: You may need to follow redirect when accessing to the URL.

## Deploy
- Create new Google Apps Script as described in https://developers.google.com/apps-script/guides/standalone.
- Set project name.
- Delete all existing lines in the default source file then copy and paste the contents of cf-restart.js.
- Set Script Property from File - Project properties - Script properties as below:

|name   |value   |
|-------|--------|
|CF_USER|username|
|CF_PASS|password|
|CF_LOGIN_URL|login API URL (`https://login.ng.bluemix.net/UAALoginServerWAR/oauth/token` for Bluemix)|
|CF_API_URL|API URL (`https://api.ng.bluemix.net/v2/apps/` for Bluemix)|

- publish as a web app as described in https://developers.google.com/apps-script/guides/web, allowing access to "Anyone, even anonymous" 

## Author
Akira Kuroda

## License
MIT
