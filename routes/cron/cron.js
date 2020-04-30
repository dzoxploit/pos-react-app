const cron = require('node-cron');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const faker = require('faker');
const model = require('./Model');


mongoose.connect('mongodb://localhost:27017/nodescheduler').then((res) => {

    console.log('mongoose connected successfully');

    app.get("/insertdata",async (req,res) => {
        let data = [];
        for(let i=0;i < 100;i++){
            let record = {
                minTemp: faker.random.number(),
                maxTemp : faker.random.number(),
                recordedDate : faker.date.past()
            }
            data.push(record);
        }

        await model.insertBulkData(data);

        res.send("Data is inserted");
    })

    app.listen(4000,() => {
        console.log("Server is running port 4000");
    })
    

})
.catch((err) => {
    console.error(err);
})