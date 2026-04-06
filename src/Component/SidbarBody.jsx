const SidebarBody=()=>{
    const pages=[
        "Dasboard",
        "Add expense",
        "Analytics",
        "Settings"
    ]
    return(
        <>
         <div className="row">
             <div className="col-1 col-md-3 col-lg-3 d-flex" style={{height:"89vh",
                justifyContent:"space-between",
                alignItems:"center",
                flexDirection:"column",
                borderRight:"1px solid black"
             }}>
                <div style={{padding:"1.5rem", width:"100%"}}>
                    <h5 className="w-100 " style={{border:"1px solid black",borderRadius:"15px" ,padding:"0.7rem"}}>Dashboard</h5>
                    <h5 className="w-100 " style={{border:"1px solid black",borderRadius:"15px",padding:"0.7rem"}}>Add expense</h5>
                    <h5 className="w-100 " style={{border:"1px solid black",borderRadius:"15px" ,padding:"0.7rem"}}>Analytics</h5>
                    <h5 className="w-100 " style={{border:"1px solid black",borderRadius:"15px" ,padding:"0.7rem"}}>Settings</h5>
                </div>
                <div style={{width:"100%"}}>
                    <hr></hr>
                    <div className="w-100" style={{padding:"1.5rem"}}>
                        <div className="p-3 d-flex" style={{borderRadius:"15px",backgroundColor:"#e5daf9"}}>
                            <div style={{backgroundColor:"#7c3aed" ,width:"48px",borderRadius:"50%"}}>
                                <i className="bi bi-coin p-2" style={{color:"gold", fontSize:"2rem"}}></i>
                            </div>
                            <div>
                                <p className="mt-2 ms-2">Track smart</p>
                                
                            </div>
                        </div>
                    </div>
                </div>
             </div>

           </div>
        </>
    )
}
export default SidebarBody;