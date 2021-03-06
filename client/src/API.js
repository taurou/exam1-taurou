async function logIn(credentials) {
  let response = await fetch('/api/sessions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    const user = await response.json();
    return user;
  }
  else {
    try {
      const errDetail = await response.json();
      throw errDetail.message;
    }
    catch (err) {
      throw err;
    }
  }
}

async function logOut() {
  await fetch('/api/sessions/current', { method: 'DELETE' });
}

async function getUserInfo() {
  const response = await fetch('/api/sessions/current');
  const userInfo = await response.json();
  if (response.ok) {
    return userInfo;
  } else {
    throw userInfo;  // an object with the error coming from the server
  }
}

async function getAllSurveys() {
  const response = await fetch('/api/survey/all/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const responseJSON = await response.json();
  return responseJSON;

}

async function getAllSurveysByAdmin() {
  const response = await fetch('/api/survey/all/byadmin', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const responseJSON = await response.json();
  return responseJSON;

}



async function getSurveyById(id) {
  const response = await fetch('/api/survey/id/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const responseJSON = await response.json();
  return responseJSON;
}

async function getCountAnswers() {
  const response = await fetch('/api/survey/countanswers/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const responseJSON = await response.json();
  return responseJSON;
}


async function getAnswerIDs(id) {
  const response = await fetch('/api/survey/answerids/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const responseJSON = await response.json();
  return responseJSON;
}

async function getAnswerById(id) {
  const response = await fetch('/api/answer/id/' + id, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const responseJSON = await response.json();
  return responseJSON;


}

const API = { logIn, logOut, getUserInfo, getAllSurveys, getAllSurveysByAdmin, getSurveyById, getCountAnswers, getAnswerIDs, getAnswerById };

export default API;
