\@r/private
============

A module that provides utilities for when you own your own reddit install.

Snoode Enhancements
-------------------

Login, Register, and Token Refresh

### Usage

```javascript
import API from '@r/api-client';
import { privateAPI } from '@r/private';

var api = new (privateAPI(API))(options);

const token = await api.login(username, password);
const newToken = await api.refreshToken(token.refresh_token);

const token = await api.convertCookiesToAuthToken(cookies.split(';'));
```

