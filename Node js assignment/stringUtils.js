function capitalize(text) {
    if (!text) return ''
    return text[0].toUpperCase() + text.slice(1)
}

function reverseString(text) {
    return text.split('').reverse().join('')
}

function countVowels(text) {
    let count = 0
    const vowels = 'aeiouAEIOU'

    for (let char of text) {
        if (vowels.includes(char)) {
            count++
        }
    }
    return count
}

module.exports = {
    capitalize,
    reverseString,
    countVowels
}
