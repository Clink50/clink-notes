import pills from '../assets/data/pills';
import notes from '../assets/data/notes';

// Root Module
// export const plugins = [filter];

// Your state value should always be a function to avoid unwanted shared state on the server side.
export const state = () => ({});

export const mutations = {};

export const actions = {
  nuxtServerInit: ({ commit }, { error }) => {
    try {
      commit('notes/setNotes', notes);
      commit('pills/setPills', pills);
      // const data = await $axios.$get('/posts.json');
      // const postsArray = [];
      // for (const key in data) {
      //   postsArray.push({ ...data[key], id: key });
      // }
      // commit('posts/setPosts', postsArray);
    } catch (e) {
      console.log('Error on [nuxtServerInit] action.', e);
      if (e.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
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
