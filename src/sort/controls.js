import React, {Component} from 'react';
import './sort.css';

import Button from '@material-ui/core/Button';

const speeds = ['Slowest', 'Slow', 'Medium', 'Fast', 'Fastest'];

class Controls extends Component{

    render() {
        return (
            <div className="control-panel">
                {speeds.map((speed) => {
                    return(
                        <Button
                            className={this.props.working ? 'disable-button header-button' : 'header-button'}
                            disabled={this.props.working}
                            style={{backgroundColor: this.props.selected === speed ? 'rgb(220, 0, 78)' : '#3f51b5'}}
                            variant='contained'
                            onClick={() => this.props.handleSpeed(speed)}
                        >
                            {speed}
                        </Button>
                    )
                })}
            </div>
        )
    }
}

export default Controls;