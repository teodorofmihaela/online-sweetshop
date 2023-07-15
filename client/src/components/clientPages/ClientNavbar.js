import {AppBar, IconButton, Typography, Stack, Button} from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Toolbar from '@mui/material/Toolbar';
import LoginIcon from '@mui/icons-material/Login';
import{Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ClientNavbar() {

    return (
      <>
        <div>
            <AppBar position='static' sx={{background:'#2E3B55'}}>
                <Toolbar>
                    <Stack direction='row' sx={{flexDirection:"end"}} spacing={2}>
                    <Link to="/" className='navbar-logo' >SweetConnect  
          {/* SweetStock  CandyCache SugarTrack SweetHQ TreatTracker
            SugarSync  SweetWorks ConfectionConnect SweetEase SugarVault */}
            <FontAwesomeIcon className="icon" icon="fa-solid fa-ice-cream" />
          </Link>
                        <Button color='inherit' href='/cos'>Vezi cosul<ShoppingCartIcon/></Button>
                        <Button color='inherit' href='/comenzi/adaugare'> Adauga comanda</Button>
                        <Button color='inherit' href='/login'> Login<LoginIcon/></Button>

                    </Stack>
                </Toolbar>
            </AppBar>
        </div>
      </>
    )
  }
  
  export default ClientNavbar;  
  