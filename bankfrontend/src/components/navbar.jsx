import styled from '@emotion/styled'
import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import RefreshIcon from '@mui/icons-material/Refresh';
import React from 'react'
import { color } from '@mui/system';


const StyledToolBar = styled(Toolbar)({

  display:"flex",
  justifyContent:"space-between",
})

export default function navbar() {
  return (
    <AppBar position='sticky'>
      <StyledToolBar>
        <AccountBalanceIcon/>
        <Typography sx={{fontFamily: 'monospace',
  fontWeight: 700,
  letterSpacing: '.3rem',
  color: 'inherit',
  textDecoration: 'none',}}>

        Blockchain Bank
        </Typography>

      <IconButton children={<RefreshIcon size='large' sx={{color:'white'}}/>} color='secondary' size='large' edge='start'></IconButton>
      </StyledToolBar>

      
    </AppBar>
  )
}
