const Header=()=>{
      const date=new Date().toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
});
  
    return (
        
        <>
            <header className="position-sticky p-3 d-flex justify-content-between" style={{top:0}}>
               <div>
                <h3>Welcome back, Hamza Mousa</h3>
                <p style={{color:"gray"}}>{date}</p>
               </div>
               <div className="d-flex">  
                <div>
                    <i class="bi bi-brightness-high me-3" style={{fontSize:"2rem",
                        border:"1px solid black",
                        borderRadius:"8px",
                        paddingLeft:"6px",
                        paddingRight:"6px",
                        cursor:"pointer"
                        }}></i>

                    {isDark &&<i class="bi bi-moon me-3" onClick={handleDarkMode} style={{fontSize:"2rem",
                        border:"1px solid black",
                        borderRadius:"8px",
                        paddingLeft:"6px",
                        paddingRight:"6px",
                        cursor:"pointer"
                        }}></i>} 
                    
                </div> 
                <div>
                    <i class="bi bi-person" style={{fontSize:"2rem",
                        border:"1px solid black",
                        borderRadius:"8px",
                        paddingLeft:"6px",
                        paddingRight:"6px"
                        }}></i>
                </div> 
               </div>
            </header>
        </>
    )
}
export default Header