import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'

import { DndContext, PointerSensor, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'

const BoardContent = ({ board }) => {
  //https://docs.dndkit.com/api-documentation/sensors
  //need to set CSS touch-action to none if using pointerSensor, because of conflicting in CSS
  //const pointerSensor = useSensor(PointerSensor, { activationConstraint: { distance: 5 } })

  //activationConstraint need to move cursor 5px to call an event, fixing bugs with click call events
  const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 5 } })

  const touchSensor = useSensor(TouchSensor, { activationConstraint: { delay: 250, tolerance: 50 } })

  //using mouseSensor and touchSensor to best support both desktop and mobile
  //const sensors = useSensors(pointerSensor)
  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])

  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (event) => {
    console.log(event)
    const { active, over } = event

    if (!over) return

    if (active.id !== over.id) {
      //get position before drag
      const oldIndex = orderedColumns.findIndex((c) => c._id === active.id)
      //get position after drop
      const newIndex = orderedColumns.findIndex((c) => c._id === over.id)

      // https://github.com/clauderic/dnd-kit/blob/master/packages/sortable/src/utilities/arrayMove.ts
      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex)
      //const dndOrderedColumnsId = dndOrderedColumns.map((c) => c._id)
      //data for order of column after drag and drop

      setOrderedColumns(dndOrderedColumns)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <Box
        sx={{
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          display: 'flex',
          p: '10px 0'
        }}
      >
        <ListColumns columns={orderedColumns} />
      </Box>
    </DndContext>
  )
}

export default BoardContent
