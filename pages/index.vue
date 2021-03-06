<template>
  <main class="container">
    <button @click="generateNote">Add Random Note</button>
    <SearchBar v-model="searchText" placeholder="Search notes..." />
    <section class="pills-container">
      <div class="left-pills">
        <Pill
          v-for="pill in pills"
          :key="pill.id"
          v-bind="pill"
          @pillChange="activePillId = pill.id"
        />
      </div>
      <button class="add-note" @click="showNoteModal = true">+ Add Note</button>
    </section>
    <section class="main-container">
      <div v-if="notesAvailable(activePillId) && activePillId === 0" class="no-notes-container">
        <h1 class="no-notes">You don't have any notes</h1>
        <img src="~/assets/img/add-note.svg" alt="No notes illustration" />
      </div>
      <div
        v-else-if="
          (notesAvailable(activePillId) && activePillId !== 0) || filteredNotes.length === 0
        "
        class="no-notes-container"
      >
        <h1 class="no-notes">Couldn't find any notes</h1>
        <img src="~/assets/img/find-note.svg" alt="Couldn't find any notes illustration" />
      </div>
      <div v-else class="completed-and-notes-container">
        <p v-if="notesCompleted(activePillId) !== totalNotes(activePillId)" class="completed">
          You have {{ notesCompleted(activePillId) }}/{{ totalNotes(activePillId) }} notes completed
        </p>
        <p v-else class="completed">You have completed all notes</p>
        <ProgressBar :completed="notesCompleted(activePillId)" :total="totalNotes(activePillId)" />
        <div class="notes-container">
          <Note
            v-for="note in filteredNotes"
            :key="note.id"
            v-bind="note"
            @edit="editNote"
            @delete="deleteNote"
            @done="completeNote"
          />
        </div>
      </div>
    </section>
    <NoteModal
      v-if="showNoteModal"
      :options="categories"
      :pill-name="pills[activePillId].text"
      :edit-note="noteDetails"
      @close="closeModal"
    />
  </main>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';

export default {
  data() {
    return {
      activePillId: 0,
      showNoteModal: false,
      noteDetails: null,
      searchText: '',
    };
  },
  computed: {
    ...mapState('pills', ['pills']),
    ...mapState('notes', ['notes']),

    ...mapGetters('notes', ['notesAvailable', 'currentNotes', 'notesCompleted', 'totalNotes']),

    filteredNotes() {
      return (this.activePillId === 0
        ? this.notes.filter(this.searchNotes())
        : this.notes.filter(({ pillId }) => pillId === this.activePillId).filter(this.searchNotes())
      ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },

    categories: () => ['Home', 'Work', 'Personal'],
  },
  methods: {
    ...mapMutations('notes', ['addNote', 'deleteNote', 'completeNote']),
    editNote(id) {
      this.noteDetails = this.notes[id];
      this.showNoteModal = true;
    },
    searchNotes() {
      return ({ title }) => title.toLowerCase().includes(this.searchText.toLowerCase());
    },
    closeModal() {
      this.noteDetails = null;
      this.showNoteModal = false;
    },
    async generateNote() {
      const data = await fetch('/api/dad-joke');

      console.log(data);

      this.addNote({
        done: false,
        title: 'A Dad Joke',
        description: data.body.joke,
        category: this.categories[Math.floor(Math.random() * this.categories.length)],
        pillId: 1,
        createdAt: new Date(),
      });
    },
  },
};
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: calc(100vh - 10rem);
  padding: 0 2rem;

  @media screen and (min-width: 767px) {
    width: 85rem;
  }

  .pills-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    @media screen and (min-width: 767px) {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: flex-start;
    }

    .left-pills {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 2rem;
      width: 100%;

      @media screen and (min-width: 767px) {
        flex: 1;
        flex-direction: row;
        justify-content: flex-start;
        margin-bottom: 0;
        width: auto;
      }
      .pill:not(:last-child) {
        margin-right: 1rem;
      }
    }

    .add-note {
      padding: 1rem 1.5rem;
      font-size: 1.6rem;
      text-transform: uppercase;
      border: none;
      outline: none;
      width: 100%;
      background-color: var(--blue);
      border-radius: 4px;
      font-family: var(--main-font);
      cursor: pointer;
      color: var(--white);
      box-shadow: 0px 2px 2px var(--shadow);
      letter-spacing: 1.25px;

      @media screen and (min-width: 767px) {
        width: initial;
      }
    }
  }
}

.main-container {
  font-size: 3.4rem;

  .no-notes-container {
    margin-top: 6rem;

    .no-notes {
      opacity: 0.6;
      color: var(--input-color);
      font-family: var(--main-font);
      font-weight: 400;
    }

    img {
      max-width: 100%;
      margin-top: 6rem;
      user-select: none;
      -webkit-user-drag: none;
      -khtml-user-drag: none;
      -moz-user-drag: none;
      -o-user-drag: none;
    }
  }

  .completed-and-notes-container {
    margin-top: 3.2rem;
    position: relative;

    .completed {
      font-size: 1.8rem;
      text-align: left;
      font-weight: 600;
      color: var(--input-color);
      padding: 0.8rem 0;
      margin-bottom: 2.4rem;
    }

    .notes-container {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 2.4rem;

      @media screen and (min-width: 767px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
}

// TODO: Figure out how to not duplicate this between here and the pill vue
.blue {
  background-color: var(--light-blue);
}

.orange {
  background-color: var(--orange);
}

.green {
  background-color: var(--green);
}

.purple {
  background-color: var(--purple);
}

.gray {
  background-color: var(--dark-gray);
}
</style>
