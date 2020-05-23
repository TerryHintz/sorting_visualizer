import React, {Component} from 'react';
import './sort.css';
import Button from '@material-ui/core/Button';

const sorting_methods = [
    "Animate",
    "Merge Sort",
    "Quick Sort",
    "Heap Sort",
    "Bubble Sort",
    "Insertion Sort",
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
                        <Button
                            color='primary'
                            variant="contained"
                            onClick={() => this.props.randomizeArray(this.state.numsInput, true)}
                        >
                            {'Randomize'}
                        </Button>
                    </div>
                    <div className='header-section'>
                        {sorting_methods.map((method) => {
                            return (
                                <Button
                                    style={{margin: '0 8px'}}
                                    key={method}
                                    color= {this.props.selected === method ? 'secondary' : 'primary'} 
                                    variant="contained"
                                    onClick={() => this.props.handleSort(method, [], 0)}
                                >
                                    {method}
                                </Button>
                            )
                        })}
                    </div>
                </div>
        )
    }
}

export default Header;