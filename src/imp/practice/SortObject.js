let obj={a:3, b:1,c:2}
const sortedObject= Object.entries(obj)
.sort((a,b)=>a[1]-b[1])
.reduce((acc, [key, value])=>{
    acc[key]=value;
    return acc
},{})
console.log(sortedObject)