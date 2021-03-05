<template>
  <div class="note" :class="noteColor" :style="done ? 'text-decoration: line-through;' : ''">
    <div class="note__header">
      <div class="note__header--title">
        <div class="checkbox-container">
          <input
            :id="`${category}-${id}`"
            type="checkbox"
            :checked="done"
            :name="`${category}-${id}`"
            @change="completeNote(id)"
          />
          <label :for="`${category}-${id}`" class="title">{{ title }}</label>
        </div>
      </div>
      <div class="note__header--buttons">
        <button @click.prevent="$emit('edit', id)">
          <i class="fas fa-pencil-alt"></i>
        </button>
        <button @click.prevent="popover = !popover">
          <i class="fas fa-trash-alt"></i>
        </button>
        <Popover v-if="popover" :note-id="id" @close="popover = false" v-on="$listeners" />
      </div>
    </div>
    <div class="note__content">
      <p class="note__content--description">{{ description }}</p>
    </div>
    <p class="note__date">{{ createdAt | shortDate }}</p>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    id: {
      required: true,
      type: Number,
    },
    done: {
      required: true,
      type: Boolean,
    },
    title: {
      required: true,
      type: String,
    },
    category: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    createdAt: {
      required: true,
      type: Date,
    },
  },
  data() {
    return {
      popover: false,
    };
  },
  computed: {
    noteColor() {
      return this.done ? 'gray' : this.getColor(this.category);
    },
  },
  methods: {
    ...mapMutations('notes', ['completeNote']),

    getColor(type) {
      return {
        Home: 'orange',
        Work: 'purple',
        Personal: 'green',
      }[type];
    },
  },
};
</script>

<style lang="scss" scoped>
.note {
  padding: 1.6rem;
  border-radius: 4px;
  color: #fff;
  display: flex;
  flex-direction: column;
  text-align: left;
  position: relative;

  &__header {
    display: flex;
    align-items: center;

    &--title {
      display: flex;
      align-items: center;
      font-size: 2rem;
      flex: 1;

      .checkbox-container {
        display: flex;
        align-items: center;
        position: relative;

        input[type='checkbox'] {
          height: 0;
          width: 0;
          visibility: hidden;
          display: none;
          position: relative;

          & + label::before {
            content: '';
            position: absolute;
            top: 3px;
            left: 0;
            width: 18px;
            height: 18px;
            border: 2px solid var(--check-color);
            border-radius: 4px;
          }

          &:checked + label::after {
            content: '';
            position: absolute;
            top: var(--check-top);
            left: var(--check-left);
            height: var(--check-height);
            width: var(--check-width);
            border-right: var(--check-thickness) solid var(--check-color);
            border-top: var(--check-thickness) solid var(--check-color);
            transform: scaleX(-1) rotate(135deg);
            transform-origin: left top;
            animation-duration: 800ms;
            animation-timing-function: ease;
            animation-name: checkmark;
          }
        }

        label {
          margin-left: 3rem;
          cursor: pointer;
          user-select: none;
        }
      }
    }

    &--buttons {
      display: flex;
      align-items: center;

      button {
        outline: none;
        border: none;
        background: transparent;
        color: white;
        opacity: 0.6;
        cursor: pointer;
        transition: all 0.3s;

        &:hover {
          opacity: 1;
        }

        i {
          font-size: 2rem;
        }

        &:first-child {
          margin-right: 2rem;
        }
      }
    }
  }

  .note__content {
    flex: 1;
    text-align: left;

    &--description {
      font-size: 1.4rem;
      opacity: 0.8;
      margin: 1rem 0 1.8rem;
    }
  }

  &__date {
    font-size: 1.5rem;
    opacity: 0.6;
  }
}
</style>
