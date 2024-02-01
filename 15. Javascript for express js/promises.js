let p = new Promise((resolve, reject) =>
{
    let a = 1+1;
    if ( a == 2 ) {
        resolve('Success')
    } else {
        reject('failed')
    }
})

p.then((message) => {
    console.log('This is in The then ' + message)
}) .catch((message) => {
    console.log('This is in The then ' + message);
})

//<script src="promises.js"></script>