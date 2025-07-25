/* src/types/dto/BoardDTO.js */
export const BoardType = {
  PUBLIC: 'public',
  PRIVATE: 'private',
};

export const BoardDTO = {
  id: '',
  title: '',
  type: BoardType.PUBLIC,
  tasks: [],
};
