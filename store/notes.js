export const state = () => ({
  notes: [],
});

export const mutations = {
  setNotes: (state, notes) => {
    state.notes = notes;
  },
  addNote: (state, note) => {
    console.log('Note to create:', note);
  },
  updateNote: (state, updatedNote) => {
    console.log('Updated note data:', updatedNote);
  },
  deleteNote: (state, noteId) => {
    console.log('Deleted note id:', noteId);
  },
  completeNote: (state, noteId) => {
    console.log('Note Id to mark done:', noteId);
  },
};

export const actions = {};

export const getters = {
  getNotes: (state) => {
    return state.notes;
  },
};
