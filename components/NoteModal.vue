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
                <button @click.prevent="$emit(type.toLowerCase(), note)">
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
export default {
  props: {
    editNote: {
      type: Object,
      required: false,
      default: () => ({
        noteId: '',
        title: '',
        category: '',
        description: '',
      }),
    },
    options: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      note: this.editNote
        ? { ...this.editNote }
        : {
            noteId: '',
            title: '',
            category: '',
            description: '',
          },
    };
  },
  computed: {
    type() {
      return this.editNote ? 'Update' : 'Add';
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

    .modal-container {
      width: 85rem;
      padding: 2rem 3.4rem;
      background-color: #fff;
      border-radius: 4px;
      box-shadow: 0 3px 6px $gray;
      transition: all 0.3s ease;

      hr {
        margin: 1.7rem -3.4rem 2.4rem;
        border: 0.5px solid $input-color;
        opacity: 0.15;
      }

      .modal-header {
        text-align: left;
        font-size: 2.4rem;

        h3 {
          font-weight: 400;
          color: $input-color;
          margin-top: 0;
          opacity: 0.8;
        }
      }

      .modal-body {
        width: 75rem;

        #note-form {
          display: flex;
          flex-direction: column;

          .input-group {
            display: flex;
            justify-content: center;
            align-items: center;

            .title {
              flex: 2;
              margin-right: 1.8rem;
              padding: 1.4rem 1.6rem;
              border: none;
              outline: none;
              background-color: $off-white;
              border-radius: 4px 4px 0px 0px;
              font-family: $main-font;
              font-size: 1.6rem;

              &:focus {
                @include input-focus;
              }
            }

            .category {
              // appearance: none;
              flex: 1;
              margin: 0;
              padding: 1.4rem 1.6rem;
              border: none;
              outline: none;
              background-color: $off-white;
              border-radius: 4px 4px 0px 0px;
              font-family: $main-font;
              font-size: 1.4rem;
              cursor: pointer;
              position: relative;

              &:focus {
                @include input-focus;
              }
            }
          }

          .description {
            width: 47.5rem;
            height: 22.5rem;
            font-family: $main-font;
            font-size: 1.6rem;
            border: none;
            outline: none;
            background-color: $off-white;
            border-radius: 4px 4px 0px 0px;
            padding: 1.8rem 1.6rem;
            margin: 2.8rem 0;
            resize: none;

            &:focus {
              @include input-focus;
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
          color: $blue;
          font-size: 1.4rem;
          font-family: $main-font;
          padding: 1rem 0.8rem;
          cursor: pointer;

          &:not(:last-child) {
            margin-right: 2.4rem;
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
