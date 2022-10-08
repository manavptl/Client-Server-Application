export function encrypt(plainText) {
    var cipherText = window.btoa(plainText);
    return cipherText;
}

export function decrypt(cipherText) {
    var plainText = window.atob(cipherText);
    return plainText;
}