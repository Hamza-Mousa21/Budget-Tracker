import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import SidebarBody from "./SidbarBody";

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
    const [isSmall,setIsSmall]=useState(window.innerWidth<785)
    useEffect(()=>{
        const handleSmallScreen=()=>{
            setIsSmall(window.innerWidth<785)
        }
        window.addEventListener("resize",handleSmallScreen)
        return ()=> window.removeEventListener("resize",handleSmallScreen)
    })
    return (
        
        <>
          <div className="row ">
            <div className="col-1 col-md-3 col-lg-3 position-relative" style={{paddingLeft:"1.2rem",borderBottom:"1px solid black"}}>
                {!isSmall && <Sidebar></Sidebar>}
                {isSmall&& <i class="bi bi-list position-absolute" style={{fontSize:"2rem",
                    top:"50%",
                    left:"50%",
                    transform:"translate(-50%,-50%)"
                    
                    }}></i>}
            </div>  
            <div className="col-11 col-md-9 col-lg-9 position-sticky d-flex justify-content-between" style={{top:0,borderBottom:"1px solid",paddingTop:"1.2rem",paddingLeft:"1.2rem",}}>
               <div>
                    <h3 style={{background:"linear-gradient(135deg, #7c3aed, #ec4899)",
                        backgroundClip:"text",
                        WebkitBackgroundClip:"text",
                        color:"transparent"
                    }}>Welcome back, Hamza Mousa</h3>
                    <span style={{color:"gray"}}>{date}</span>
               </div>
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
            </div>
           </div> 
           {!isSmall && <SidebarBody></SidebarBody>}
        </>
    )
}
export default Header