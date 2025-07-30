const a = 1, b = 3;
const swap = (a, b) => {
    let temp = a;
    a = b;
    b = temp
    return [a, b]
}
const [swapa, swapb] = swap(a, b)
console.log(swapa, swapb);
