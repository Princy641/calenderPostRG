let i=0;
const output=setInterval(()=>{
    console.log(i)
    i++;

if(i>=10){
    clearInterval(output)
}
},1000)