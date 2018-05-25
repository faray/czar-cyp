
// get reference to dom objects/elements for textbox & output 
const outputElement = document.getElementById("answer")
const inputElement = document.getElementById("word-textbox")

/**
 * @description - This is a function to generate the ciphers according to the given shift
 * @param {number} shift 
 * @returns {object} an object containing the ciphers
 */
const generateCiphers = (shift) => {
    const arrayOfAlpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('') // create an array of all english alphabets
    const ciphersHolder = {} // empty object for holding ciphers for encryption
    const decryptHolder = {} // empty object for holding ciphers for decryption
    
    /* loop through the alphaArrays, get the ciphers for(both uppercase & lowercase)
     * Add the ciphers to the respective objects
    */
    arrayOfAlpha.forEach((alpha) => {
        const ind = arrayOfAlpha.indexOf(alpha)
        if (ind - shift < 0) {
            nInd = (arrayOfAlpha.length + ind) - shift
            ciphersHolder[alpha] = arrayOfAlpha[nInd]
            ciphersHolder[alpha.toLowerCase()] = arrayOfAlpha[nInd].toLowerCase()

            decryptHolder[arrayOfAlpha[nInd]] = alpha
            decryptHolder[arrayOfAlpha[nInd].toLowerCase()] = alpha.toLowerCase()
        }
        else{
            ciphersHolder[alpha] = arrayOfAlpha[ind - shift]
            ciphersHolder[alpha.toLowerCase()] = arrayOfAlpha[ind - shift].toLowerCase()

            decryptHolder[arrayOfAlpha[ind - shift]] = alpha
            decryptHolder[arrayOfAlpha[ind - shift].toLowerCase()] = alpha.toLowerCase()
        }
    })

    return { ciphersHolder, decryptHolder }
}

/**
 * @description - This function encrypts the given words according to the given shift argument
 * @param {string} words 
 * @param {number} shift 
 * @returns {string} - encrypted words
 */
const encrypt = (words, shift) => {
    const num = parseInt(shift,10) // convert shift to integer
    // check if shift is valid and between 0 and 26
    if (num >= 26 || num <= 0 || isNaN(num)) {
        return "Invalid shift, shift must be between range [0 < shift < 26]"
    }
    else {
    let encryptedText = ''
    const encryptionCiphers = generateCiphers(num).ciphersHolder
    words.split('').forEach((ch) => {
        if (encryptionCiphers[ch]) {
            encryptedText += encryptionCiphers[ch]
        }
        else {
            encryptedText += ch
        }
    })
    return encryptedText
    }
}

/**
 * @description - This function decrypts the given words according to the given shift argument
 * @param {string} words 
 * @param {number} shift 
 * @returns {string} - decrypted words
 */
const decrypt = (words, shift) => {
    const num = parseInt(shift,10) // convert shift to integer
    // check if shift is valid and between 0 and 26
    if (num >= 26 || num <= 0 || isNaN(num)) {
        return "Invalid shift, shift must be between range [0 < shift < 26]"
    }
    else {
    let decryptedText = ''
    decryptionCiphers = generateCiphers(num).decryptHolder
    words.split('').forEach((ch) => {
        if (decryptionCiphers[ch]) {
            decryptedText += decryptionCiphers[ch] 
        }
        else {
            decryptedText += ch
        }
    })
    return decryptedText
    }
}

/**
 * @description This is the entry point for the app
 * @param {string} action 
 * @param {number} n 
 */
const main = (action, n) => {
    //gets value of input in textbox
    const words = inputElement.value
    //checks if input is empty
    if(words === undefined || words.trim()==="" || words===""){
        outputElement.innerHTML = "Input is Empty!!!"
    }

    //if not empty
    else{
        switch(action){
            case 'encrypt':
            outputElement.innerHTML = encrypt(words, n)
            break
            case 'decrypt':
            outputElement.innerHTML = decrypt(words, n)
            break
            default:
            outputElement.innerHTML = "Wrong action"
            break
        }
    }
}
