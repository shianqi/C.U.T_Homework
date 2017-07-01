import React, { Component } from 'react'
import getMinScore from './getMinScore'

import Commodity from './Commodity'
import Style from './Style.css'

class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            lists : [
                {name:"APT", value: 0},
                {name:"WAF", value: 0},
                {name:"DBScan", value: 0},
                {name:"WebScan", value: 0},
                {name:"USMB", value: 0}
            ],
            score: []
        }
    }

    render () {
        const onChange = (item, index)=>{
            return (value)=>{
                let lists = this.state.lists
                lists[index].value = +value
                this.setState({lists : lists})
            }
        }

        const Commodities = this.state.lists.map((item, index)=>(
            <Commodity key={index} name={item.name} value={item.value} handlerValueChange={onChange(item, index)}/>
        ))

        const account = ()=>{
            const value = this.state.lists.map((item)=>{
                return item.value
            })
            this.setState({score: getMinScore(value)})
        }

        return (
            <div>
                <h1>Commodities</h1>
                { Commodities }
                <input className={Style['submit']} type="button" value="Settle Accounts" onClick={account}/>
                <p>最好打包方案：{this.state.score.join(' ')}</p>
            </div>
        )
    }
}

export default App
