import React, {Component} from 'react';
import './sort.css';

import Graph from './graph';
import Header from './header'

class Sort extends Component {
    state = {
        arr: [],
        animations: [],
        numbers: 100,
        method: "Merge Sort"
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
        this.handleSort(this.state.method, arr, numbers);
    }

    handleSort = (method, arr, nums) => {
        if(arr.length == 0 && nums == 0){
            arr = this.state.arr;
            nums = this.state.numbers;
        }
        if(method === 'Animate'){
            this.animate();
            return;
        }
        this.setState({method});
        if(method === 'Merge Sort'){
            let copy = arr.slice(0);
            this.mergeSort(copy, 0, nums-1, []);
        } else if(method === 'Quick Sort'){
            let copy = arr.slice(0);
            // console.log(this.quickSort(copy, 0, nums-1));
            this.quickSort(copy, 0, nums-1, []);
        }
    }

    animate = () => {
        const HIGHTLIGHT_COLOR = 'PaleGreen';
        const DEFAULT_COLOR = 'cornflowerblue';
        const SWAP_COLOR = 'Salmon';
        const PIVOT_COLOR = 'RebeccaPurple';
        const speed = 10;
        // slow = 500
        // med = 100
        // fast = 10
        let delay = 1;
        if(this.state.method === 'Merge Sort'){
            delay = 2;
        }
        const animations = this.state.animations;
        const len = animations.length;
        for(let i = 0; i<len; i++){
            const arrayBars = document.getElementsByClassName('number-block');
            if(animations[i].type === 'set'){
                const block = arrayBars[animations[i].pos].style;
                setTimeout(() => {
                    block.height = animations[i].val + 'px';
                    block.backgroundColor = SWAP_COLOR;
                }, i * speed);
                setTimeout(() => {
                    block.backgroundColor = DEFAULT_COLOR;
                }, i * speed + speed);
            } else if (animations[i].type === 'highlight') {
                const block1 = arrayBars[animations[i].pos1].style;
                const block2 = arrayBars[animations[i].pos2].style;
                setTimeout(() => {
                    block1.backgroundColor = HIGHTLIGHT_COLOR;
                    block2.backgroundColor = HIGHTLIGHT_COLOR;
                }, i * speed);
                setTimeout(() => {
                block1.backgroundColor = DEFAULT_COLOR;
                block2.backgroundColor = DEFAULT_COLOR;
                }, i * speed + delay*speed);
            } else if (animations[i].type === 'swap'){
                const block1 = arrayBars[animations[i].pos1].style;
                const block2 = arrayBars[animations[i].pos2].style;
                setTimeout(() => {
                    block1.height = animations[i].val2 + 'px';
                    block2.height = animations[i].val1 + 'px';
                    block1.backgroundColor = SWAP_COLOR;
                    block2.backgroundColor = SWAP_COLOR;
                }, i * speed);
                setTimeout(() => {
                    block1.backgroundColor = DEFAULT_COLOR;
                    block2.backgroundColor = DEFAULT_COLOR;
                }, i * speed + speed);
            } else if (animations[i].type === 'highlightStart'){
                const block1 = arrayBars[animations[i].pos1].style;
                const block2 = arrayBars[animations[i].pos2].style;
                setTimeout(() => {
                    block1.backgroundColor = PIVOT_COLOR;
                    block2.backgroundColor = PIVOT_COLOR;
                }, i * speed);
            } else if (animations[i].type === 'highlightEnd'){
                const block1 = arrayBars[animations[i].pos1].style;
                const block2 = arrayBars[animations[i].pos2].style;
                setTimeout(() => {
                    block1.backgroundColor = DEFAULT_COLOR;
                    block2.backgroundColor = DEFAULT_COLOR;
                }, i * speed);
            }
        }
    }

    // Merge Sort Start
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
            animations.push({type: 'highlight', pos1: low+i, pos2: mid+1+j});
            if(arr1[i] <= arr2[j]){
                arr[k] = arr1[i];
                animations.push({type: 'set', pos: k, val: arr1[i]});
                i++;
            } else {
                arr[k] = arr2[j];
                animations.push({type: 'set', pos: k, val: arr2[j]});
                j++;
            }
            k++;
        }
        while(i < nums1){
            arr[k] = arr1[i];
            // animations.push({type: 'highlight', pos1: low+i, pos2: low+i});
            animations.push({type: 'set', pos: k, val: arr1[i]});
            i++;
            k++;
        }
        while(j < nums2){
            arr[k] = arr2[j];
            // animations.push({type: 'highlight', pos1: mid+1+j, pos2: mid+1+j});
            animations.push({type: 'set', pos: k, val: arr2[j]});
            j++;
            k++;
        }
        this.setState({animations});
    }
    // Merge Sort Start

    // Quick Sort Start
    quickSort = (arr, low, high, animations) => {
        if(low < high){
            const middle = this.quickPartition(arr, low, high, animations);
            this.quickSort(arr, low, middle, animations);
            this.quickSort(arr, middle+1, high, animations);
        }
    }

    quickPartition = (arr, low, high, animations) => {
        const mid = Math.floor((high+low)/2);
        const pivot = arr[mid];
        animations.push({type: 'highlightStart', pos1: mid, pos2: mid});
        let i = low;
        let j = high;
        animations.push({type: 'highlight', pos1: i, pos2: j});
        while(true){
            while(pivot > arr[i]){
                i++;
                animations.push({type: 'highlight', pos1: i, pos2: j});
            }
            while(pivot < arr[j]){
                j--;
                animations.push({type: 'highlight', pos1: i, pos2: j});
            }
            if(i >= j){
                animations.push({type: 'highlightEnd', pos1: mid, pos2: mid});
                this.setState({animations});
                return j;
            }
            animations.push({type: 'swap', pos1: i, val1: arr[i], pos2: j, val2: arr[j]});
            this.swap(arr, i, j);
            i++;
            animations.push({type: 'highlight', pos1: i, pos2: j});
            j--;
            animations.push({type: 'highlight', pos1: i, pos2: j});
        }
    }

    swap = (arr, i, j) => {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    // Quick Sort End

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