import React, {Component} from 'react';
import './sort.css';

import Graph from './graph';
import Header from './header';
import Controls from './controls';

const HIGHTLIGHT_COLOR = '#ffcc66';
const DEFAULT_COLOR = 'cornflowerblue';
const SWAP_COLOR = 'FireBrick';
const PIVOT_COLOR = 'RebeccaPurple';
const DONE_COLOR = 'YellowGreen';

const speed_dictionary = {
    Slowest: 2000,
    Slow: 500,
    Medium: 100,
    Fast: 20,
    Fastest: 3,
}

var timeouts = [];

class Sort extends Component {
    state = {
        arr: [],
        animations: [],
        numbers: 50,
        method: "Merge Sort",
        speed: 'Medium',
        working: false,
    }

    componentDidMount(){
        this.randomizeArray(this.state.numbers);
    }

    randomizeArray = (numbers, color) => {
        let arr = [];
        let i=0;
        for(i; i<numbers; i++){
            const randomNum = Math.floor(Math.random() * 615) + 10;
            arr.push(randomNum);
        }
        this.setState({arr, numbers});
        this.handleSort(this.state.method, arr, numbers);
        if(color){
            this.resetColor();
        }
    }

    resetColor = () => {
        const arrayBars = document.getElementsByClassName('number-block');
        const nums = this.state.numbers;
        for(let i=0; i<nums; i++){
            const block = arrayBars[i].style;
            block.backgroundColor = DEFAULT_COLOR;
        }
    }

    handleSpeed = (speed) => {
        this.setState({speed});
    }

    handleSort = (method, arr, nums) => {
        if(arr.length === 0 && nums === 0){
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
            const res = this.mergeSort(copy, 0, nums-1, []);
            console.log(res);
        } else if(method === 'Quick Sort'){
            let copy = arr.slice(0);
            const res = this.quickSort(copy, 0, nums-1, []);
            console.log(res);
        } else if(method === 'Bubble Sort'){
            let copy = arr.slice(0);
            const res = this.bubbleSort(copy, []);
            console.log(res);
        } else if(method === 'Heap Sort'){
            let copy = arr.slice(0);
            const res = this.heapSort(copy, []);
            console.log(res);
        } else if(method === 'Insertion Sort'){
            let copy = arr.slice(0);
            const res = this.InsertionSort(copy, []);
            console.log(res);
        }
    }

    stop = () => {
        for (var i=0; i<timeouts.length; i++) {
            clearTimeout(timeouts[i]);
        }
        this.setState({working: false});
        this.resetColor();
    }

    animate = () => {
        this.setState({working: true});
        
        const speed = speed_dictionary[this.state.speed];
        let delay = 1;
        if(this.state.method === 'Merge Sort'){
            delay = 2;
        }
        const animations = this.state.animations;
        const len = animations.length;
        const arrayBars = document.getElementsByClassName('number-block');
        
        let temp = 0;

        for(let i = 0; i<len; i++){
            if(animations[i].type === 'set'){
                const block = arrayBars[animations[i].pos].style;
                timeouts.push(window.setTimeout(() => {
                    block.height = animations[i].val + 'px';
                    block.backgroundColor = SWAP_COLOR;
                }, i * speed));
                timeouts.push(window.setTimeout(() => {
                    block.backgroundColor = DEFAULT_COLOR;
                }, i * speed + speed));
            } else if (animations[i].type === 'highlight') {
                const block1 = arrayBars[animations[i].pos1].style;
                const block2 = arrayBars[animations[i].pos2].style;
                timeouts.push(window.setTimeout(() => {
                    block1.backgroundColor = HIGHTLIGHT_COLOR;
                    block2.backgroundColor = HIGHTLIGHT_COLOR;
                }, i * speed));
                timeouts.push(window.setTimeout(() => {
                block1.backgroundColor = DEFAULT_COLOR;
                block2.backgroundColor = DEFAULT_COLOR;
                }, i * speed + delay*speed));
            } else if (animations[i].type === 'swap'){
                const block1 = arrayBars[animations[i].pos1].style;
                const block2 = arrayBars[animations[i].pos2].style;
                timeouts.push(window.setTimeout(() => {
                    block1.height = animations[i].val2 + 'px';
                    block2.height = animations[i].val1 + 'px';
                    block1.backgroundColor = SWAP_COLOR;
                    block2.backgroundColor = SWAP_COLOR;
                }, i * speed));
                timeouts.push(window.setTimeout(() => {
                    block1.backgroundColor = DEFAULT_COLOR;
                    block2.backgroundColor = DEFAULT_COLOR;
                }, i * speed + speed));
            } else if (animations[i].type === 'highlightStart'){
                const block1 = arrayBars[animations[i].pos1].style;
                const block2 = arrayBars[animations[i].pos2].style;
                timeouts.push(window.setTimeout(() => {
                    block1.backgroundColor = PIVOT_COLOR;
                    block2.backgroundColor = PIVOT_COLOR;
                }, i * speed));
            } else if (animations[i].type === 'highlightEnd'){
                const block1 = arrayBars[animations[i].pos1].style;
                const block2 = arrayBars[animations[i].pos2].style;
                timeouts.push(window.setTimeout(() => {
                    block1.backgroundColor = DEFAULT_COLOR;
                    block2.backgroundColor = DEFAULT_COLOR;
                }, i * speed));
            } else if (animations[i].type === 'done'){
                const block = arrayBars[animations[i].pos].style;
                timeouts.push(window.setTimeout(() => {
                    block.backgroundColor = DONE_COLOR;
                }, i * speed));
            }
            temp++;
        }
        timeouts.push(window.setTimeout(() => {
            this.setState({working: false});
        }, temp * speed));
    }

