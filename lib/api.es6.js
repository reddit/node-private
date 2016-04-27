import superagent from 'superagent';
import url from 'url';
import { btoa } from 'Base64';

const SCOPES = 'history,identity,mysubreddits,read,subscribe,vote,submit,' +
               'save,edit,account,creddits,flair,livemanage,modconfig,' +
               'modcontributors,modflair,modlog,modothers,modposts,modself,' +
               'modwiki,privatemessages,report,wikiedit,wikiread';

export default function (API) {
  return class PrivateAPI extends API {
    login (username, pass) {
      return new Promise((r, x) => {
        if (!this.config.oauthAppOrigin) {
          x('Please set up a Reddit Oauth App, and pass in its URL as oauthAppOrigin to config.');
        }

        if (!this.config.clientId) {
          x('Please set up a Reddit Oauth App, and pass in its id as clientId to config.');
        }

        if (!this.config.clientSecret) {
          x('Please set up a Reddit Oauth App, and pass in its secret as clientSecret to config.');
        }

        superagent
          .post(`${this.config.origin}/api/login/${username}`)
          .type('form')
          .send({ user: username, passwd: pass, api_type: 'json' })
          .end((err, res) => {
            if (err || !res.ok) {
              return x(err || res);
            }

            const cookies = (res.header['set-cookie'] || []).map(c => {
              return c.split(';')[0];
            });

            if (res.header['set-cookie'].join('').indexOf('reddit_session')) {
              return this.convertCookiesToAuthToken(cookies).then(r,x);
            }

            x('Invalid login information.');
          });
      });
    }

    refreshToken (refreshToken) {
      return new Promise(function(resolve, reject) {
        const endpoint = `${this.config.oauthAppOrigin}/api/v1/access_token`;
        const s = atob(
          `${this.config.clientId}:${this.config.clientSecret}`
        );

        const basicAuth = `Basic ${s}`;

        const data = {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        };

        const headers = {
          'User-Agent': this.config.userAgent,
          'Authorization': basicAuth,
          ...this.config.defaultHeaders,
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

    convertCookiesToAuthToken (cookies) {
      return new Promise((resolve, reject) => {
        if (!cookies) { reject('No cookies passed in'); }

        const endpoint = `${this.config.origin}/api/me.json`;

        const headers = {
          'User-Agent': this.config.userAgent,
          cookie: cookies.join('; '),
          ...this.config.defaultHeaders,
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
            const endpoint = `${this.config.origin}/api/v1/authorize`;

            const redirect_uri = `${this.config.oauthAppOrigin}/oauth2/token`;

            const clientId = this.config.clientId;
            const clientSecret = this.config.clientSecret;

            const postParams = {
              client_id: clientId,
              redirect_uri,
              scope: SCOPES,
              state: modhash,
              duration: 'permanent',
              authorize: 'yes',
            };

            headers['x-modhash'] = modhash;

            superagent
              .post(endpoint)
              .set(headers)
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

                const endpoint = `${this.config.origin}/api/v1/access_token`;

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
                  'User-Agent': this.config.userAgent,
                  'Authorization': basicAuth,
                  ...this.config.defaultHeaders,
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
  };
}
