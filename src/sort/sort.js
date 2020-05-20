import React, {Component} from 'react';
import './sort.css'

const sorting_methods = [
    "Merge Sort",
    "Quick Sort",
    "Heap Sort",
    "Bubble Sort",
]

class Sort extends Component {
    state = {
        arr: [],
        numbers: 1,
        numsInput: 100,
    }

    componentDidMount(){
        this.randomizeArray(100);
    }

    handleChange = (event) =>{
        const {name, value} = event.target;
        this.setState({[name]: value})
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

    render() {

        const block_width = window.innerWidth / this.state.numbers;

        return(
            <div>
                <div className='header'>
                    <div className='header-section'>
                        <span className='header-text'>{'Number of Integers:'}</span>
                        <input
                            type='text'
                            className='header-input'
                            name='numsInput'
                            value={this.state.numsInput}
                            onChange={this.handleChange}
                        />
                        <span className='header-button' onClick={() => this.randomizeArray(this.state.numsInput)}>{'Randomize'}</span>
                    </div>
                    <div className='header-section'>
                        {sorting_methods.map((method) => {
                            return (
                                <span className='header-button'>
                                    {method}
                                </span>
                            )
                        })}
                    </div>
                </div>
                <div className='sort-container'>
                    {this.state.arr.map((num, index) => {
                        return (
                            <div 
                                key={index}
                                style={{height: num + 'px', width: block_width}}
                                className='number-block'>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Sort;