<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3>{{ type }} note</h3>
          </div>
          <hr />
          <div class="modal-body">
            <form id="note-form" @submit.prevent="onSubmit">
              <div class="input-group">
                <input v-model="note.title" class="title" type="text" placeholder="Add title..." />
                <select v-model="note.category" class="category">
                  <option value="" disabled>Select Category</option>
                  <option v-for="(option, index) in options" :key="index" :value="option">
                    {{ option }}
                  </option>
                </select>
              </div>
              <textarea
                v-model="note.description"
                class="description"
                placeholder="Add description..."
              />
              <div class="modal-footer">
                <button @click.prevent="$emit('close')">Cancel</button>
                <button
                  :disabled="invalidInput"
                  :class="{ disabled: invalidInput }"
                  @click.prevent="onCreateUpdateNote"
                >
                  {{ type }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  props: {
    editNote: {
      type: Object,
      required: false,
      default: null,
    },
    options: {
      required: true,
      type: Array,
    },
    pillName: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      note: this.editNote
        ? { ...this.editNote }
        : {
            title: '',
            category: this.pillName === 'All' ? '' : this.pillName,
            description: '',
          },
    };
  },
  computed: {
    ...mapState('notes', ['notes']),
    ...mapState('pills', ['pills']),

    type() {
      return this.editNote ? 'Update' : 'Add';
    },
    invalidInput() {
      return !this.note.title || !this.note.description || !this.note.category;
    },
  },
  methods: {
    ...mapMutations('notes', ['addNote', 'updateNote']),

    onCreateUpdateNote() {
      const chosenPillId = this.pills.find((pill) => pill.text === this.note.category).id;
      let details = {};

      if (this.editNote) {
        details = {
          ...this.note,
          pillId: chosenPillId,
          createdAt: new Date(),
        };
        this.updateNote(details);
      } else {
        details = {
          ...this.note,
          pillId: this.pills.find((pill) => pill.text === this.note.category).id,
          done: false,
          createdAt: new Date(),
        };
        this.addNote(details);
      }
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  transition: opacity 0.3s ease;

  .modal-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;

    .modal-container {
      padding: 2rem 3.4rem;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 3px 6px var(--gray);
      transition: all 0.3s ease;

      @media screen and (min-width: 1024px) {
        width: 85rem;
        margin: 0 auto;
      }

      hr {
        margin: 1.7rem -3.4rem 2.4rem;
        border: 0.5px solid var(--input-color);
        opacity: 0.15;
      }

      .modal-header {
        text-align: left;
        font-size: 2.4rem;

        h3 {
          font-weight: 400;
          color: var(--input-color);
          margin-top: 0;
          opacity: 0.8;
        }
      }

      .modal-body {
        width: 100%;

        #note-form {
          display: flex;
          flex-direction: column;

          .input-group {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;

            @media screen and (min-width: 767px) {
              flex-direction: row;
              width: auto;
            }

            .title {
              margin-bottom: 2.8rem;
              padding: 1.4rem 1.6rem;
              border: none;
              outline: none;
              background-color: var(--off-white);
              border-radius: 4px 4px 0px 0px;
              font-family: var(--main-font);
              font-size: 1.6rem;
              width: 100%;

              &:focus {
                @include input-focus;
              }

              @media screen and (min-width: 767px) {
                margin-bottom: 0;
                margin-right: 1.8rem;
                flex: 2;
                width: auto;
              }
            }

            .category {
              -webkit-appearance: none;
              // appearance: none;
              flex: 1;
              margin: 0;
              padding: 1.4rem 1.6rem;
              border: none;
              outline: none;
              background-color: var(--off-white);
              border-radius: 4px 4px 0px 0px;
              font-family: var(--main-font);
              font-size: 1.4rem;
              cursor: pointer;
              position: relative;
              width: 100%;

              &:focus {
                @include input-focus;
              }

              @media screen and (min-width: 767px) {
                width: auto;
              }
            }
          }

          .description {
            height: 20rem;
            font-family: var(--main-font);
            font-size: 1.6rem;
            border: none;
            outline: none;
            background-color: var(--off-white);
            border-radius: 4px 4px 0px 0px;
            padding: 1.8rem 1.6rem;
            margin: 2.8rem 0;
            resize: none;
            width: 100%;

            &:focus {
              @include input-focus;
            }

            @media screen and (min-width: 767px) {
              width: 64%;
            }
          }
        }
      }

      .modal-footer {
        text-align: right;

        button {
          outline: none;
          border: none;
          font-weight: 500;
          background: transparent;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--blue);
          font-size: 1.4rem;
          font-family: var(--main-font);
          padding: 1rem 0.8rem;
          cursor: pointer;

          &:not(:last-child) {
            margin-right: 2.4rem;
          }

          &.disabled {
            color: var(--disabled);
            cursor: default;
          }
        }
      }
    }
  }
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
