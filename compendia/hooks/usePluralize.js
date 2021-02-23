export function usePluralize(word, numOfItems) {
    return numOfItems > 1 ? word + "s" : word
}
