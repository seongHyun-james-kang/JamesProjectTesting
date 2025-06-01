// frontend/src/store/csrf.js
// This is a very important piece to connect your frontend to a CSRF-protected backend
// This file creates a special version of fetch, called csrfFetch
// This automatically adds a CSRF token to your requests if needed
// Remember that your backend is protected with CSRF tokens. instead of manually
// adding this token every time, use fetch(), which will do it for you automatically



import Cookies from 'js-cookie'; // your backend will send a cookie called XSRF-TOKEN

export async function csrfFetch(url, options = {}) {
  // set options.method to 'GET' if there is no method
  options.method = options.method || 'GET';
  // set options.headers to an empty object if there is no headers
  options.headers = options.headers || {};

  // if the options.method is not 'GET', then set the "Content-Type" header to
  // "application/json", and set the "XSRF-TOKEN" header to the value of the
  // "XSRF-TOKEN" cookie
  if (options.method.toUpperCase() !== 'GET') { // this will only run for non-GET request(POST,PUT,DELETE, ETC)
    options.headers['Content-Type'] = // if content-type exists leave it alone. other wise set it to 'application/json'
      options.headers['Content-Type'] || 'application/json'; //  because most PUT/POST requests send JSON data. without 'content-type':'application/json', the backend wouldn't know the body is JSON
    options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN'); // puts into a new header called 'XSRF-Token'
  }

  //safely connect rendered website and local website
  const baseUrl =
  import.meta.env.MODE === 'production'
    ? 'https://jamesprojecttesting-1.onrender.com'
    : '';

const res = await window.fetch(baseUrl + url, options);


  // if the response status code is 400 or above, then throw an error with the
  // error being the response
  if (res.status >= 400) throw res;

  // if the response status code is under 400, then return the response to the
  // next promise chain
  return res;
}


// call this to restore the XSRF-TOKEN cookie in development
// call this to get the "XSRF-TOKEN" cookie, should only be used in development
export function restoreCSRF() {
    return csrfFetch('/api/csrf/restore');
  }
  