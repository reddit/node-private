\@r/private
============

A module that provides utilities for when you own your own reddit install.

Snoode Enhancements
-------------------

Login, Register, and Token Refresh

### Usage

```javascript
import APIOptions from '@r/api-client';
import { PrivateAPI } from '@r/private';

const myAppOptions = {
  ...APIOptions,
  clientSecret: 'my-client-secret'
  clientId: 'my-super-secret-app-id',
  withEmailScope: false, // only supported for non-embedded apps
};

const token = await PrivateAPI.login(myAppOptions, username, password);
const newToken = await PrivateAPI.refreshToken(myAppOptions, token.refresh_token);

const token = await PrivateAPI.convertCookiesToAuthToken(myAppOptions, cookies.split(';'));
```
