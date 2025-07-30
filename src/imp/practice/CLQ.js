function counter(){
    let count =0;
    function inncrement(){
        count ++;
        console.log(count)
    }
    function decrement(){
        count --;
        console.log(count)
    }
    return{inncrement,
        decrement
    } 

}
const result= counter();
result.inncrement()
result.decrement()