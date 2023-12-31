import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'

const BoardContent = () => {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        display: 'flex',
        p: '10px 0'
      }}
    >
      <ListColumns />
    </Box>
  )
}

export default BoardContent
