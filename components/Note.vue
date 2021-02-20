<template>
  <div
    class="note"
    :class="getColor(category)"
    :style="done ? 'text-decoration: line-through;' : ''"
  >
    <div class="note__header">
      <div class="note__header--title">
        <input
          :id="`${category}-${id}`"
          type="checkbox"
          :checked="done"
          :name="`${category}-${id}`"
          @change="$emit('done')"
        />
        <label :for="`${category}-${id}`" class="title">{{ title }}</label>
      </div>
      <div class="note__header--buttons">
        <button @click.prevent="$emit('edit')"><i class="fas fa-pencil-alt"></i></button>
        <button @click.prevent="togglePopover(!popover)">
          <i class="fas fa-trash-alt"></i>
        </button>
        <Popover v-if="popover" @close="togglePopover(false)" v-on="$listeners" />
      </div>
    </div>
    <div class="note__content">
      <p class="note__content--description">{{ description }}</p>
    </div>
    <p class="note__date">{{ createdAt | date }}</p>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

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
  computed: {
    ...mapState('popover', ['popover']),
  },
  methods: {
    ...mapMutations('popover', ['togglePopover']),
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
  color: $white;
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

      input {
        margin-right: 2.2rem;
        cursor: pointer;
      }

      label {
        font-weight: 400;
        cursor: pointer;
        user-select: none;
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
