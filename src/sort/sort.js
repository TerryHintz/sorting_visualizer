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

    handleSort = (name) => {
        if(name === 'Merge Sort'){
            this.mergeSort(this.state.arr, 0, this.state.numbers-1);
        }
    }

    mergeSort = (arr, low, high) => {
        if(low < high){
            let mid = Math.floor((low+high)/2);
            this.mergeSort(arr, low, mid);
            this.mergeSort(arr, mid+1, high);
            this.mergeSortedArray(arr, low, mid, high);
        }
    }

    mergeSortedArray = (arr, low, mid, high) => {
        let i = 0;
        let j = 0;
        const nums1 = mid - low + 1;
        const nums2 = high - mid;
        let arr1 = [];
        let arr2 = [];
        for(i; i<nums1; i++){
            arr1.push(arr[low+i]);
        }
        for(j; j<nums2; j++){
            arr2.push(arr[mid+1+j])
        }
        i=0;
        j=0;
        let k = low;
        while(i < nums1 && j < nums2){
            if(arr1[i] <= arr2[j]){
                arr[k] = arr1[i];
                i++;
            } else {
                arr[k] = arr2[j];
                j++;
            }
            k++;
        }
        while(i < nums1){
            arr[k] = arr1[i];
            i++;
            k++;
        }
        while(j < nums2){
            arr[k] = arr2[j];
            j++;
            k++;
        }
        this.setState({arr});
    }

    render() {

        const block_width = window.innerWidth / this.state.numbers;

        return(
            <div>
                <Header
                    randomizeArray = {this.randomizeArray}
                    handleSort = {this.handleSort}
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