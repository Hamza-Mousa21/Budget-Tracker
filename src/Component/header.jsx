import { useState } from "react";

const Header=()=>{
    const date=new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
        });

    const [isDark,setIsDark]=useState(false)    
    const handleDarkMode=()=>{
        setIsDark(!isDark)
    }
    return (
        
        <>
            <header className="position-sticky d-flex justify-content-between" style={{top:0,borderBottom:"1px solid",paddingTop:"1.2rem",paddingLeft:"1.2rem"}}>
               <div>
                    <h3>Welcome back, Hamza Mousa</h3>
                    <span style={{color:"gray"}}>{date}</span>
               </div>
               <div className="d-flex">  
                <div >
                      {!isDark&& <i class="bi bi-brightness-high me-3" onClick={handleDarkMode} style={{fontSize:"2rem",
                        border:"1px solid black",
                        borderRadius:"8px",
                        paddingLeft:"6px",
                        paddingRight:"6px",
                        cursor:"pointer"
                        }}></i>}

                    {isDark &&<i class="bi bi-moon me-3" onClick={handleDarkMode} style={{fontSize:"2rem",
                        border:"1px solid black",
                        borderRadius:"8px",
                        paddingLeft:"6px",
                        paddingRight:"6px",
                        cursor:"pointer"
                        }}></i>}

                    {isDark &&<i class="bi bi-moon me-3" onClick={handleDarkMode} style={{fontSize:"2rem",
                        border:"1px solid black",
                        borderRadius:"8px",
                        paddingLeft:"6px",
                        paddingRight:"6px",
                        cursor:"pointer"
                        }}></i>} 
                    
                </div> 
                <div style={{paddingRight:"1.2rem"}}>
                    <i class="bi bi-person" style={{fontSize:"2rem",
                        border:"1px solid black",
                        borderRadius:"8px",
                        paddingLeft:"6px",
                        paddingRight:"6px",
                        cursor:"pointer"
                        }}></i>
                </div> 
               </div>
            </header>
        </>
    )
}
export default Header