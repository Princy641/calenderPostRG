function palli(str){
    let a= str.split('').reverse().join('');
    return str===a
}
console.log(palli("aabbaa"))