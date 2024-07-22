import { useEffect, useState, useCallback, useRef } from 'react'
import { cloneDeep, isEmpty } from 'lodash'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { generatePlaceholderCard } from '~/utils/formatters'

import {
  DndContext,
  // PointerSensor,
  // MouseSensor,
  // TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners,
  // closestCenter,
  pointerWithin,
  // rectIntersection,
  getFirstCollision
} from '@dnd-kit/core'
import { MouseSensor, TouchSensor } from '~/customLibs/DndKitSensors'
import { arrayMove } from '@dnd-kit/sortable'

import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

const BoardContent = ({ board, createNewColumn, createNewCard, moveColumns, moveCardSameColumn, moveCardDifferentColumn, deleteColumnDetails }) => {
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

  //only one component is able to drag in the same time
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)

  //the last point of collision
  const lastOverId = useRef(null)

  useEffect(() => {
    // arrange columns order already in _id.jsx
    setOrderedColumns(board.columns)
  }, [board])

  //find the column based on cardId
  const findColumnByCardId = (cardId) => {
    //we should use c.cards instead of c.cardOrderIds because we need to finish data for cards in handleDragOver step before creating new cardOrderIds
    return orderedColumns.find((column) => column.cards.map((card) => card._id)?.includes(cardId))
  }

  //utility function to update state again after moving cards between different columns
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData,
    triggerFrom
  ) => {
    setOrderedColumns((prevColumns) => {
      //find the place (index) of the card is about to be dropped in the destination column
      const overCardIndex = overColumn?.cards?.findIndex((card) => card._id === overCardId)

      //logic to find "new cardIndex" (on top or below the overCard)
      const isBelowOverItem =
        active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0

      let newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      //clone the old OrderColumnState array to handle data then return - update new OrderColumnState
      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find((column) => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find((column) => column._id === overColumn._id)

      if (nextActiveColumn) {
        /*delete the card in active column, of course! Imagine you move your wallet from the left pocket to the right pocket,
           guess what happen? WOW! The wallet in your left pocket somehow disappear?!?!?!*/
        nextActiveColumn.cards = nextActiveColumn.cards.filter((card) => card._id !== activeDraggingCardId)

        //add another Placeholder Card if the column is empty, the last card is dragged into another folder
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }
        //update the cardOrderIds in the activeColumn after removing the card.
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map((card) => card._id)
      }

      if (nextOverColumn) {
        //check if this dragged card exist in overColumn, if then, erase that card
        nextOverColumn.cards = nextOverColumn.cards.filter((card) => card._id !== activeDraggingCardId)

        /* update the correct data after dragging cards between 2 columns, fix bug when dragging
          cards to another column but the activeDragCardId still show the old columnId */
        const rebuilt_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }
        //add the dragged card to the overColumn in the new index place
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuilt_activeDraggingCardData)

        //remove the Placeholder Card if it exists
        nextOverColumn.cards = nextOverColumn.cards.filter((card) => !card.FE_PlaceholderCard)

        //update the cardOrderIds in the overColumn after adding the card.
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map((card) => card._id)
      }

      // function handleDragEnd is called only after dropping, then call API here once
      // from _id.jsx
      if (triggerFrom === 'handleDragEnd') {
        moveCardDifferentColumn(activeDraggingCardId, oldColumnWhenDraggingCard._id, nextOverColumn._id, nextColumns)
      }

      return nextColumns
    })
  }

  //start dragging 1 element
  const handleDragStart = (event) => {
    // console.log('handleDragStart: ', event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(
      event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN
    )
    setActiveDragItemData(event?.active?.data?.current)

    // only set oldColumn when dragging CARDS
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  //trigger process dragging 1 element
  const handleDragOver = (event) => {
    //not do anything if drag column; column done already
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    //if users want to drag cards, add feature to drag cards between columns
    // console.log('handleDragOver: ', event)
    const { active, over } = event

    //return to avoid errors when drag somewhere out of range
    if (!active || !over) return

    //activeDraggingCard is the card which is being dragged
    const {
      id: activeDraggingCardId,
      data: { current: activeDraggingCardData }
    } = active

    //overCard is the one interact with dragged card
    const { id: overCardId } = over

    //find 2 columns based on cardId, for example card from column 3 is dragged to cards in column 2, active -> column 3, over -> column 2
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    //for some reasons, if 1 of the column is not existing, do nothing -> avoid web crashing
    if (!activeColumn || !overColumn) return

    //the logic here is dragging cards between 2 different columns
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData,
        'handleDragOver'
      )
    }
  }

  // trigger drop 1 element
  const handleDragEnd = (event) => {
    // console.log('handleDragEnd: ', event)
    const { active, over } = event

    // return to avoid errors when drag somewhere out of range
    if (!active || !over) return

    // handle cards dragging
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      //activeDraggingCard is the card which is being dragged
      const {
        id: activeDraggingCardId,
        data: { current: activeDraggingCardData }
      } = active

      //overCard is the one interact with dragged card
      const { id: overCardId } = over

      //find 2 columns based on cardId, for example card from column 3 is dragged to cards in column 2, active -> column 3, over -> column 2
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      //for some reasons, if 1 of the column is not existing, do nothing -> avoid web crashing
      if (!activeColumn || !overColumn) return

      /*we have to use setActiveColumnData.columnId OR oldColumnWhenDraggingCard (set in handleDragStart)
      instead of activeColumn._id because the state of activeColumn has been updated once in onDragOver */
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        //dragging cards between 2 different columns
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData,
          'handleDragEnd'
        )
      } else {
        //dragging cards in the same column

        //get position before drag
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex((c) => c._id === activeDragItemId)
        //get position after drop
        const newCardIndex = overColumn?.cards?.findIndex((c) => c._id === overCardId)

        //use arrayMove simple because dragging cards in the SAME COLUMN is NO DIFFERENT with dragging columns in the SAME BOARD
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)
        const dndOrderedCardIds = dndOrderedCards.map((c) => c._id)

        setOrderedColumns((prevColumns) => {
          //clone the old OrderColumnState array to handle data then return - update new OrderColumnState
          const nextColumns = cloneDeep(prevColumns)

          //find the column that we drop (same column anyway)
          const targetColumn = nextColumns.find((c) => c._id === overColumn._id)

          //update 2 values which are card and cardOrderIds in targetColumn
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCardIds

          //return new correct state
          return nextColumns
        })

        // from _id.jsx
        moveCardSameColumn(dndOrderedCards, dndOrderedCardIds, oldColumnWhenDraggingCard._id)
      }
    }

    // handle columns dragging
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      if (active.id !== over.id) {
        //get position before drag
        const oldColumnIndex = orderedColumns.findIndex((c) => c._id === active.id)
        //get position after drop
        const newColumnIndex = orderedColumns.findIndex((c) => c._id === over.id)

        // https://github.com/clauderic/dnd-kit/blob/master/packages/sortable/src/utilities/arrayMove.ts
        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex)

        // update state to avoid flickering or delay in UI when drag & drop columns, there is a small delay to call API
        setOrderedColumns(dndOrderedColumns)

        // from _id.jsx
        moveColumns(dndOrderedColumns)
      }
    }

    // set all data after drag&drop to null default
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setActiveDragItemData(null)
  }

  //when drop, the shadow does not disappear immediately
  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5'
        }
      }
    })
  }

  //customize the collision detection algorithm to optimize drag&drop cards between multiple columns
  //return an array
  const collisionDetectionStrategy = useCallback(
    (args) => {
      if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
        return closestCorners({ ...args })
      }

      //find the intersection point, collision
      const pointerIntersections = pointerWithin(args)
      /*if the pointerIntersections is an empty array, which mean when
       users drag cards to somewhere not valid -> do nothing, just return */
      if (!pointerIntersections?.length) return

      // //algorithm to detect collision and return an array of those collisions
      // // eslint-disable-next-line no-extra-boolean-cast
      // const intersections = pointerIntersections?.length > 0 ? pointerIntersections : rectIntersection(args)

      //find the first overId in those pointerIntersections
      let overId = getFirstCollision(pointerIntersections, 'id')
      if (overId) {
        //fix flickering bugs here
        /*if the overId is column (not card yet) here (overId will touch column first, then the card inside that column),
        find the closest card using closestCenter or closestCorner */
        const checkColumn = orderedColumns.find((column) => column._id === overId)
        if (checkColumn) {
          //now if the dragged card overId get to columnId, it will return cardId anyway -> no more flickering
          overId = closestCorners({
            ...args,
            droppableContainers: args.droppableContainers.filter((container) => {
              return container.id !== overId && checkColumn?.cardOrderIds.includes(container.id)
            })
          })[0]?.id
        }

        lastOverId.current = overId
        return [{ id: overId }]
      }

      return lastOverId.current ? [{ id: lastOverId.current }] : []
    },
    [activeDragItemType, orderedColumns]
  )

  return (
    <DndContext
      sensors={sensors}
      //algorithm to detect collision, use to fix when drag card with media, it's not working.

      // collisionDetection={closestCorners}

      //using only closestCorners will cause flickering bugs -> custom collision detection algorithm
      collisionDetection={collisionDetectionStrategy}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
          width: '100%',
          height: (theme) => theme.trello.boardContentHeight,
          display: 'flex',
          p: '10px 0'
        }}
      >
        <ListColumns
          columns={orderedColumns}
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
          deleteColumnDetails={deleteColumnDetails}
        />
        {/* shadow when dragging */}
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN && (
            <Column column={activeDragItemData} />
          )}
          {activeDragItemId && activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD && <Card card={activeDragItemData} />}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent
