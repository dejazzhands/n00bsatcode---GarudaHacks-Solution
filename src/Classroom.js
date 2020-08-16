import React, { useState, useEffect } from 'react';

function Classroom() {
  let CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  let API_KEY = process.env.REACT_APP_API_KEY;
  let CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

  const coursesURL = 'https://www.googleapis.com/auth/classroom.courses.readonly';
  const proxy = 'https://cors-anywhere.herokuapp.com/';

  function start() {
    // 2. Initialize the JavaScript client library.
    window.gapi.client.init({
      'apiKey': API_KEY,
      // clientId and scope are optional if auth is not required.
      'clientId': CLIENT_ID,
      'scope': 'profile',
    }).then(function() {
      // 3. Initialize and make the API request.
      return window.gapi.client.request({
        'path': coursesURL
      })
    }).then(function(response) {
      console.log(response.result);
    }, function(reason) {
      // console.log('Error: ' + window.reason.result.error.message);
    });
  };
  // 1. Load the JavaScript client library.

  // async function init() {
  //   // 2. Initialize the JavaScript client library.
  //   await gapi.client.init({
  //     discoveryDocs: ['https://discovery.googleapis.com/$discovery/rest']
  //   });
  //   start();
  // }

  useEffect(() => {
      // fetchCourses();
      window.gapi.load('client', start);
  }, [])

  // const fetchCourses = async () => {
  //   const response = await fetch(proxy+coursesURL, {
  //     method: 'GET',
  //     headers: {
  //       'Authorization': CLIENT_SECRET
  //     }
  //   });
  //   console.log(response);
  // }

  // const start = () => {
  //   gapi.client.init({
  //     'apiKey': API_KEY,
  //
  //   })
  // }

  return (
    <div>
      <button id="authorize_button" style={{display: 'none'}}>Authorize</button>
      <button id="signout_button" style={{display: 'none'}}>Sign Out</button>
      <pre id="content" style={{whiteSpace: 'pre-wrap'}}></pre>
    </div>
  )
}

export default Classroom;
