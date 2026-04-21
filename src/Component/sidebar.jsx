const Sidebar=()=>{
    return(
        <>
          
            <div className="position-static" style={{left:"0", width:"100%",paddingTop:"1.2rem"}}>
               <div className="d-flex" style={{fontSize:"2rem",alignItems:"baseline" ,background:"linear-gradient(135deg, #7c3aed, #ec4899)",
                        backgroundClip:"text",
                        WebkitBackgroundClip:"text",
                        color:"transparent",
                        
                        }} >
                <i className="bi bi-wallet" style={{paddingLeft:"5px"}}></i>
                <h2 className="ms-1">Budget Tracker</h2>
               </div>  
               
            </div>
            
           
        </>
    )
}
export default Sidebar;