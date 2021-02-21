export const state = () => ({
  notes: [],
});

export const mutations = {
  setNotes: (state, notes) => {
    state.notes = notes;
  },
  addNote: (state, note) => {
    state.notes.push(note);
  },
  updateNote: (state, updatedNote) => {
    console.log('Updated note data:', updatedNote);
  },
  deleteNote: (state, noteId) => {
    state.notes.splice(noteId, 1);
  },
  completeNote: (state, noteId) => {
    state.notes[noteId].done = !state.notes[noteId].done;
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
