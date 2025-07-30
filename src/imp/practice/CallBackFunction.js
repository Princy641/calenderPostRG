function greet(name, callback){
    console.log("Hello " + name)
    callback()
}
function Welcome(){
    console.log("Welcome to kellton")
}
greet("Princy", Welcome)