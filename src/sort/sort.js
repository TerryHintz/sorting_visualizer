import React, {Component} from 'react';
import './sort.css';

import Graph from './graph';
import Header from './header'

class Sort extends Component {
    state = {
        arr: [],
        animations: [],
        numbers: 100,
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
        const speed = 20;
        const animations = this.state.animations;
        const len = animations.length;
        for(let i = 0; i<len; i++){
            const arrayBars = document.getElementsByClassName('number-block');
            if(animations[i].change){
                const block = arrayBars[animations[i].pos].style;
                setTimeout(() => {
                    block.height = animations[i].val + 'px';
                }, i * speed);
            } else {
                const block1 = arrayBars[animations[i].pos1].style;
                const block2 = arrayBars[animations[i].pos2].style;
                setTimeout(() => {
                    block1.backgroundColor = 'black';
                    block2.backgroundColor = 'black';
                  }, i * speed);
                  setTimeout(() => {
                    block1.backgroundColor = 'cornflowerblue';
                    block2.backgroundColor = 'cornflowerblue';
                  }, i * speed + 2*speed);
            }
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
            animations.push({change: false, pos1: low+i, pos2: mid+1+j});
            if(arr1[i] <= arr2[j]){
                arr[k] = arr1[i];
                animations.push({change: true, pos: k, val: arr1[i]});
                i++;
            } else {
                arr[k] = arr2[j];
                animations.push({change: true, pos: k, val: arr2[j]});
                j++;
            }
            k++;
        }
        while(i < nums1){
            arr[k] = arr1[i];
            animations.push({change: false, pos1: low+i, pos2: low+i});
            animations.push({change: true, pos: k, val: arr1[i]});
            i++;
            k++;
        }
        while(j < nums2){
            arr[k] = arr2[j];
            animations.push({change: false, pos1: mid+1+j, pos2: mid+1+j});
            animations.push({change: true, pos: k, val: arr2[j]});
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