// let a = "apple";
// let aList = a.split("").reverse().join("")
// console.log(aList);

function Reverse(str){
    let reverse="";
    for(let i=str.length-1; i>=0; i--){
        reverse += str[i]

    }
    return reverse
}
console.log(Reverse("apple"))