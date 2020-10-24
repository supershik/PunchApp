export const API_URL = "http://198.18.24.41:8081/";

export const requestLogin = (data) => {
  const url = API_URL + "mobileapppassword";
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
  .then((response) => response.json())
  .then((responseJson) => {
     return responseJson
  })
  .catch((error) => {
    console.log('---------login Api error----------', error)
    return "error";
  });
};

export const requestPunch = (data) => {
  const url = API_URL + "mobileapppunch";
  
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Authorization:  `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  })
  .then((response) => response.json())
  .then((responseJson) => {
     return responseJson
  })
  .catch((error) => {
    return "error";
  });
};


export const requestGps = (data, token) => {
  const url = API_URL + "mobileappgpsdata";
  
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // Authorization:  `Bearer ${token}`,
    },
    body: JSON.stringify(data)
  })
  .then((response) => response.json())
  .then((responseJson) => {
     return responseJson
  })
  .catch((error) => {
    return "error";
  });
};