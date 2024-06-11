import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar' //flexible relative import
import BoardContent from './BoardContent/BoardContent' //flexible relative import
import { mockData } from '~/apis/mock_data'
import { fetchBoardDetailsAPI } from '~/apis'

const Board = () => {
  const [board, setBoard] = useState(null)
  useEffect(() => {
    const boardId = '6655e094b16640acefaafcba'
    fetchBoardDetailsAPI(boardId).then((board) => {
      setBoard(board)
    })
  }, [])

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={mockData.board} />
    </Container>
  )
}

export default Board
