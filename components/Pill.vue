<template>
  <button class="pill" :class="isActive ? [color, 'active'] : ''" @click="$emit('clicked')">
    <p class="pill__text">{{ text }}</p>
    <span v-if="circle" class="pill__circle" :class="color"></span>
  </button>
</template>

<script>
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
};
</script>

<style lang="scss" scoped>
.pill {
  background-color: transparent;
  outline: none;
  border: none;
  padding: 1rem 3.5rem;
  border-radius: 0.6rem;
  font-size: 1.6rem;
  font-family: $main-font;
  cursor: pointer;
  color: $input-color;
  position: relative;

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
  color: $white;
}

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
