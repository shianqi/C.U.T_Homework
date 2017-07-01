import React, { Component } from 'react'
import Style from './Style.css'

class Commodity extends Component {
    render () {
        const {
            name,
            value,
            handlerValueChange
        } = this.props

        const onValueChange = function(e){
            handlerValueChange(e.target.value)
        }
        return (
            <div className={Style['commodity']}>
                <span>{ name }</span>
                <input type="number" value={value} onChange={onValueChange}/>
            </div>
        )
    }
}

export default Commodity
