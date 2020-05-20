import React, {Component} from 'react';
import './sort.css';

import Graph from './graph';
import Header from './header'

class Sort extends Component {
    state = {
        arr: [],
        numbers: 100,
    }

    componentDidMount(){
        this.randomizeArray(100);
    }

    randomizeArray = (numbers) => {
        let arr = [];
        let i=0;
        for(i; i<numbers; i++){
            const randomNum = Math.floor(Math.random() * 500) + 1;
            arr.push(randomNum);
        }
        this.setState({arr, numbers});
    }

    mergeSort = (arr) => {
        const nums = arr.length;
        const mid = Math.floor(nums/2);
        if(nums <= 1){
            return arr;
        }
        let arr1 = arr.slice(0, mid);
        let arr2 = arr.slice(mid);

        arr1 = this.mergeSort(arr1);
        arr2 = this.mergeSort(arr2);

        return this.mergeSortedArray(arr1, arr2);
    }

    mergeSortedArray = (arr1, arr2) => {
        let res = [];
        while(arr1.length && arr2.length){
            if(arr1[0] <= arr2[0]){
                res.push(arr1[0]);
                arr1.shift();
            } else {
                res.push(arr2[0]);
                arr2.shift();
            }
        }
        while(arr1.length){
            res.push(arr1[0]);
            arr1.shift();
        }
        while(arr2.length){
            res.push(arr2[0]);
            arr2.shift();
        }
        return res;
    }

    render() {

        const block_width = window.innerWidth / this.state.numbers;

        return(
            <div>
                <Header
                    randomizeArray = {this.randomizeArray}
                />
                <Graph
                    arr = {this.state.arr}
                    block_width = {block_width}
                />
            </div>
        )
    }
}

export default Sort;