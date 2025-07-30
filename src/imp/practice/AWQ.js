const fetchData = async()=>{
    const myPromise =new Promise((resolve,reject)=>{
        const sucess=true;
        setTimeout(()=>{
            if(sucess){
                resolve("sucess");
            }else{
                reject("fail")
            }
        },1000);
    });
    try{
        const result=await myPromise;
        console.log(result);
    }catch{
        console.log(error);
    }

}
fetchData();
