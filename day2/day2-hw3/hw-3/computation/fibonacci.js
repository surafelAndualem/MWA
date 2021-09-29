const fibonacci=function(n){
    if(n<0){
        n=n*(-1);
    }
    for(var i = n; i>=0; i--){
       if(i<=2)
       return 1;
       else{
        return fibonacci(i-1) + fibonacci(i-2);
       }

    } 
}

console.log("fibonachi of 30: "+fibonacci(30));
console.log("fibonachi of -15: "+fibonacci(-15));