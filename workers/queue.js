'use strict'

const Queue = require('bull');

let redis = {
    host:'redis-14430.c273.us-east-1-2.ec2.redns.redis-cloud.com',
    port: 14430,
    password: 'UvhnwQOIuPLy0etFAijptauKZIrY3o2C',
    
};

const {
    myJob: myJobWorker,
    usersJob: usersJobWorker
} = require('./workers')

const myJob = new Queue('myJob',{redis});
const usersJob = new Queue('usersJob',{redis});

myJob.process(1, (job,done)=>myJobWorker(job,done));
usersJob.process(1, (job,done)=>usersJobWorker(job,done));


const queues = [{
    name: 'myJob',
    hostId: 'Job de test de configuración',
    redis
},
{
    name: 'usersJob',
    hostId: 'Job de creación de usuario',
    redis
}
];

module.exports = {
    myJob,
    usersJob,
    queues
}