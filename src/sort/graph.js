import React, {Component} from 'react';
import './sort.css'

class Graph extends Component {
    render() {
        return(
            <div className='sort-container'>
                {this.props.arr.map((num, index) => {
                    return (
                        <div
                            id={index}
                            key={index}
                            style={{height: num + 'px', width: this.props.block_width}}
                            className='number-block'>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Graph;