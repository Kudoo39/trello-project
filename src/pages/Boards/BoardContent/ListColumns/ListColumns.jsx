import { useState } from 'react'

import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import TextField from '@mui/material/TextField'
import CloseIcon from '@mui/icons-material/Close'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

const ListColumns = ({ columns }) => {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

  const addNewColumn = () => {
    if (!newColumnTitle) {
      return
    }
    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }

  return (
    //https://github.com/clauderic/dnd-kit/issues/183#issuecomment-812569512
    <SortableContext items={columns?.map((c) => c._id)} strategy={horizontalListSortingStrategy}>
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
        {columns?.map((column) => (
          <Column key={column._id} column={column} />
        ))}
        {!openNewColumnForm
          ? <Box onClick={toggleOpenNewColumnForm} sx={{
            minWidth: '250px',
            maxWidth: '250px',
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
          : <Box sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            p: 1,
            borderRadius:'6px',
            height: 'fit-content',
            bgcolor: '#ffffff3d',
            display: 'flex',
            flexDirection: 'column',
            gap: 1
          }}>
            <TextField
              label="Enter column title..."
              type="text"
              size="small"
              variant="outlined"
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
                '& label': { color: 'white' },
                '& input': { color: 'white' },
                '& label.Mui-focused': { color: 'WHITE' },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'white'
                  },
                  '&:hover fieldset': {
                    borderColor: '#bdc3c7'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#bdc3c7'
                  }
                }
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                onClick={addNewColumn} 
                variant="contained" color="success" size="small"
                sx={{
                  boxShadow: 'none',
                  border: '0.5px solid',
                  borderColor: 'success.main',
                  '&:hover': { bgcolor: 'success.main' }
                }}>Add Column</Button>
              <CloseIcon
                fontSize="small"
                sx={{ color: 'white', cursor: 'pointer', '&:hover': { color: 'warning.light' } }}
                onClick={toggleOpenNewColumnForm}
              />
            </Box>
          </Box>}
      </Box>
    </SortableContext>
  )
}

export default ListColumns
