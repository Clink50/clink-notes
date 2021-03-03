<template>
  <main class="container">
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
      <div v-if="notesAvailable(activePillId)" class="no-notes-container">
        <h1 class="no-notes">You don't have any notes</h1>
        <img src="~/assets/img/add-note-illustration.svg" alt="No notes illustration" />
      </div>
      <div v-else class="completed-and-notes-container">
        <p class="completed">
          You have {{ notesCompleted(activePillId) }}/{{ totalNotes(activePillId) }} notes completed
        </p>
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
      return this.activePillId === 0
        ? this.notes.filter(this.filterNotes())
        : this.notes
            .filter(({ pillId }) => pillId === this.activePillId)
            .filter(this.filterNotes()); // .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },

    categories: () => ['Home', 'Work', 'Personal'],
  },
  methods: {
    ...mapMutations('notes', ['deleteNote', 'completeNote']),
    editNote(id) {
      this.noteDetails = this.notes[id];
      this.showNoteModal = true;
    },
    filterNotes() {
      return ({ title }) => title.toLowerCase().startsWith(this.searchText.toLowerCase());
    },
    closeModal() {
      this.noteDetails = null;
      this.showNoteModal = false;
    },
  },
};
</script>

<style lang="scss">
.container {
  margin: 6.4rem auto;
  text-align: center;
  width: 85rem;

  .pills-container {
    display: flex;
    align-items: center;

    .left-pills {
      flex: 1;
      text-align: left;

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
      background-color: $blue;
      border-radius: 4px;
      font-family: $main-font;
      cursor: pointer;
      color: $white;
      box-shadow: 0px 2px 2px $shadow;
      letter-spacing: 1.25px;
    }
  }
}

.main-container {
  font-size: 3.4rem;

  .no-notes-container {
    margin-top: 6rem;

    .no-notes {
      opacity: 0.6;
      color: $input-color;
      font-family: $main-font;
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

    .completed {
      font-size: 1.8rem;
      text-align: left;
      font-weight: 600;
      color: $input-color;
      padding: 0.8rem 0;
      border-bottom: 4px solid rgba(33, 150, 243, 0.25);
      margin-bottom: 2.4rem;
    }

    .notes-container {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 2.4rem;
    }
  }
}

// TODO: Figure out how to not duplicate this between here and the pill vue
.blue {
  background-color: $light-blue;
}

.orange {
  background-color: $orange;
}

.green {
  background-color: $green;
}

.purple {
  background-color: $purple;
}

.gray {
  background-color: $dark-gray;
}
</style>
