const {
  randomBytes, createCipheriv, createDecipheriv
} = require('crypto')

function encrypt (secretKey, data, algorithm = 'aes-128-cbc', noOfBytes = 16) {
  if (!secretKey || !data) {
    return 'secret key or encrypted data is missing'
  }

  try {
    const key = Buffer.from(secretKey, 'hex')

    const iv = randomBytes(noOfBytes)

    const ivAsString = iv.toString('hex')

    const cipher = createCipheriv(algorithm, key, iv)
    let encrypted = cipher.update(data, 'utf8', 'base64')
    encrypted += cipher.final('base64')

    return { iv: ivAsString, data: encrypted }
  } catch (error) {
    return error.message
  }
}

function decrypt (secretKey, data, iv, algorithm = 'aes-128-cbc') {
  if (!secretKey || !data || !iv) {
    return 'secret key or encrypted data or iv is missing'
  }

  try {
    const key = Buffer.from(secretKey, 'hex')
    const ivAsBuffer = Buffer.from(iv, 'hex')

    const decipher = createDecipheriv(algorithm, key, ivAsBuffer)

    // Encrypted using same algorithm, key and iv.
    const encrypted = data

    let decrypted = decipher.update(encrypted, 'base64', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted
  } catch (error) {
    return error.message
  }
}

module.exports = { encrypt, decrypt }
