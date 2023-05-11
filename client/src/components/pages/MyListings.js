import React from 'react';
import { Component } from 'react';

// import Button from '@mui/material/Button';

class MyListings extends Component {

  state = {
    anunturi: []
  };

  async componentDidMount() {
    const response = await fetch('/anunturi');
    const body = await response.json();
    this.setState({anunturi: body});
  }

  render(){

    const {anunturi} = this.state;

    return(
    <div>
        <div className='anunturi'>
        {anunturi.map(anunt =>
          <div key={anunt.id}>
            {anunt.id} 
            </div>
            )} 
        {/* <Button variant="outlined" startIcon={<DeleteIcon />}> Delete</Button>  */}
      </div>
    </div>
    );
  }
}

export {MyListings};