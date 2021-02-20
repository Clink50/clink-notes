<template>
  <main class="container">
    <SearchBar placeholder="Search notes..." />
    <section class="pills-container">
      <div class="left-pills">
        <Pill
          v-for="({ text, color, circle, isActive }, index) in pills"
          :id="index"
          :key="index"
          :text="text"
          :color="color"
          :circle="circle"
          :is-active="isActive"
          @clicked="changeActive(index)"
        />
      </div>
      <button class="add-note" @click="showNoteModal = true">+ Add Note</button>
    </section>
    <section class="main-container">
      <div v-if="notesAvailable" class="no-notes-container">
        <h1 class="no-notes">You don't have any notes</h1>
        <img src="~/assets/img/add-note-illustration.svg" alt="No notes illustration" />
      </div>
      <div v-else class="completed-and-notes-container">
        <p class="completed">You have {{ notesCompleted }}/{{ totalNotes }} notes completed</p>
        <div class="notes-container">
          <template v-for="(note, index) in currentNotes">
            <Note
              v-bind="note"
              :id="index"
              :key="index"
              @done="completeNote(index)"
              @edit="editNote(index)"
              @delete="deleteNote(index)"
            />
          </template>
        </div>
      </div>
    </section>
    <NoteModal
      v-if="showNoteModal"
      :options="categories"
      @add="onAddNote"
      @update="updateNote"
      @close="
        showNoteModal = false;
        noteDetails = null;
      "
    />
  </main>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      pillId: 0,
      showNoteModal: false,
      noteDetails: null,
      pills: [
        {
          id: 0,
          text: 'All',
          circle: false,
          color: 'blue',
          isActive: true,
          notes: [
            {
              done: false,
              title: 'Read a book',
              category: 'Home',
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. A voluptas quaerat eum provident tenetur sed minus perferendis repudiandae commodi rem.',
              createdAt: new Date(
                new Date(2020, 0, 1).getTime() +
                  Math.random() * (new Date().getTime() - new Date(2020, 0, 1).getTime())
              ),
            },
            {
              done: false,
              title: 'Read a book',
              category: 'Home',
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, officia!',
              createdAt: new Date(
                new Date(2020, 0, 1).getTime() +
                  Math.random() * (new Date().getTime() - new Date(2020, 0, 1).getTime())
              ),
            },
            {
              done: false,
              title: 'Read a book',
              category: 'Home',
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consequuntur, sit voluptas dolorem sapiente sunt!',
              createdAt: new Date(
                new Date(2020, 0, 1).getTime() +
                  Math.random() * (new Date().getTime() - new Date(2020, 0, 1).getTime())
              ),
            },
            {
              done: false,
              title: 'Read a book',
              category: 'Home',
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, officia!',
              createdAt: new Date(
                new Date(2020, 0, 1).getTime() +
                  Math.random() * (new Date().getTime() - new Date(2020, 0, 1).getTime())
              ),
            },
            {
              done: false,
              title: 'Read a book',
              category: 'Work',
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consequuntur, sit voluptas dolorem sapiente sunt!',
              createdAt: new Date(
                new Date(2020, 0, 1).getTime() +
                  Math.random() * (new Date().getTime() - new Date(2020, 0, 1).getTime())
              ),
            },
            {
              done: false,
              title: 'Read a book',
              category: 'Work',
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, officia!',
              createdAt: new Date(
                new Date(2020, 0, 1).getTime() +
                  Math.random() * (new Date().getTime() - new Date(2020, 0, 1).getTime())
              ),
            },
            {
              done: true,
              title: 'Meeting with Jane',
              category: 'Personal',
              description:
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita…',
              createdAt: new Date(
                new Date(2020, 0, 1).getTime() +
                  Math.random() * (new Date().getTime() - new Date(2020, 0, 1).getTime())
              ),
            },
            {
              done: false,
              title: 'Read a book',
              category: 'Personal',
              description:
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita…',
              createdAt: new Date(
                new Date(2020, 0, 1).getTime() +
                  Math.random() * (new Date().getTime() - new Date(2020, 0, 1).getTime())
              ),
            },
            {
              done: true,
              title: 'Read a book',
              category: 'Personal',
              description: 'This is a test note.',
              createdAt: new Date(
                new Date(2020, 0, 1).getTime() +
                  Math.random() * (new Date().getTime() - new Date(2020, 0, 1).getTime())
              ),
            },
            {
              done: false,
              title: 'Read a book',
              category: 'Personal',
              description: 'This is a test note.',
              createdAt: new Date(
                new Date(2020, 0, 1).getTime() +
                  Math.random() * (new Date().getTime() - new Date(2020, 0, 1).getTime())
              ),
            },
          ],
        },
        {
          id: 1,
          text: 'Home',
          circle: true,
          isActive: false,
          color: 'orange',
          notes: [
            {
              done: false,
              title: 'Read a book',
              category: 'Home',
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. A voluptas quaerat eum provident tenetur sed minus perferendis repudiandae commodi rem.',
              createdAt: new Date(
                new Date(2020, 0, 1).getTime() +
                  Math.random() * (new Date().getTime() - new Date(2020, 0, 1).getTime())
              ),
            },
            {
              done: false,
              title: 'Read a book',
              category: 'Home',
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, officia!',
              createdAt: new Date(
                new Date(2020, 0, 1).getTime() +
                  Math.random() * (new Date().getTime() - new Date(2020, 0, 1).getTime())
              ),
            },
            {
              done: false,
              title: 'Read a book',
              category: 'Home',
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consequuntur, sit voluptas dolorem sapiente sunt!',
              createdAt: new Date(
                new Date(2020, 0, 1).getTime() +
                  Math.random() * (new Date().getTime() - new Date(2020, 0, 1).getTime())
              ),
            },
            {
              done: false,
              title: 'Read a book',
              category: 'Home',
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, officia!',
              createdAt: new Date(
                new Date(2020, 0, 1).getTime() +
                  Math.random() * (new Date().getTime() - new Date(2020, 0, 1).getTime())
              ),
            },
          ],
        },
        {
          id: 2,
          text: 'Work',
          circle: true,
          isActive: false,
          color: 'purple',
          notes: [
            {
              done: false,
              title: 'Read a book',
              category: 'Work',
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus consequuntur, sit voluptas dolorem sapiente sunt!',
              createdAt: new Date(
                new Date(2020, 0, 1).getTime() +
                  Math.random() * (new Date().getTime() - new Date(2020, 0, 1).getTime())
              ),
            },
            {
              done: false,
              title: 'Read a book',
              category: 'Work',
              description:
                'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, officia!',
              createdAt: new Date(
                new Date(2020, 0, 1).getTime() +
                  Math.random() * (new Date().getTime() - new Date(2020, 0, 1).getTime())
              ),
            },
          ],
        },
        {
          id: 3,
          text: 'Personal',
          circle: true,
          isActive: false,
          color: 'green',
          notes: [
            {
              done: true,
              title: 'Meeting with Jane',
              category: 'Personal',
              description:
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita…',
              createdAt: new Date(
                new Date(2020, 0, 1).getTime() +
                  Math.random() * (new Date().getTime() - new Date(2020, 0, 1).getTime())
              ),
            },
            {
              done: false,
              title: 'Read a book',
              category: 'Personal',
              description:
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita…',
              createdAt: new Date(
                new Date(2020, 0, 1).getTime() +
                  Math.random() * (new Date().getTime() - new Date(2020, 0, 1).getTime())
              ),
            },
            {
              done: true,
              title: 'Read a book',
              category: 'Personal',
              description: 'This is a test note.',
              createdAt: new Date(
                new Date(2020, 0, 1).getTime() +
                  Math.random() * (new Date().getTime() - new Date(2020, 0, 1).getTime())
              ),
            },
            {
              done: false,
              title: 'Read a book',
              category: 'Personal',
              description: 'This is a test note.',
              createdAt: new Date(
                new Date(2020, 0, 1).getTime() +
                  Math.random() * (new Date().getTime() - new Date(2020, 0, 1).getTime())
              ),
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapState('popover', ['popover']),
    notesAvailable() {
      return this.pills[this.pillId].notes.length === 0;
    },
    notesCompleted() {
      return this.pills[this.pillId].notes.reduce(
        (completed, note) => (completed += note.done ? 1 : 0),
        0
      );
    },
    totalNotes() {
      return this.pills[this.pillId].notes.length;
    },
    currentNotes() {
      return this.pills[this.pillId].notes;
    },
    categories() {
      return ['Home', 'Work', 'Personal'];
    },
  },
  methods: {
    ...mapMutations('notes', ['addNote', 'updateNote', 'deleteNote', 'completeNote']),
    changeActive(id) {
      this.pillId = id;
      const activeId = this.pills.find((pill) => pill.isActive).id;
      this.pills[activeId].isActive = false;
      this.pills[id].isActive = true;
    },
    onAddNote(data) {
      const pillNote = this.pills.find((pill) => pill.text === data.category);
      const newNoteId = pillNote.notes.length + 1;

      const newNote = {
        id: newNoteId,
        done: false,
        title: data.title,
        category: data.category,
        description: data.description,
        createdAt: new Date(),
      };

      this.addNote(newNote);

      // this.pills[0].notes.push(newNote);
      // this.pills[pillNote.id].notes.push(newNote);
      // this.showNoteModal = false;
    },
    // editNote(noteId) {
    //   if (this.showNoteModal) {
    //     this.showNoteModal = false;
    //   } else {
    //     const { title, category, description } = this.pills[this.pillId].notes[noteId];
    //     this.noteDetails = {
    //       noteId,
    //       title,
    //       category,
    //       description,
    //     };
    //     this.showNoteModal = true;
    //   }
    // },
    // updateNote({ noteId, title, category, description }) {
    //   this.pills[this.pillId].notes[noteId] = {
    //     done: false,
    //     title,
    //     category,
    //     description,
    //     createdAt: new Date(),
    //   };
    //   this.noteDetails = null;
    //   this.showNoteModal = false;
    // },
    // completeNote(noteId) {
    //   this.pills[this.pillId].notes[noteId].done = !this.pills[this.pillId].notes[noteId].done;
    // },
    // deleteNote(noteId) {
    //   this.pills[this.pillId].notes.splice(noteId, 1);
    //   this.popover = false;
    // },
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
</style>
