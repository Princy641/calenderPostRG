const fetch =async()=>{
    const myPromis = new Promise((reject,resolve)=>{
        setTimeout(()=>{
            const sucess=true;
            if(sucess){
                resolve("complete")
            }else{
                reject("fail")
            }
        },1000)

    })
    try{
        const result = await myPromis;
        console.log(result);
    }catch(error){
        console.log(error)
    }
}
fetch()