import AttachmentIcon from '@mui/icons-material/Attachment'
import CommentIcon from '@mui/icons-material/Comment'
import GroupIcon from '@mui/icons-material/Group'
import Button from '@mui/material/Button'
import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'

const Card = ({ hideMedia }) => {
  if (hideMedia) {
    return (
      <MuiCard sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}>
        <CardContent sx={{ 'p': 1.5, '&:last-child': { p: 1.5 } }}>
          <Typography>Raining Card</Typography>
        </CardContent>
      </MuiCard>
    )
  }

  return (
    <MuiCard sx={{ cursor: 'pointer', boxShadow: '0 1px 1px rgba(0,0,0,0.2)', overflow: 'unset' }}>
      <CardMedia
        sx={{ height: 140 }}
        image="https://github.com/Kudoo39/serenity-space/raw/main/src/assets/city/rain.png"
        title="green iguana"
      />
      <CardContent sx={{ 'p': 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>Serenity Space</Typography>
      </CardContent>
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        <Button size="small" startIcon={<GroupIcon />}>
          30
        </Button>
        <Button size="small" startIcon={<CommentIcon />}>
          20
        </Button>
        <Button size="small" startIcon={<AttachmentIcon />}>
          14
        </Button>
      </CardActions>
    </MuiCard>
  )
}

export default Card
