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
import { capitalizeFirstLetter } from '~/utils/formatters'

const MENU_STYLE = {
  'color': 'white',
  'backgroundColor': 'transparent',
  'border': 'none',
  'paddingX': '5px',
  'borderRadius': '4px',
  '.MuiSvgIcon-root': { color: 'white' },
  '&:hover': { backgroundColor: 'primary.50' }
}

const BoardBar = ({ board }) => {
  return (
    <Box
      sx={{
        'width': '100%',
        'height': (e) => e.trello.boardBarHeight,
        'display': 'flex',
        'alignItems': 'center',
        'justifyContent': 'space-between',
        'gap': 2,
        'paddingX': 2,
        'overflowX': 'auto',
        'backgroundColor': (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        '&::-webkit-scrollbar-track': { m: 2 }
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Tooltip title={board?.description}>
          <Chip sx={MENU_STYLE} icon={<DashboardIcon />} label={board?.title} clickable />
        </Tooltip>
        <Chip sx={MENU_STYLE} icon={<VpnLockIcon />} label={capitalizeFirstLetter(board?.type)} clickable />
        <Chip sx={MENU_STYLE} icon={<AddToDriveIcon />} label="Add to Google Drive" clickable />
        <Chip sx={MENU_STYLE} icon={<BoltIcon />} label="Automation" clickable />
        <Chip sx={MENU_STYLE} icon={<FilterListIcon />} label="Filters" clickable />
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
          sx={{
            'gap': '10px',
            '& .MuiAvatar-root': {
              width: 34,
              height: 34,
              fontSize: 16,
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              backgroundColor: '#A9A9A9'
            }
          }}
        >
          <Tooltip title="Khang Nguyen">
            <Avatar
              alt="Khang Nguyen"
              src="https://raw.githubusercontent.com/Kudoo39/react-portfolio/main/public/npdk.jpg"
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
              src="https://i.imgur.com/hahqYwF.jpeg"
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
