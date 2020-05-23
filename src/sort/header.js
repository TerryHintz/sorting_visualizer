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
                            className={this.props.working ? 'disable-button' : null}
                            disabled={this.props.working}
                            onClick={() => this.props.randomizeArray(this.state.numsInput, true)}
                        >
                            {'Randomize'}
                        </Button>
                    </div>
                    <div className='header-section'>
                        {sorting_methods.map((method) => {
                            return (
                                <Button
                                    disabled={this.props.working}
                                    className={this.props.working ? 'disable-button header-button' : 'header-button'}
                                    style={{backgroundColor: this.props.selected === method ? 'rgb(220, 0, 78)' : '#3f51b5'}}
                                    key={method}
                                    variant='contained'
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