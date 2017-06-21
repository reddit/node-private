import superagent from 'superagent';
import url from 'url';
import { btoa } from 'Base64';

const SCOPES = 'history,identity,mysubreddits,read,subscribe,vote,submit,' +
               'save,edit,account,creddits,flair,livemanage,modconfig,' +
               'modcontributors,modflair,modlog,modmail,modothers,modposts,modself,' +
               'modwiki,privatemessages,report,wikiedit,wikiread';


const login = (apiOptions, username, pass, otp, orderedHeaders, clientUserAgent) => {
  return new Promise((resolve, reject) => {
    if (!apiOptions.oauthAppOrigin) {
      reject('Please set up a Reddit Oauth App, and pass in its URL as oauthAppOrigin to config.');
    }

    if (!apiOptions.clientId) {
      reject('Please set up a Reddit Oauth App, and pass in its id as clientId to config.');
    }

    if (!apiOptions.clientSecret) {
      reject('Please set up a Reddit Oauth App, and pass in its secret as clientSecret to config.');
    }

    const headers = {
      ...apiOptions.headers,
      'User-Agent': `${clientUserAgent} - ${apiOptions.userAgent}`,
      'X-Reddit-Debug': orderedHeaders.join(';'),
    };

    superagent
      .post(`${apiOptions.origin}/api/login/${username}`)
      .type('form')
      .set(headers)
      .send({ user: username, passwd: pass, otp: otp, api_type: 'json' })
      .end((err, res) => {
        if (err || !res.ok) {
          return reject(err || res);
        }

        const details = parseDetails(res);
        if (details === 'TWO_FA_REQUIRED'){
          resolve(details);
        }

        const errors = parseErrors(res);
        if (errors.length) {
          if (Array.isArray(errors[0]) && !!errors[0][0]) {
            const firstError = errors[0][0];
            return reject(firstError);
          }
          return reject('UNKNOWN_ERROR');
        }

        const cookies = parseCookies(res);
        const redditSessionExists = sessionExists(res);
        if (redditSessionExists) {
          return convertCookiesToAuthToken(apiOptions, cookies, orderedHeaders, clientUserAgent)
            .then(resolve, reject);
        }

        reject('Invalid login information.');
      });
  });
};

const register = (
  apiOptions, username, password, email, newsletter,
  gRecaptchaResponse, orderedHeaders, clientUserAgent) => {

  return new Promise((resolve, reject) => {
    if (!apiOptions.oauthAppOrigin) {
      reject('Please set up a Reddit Oauth App, and pass in its URL as oauthAppOrigin to config.');
    }

    if (!apiOptions.clientId) {
      reject('Please set up a Reddit Oauth App, and pass in its id as clientId to config.');
    }

    if (!apiOptions.clientSecret) {
      reject('Please set up a Reddit Oauth App, and pass in its secret as clientSecret to config.');
    }

    const data = {
      user: username,
      passwd: password,
      passwd2: password,
      'g-recaptcha-response': gRecaptchaResponse,
      api_type: 'json',
    };

    if (email) {
      data.email = email;
    }

    if (newsletter) {
      data.newsletter_subscribe = true;

      if (!email) {
        reject('NEWSLETTER_NO_EMAIL');
      }
    }

    const endpoint = `${apiOptions.origin}/api/register`;
    const s = btoa(`${apiOptions.clientId}:${apiOptions.clientSecret}`);
    const basicAuth = `Basic ${s}`;
    const headers = {
      ...apiOptions.headers,
      'User-Agent': `${clientUserAgent} - ${apiOptions.userAgent}`,
      'Authorization': basicAuth,
      'X-Reddit-Debug': orderedHeaders.join(';'),
    };

    superagent
      .post(endpoint)
      .set(headers)
      .type('form')
      .send(data)
      .timeout(10000)
      .end((err, res) => {
        const obj = {};
        if (err || !res.ok) {
          obj.status = err.timeout ? 504 : res.status || 500;
          obj.errorType = obj.status;
        }

        const errors = parseErrors(res);
        if (errors.length) {
          if (Array.isArray(errors[0]) && !!errors[0][0]) {
            const firstError = errors[0][0];
            return reject(firstError);
          }
          return reject('UNKNOWN_ERROR');
        }

        const cookies = parseCookies(res);
        const redditSessionExists = sessionExists(res);
        if (redditSessionExists) {
          return convertCookiesToAuthToken(apiOptions, cookies, orderedHeaders, clientUserAgent)
            .then(resolve, reject);
        }
        reject('UNKNOWN_ERROR');
     });
  });
}

