const myPromise= new Promise((resolve, reject)=>{
    setTimeout(()=>{
        resolve("Promise Sucess");
    },1000);
})
myPromise
.then(result=>console.log(result))
.catch(error => console.log(error))