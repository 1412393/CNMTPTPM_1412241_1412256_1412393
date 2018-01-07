const crypto = require('crypto');
const _ = require('lodash');
const bitInt = require('big-integer');
const ursa = require('ursa');

const HASH_ALGORITHM = 'sha256';

  // SHA256 hash
  let hash = function (data) {
    let hash = crypto.createHash(HASH_ALGORITHM);
    hash.update(data);
    return hash.digest();
  };

  // Convert hex to big int
  let hexToBigInt = function (hex) {
    return bitInt(hex, 16);
  };

  let generateKey = function () {
    // Same as openssl genrsa -out key-name.pem <modulusBits>
    return ursa.generatePrivateKey(1024, 65537);
  };

  let verify = function (message, publicKeyHex, signatureHex) {
    // Create public key form hex
    let publicKey = ursa.createPublicKey(Buffer.from(publicKeyHex, 'hex'));
    // Create verifier
    let verifier = ursa.createVerifier(HASH_ALGORITHM);
    // Push message to verifier
    verifier.update(message);
    // Check with public key and signature
    return verifier.verify(publicKey, signatureHex, 'hex');
  };

exports.sign = function (message, privateKeyHex) {
    // Create private key form hex
    let privateKey = ursa.createPrivateKey(Buffer.from(privateKeyHex, 'hex'));
    // Create signer
    let signer = ursa.createSigner(HASH_ALGORITHM);
    // Push message to verifier
    signer.update(message);
    // Sign
    return signer.sign(privateKey, 'hex');
  };

exports.generateAddress = function () {
    let privateKey = generateKey();
    let publicKey = privateKey.toPublicPem();
    return {
      privateKey: privateKey.toPrivatePem('hex'),
      publicKey: publicKey.toString('hex'),
      // Address is hash of public key
      address: hash(publicKey).toString('hex')
    };
  };

exports.toBinary = function (transaction, withoutUnlockScript) {
    let version = Buffer.alloc(4);
    version.writeUInt32BE(transaction.version);
    let inputCount = Buffer.alloc(4);
    inputCount.writeUInt32BE(transaction.inputs.length);
    let inputs = Buffer.concat(transaction.inputs.map(input => {
        // Output transaction hash
        let outputHash = Buffer.from(input.referencedOutputHash, 'hex');
        // Output transaction index
        let outputIndex = Buffer.alloc(4);
        // Signed may be -1
        outputIndex.writeInt32BE(input.referencedOutputIndex);
        let unlockScriptLength = Buffer.alloc(4);
        // For signing
        if (!withoutUnlockScript) {
            // Script length
            unlockScriptLength.writeUInt32BE(input.unlockScript.length);
            // Script
            let unlockScript = Buffer.from(input.unlockScript, 'binary');
            return Buffer.concat([ outputHash, outputIndex, unlockScriptLength, unlockScript ]);
        }
        // 0 input
        unlockScriptLength.writeUInt32BE(0);
        return Buffer.concat([ outputHash, outputIndex, unlockScriptLength]);
    }));
    let outputCount = Buffer.alloc(4);
    outputCount.writeUInt32BE(transaction.outputs.length);
    let outputs = Buffer.concat(transaction.outputs.map(output => {
        // Output value
        let value = Buffer.alloc(4);
        value.writeUInt32BE(output.value);
        // Script length
        let lockScriptLength = Buffer.alloc(4);
        lockScriptLength.writeUInt32BE(output.lockScript.length);
        // Script
        let lockScript = Buffer.from(output.lockScript);
        return Buffer.concat([value, lockScriptLength, lockScript ]);
    }));
    return Buffer.concat([ version, inputCount, inputs, outputCount, outputs ]);
};

// Sign transaction
/*exports.sign2 = function (transaction, keys) {
    let message = toBinary(transaction, true);
    transaction.inputs.forEach((input, index) => {
        let key = keys[index];
        let signature = sign(message, key.privateKey);
        // Genereate unlock script
        input.unlockScript = 'PUB ' + key.publicKey + ' SIG ' + signature;
    });
};*/


