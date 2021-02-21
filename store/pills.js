export const state = () => ({
  // possibly add active pill state here
  pills: [],
});

export const mutations = {
  setPills: (state, pills) => {
    state.pills = pills;
  },
  updateActivePill: (state, pill) => {
    // Find the current active
    const activeId = state.pills.find((pill) => pill.isActive).id;
    // Set it to false
    state.pills[activeId].isActive = false;
    // Set the clicked pill to active
    state.pills[pill].isActive = true;
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

export const getters = {};
