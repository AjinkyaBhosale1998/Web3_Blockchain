const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const Web3 = require('web3');
const port = 4000;
const web3 = new Web3('https://cloudflare-eth.com/');
const jwtSecret = "some secret message";
const path = require("path");

app.use(express.static('public'));

app.get('/nonce', (req, res) => {
  const nonce = new Date().getTime();
  console.log("in get app");
  const address = req.query.address;
  const tempToken = jwt.sign({ nonce, address }, jwtSecret, { expiresIn: '60s' });
  console.log("address: " + address);
  const message = getSignMessage(address, nonce);
  console.log("message: " + message);
  res.json({ tempToken, message });
});

app.post('/verify', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const tempToken = authHeader && authHeader.split(" ")[1];
  if (tempToken === null) return res.sendStatus(403);
  try {
    const userData = await jwt.verify(tempToken, jwtSecret);
    const nonce = userData.nonce;
    const address = userData.address;
    const message = getSignMessage(address, nonce);
    const signature = req.query.signature;
    console.log("signature: " + signature);
    const verifiedAddress = await web3.eth.accounts.recover(message, signature);
    console.log("verified address: " + verifiedAddress);
    if (verifiedAddress.toLowerCase() === address.toLowerCase()) {
      const token = jwt.sign({ nonce, address }, jwtSecret, { expiresIn: '60s' });
      res.json({ token });
    } else {
      res.sendStatus(403);
    }
  } catch (err) {
    res.sendStatus(403);
  }
});

app.get('/secret', authenticateToken, async (req, res) => {
  console.log("in secret function: " + authenticateToken);
  res.send(`Welcome address ${req.authData.verifiedAddress}`);
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log("authHeader: " + authHeader);
  const token = authHeader && authHeader.split(' ')[1];
  console.log("token: " + token);
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, jwtSecret, (err, authData) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.authData = authData;
    next();
  });
}

function getSignMessage(address, nonce) {
  return `Please sign the message for address ${address}:\n\n${nonce}`;
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// console.log("Step 1");

// app.get("/",(req, res) => {

//     console.log("Step 2");

//     res.sendFile(path.join(__dirname+ "/index.html"));

// })




// const server = app.listen(3000);

// const portNumber = server.address().port;

// console.log(`port is open on "http://localhost:3000"`);


//-----------------------------------------------------
// const express = require('express');
// const app = express();
// const jwt = require('jsonwebtoken');
// const Web3 = require('web3');
// const port = 4000;

// const web3 = new Web3('http://cloudflare-eth.com/');
// const jwtSecret = 'some very secret value';

// app.use(express.static('public'));

// app.get('/nonce', (req, res) => {
//     const nonce = new Date().getTime();
//     const address = req.query.address;

//     const tempToken = jwt.sign({ nonce, address }, jwtSecret, { expiresIn: '60s' });
//     const message = getSignMessage(address, nonce);

//     res.json({ tempToken, message });
// });
// app.post('/verify', async (req, res) => {
//     const authHeader = req.headers['authorization'];
//     const tempToken = authHeader && authHeader.split(' ')[1]; // Use index 1 to get the token

//     if (tempToken === null) return res.sendStatus(403);

//     try {
//         const userData = jwt.verify(tempToken, jwtSecret);
//         const address = userData.address; // Assign address before using it
//         const nonce = userData.nonce; // Assign nonce before using it
//         const message = getSignMessage(address, nonce);
//         const signature = req.query.signature; // Use req.query.signature to get the signature

//         const verifiedAddress = await web3.eth.accounts.recover(message, signature);

//         if (verifiedAddress.toLowerCase() === address.toLowerCase()) {
//             const token = jwt.sign({ verifiedAddress }, jwtSecret, { expiresIn: '1D' });
//             res.json({ token });
//         } else {
//             res.sendStatus(403);
//         }
//     } catch (error) {
//         res.sendStatus(403);
//     }
// });

// app.get('/secret', authenticateToken, async (req, res)) => {
// res.send(`welcome address ${req.authData.verifiedAddress}`)
// }

// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization']
//     const token = authHeader && authHeader.split('')[1]

//     if(token == null) return res.sendStatus(401)

//     jet.verify(token, jwtScrect, (err, authData) => {
//         console.log(err)

//         req.authData = authData
//         next()
//     })
// }


// const getSignMessage = (address, nonce) => {
//     return `please sign this message for address ${address}:\n\n${nonce}`;
// };

// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });











//---------------------------------------------------------------------------









// const express =require('express');
// const app = express();
// const jwt = require('jsonwebtoken');
// const Web3 = require('web3');
// const port =4000

// const web3 = new Web3('http://cloudflare-eth.com/')
// const jwtSecret = 'some very secret value'

// app.use(express.static('public'))

// app.get('/nonce',(req, res) => {
//     const nonce = new Date().getTime()
//     const address = req.query.address

//     const tempToken = jwt.sign({ nonce, address }, jwtSecret, { expireIn: '60s'})
//     const message = getSignMessage(address, nonce)

//     res.json({ tempToken, message })
//     })

//     app.post('/verify', async (req, res) => {
//         const authHeader = req.headers['authorization']
//         const tempToken = authHeader && authHeader.split(" ")

//         if (temp === null) return res.sendStatus(403)

//         const userdata = await jwt.verify(tempToken, jwtSecret)
//         const nonce =userData/nonce
//         const message =getSignMessage(address, nonce)
//         const address = userData.address
//         const signature = req.qurey.signature

//         const verifiedAddress = await web3.eth.accounts.recover(message, signature)
    
//         if (verifiedAddress.toLowerCase() == address.toLowerCase()) {
//             const token = jwt.sign ({ verifiedAddress } , jwtSecret , { expiresIn:'1D'})
//             res.json({ token })
//         } else {
//             res.sendStatus(403)
//         }
//     })
    
//     const getSignMessage = async (address, nonce) => {
//     return `please sign this message for address ${address}:\n\n${nonce}`
//     }


// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`)
// })
