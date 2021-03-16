import pills from '../assets/data/pills';
import notes from '../assets/data/notes';

// Root Module
// export const plugins = [filter];

// Your state value should always be a function to avoid unwanted shared state on the server side.
export const state = () => ({});

export const mutations = {};

export const actions = {
  nuxtServerInit: ({ dispatch, commit, state }, { error }) => {
    // automatically refresh the access token on the initial request to the server, if possible
    try {
      // const { accessToken, refreshToken } = state.auth;

      // if (accessToken && refreshToken) {
      //   try {
      //     // refresh the access token
      //     await dispatch('auth/refresh');
      //   } catch (e) {
      //     // catch any errors and automatically logout the user
      //     await dispatch('auth/logout');
      //   }
      // }

      commit('notes/setNotes', notes);
      commit('pills/setPills', pills);
    } catch (e) {
      console.log('Error on [nuxtServerInit] action.', e);
      if (e.response) {
        console.log(e.response.data);
      } else if (e.request) {
        console.log(e.request);
      } else {
        console.log('Error', e.message);
      }
      error('Error on [nuxtServerInit] action.');
    }
  },
};

export const getters = {};
