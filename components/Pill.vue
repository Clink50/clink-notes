<template>
  <button class="pill" :class="isActive ? [color, 'active'] : ''" @click="onChange">
    <p class="pill__text">{{ text }}</p>
    <span v-if="circle" class="pill__circle" :class="color"></span>
  </button>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: {
    id: {
      required: true,
      type: Number,
    },
    text: {
      required: true,
      type: String,
    },
    circle: {
      required: false,
      type: Boolean,
      default: false,
    },
    color: {
      required: false,
      type: String,
      default: '',
    },
    isActive: {
      required: true,
      type: Boolean,
    },
  },
  methods: {
    ...mapMutations('pills', ['updateActivePill']),

    onChange() {
      this.updateActivePill(this.id);
      this.$emit('pillChange', this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.pill {
  background-color: transparent;
  outline: none;
  border: none;
  width: 100%;
  padding: 1rem 3.5rem;
  border-radius: 0.6rem;
  font-size: 1.6rem;
  font-family: var(--main-font);
  cursor: pointer;
  color: var(--input-color);
  position: relative;

  @media screen and (min-width: 767px) {
    width: initial;
  }

  &__circle {
    display: block;
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    width: 0.6rem;
    height: 0.6rem;
  }
}

.active {
  color: var(--white);
}

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
</style>
