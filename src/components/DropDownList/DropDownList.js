import React, { Component } from 'react'
import './DropDownList.css';
import IconSvg from '../../utilities/svg/svg'


class DropDownList extends Component {

    state = {
        showList: false
    }

    componentDidMount(){
        document.addEventListener('mousedown', this.handleClick, false)
    }
    
    componentWillUnmount(){
         document.removeEventListener('mousedown', this.handleClick, false)
    }

    toggleList = () => {
        this.setState(prevState => ({
            ...prevState,
            showList: !prevState.showList
        }))
    }

    handleClick = e => {         
        if(this.target && this.target.contains(e.target)){
            return
        } else {
            if(this.state.showList){
                this.toggleList()
            }
            
        }     
    }

    render() {

        let list = this.props.list;
        const {showList} = this.state

        return (
            <div className={`drop-down-list ${showList ? 'show' : ''}`}
                 ref={el => this.target = el}
                 onClick={this.toggleList}>
                    <div className="drop-down-list__value">
                        {this.props.value}
                        <IconSvg icon="arrow_down"/>
                    </div>
                    <ul className={`drop-down-list__list`}>
                        {list.map(item => 
                            <li className={`drop-down-list__list__item
                                        ${item.value && this.props.value === item.value ? 'active':''}
                                        ${item.text && this.props.value === item.text ? 'active':''}
                                        ${this.props.value === item ? 'active' : ''}`}
                                key={item.text ? item.text : item}
                                onClick={() => this.props.selectItemHandler(item.value ? item.value : item)}>
                                {item.text ? item.text : item}
                            </li>
                        )}
                    </ul>     
            </div>
        )
    }
}


export default DropDownList;