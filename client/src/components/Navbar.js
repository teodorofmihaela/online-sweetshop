import React,{useEffect, useState, useContext} from 'react';
import{Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BarChartIcon from '@mui/icons-material/BarChart';
import './Navbar.css';
import CakeIcon from '@mui/icons-material/Cake';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import NoteAddIcon from '@mui/icons-material/NoteAdd';
import StorefrontIcon from '@mui/icons-material/Storefront';
import InventoryIcon from '@mui/icons-material/Inventory';
import LogoutIcon from '@mui/icons-material/Logout';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { LoginContext } from '../context/LoginContext';

function Navbar() {
  const { displayClient } = useContext(LoginContext)
  const { displayBucatar } = useContext(LoginContext)
  const { displayAdmin } = useContext(LoginContext)
  const { displayVanzator } = useContext(LoginContext)



  const[click, setClick]=useState(false);
  const[button,setButton]=useState(true);

  const handleClick=()=>setClick(!click);
  const closeMobieMenu=()=>setClick(false);

  const showButton=()=>{
    if(window.innerWidth<=960){
      setButton(false);
    }else{
      setButton(true);
    }
  };

  useEffect(()=>{
    showButton()
  },[]);

  window.addEventListener('resize',showButton);
  return (
  <>
    <nav className='navbar'>
      <div className='navbar-container'>
        <Link to="/" className='navbar-logo' onClick={closeMobieMenu}>SweetConnect  
          {/* SweetStock  CandyCache SugarTrack SweetHQ TreatTracker
            SugarSync  SweetWorks ConfectionConnect SweetEase SugarVault */}
            <FontAwesomeIcon className="icon" icon="fa-solid fa-ice-cream" />
          </Link>
        <ul className={click ? 'nav-menu active' : 'nav-menu'} >
          <li className='nav-item'>
            <Link to='/retetar' className='nav-links' onClick={closeMobieMenu}>
            <FontAwesomeIcon className="icon-menu" icon="fa-solid fa-book" />Retetar
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/aprovizionare' className='nav-links'  onClick={closeMobieMenu}>
            <FontAwesomeIcon className="icon-menu" icon="fa-solid fa-cubes-stacked" />Aprovizionare
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/achizitii' className='nav-links'  onClick={closeMobieMenu}>
            <FontAwesomeIcon className="icon-menu" icon="fa-solid fa-cubes-stacked" />Achizitii
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/produse' className='nav-links'  onClick={closeMobieMenu}>
            <CakeIcon/>Produse
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/stoc_produse' className='nav-links'  onClick={closeMobieMenu}>
            <InventoryIcon/>Stoc produse
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/laborator' className='nav-links' onClick={closeMobieMenu}>
            <FontAwesomeIcon className="icon-menu" /><RestaurantIcon/>Laborator
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/vanzari' className='nav-links'  onClick={closeMobieMenu}>
            <PointOfSaleIcon/>Vanzari
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/comenzi' className='nav-links'  onClick={closeMobieMenu}>
            <NoteAddIcon/>Comenzi
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/statistici' className='nav-links' onClick={closeMobieMenu}>
            <BarChartIcon className="icon-menu" />Statistici
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/furnizori' className='nav-links' onClick={closeMobieMenu}>
            <FontAwesomeIcon className="icon-menu" /><StorefrontIcon/>Furnizori
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/personal' className='nav-links' onClick={closeMobieMenu}>
            <FontAwesomeIcon className="icon-menu" icon="fa-solid fa-users-gear" />Personal
            </Link>
          </li>
          <li className='nav-item'>
            <Link to='/login' className='nav-links' onClick={closeMobieMenu}>
            <FontAwesomeIcon className="icon-menu"/><LogoutIcon/>Log out
            </Link>
          </li>
          {/* <li className='support'>
            Support: 
            </li> 
            <li className='support'>
            <FontAwesomeIcon icon="fa-regular fa-envelope" />
            <a href="mailto:teodorofmihaela19@stud.ase.ro" target="_blank" rel="noopener noreferrer">
            teodorofmihaela19@stud.ase.ro</a>
            </li>
            <li className='support'>
          <FontAwesomeIcon icon="fa-solid fa-phone" />
          <a href='tel:+40761324489' target={"_blank"} rel="noreferrer"> 0761324489</a>
          </li> */}
        </ul>
    </div>
    </nav>
  </>
  )
}

export default Navbar
