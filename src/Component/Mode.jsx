import { useState } from "react"

const Mode=()=>{
       const [isDark,setIsDark]=useState(false)    
        const handleDarkMode=()=>{
            setIsDark(!isDark)
        }
    return (
        <>
         <div className="d-flex">  
                <div >
                      {!isDark&& <i class="bi bi-brightness-high me-3" onClick={handleDarkMode} style={{fontSize:"2rem",
                        border:"1px solid lightgray",
                        backgroundColor:"#f8f7f7",
                        borderRadius:"8px",
                        paddingLeft:"6px",
                        paddingRight:"6px",
                        cursor:"pointer",
                        color:"#7c3aed"
                        }}></i>}

                    {isDark &&<i class="bi bi-moon me-3" onClick={handleDarkMode} style={{fontSize:"2rem",
                        border:"1px solid lightgray",
                        backgroundColor:"#f8f7f7",
                        borderRadius:"8px",
                        paddingLeft:"6px",
                        paddingRight:"6px",
                        cursor:"pointer",
                        color:"#7c3aed"
                        }}></i>}

                  
                    
                </div> 
                <div style={{paddingRight:"1.2rem"}}>
                    <i class="bi bi-person" style={{fontSize:"2rem",
                        border:"1px solid lightgray",
                        backgroundColor:"#f8f7f7",
                        borderRadius:"8px",
                        paddingLeft:"6px",
                        paddingRight:"6px",
                        cursor:"pointer",
                        color:"#7c3aed"
                        }}></i>
                </div> 
               </div>
        </>
    )
}

export default Mode; 