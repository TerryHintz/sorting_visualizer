import React, {Component} from 'react';
import './sort.css';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';

const sorting_methods = [
    "Merge Sort",
    "Quick Sort",
    "Heap Sort",
    "Bubble Sort",
    "Insertion Sort",
];

class Header extends Component {
    state = {
        numsInput: 100,
        drawer: false,
    }

    handleChange = (event) =>{
        let {name, value} = event.target;
        if(value > 1000){
            value = 1000;
        }
        this.setState({[name]: value})
    }

    toggleDrawer = () => {
        this.setState({drawer: !this.state.drawer})
    }

    render() {
        return(
            <div className='header'>
                    <div className='header-section'>
                        <span className='header-text'>{'Numbers:'}</span>
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
                            className={this.props.working ? 'disable-button header-button' : 'header-button'}
                            disabled={this.props.working}
                            onClick={() => this.props.randomizeArray(this.state.numsInput, true)}
                        >
                            {'Random'}
                        </Button>
                    </div>
                    <div className='header-section'>
                        <Button
                            className={'header-button'}
                            style={{backgroundColor: this.props.working ? 'red' : 'limegreen'}}
                            key={'animate'}
                            variant='contained'
                            onClick={() => this.props.working ? this.props.stop() : this.props.handleSort('Animate', [], 0)}
                        >
                            {this.props.working ? 'Terminate' : 'Animate'}
                        </Button>
                        {sorting_methods.map((method) => {
                            return (
                                <Button
                                    disabled={this.props.working}
                                    className={this.props.working ? 'sort-alg disable-button header-button' : 'sort-alg header-button'}
                                    style={{backgroundColor: this.props.selected === method ? 'rgb(220, 0, 78)' : '#3f51b5'}}
                                    key={method}
                                    variant='contained'
                                    onClick={() => this.props.handleSort(method, [], 0)}
                                >
                                    {method}
                                </Button>
                            )
                        })}
                        <Button
                            className={this.props.working ? 'mobile-sort disable-button header-button' : 'mobile-sort header-button'}
                            style={{backgroundColor: '#3f51b5'}}
                            onClick={() => this.toggleDrawer()}
                        >
                            {'Algorithms'}
                        </Button>
                    </div>
                    <Drawer anchor={'bottom'} open={this.state.drawer} onClose={() => this.toggleDrawer()}>
                        {sorting_methods.map((method) => {
                            return (
                                <div
                                    key={method + ' mobile'}
                                    onClick={() => this.props.handleSort(method, [], 0)}
                                    style={{backgroundColor: this.props.selected === method ? 'salmon' : 'white'}}
                                    className='mobile-button'
                                >
                                    {method}
                                </div>
                            )
                        })}
                    </Drawer>
                </div>
        )
    }
}

export default Header;