'use strict'

const Queue = require('bull');

const myQueue = new Queue('myQueue',{
    redis:{
        host:'redis-14430.c273.us-east-1-2.ec2.redns.redis-cloud.com',
        port: 14430,
        password: 'UvhnwQOIuPLy0etFAijptauKZIrY3o2C',
        
    }
});

myQueue.process(async (job)=>{
    console.log(`Procesando tarea con ID ${job.id}`)

    await new Promise(resolve => setTimeout(resolve,3000));

    console.log(`Tarea completada para ID ${job.id}`)

});

for (let i = 0; i < 10; i++) {
    myQueue.add({ index: i});
}