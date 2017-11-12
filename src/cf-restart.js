function doPost(r) {
  var jsonString = r.postData.getDataAsString();
  var guid = JSON.parse(jsonString).guid;

  var token = login();
  if (token.match(/^Error:/))
    return ContentService.createTextOutput(JSON.stringify({"error": token}));

  update_app(token, guid, "STOPPED");
  return ContentService.createTextOutput((update_app(token, guid, "STARTED")));
}

function login() {
  const CF_USER = PropertiesService.getScriptProperties().getProperty("CF_USER");
  const CF_PASS = PropertiesService.getScriptProperties().getProperty("CF_PASS");
  const CF_LOGIN_URL = PropertiesService.getScriptProperties().getProperty("CF_LOGIN_URL");
  var errorString = "";

  if (CF_USER === null || CF_USER === "")
    errorString = "Error: CF_USER is not set";
  else if (CF_PASS === null || CF_PASS ==="")
    errorString = "Error: CF_PASS is not set";
  else if (CF_LOGIN_URL === null || CF_LOGIN_URL ==="")
    errorString = "Error: CF_LOGIN_URL is not set";

  if (errorString !== "")
    return errorString;

  var payload = "grant_type=password&username=" + CF_USER + "&password="+ CF_PASS;
  var headers = {
    'Authorization': "Basic Y2Y6",
  };
  var options = {
    'method': 'post',
    'headers': headers,
    'payload': payload,
  };
  var response = "";

  try {
    response = UrlFetchApp.fetch(CF_LOGIN_URL, options);
  } catch (ex) {
    return "Error: " + ex;
  }
  
  var json = JSON.parse(response.getContentText());
  return json["access_token"];
}

function update_app(token, guid, state) {
  const CF_API_URL = PropertiesService.getScriptProperties().getProperty("CF_API_URL")
  if (CF_API_URL === null || CF_API_URL === "")
    return JSON.stringify({"error": "Error: CF_API_URL is not set"});

  var headers = {
    'Authorization': "Bearer " + token,
    "Content-Type" : "application/json"
  };
  var payload = {
    'state': state
  };
  var options = {
    'method': 'put',
    'headers': headers,
    'payload' : JSON.stringify(payload)
  };
  
  try {
    response = UrlFetchApp.fetch(CF_API_URL + guid, options);
    return JSON.stringify({"result": "OK"});
  } catch (ex) {
    return JSON.stringify({"error": ex});
  }
}
