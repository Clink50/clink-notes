// import axios from 'axios';
import express from 'express';
import cookieParser from 'cookie-parser';

// import {
//   FB_ACCOUNT_TYPE,
//   FB_TOKEN_TYPE,
//   SIGN_IN_ENDPOINT,
//   LOOKUP_ENDPOINT,
//   REFRESH_TOKEN,
// } from '../utils/constants';

const users = [
  {
    id: 1,
    emailAddress: 'clink1@gmail.com',
    password: 'test123',
    accessToken: 'fake-jwt',
  },
  {
    id: 2,
    emailAddress: 'clink2@gmail.com',
    password: 'test123',
  },
  {
    id: 3,
    emailAddress: 'clink3@gmail.com',
    password: 'test123',
  },
  {
    id: 4,
    emailAddress: 'clink4@gmail.com',
    password: 'test123',
  },
  {
    id: 5,
    emailAddress: 'clink5@gmail.com',
    password: 'test123',
  },
];

const app = express();

app.use(cookieParser());
app.use(express.json());

const refreshTokens = {};

app.post('/login', (req, res, next) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const authRequest = req.body;

        console.log('[API] Login called.');

        const user = users
          .filter(
            ({ emailAddress, password }) =>
              emailAddress === authRequest.emailAddress && password === authRequest.password
          )
          .shift();

        if (!user) {
          throw new Error('User does not exist.');
        }

        const response = {
          user: {
            id: user.id,
            emailAddress: user.emailAddress,
          },
          accessToken: 'fake-jwt',
          refreshToken: 'i6mapTIAVSp2oJkgUnCACKKfZxt_H5MBLiqcybBB' + Math.ceil(Math.random() * 100),
        };

        refreshTokens[response.refreshToken] = {
          accessToken: response.accessToken,
          user: {
            id: user.id,
            emailAddress: response.emailAddress,
          },
        };

        res.json(response);
      } catch (e) {
        if (e.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(e.response.data);
        } else if (e.request) {
          console.log(e.request);
        } else {
          console.log('Error', e.message);
        }
        res.json({
          error: {
            stack: e.stack,
            message: e.message,
          },
          body: null,
        });
      }
    }, 500);
  });
});

// app.post('/refresh', async (req, res) => {
//   try {
//     const { refreshToken } = req.body;

//     console.log('[API] Refresh called.');

//     if (refreshToken in refreshTokens) {
//       const user = refreshTokens[refreshToken].user;

//       const { data } = await axios.post(
//         `${process.env.FB_TOKEN_URL}/v1/${FB_TOKEN_TYPE}?key=${process.env.FB_API_KEY}`,
//         {
//           grant_type: REFRESH_TOKEN,
//           refresh_token: refreshToken,
//         }
//       );

//       delete refreshTokens[refreshToken];

//       const idToken = data.idToken;
//       const newRefreshToken = data.refreshToken;

//       refreshTokens[newRefreshToken] = {
//         idToken,
//         user,
//       };
//       res.json({
//         token: {
//           idToken,
//           refreshToken: newRefreshToken,
//         },
//       });
//     } else {
//       res.sendStatus(401);
//     }
//   } catch (e) {
//     if (e.response) {
//       // The request was made and the server responded with a status code
//       // that falls out of the range of 2xx
//       console.log(e.response.data);
//     } else if (e.request) {
//       console.log(e.request);
//     } else {
//       console.log('Error', e.message);
//     }
//   }
// });

// [GET] /user
app.get('/user', (req, res) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const accessToken = req.headers.authorization.split(' ')[1];

        console.log('[API] User called.');

        const response = {
          users,
        };

        const user = response.users.find((user) => user.accessToken === accessToken);

        res.json({
          user: {
            userId: user.id,
            emailAddress: user.emailAddress,
          },
        });
      } catch (e) {
        if (e.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(e.response.data);
        } else if (e.request) {
          console.log(e.request);
        } else {
          console.log('Error', e.message);
        }
        res.json({
          error: {
            stack: e.stack,
            message: e.message,
          },
          body: null,
        });
      }
    });
  }, 500);
});

// [POST] /logout
app.post('/logout', (req, res) => {
  console.log('[API] Logout called.');
  res.json({ status: 'OK' });
});

// Error handler
app.use((e, req, res) => {
  console.log('[API] Error called.');
  if (e.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(e.response.data);
  } else if (e.request) {
    console.log(e.request);
  } else {
    console.log('Error', e.message);
  }
  res.status(401).send(e + '');
});

// -- export app --
export default {
  path: '/api/auth',
  handler: app,
};