    swap = (arr, i, j) => {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    // Merge Sort Start
    mergeSort = (arr, low, high, animations) => {
        if(low < high){
            let mid = Math.floor((low+high)/2);
            this.mergeSort(arr, low, mid, animations);
            this.mergeSort(arr, mid+1, high, animations);
            this.mergeSortedArray(arr, low, mid, high, animations);
        }
        return arr;
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
    // Merge Sort End

    // Quick Sort Start
    quickSort = (arr, low, high, animations) => {
        if(low < high){
            const middle = this.quickPartition(arr, low, high, animations);
            this.quickSort(arr, low, middle, animations);
            this.quickSort(arr, middle+1, high, animations);
        }
        return arr;
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
    // Quick Sort End

    // Bubble Sort Start
    bubbleSort = (arr, animations) => {
        const high = arr.length - 1;
        let swapped = false;
        for(let i=0; i<high; i++){
            for(let j=0; j<high-i; j++){
                animations.push({type: 'highlight', pos1: j, pos2: j+1});
                if(arr[j] > arr[j+1]){
                    animations.push({type: 'swap', pos1: j, val1: arr[j], pos2: j+1, val2: arr[j+1]});
                    this.swap(arr, j, j+1);
                    swapped = true;
                }
            }
            animations.push({type: 'done', pos: high-i});
            if(!swapped){
                return;
            }
        }
        animations.push({type: 'done', pos: 0});
        this.setState({animations});
        return arr;
    }
    // Bubble Sort End

    // Heap Sort Start
    heapSort = (arr, animations) => {
        const nums = arr.length;
        for(let i = Math.floor(nums/2) - 1; i>=0; i--){
            this.heapify(arr, nums, i, animations);
        }
        for(let j=nums-1; j>0; j--){
            animations.push({type: 'swap', pos1: 0, val1: arr[0], pos2: j, val2: arr[j]});
            animations.push({type: 'done', pos: j});
            this.swap(arr, 0, j);
            this.heapify(arr, j, 0, animations);
        }
        animations.push({type: 'done', pos: 0});
        this.setState({animations});
        return arr;
    }

    heapify = (arr, nums, index, animations) => {
        const leftChildIndex = 2*index + 1;
        const rightChildIndex = 2*index + 2;
        let largestIndex = index;
        if(leftChildIndex < nums){
            animations.push({type: 'highlight', pos1: leftChildIndex, pos2: largestIndex});
            if(arr[leftChildIndex] > arr[largestIndex]){
                largestIndex = leftChildIndex;
            }
        }
        if(rightChildIndex < nums){
            animations.push({type: 'highlight', pos1: rightChildIndex, pos2: largestIndex});
            if(arr[rightChildIndex] > arr[largestIndex]){
                largestIndex = rightChildIndex;
            }
        }
        if(largestIndex !== index){
            animations.push({type: 'swap', pos1: index, val1: arr[index], pos2: largestIndex, val2: arr[largestIndex]});
            this.swap(arr, index, largestIndex);
            this.heapify(arr, nums, largestIndex, animations);
        }
        this.setState({animations});
    }
    // Heap Sort End

    // Insertion Sort Start
    InsertionSort = (arr, animations) => {
        const nums = arr.length;
        for(let i=1; i<nums; i++){
            const val = arr[i];
            let j = i - 1;
            animations.push({type: 'highlight', pos1: i, pos2: j});
            while(j >= 0 && arr[j] > val){
                animations.push({type: 'set', pos: j+1, val: arr[j]});
                arr[j+1] = arr[j];
                j--;
                if(j>=0)
                    animations.push({type: 'highlight', pos1: i, pos2: j});
            }
            animations.push({type: 'set', pos: j+1, val: val});
            arr[j+1] = val;
        }
        this.setState({animations});
        return arr;
    }
    // Insertion Sort End

    render() {

        const block_width = window.innerWidth / this.state.numbers;

        return(
            <div className='root'>
                <Header
                    randomizeArray = {this.randomizeArray}
                    handleSort = {this.handleSort}
                    stop = {this.stop}
                    selected = {this.state.method}
                    working = {this.state.working}
                />
                <Graph
                    arr = {this.state.arr}
                    block_width = {block_width}
                />
                <Controls
                    selected = {this.state.speed}
                    handleSpeed = {this.handleSpeed}
                    working = {this.state.working}
                />
                <div className='footer'>
                    <img className='github-icon' src={require('../images/GitHub-Mark-32px.png')}></img>
                    <a className='my-name' href='https://github.com/TerryHintz'>{"Leo Zhang"}</a>
                    <img className='github-icon' src={require('../images/GitHub-Mark-32px.png')}></img>
                </div>
            </div>
        )
    }
}

export default Sort;