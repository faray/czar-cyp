const outputElement = document.getElementById("answer")
const inputElement = document.getElementById("word-textbox")

const generateCiphers = (shift) => {
    const arrayOfAlpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    const ciphersHolder = {}
    const decryptHolder = {}
    
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

    return [ciphersHolder, decryptHolder]
}

const encrypt = (words, shift) => {
    if (shift >= 26 || shift <= 0) {
        return "Invalid shift, shift must be between range [0 < shift < 26]"
    }
    else {
    let encryptedText = ''
    const num = parseInt(shift,10)
    const encryptionCiphers = generateCiphers(num)[0]
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

const decrypt = (words, shift) => {
    if (shift >= 26 || shift <= 0) {
        return "Invalid shift, shift must be between range [0 < shift < 26]"
    }
    else {
    let decryptedText = ''
    const num = parseInt(shift,10)
    decryptionCiphers = generateCiphers(num)[1]
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

//entry point
const check = (action, n) => {
    //gets value of input in textbox
    const words = inputElement.value
    //checks if it is empty
    if(words === undefined || words.trim()==="" || words===""){
        outputElement.innerHTML = "Input is Empty!!!"
    }

    //if not empty,
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
