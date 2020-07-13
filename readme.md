# CurieCipher

A library for encryption and decryption, that works both for the browser and the server.

![](https://github.com/prince-curie/curie-cipher/workflows/CurieCipher/badge.svg)

## Installation
Requirements:

- Node.js
- npm (Node.js package manager)

Use the package manager [npm](https://www.npmjs.com/package/curiecipher) to install CurieCipher.

```bash
npm install curiecipher
```

## Usage

```node
import { encrypt, decrypt } from 'curiecipher'

encrypt("secretKey", "message", "algorithm") # returns an object containing the iv and encrypted data

decrypt("secretKey", "data", "iv", "algorithm") # returns the decrypted data as a string

# algorithm is optional and defaults to aes-128-cbc
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)