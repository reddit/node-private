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

API = privateAPI(API);

const token = await API.login(username, password);
const newToken = await API.refreshToken(token.refresh_token);

const token = await API.convertCookiesToAuthToken(cookies.split(';'));
```

