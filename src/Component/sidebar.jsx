const Sidebar=()=>{
    return(
        <>
            <div className="position-absolute" style={{left:"0", width:"auto",paddingTop:"1.2rem"}}>
               <div className="d-flex" style={{fontSize:"2rem",alignItems:"baseline" ,background:"linear-gradient(135deg, #7c3aed, #ec4899)",
                        backgroundClip:"text",
                        WebkitBackgroundClip:"text",
                        color:"transparent"}} >
                <i className="bi bi-wallet me-3 " style={{paddingLeft:"15px"}}></i>
                <h2>  HamzaMousa</h2>
               </div>  
                
            </div>
        </>
    )
}
export default Sidebar;