import Box from '@mui/material/Box'

const BoardContent = () => {
  return (
    <Box
      sx={{
        backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (e) => `calc(100vh - ${e.trello.appBarHeight} - ${e.trello.boardBarHeight})`,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      Board Content
    </Box>
  )
}

export default BoardContent
