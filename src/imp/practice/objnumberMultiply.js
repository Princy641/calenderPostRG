let num={
    a:21,
    b:22
}

function multiplyByTwo(num){
for(key in num){
    if(typeof num[key]=="number"){
        num[key]=num[key]*2
    }
}
}console.log(num)