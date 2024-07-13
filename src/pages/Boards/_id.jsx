import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar' //flexible relative import
import BoardContent from './BoardContent/BoardContent' //flexible relative import
// import { mockData } from '~/apis/mock_data'
import { fetchBoardDetailsAPI, createNewColumnAPI, createNewCardAPI } from '~/apis'

const Board = () => {
  const [board, setBoard] = useState(null)
  useEffect(() => {
    const boardId = '6655e094b16640acefaafcba'
    fetchBoardDetailsAPI(boardId).then((board) => {
      setBoard(board)
    })
  }, [])

  // Function: call API to create a new column & refresh State Board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })
  }

  // Function: call API to create a new card & refresh State Board
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
      />
    </Container>
  )
}

export default Board
