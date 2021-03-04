export const state = () => ({
  notes: [],
});

export const mutations = {
  setNotes: (state, notes) => {
    state.notes = notes;
  },
  addNote: (state, note) => {
    state.notes = [
      ...state.notes,
      {
        ...note,
        id: state.notes[state.notes.length - 1]?.id + 1 || 0,
      },
    ];
  },
  updateNote: (state, updatedNote) => {
    state.notes = [
      ...state.notes.map((note) =>
        note.id !== updatedNote.id ? note : { ...note, ...updatedNote }
      ),
    ];
  },
  deleteNote: (state, noteId) => {
    state.notes = state.notes.filter(({ id }) => id !== noteId);
  },
  completeNote: (state, noteId) => {
    state.notes = [
      ...state.notes.map((note) => (note.id !== noteId ? note : { ...note, done: !note.done })),
    ];
  },
};

export const actions = {};

export const getters = {
  notesAvailable: (state) => (activePillId) => {
    return activePillId === 0
      ? state.notes.length === 0
      : state.notes.filter(({ pillId }) => pillId === activePillId).length === 0;
  },
  currentNotes: (state) => (activePillId) => {
    return activePillId === 0
      ? state.notes
      : state.notes.filter(({ pillId }) => pillId === activePillId);
  },
  notesCompleted: (state) => (activePillId) => {
    return activePillId === 0
      ? state.notes.reduce((completed, note) => (completed += note.done ? 1 : 0), 0)
      : state.notes
          .filter(({ pillId }) => pillId === activePillId)
          .reduce((completed, note) => (completed += note.done ? 1 : 0), 0);
  },
  totalNotes: (state) => (activePillId) => {
    return activePillId === 0
      ? state.notes.length
      : state.notes.filter(({ pillId }) => pillId === activePillId).length;
  },
};
