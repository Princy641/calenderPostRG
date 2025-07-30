function largestE(arr){
    let max=-Infinity
    let Secondmax=-Infinity
    for(let num of arr){
        if(num>max){
            Secondmax=max
            max=num
        }else if(num>Secondmax && num<max){
            Secondmax=num
        }
    }
    return Secondmax === -Infinity? "no second largest": Secondmax;


}
console.log(largestE([1,4,3,6,7,10,90,3]))