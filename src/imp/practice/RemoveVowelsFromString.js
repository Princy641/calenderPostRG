function removeVowels(str){
   let vowels="aieou"
   let newstr=""
    for(let char of str){
        if(!vowels.includes(char)){
            newstr=newstr+char
        }
    }
    return newstr
}
console.log(removeVowels("Princy Sharma"))