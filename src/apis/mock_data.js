export const mockData = {
  board: {
    _id: 'board-id-01',
    title: 'Dashboard',
    description: 'Pro MERN stack Course',
    type: 'public', // 'private'
    ownerIds: [], // admin users
    memberIds: [], // member users
    columnOrderIds: [
      'column-id-01',
      'column-id-02',
      'column-id-03',
      'column-id-04'
    ],
    columns: [
      {
        _id: 'column-id-01',
        boardId: 'board-id-01',
        title: '💡 Brainstorming',
        cardOrderIds: ['card-id-01'],
        cards: [
          {
            _id: 'card-id-01',
            boardId: 'board-id-01',
            columnId: 'column-id-01',
            title: 'Khang Nguyen',
            description: 'Markdown Syntax (sẽ ở khóa nâng cao nhé)',
            cover: 'https://i.imgur.com/VFxNchD.jpeg',
            memberIds: ['test-user-id-01'],
            comments: ['test comment 01', 'test comment 02'],
            attachments: [
              'test attachment 01',
              'test attachment 02',
              'test attachment 03'
            ]
          }
        ]
      },
      {
        _id: 'column-id-02',
        boardId: 'board-id-01',
        title: '🚀 To do',
        cardOrderIds: ['card-id-08', 'card-id-09', 'card-id-10'],
        cards: [
          {
            _id: 'card-id-08',
            boardId: 'board-id-01',
            columnId: 'column-id-02',
            title: 'Learn skills',
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: []
          },
          {
            _id: 'card-id-09',
            boardId: 'board-id-01',
            columnId: 'column-id-02',
            title: 'Database',
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: []
          },
          {
            _id: 'card-id-10',
            boardId: 'board-id-01',
            columnId: 'column-id-02',
            title: 'Clean code',
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: []
          }
        ]
      },
      {
        _id: 'column-id-03',
        boardId: 'board-id-01',
        title: '🔧 In progress',
        cardOrderIds: ['card-id-11', 'card-id-12', 'card-id-13'],
        cards: [
          {
            _id: 'card-id-11',
            boardId: 'board-id-01',
            columnId: 'column-id-03',
            title: 'Front-end',
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: []
          },
          {
            _id: 'card-id-12',
            boardId: 'board-id-01',
            columnId: 'column-id-03',
            title: 'Back-end',
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: []
          },
          {
            _id: 'card-id-13',
            boardId: 'board-id-01',
            columnId: 'column-id-03',
            title: 'Testing',
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: []
          }
        ]
      },
      {
        _id: 'column-id-04',
        boardId: 'board-id-01',
        title: '🏆 Complete',
        /*create an special card which is Placeholder Card, not related to Back-end.
        This card will be hidden in UI -> use to fix card cannot drag&drop in empty columns
        -> fix dnd-kit library*/
        cardOrderIds: ['column-id-04-placeholder-card'],
        cards: [
          {
            _id: 'card-id-14',
            boardId: 'board-id-01',
            columnId: 'column-id-04',
            title: 'Project',
            description: null,
            cover: null,
            memberIds: [],
            comments: [],
            attachments: []
          }
        ]
      }
    ]
  }
};
