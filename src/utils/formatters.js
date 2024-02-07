export const capitalizeFirstLetter = (val) => {
  if (!val) return ''
  return `${val.charAt(0).toUpperCase()}${val.slice(1)}`
}

/*create an special card which is Placeholder Card, not related to Back-end.
  This card will be hidden in UI -> use to fix card cannot drag&drop in empty columns
  -> fix dnd-kit library*/
export const generatePlaceholderCard = (column) => {
  return {
    _id: `${column.id}-placeholder-card`,
    boardId: column.boardId,
    columnId: column._id,
    FE_PlaceholderCard: true
  }
}
