import React, {Component} from 'react';
import './sort.css';

import Graph from './graph';
import Header from './header'

class Sort extends Component {
    state = {
        arr: [],
        animations: [],
        numbers: 10,
    }

    componentDidMount(){
        this.randomizeArray(this.state.numbers);
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
        if(name === 'Animate'){
            this.animate();
        }
        if(name === 'Merge Sort'){
            let copy = this.state.arr.slice(0);
            this.mergeSort(copy, 0, this.state.numbers-1, []);
        }
    }

    animate = () => {
        const animations = this.state.animations;
        const len = animations.length;
        for(let i = 0; i<len; i++){
            const arrayBars = document.getElementsByClassName('number-block');
            const barStyle = arrayBars[animations[i].pos].style;
            setTimeout(() => {
                barStyle.height = animations[i].val + 'px';
              }, i * 10);
            
        }
    }

    mergeSort = (arr, low, high, animations) => {
        if(low < high){
            let mid = Math.floor((low+high)/2);
            this.mergeSort(arr, low, mid, animations);
            this.mergeSort(arr, mid+1, high, animations);
            this.mergeSortedArray(arr, low, mid, high, animations);
        }
    }

    mergeSortedArray = (arr, low, mid, high, animations) => {
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
                animations.push({pos: k, val: arr1[i]});
                i++;
            } else {
                arr[k] = arr2[j];
                animations.push({pos: k, val: arr2[j]});
                j++;
            }
            k++;
        }
        while(i < nums1){
            arr[k] = arr1[i];
            animations.push({pos: k, val: arr1[i]});
            i++;
            k++;
        }
        while(j < nums2){
            arr[k] = arr2[j];
            animations.push({pos: k, val: arr2[j]});
            j++;
            k++;
        }
        this.setState({animations: animations});
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