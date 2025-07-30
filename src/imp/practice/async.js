const fetchData = async() => {
    const myPromis = new Promise((resolve, reject) => {
        setTimeout(() => {
            const sucess = true;
            if (sucess) {
                resolve("good")
            } else {
                reject("fail")
            }
        }, 1000)
    })
    try {
        const result = await myPromis;
        console.log(result);
    } catch (error) {
        console.log(error)
    }

}
fetchData()