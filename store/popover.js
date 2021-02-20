export const state = () => ({
  popover: false,
});

export const mutations = {
  togglePopover: (state, toggle) => {
    state.popover = toggle;
  },
};

export const getters = {
  popover: (state) => {
    return state.popover;
  },
};
