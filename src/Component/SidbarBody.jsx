const SidebarBody=()=>{
    const pages=[
        "Dasboard",
        "Add expense",
        "Analytics",
        "Settings"
    ]

    const logos=[
        "bi bi-columns-gap",
        "bi bi-plus-circle",
        "bi bi-bar-chart-line",
        "bi bi-gear"
    ]

    return(
        <>
         <div className="row">
             <div className="col-12 col-md-12 col-lg-12 d-flex" style={{height:"89vh",
                justifyContent:"space-between",
                alignItems:"center",
                flexDirection:"column",
                
             }}>
                <div style={{padding:"1.5rem", width:"100%",borderRight:"1px solid black"}}>
                    {/* {border:"1px solid black",borderRadius:"15px" ,padding:"0.7rem"}*/}
                     <div className="d-flex gap-3 mb-2" style={{backgroundColor:"#7c3aed", borderRadius:"15px" ,padding:"0.4rem"}}>
                              <i className={logos[0]} style={{marginLeft:"1rem"}}></i>
                              <h5>{pages[0]}</h5>
                            </div>
                    {logos.slice(1,5).map((logo,index)=>(
                        <div  key={index}>
                            <div className="d-flex gap-3 mb-2" style={{borderRadius:"15px" ,padding:"0.4rem"}}>
                              <i className={logo}></i>
                              <h5>{pages[index]}</h5>
                            </div>

                        </div>
                    ))}
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

