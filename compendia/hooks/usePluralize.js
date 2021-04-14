export function usePluralize(word, numOfItems) {
    return numOfItems > 1 || numOfItems === 0 || !numOfItems ? word + "s" : word
}
