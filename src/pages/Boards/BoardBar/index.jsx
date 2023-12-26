import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { Button, Tooltip } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd'

const Menu_Style = {
  'color': 'white',
  'backgroundColor': 'transparent',
  'border': 'none',
  'paddingX': '5px',
  'borderRadius': '4px',
  '.MuiSvgIcon-root': { color: 'white' },
  '&:hover': { backgroundColor: 'primary.50' }
}

const BoardBar = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: (e) => e.trello.boardBarHeight,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        paddingX: 2,
        overflowX: 'auto',
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        borderBottom: '1px solid white'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip sx={Menu_Style} icon={<DashboardIcon />} label="Dashboard" clickable />
        <Chip sx={Menu_Style} icon={<VpnLockIcon />} label="Public/Private Workspace" clickable />
        <Chip sx={Menu_Style} icon={<AddToDriveIcon />} label="Add to Google Drive" clickable />
        <Chip sx={Menu_Style} icon={<BoltIcon />} label="Automation" clickable />
        <Chip sx={Menu_Style} icon={<FilterListIcon />} label="Filters" clickable />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<PersonAddIcon />}
          sx={{ 'color': 'white', 'borderColor': 'white', '&:hover': { borderColor: '#bdc3c7' } }}
        >
          Invite
        </Button>
        <AvatarGroup
          max={6}
          sx={{ 'gap': '10px', '& .MuiAvatar-root': { width: 34, height: 34, fontSize: 16, border: 'none' } }}
        >
          <Tooltip title="Khang Nguyen">
            <Avatar
              alt="Khang Nguyen"
              src="https://scontent.fqlf1-2.fna.fbcdn.net/v/t39.30808-6/292081393_1462365124280298_8364607458906654170_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=Sji6bUizyi4AX-gEsLP&_nc_ht=scontent.fqlf1-2.fna&oh=00_AfBCJkUKwfrF5eNh_9Z6IjEM1ljAzEJkJ5Ce_J7esaxlQQ&oe=6588D17A"
            />
          </Tooltip>
          <Tooltip title="Cry Cat">
            <Avatar
              alt="Cry Cat"
              src="https://th.bing.com/th/id/OIP.DPwPwXzaBIEDIX43v9j-DQAAAA?w=171&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            />
          </Tooltip>
          <Tooltip title="Polite Cat">
            <Avatar
              alt="Polite Cat"
              src="https://th.bing.com/th/id/OIP.9WFVGYKzctQEB6tABW3LPgHaHa?w=160&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            />
          </Tooltip>
          <Tooltip title="Angry Cat">
            <Avatar
              alt="Angry Cat"
              src="https://th.bing.com/th?id=OIF.KtMWPgocHhjJBr9aJAvq%2bQ&w=156&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            />
          </Tooltip>
          <Tooltip title="Cool Cat">
            <Avatar
              alt="Cool Cat"
              src="https://th.bing.com/th/id/OIP.7kcIWXDrxnFHZ157ALzFvQHaFj?w=230&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            />
          </Tooltip>
          <Tooltip title="Vegeta">
            <Avatar
              alt="Vegeta"
              src="https://th.bing.com/th?id=OIF.XDvnqmJ%2fXICBpM6xtjBmWA&w=178&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            />
          </Tooltip>
          <Tooltip title="Vegeta">
            <Avatar
              alt="Vegeta"
              src="https://th.bing.com/th?id=OIF.XDvnqmJ%2fXICBpM6xtjBmWA&w=178&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            />
          </Tooltip>
          <Tooltip title="Vegeta">
            <Avatar
              alt="Vegeta"
              src="https://th.bing.com/th?id=OIF.XDvnqmJ%2fXICBpM6xtjBmWA&w=178&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            />
          </Tooltip>
          <Tooltip title="Vegeta">
            <Avatar
              alt="Vegeta"
              src="https://th.bing.com/th?id=OIF.XDvnqmJ%2fXICBpM6xtjBmWA&w=178&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            />
          </Tooltip>
          <Tooltip title="Vegeta">
            <Avatar
              alt="Vegeta"
              src="https://th.bing.com/th?id=OIF.XDvnqmJ%2fXICBpM6xtjBmWA&w=178&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            />
          </Tooltip>
          <Tooltip title="Vegeta">
            <Avatar
              alt="Vegeta"
              src="https://th.bing.com/th?id=OIF.XDvnqmJ%2fXICBpM6xtjBmWA&w=178&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar
