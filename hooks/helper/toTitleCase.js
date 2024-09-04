export default function toTitleCase(sentence) {
    return sentence.replace(/\b\w/g, function (firstLetter) {
        return firstLetter.toUpperCase();
    });
}


export function cleanAndCapitalize(input) {
    if (typeof input === 'number') {
        input = input.toString();
    }
    input = input.trim();
    const cleanedString = input.replace(/[^a-zA-Z0-9_%]+/g, '');

    const capitalizedString = cleanedString.toUpperCase();
    return capitalizedString;
}