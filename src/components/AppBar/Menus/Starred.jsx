import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { handleFutureFeature } from '~/utils/handleFutureFeature'

const Starred = () => {
  return (
    <Box>
      <Button
        sx={{ color: 'white' }}
        id="basic-button-starred"
        onClick={handleFutureFeature}
        endIcon={<ExpandMoreIcon />}
      >
        Starred
      </Button>
    </Box>
  )
}

export default Starred
