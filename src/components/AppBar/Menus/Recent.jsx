import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { handleFutureFeature } from '~/utils/handleFutureFeature'

const Recent = () => {
  return (
    <Box>
      <Button
        sx={{ color: 'white' }}
        id="basic-button-recent"
        onClick={handleFutureFeature}
        endIcon={<ExpandMoreIcon />}
      >
        Recent
      </Button>
    </Box>
  )
}

export default Recent
