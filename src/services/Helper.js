import React from 'react';
import axios from 'axios';
import moment from 'moment';

const API = 'https://two-guys-with-computers.herokuapp.com';

export default class Helper {
    
    shrinkArray(array, newSize) {
        let divisibleAmount = array.length / newSize;
        let newArray = [];
        let newIndex = 0;

        if(array.length != newSize) {
            for (let index = 0; index < array.length; index++) {
                if(index % divisibleAmount == 0) {
                    newArray[newIndex] = array[index];
                    newIndex++;
                }
            }
        } else {
            // Just return the original array
            newArray = array;
        }

        return newArray;
    }

    async wakeUpApp() {
        let response = await axios.get(API + `/awake`);
        console.log(response);
    }

    async getData(name, time) {

        
        let dateFormat = 'LLLL';
        if(time === 'day') { dateFormat = 'dddd' }
        if(time === 'month') { dateFormat = 'MMMM' }
        if(time === 'annual') { dateFormat = 'MMMM' }

        let stockTime = time;
        let stockLimit = 12;
        if(time === 'month') {
            stockTime = 'day';
            stockLimit = 252;
        }
        
        let response;        
        try {
            const result = await axios.get(API + `/stock/${name}/${stockTime}/${stockLimit}`);
            response = result.data;
            response.price = this.shrinkArray(response.price, 12);
            response.time = this.shrinkArray(response.time, 12);
            for (let index = 0; index < response.time.length; index++) {
                if(time === 'minute') { 
                    response.time[index] = moment(response.time[index]).fromNow(); 
                } else {
                    response.time[index] = moment(response.time[index]).format(dateFormat);
                }
            }
            return response;
        } catch (error) {
            return 'error';
        }
        
        //this.props.handleStockData(response);
    }

}