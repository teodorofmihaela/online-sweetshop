


 <>
 <nav className='navbar'>
   <div className='navbar-container'>
     <Link to="/" className='navbar-logo' onClick={closeMobieMenu}>ServiceNow
         {/* <FontAwesomeIcon icon={faHome} /> */}
         {/* <i class="fab fa-typo3"/> */}
         <i class="fa fa-cogs"/>
         {/* <i class="fa fa-plug"/>   
         <i class="fa fa-star-half-o"/>
         <i class="fa fa-users"/>
         <i class="fa fa-user-plus"/>
         <i class="fa fa-handshake-o"></i> */}
       </Link>
     <div className='menu-icon' onClick={handleClick}>
       <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
     </div>
     <ul className={click ? 'nav-menu active' : 'nav-menu'} >
       <li className='nav-item'>
         <Link to='/' className='nav-links' onClick={closeMobieMenu}>
           _____________<i class="fa fa-search"/>
         </Link>
       </li>
       <li className='nav-item'>
         <Link to='/chat' className='nav-links'  onClick={closeMobieMenu}>
           Chat
         </Link>
       </li>
       <li className='nav-item'>
         <Link to='/my-listings' className='nav-links' onClick={closeMobieMenu}>
         My listings
         </Link>
       </li>
       <li className='nav-item'>
         <Link to='/contul-meu' className='nav-links' onClick={closeMobieMenu}>
           Contul meu
           <img src="/images/f_avatar.svg" height="30em"/>
         </Link>
       </li>
     </ul>
     {button && <Button buttonStyle={`btn-outline`}>Sign in</Button>}
 </div>
 </nav>
</>