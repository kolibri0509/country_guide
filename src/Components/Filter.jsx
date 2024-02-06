const Filter = (props) => {
    return (
        <div className="filter">
            <h1 style= {{color: "grey"}}>Enter country name.</h1>
            <input onChange={props.find} value={props.value}/>
        </div>
    )
}
export default Filter