import * as React from "react";

class OtherInput extends React.Component<any,any>{
  constructor(props){
    super(props)
    this.state={
      value:props.value || ""
    }

    this.change=this.change.bind(this);
  }
  change(e){
    this.setState({value:e.target.value})
    this.props.onChange(e.target.value)
  }

  render(){
    return (
      <div>
        {this.state.value}
        <label htmlFor={this.props.$id}>{this.props.description}</label>
        <input type="text" onChange={this.change} id={this.props.$id} value={this.state.value}/>
      </div>
    )
  }
}
let BasicInput=(props)=>{
  console.log("render")
  return(
    <div>
        <label htmlFor={props.$id}>{props.description}</label>
        <input type="text" onChange={e=>{props.onChange(e.target.value)}} id={props.$id} defaultValue={props.value}/>
      </div>
  )
}

export {
  BasicInput,
  OtherInput
}