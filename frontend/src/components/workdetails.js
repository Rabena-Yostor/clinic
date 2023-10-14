const workdetails=({work})=> {
    return(
        <div className="Details">
            <h4>{work.Name}</h4>
            <p><strong>age:</strong>{work.age}</p>
        </div>
    )
}
export default workdetails