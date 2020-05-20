import React, {Component} from 'react';
import './sort.css';

const sorting_methods = [
    "Merge Sort",
    "Quick Sort",
    "Heap Sort",
    "Bubble Sort",
];

class Header extends Component {
    state = {
        numsInput: 100,
    }

    handleChange = (event) =>{
        const {name, value} = event.target;
        this.setState({[name]: value})
    }

    render() {
        return(
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
                        <span className='header-button' onClick={() => this.props.randomizeArray(this.state.numsInput)}>{'Randomize'}</span>
                    </div>
                    <div className='header-section'>
                        {sorting_methods.map((method) => {
                            return (
                                <span key={method} className='header-button'>
                                    {method}
                                </span>
                            )
                        })}
                    </div>
                </div>
        )
    }
}

export default Header;