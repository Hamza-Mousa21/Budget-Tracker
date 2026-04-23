import { useEffect, useState } from "react";
import Sidebar from "./sidebar";
import SidebarBody from "./SidbarBody";
import MobileSidebar from "./mobileSidebar";
import Mode from './Mode'
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
    },[])
    const [clicked,setClicked]=useState(false)
    const handleOnClick=()=>{
        setClicked(true)
    }
    return (
        
        <>
          <div className="row sticky-top"style={{backgroundColor:"white"}} >
            <div className="col-2 col-md-3 col-lg-3 position-relative shadow-lg" style={{paddingLeft:"1.2rem" ,backgroundColor:"#e5daf9",borderBottom:"2px solid #7c3aed"}}>
                {!isSmall && <Sidebar></Sidebar>}
                {isSmall&& <i class="bi bi-list position-absolute" style={{fontSize:"2rem",
                    top:"50%",
                    left:"50%",
                    transform:"translate(-50%,-50%)"
                    
                    }} onClick={()=>handleOnClick()}></i>}
                   {isSmall&&clicked&& <MobileSidebar></MobileSidebar>}
            </div>  
            <div className="col-10 col-md-9 col-lg-9 position-sticky d-flex justify-content-between shadow-lg" style={{top:0,paddingTop:"1.2rem",paddingLeft:"1.2rem",}}>
               <div>
                    <h3 style={{background:"linear-gradient(135deg, #7c3aed, #ec4899)",
                        backgroundClip:"text",
                        WebkitBackgroundClip:"text",
                        color:"transparent"
                    }}>Welcome back, Hamza Mousa</h3>
                    <span style={{color:"gray"}}>{date}</span>
               </div>

              {!isSmall && <Mode></Mode>}
            </div>
         </div> 
           
        </>
    )
}
export default Header