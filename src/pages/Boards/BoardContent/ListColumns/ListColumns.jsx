import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'

const ListColumns = () => {
  return (
    <Box
      sx={{
        'display': 'flex',
        'width': '100%',
        'height': '100%',
        'overflowX': 'auto',
        'overflowY': 'hidden',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}
    >
      <Column />
      <Column />
      <Box
        sx={{
          minWidth: '200px',
          maxWidth: '200px',
          backgroundColor: '#ffffff3d',
          mx: 2,
          borderRadius: '6px',
          height: 'fit-content'
        }}
      >
        <Button
          startIcon={<NoteAddIcon />}
          sx={{ color: 'white', width: '100%', justifyContent: 'flex-start', py: 1, pl: 3 }}
        >
          Add a new column
        </Button>
      </Box>
    </Box>
  )
}

export default ListColumns
