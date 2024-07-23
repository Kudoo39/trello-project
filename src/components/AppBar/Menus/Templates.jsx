import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Check from '@mui/icons-material/Check'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { handleFutureFeature } from '~/utils/handleFutureFeature'

const Templates = () => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <Button
        sx={{ color: 'white' }}
        id="basic-button-templates"
        aria-controls={open ? 'basic-menu-templates' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<ExpandMoreIcon />}
      >
        Templates
      </Button>
      <Menu
        id="basic-menu-templates"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-templates'
        }}
      >
        <MenuItem onClick={handleFutureFeature}>
          <ListItemText inset>Single</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleFutureFeature}>
          <ListItemText inset>1.15</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleFutureFeature}>
          <ListItemText inset>Double</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleFutureFeature}>
          <ListItemIcon>
            <Check />
          </ListItemIcon>
          Custom: 1.2
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleFutureFeature}>
          <ListItemText>Add space before paragraph</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleFutureFeature}>
          <ListItemText>Add space after paragraph</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleFutureFeature}>
          <ListItemText>Custom spacing...</ListItemText>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default Templates
