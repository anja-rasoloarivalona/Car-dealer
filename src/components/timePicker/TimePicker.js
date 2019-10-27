import React, { Component} from 'react'
import './TimePicker.css'






class TimePicker extends Component {

    state = {
        start: 8,
        end: 16,
        timeRange: [],

        interval: 30,


        showTable: false
    }

    componentWillMount(){
        document.addEventListener('mousedown', this.handleClick, false)
    }

    componentWillUnmount(){
        document.removeEventListener('mousedown', this.handleClick, false)
    }

    componentDidMount(){

        let startTime = this.state.start;
        let hourRange = [];
        let fullHourRange = [];

        while( startTime !== this.state.end){  
            hourRange = [...hourRange, startTime]    
             startTime++
        }

        hourRange.map( hour => {

            let minStart = 0;              
            
            while(minStart < 60){

                let fullMinStart = minStart;

                let fullHourStart = hour;

                if(hour < 10){
                    fullHourStart = `0${hour}`
                }

                if(minStart === 0){
                    fullMinStart = '00'
                }
                fullHourRange = [...fullHourRange, `${fullHourStart}:${fullMinStart}`]
                minStart = minStart + this.state.interval
            }
        })
        this.setState({
            timeRange: fullHourRange
        }, () => console.log(this.state.timeRange))
    }   





    toggleShowTable = () => {
        this.setState(prevState => ({
            showTable: !prevState.showTable
        }))
    }

    selectTimeHandler = time => {
        this.setState({ showTable: false})
        this.props.selectTimeHandler(time)
    }

    handleClick = e => {
        
        
    
        if(this.props.outer && this.props.outer.contains(e.target)){
            return
        }

        this.handleClickOutside()
    }

    handleClickOutside = () => {
        this.setState({ showTable: false})
    }


    render() {
        return (
            <div className="timePicker">
                <div className="timePicker__selected"
                    onClick={this.toggleShowTable}>{this.props.timeSelected}</div>

                <div className={`timePicker__table 
                                ${this.state.showTable ? 'shown': ''}`}>
                    {
                        this.state.timeRange.map(time => (
                            <div key={time} className="timePicker__table__option"
                                 onClick={this.selectTimeHandler.bind(this, time)}>
                                    {time}
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}


export default TimePicker