// Parses the error message for login and register functions
const parseErrors = (res) => {
  if (res.body.json && res.body.json.errors) {
    return res.body.json.errors;
  }
  return [];
}

// Parses the details for login function
const parseDetails = function parseDetails(res) {
  if (res.body.json && res.body.json.data) {
    return res.body.json.data.details;
  }
};

// Parses the cookies for the login and register functions
const parseCookies = res => {
  return (res.header['set-cookie'] || []).map(c => c.split(';')[0])
}

// Parses set-cookie header to see if the session exists
const sessionExists = (res) => {
  return res.header['set-cookie'].join('').indexOf('reddit_session') > -1;
}

const refreshToken = (apiOptions, refreshToken, orderedHeaders, clientUserAgent) => {
  return new Promise((resolve, reject) => {
    const endpoint = `${apiOptions.origin}/api/v1/access_token`;
    const s = btoa(
      `${apiOptions.clientId}:${apiOptions.clientSecret}`
    );

    const basicAuth = `Basic ${s}`;

    const data = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    };

    const headers = {
      ...apiOptions.headers,
      'Authorization': basicAuth,
      'User-Agent': `${clientUserAgent} - ${apiOptions.userAgent}`,
      'X-Reddit-Debug': orderedHeaders.join(';'),
    };

    superagent
      .post(endpoint)
      .set(headers)
      .type('form')
      .send(data)
      .end((err, res) => {
        if (err || !res.ok) {
          if (err.timeout) { err.status = 504; }
          return reject(err || res);
        }

        /* temporary while api returns a `200` with an error in body */
        if (res.body.error) {
          return reject(401);
        }

        return resolve(res.body);
      });
  });
}

const convertCookiesToAuthToken = (apiOptions, cookies, orderedHeaders, clientUserAgent) => {
  return new Promise((resolve, reject) => {
    if (!cookies) { reject('No cookies passed in'); }

    const endpoint = `${apiOptions.origin}/api/me.json`;

    const headers = {
      ...apiOptions.headers,
      'User-Agent': `${clientUserAgent} - ${apiOptions.userAgent}`,
      'X-Reddit-Debug': orderedHeaders.join(';'),
      cookie: cookies.join('; '),
    };

    superagent
      .get(endpoint)
      .set(headers)
      .end((err, res) => {
        if (err || !res.ok) {
          if (err.timeout) { err.status = 504; }
          return reject(err || res);
        }

        if (res.body.error || !res.body.data) {
          return reject(401);
        }

        const modhash = res.body.data.modhash;
        const endpoint = `${apiOptions.origin}/api/v1/authorize`;

        const redirect_uri = `${apiOptions.oauthAppOrigin}/oauth2/token`;

        const clientId = apiOptions.clientId;
        const clientSecret = apiOptions.clientSecret;

        const additionalScopes = (
          apiOptions.additionalScopes ? `,${apiOptions.additionalScopes}` : ''
        );
        const scope = SCOPES + additionalScopes;

        const postParams = {
          client_id: clientId,
          redirect_uri,
          scope,
          state: modhash,
          duration: 'permanent',
          authorize: 'yes',
        };

        const modhashedHeaders = { ...headers, 'x-modhash': modhash };

        superagent
          .post(endpoint)
          .set(modhashedHeaders)
          .type('form')
          .send(postParams)
          .redirects(0)
          .end((err, res) => {
            if (res.status !== 302) {
              return resolve(res.status || 500);
            }

            if (res.body.error) {
              return resolve(401);
            }

            const location = url.parse(res.headers.location, true);
            const code = location.query.code;

            const endpoint = `${apiOptions.origin}/api/v1/access_token`;

            const postData = {
              grant_type: 'authorization_code',
              code,
              redirect_uri,
            };

            const s = btoa(
              `${clientId}:${clientSecret}`
            );

            const basicAuth = `Basic ${s}`;

            const headers = {
              'User-Agent': apiOptions.userAgent,
              'Authorization': basicAuth,
              ...apiOptions.defaultHeaders,
            };

            superagent
              .post(endpoint)
              .set(headers)
              .send(postData)
              .type('form')
              .end(function(err, res) {
                if (err || !res.ok) {
                  if (err.timeout) { err.status = 504; }
                  reject(err);
                }

                return resolve(res.body);
              });
          });
      });
  });
}

export default {
  login,
  register,
  refreshToken,
  convertCookiesToAuthToken,
};
