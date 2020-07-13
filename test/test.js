const { describe, it } = require('mocha')
const { encrypt, decrypt } = require('../src/index')
const { assert } = require('chai')
const crypto = require('crypto')

const password = 'Password used to generate key'
const key = crypto.scryptSync(password, 'salt', 16)
const algorithm = 'aes-128-cbc'
const bytes = 16

let encryptResponse
describe('Encrypt data while using default algorithm and number of bytes', () => {
  encryptResponse = encrypt(key, password)
  it('returns an object', () => {
    assert.isObject(encryptResponse, 'encrypted response is an object')
  })

  it('returns a string called iv', () => {
    assert.isString(encryptResponse.iv, 'iv is a string')
  })

  it('returns a string called data', () => {
    assert.isString(encryptResponse.data, 'data is a string')
  })
})

describe('Encrypt data with all four parameters', () => {
  encryptResponse = encrypt(key, password, algorithm, bytes)
  it('returns an object', () => {
    assert.isObject(encryptResponse, 'encrypted response is an object')
  })

  it('returns a string called iv', () => {
    assert.isString(encryptResponse.iv, 'iv is a string')
  })

  it('returns a string called data', () => {
    assert.isString(encryptResponse.data, 'data is a string')
  })
})

describe('Decrypt encrypted data while using default algorithm', () => {
  const decryptResponse = decrypt(key, encryptResponse.data, encryptResponse.iv)
  it('returns a string', () => {
    assert.isString(decryptResponse, 'decrypted data is a string')
  })
})

describe('Decrypt encrypted data with all four parameters', () => {
  const decryptResponse = decrypt(key, encryptResponse.data, encryptResponse.iv, algorithm)
  it('returns a string', () => {
    assert.isString(decryptResponse, 'decrypted data is a string')
  })
})

describe('Returns error message for missing required params', () => {
  const encryptWithOutData = encrypt()
  it('throws an error for missing required parameters while encrypting', () => {
    assert.isString(encryptWithOutData, 'Error message is a string')
  })

  const decryptWithOutData = decrypt()
  it('Returns an error message for missing required parameters', () => {
    assert.isString(decryptWithOutData, 'Error message is a string')
  })
})

describe('Returns error from catch block', () => {
  it('returns error message while encrypting', () => {
    const bytes = 24
    const encrypted = encrypt(key, password, algorithm, bytes)
    assert.isString(encrypted, 'Error message is a string')
  })

  it('returns error message while decrypting', () => {
    const algorithm = 'aes-192-cbc'
    const decrypted = decrypt(key, encryptResponse.data, encryptResponse.iv, algorithm)
    assert.isString(decrypted, 'Error message is a string')
  })
})
