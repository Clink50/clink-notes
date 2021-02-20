export const state = () => ({
  pills: [],
});

export const mutations = {
  setPills: (state, pills) => {
    state.pills = pills;
  },
  addPill: (state, pill) => {
    console.log('Pill to create:', pill);
  },
  updatePill: (state, updatedPill) => {
    console.log('Updated pill data:', updatedPill);
  },
  deletePill: (state, pillId) => {
    console.log('Deleted pill id:', pillId);
  },
  completePill: (state, pillId) => {
    console.log('Pill Id to mark done:', pillId);
  },
};

export const actions = {};

export const getters = {
  getPills: (state) => {
    return state.pills;
  },
};
