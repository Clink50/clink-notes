<template>
  <div class="popover">
    <p class="popover__description">Delete note?</p>
    <div class="btn-group">
      <button @click="togglePopover(false)">Cancel</button>
      <button @click="$emit('delete')">Delete</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  methods: {
    ...mapMutations('popover', ['togglePopover']),
  },
};
</script>

<style lang="scss" scoped>
.popover {
  width: 36rem;
  height: 10rem;
  position: absolute;
  top: -10rem;
  right: -15.4rem;
  padding: 1.6rem;
  color: $input-color;
  font-size: 1.6rem;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 3px 6px $gray;
  background: $white;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -15px;
    width: 20px;
    height: 20px;
    transform: translate(-50%, -50%) rotate(45deg);
    background-color: $white;
  }

  &__description {
    flex: 1;
  }

  & .btn-group {
    display: flex;
    justify-content: flex-end;

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
        margin-right: 1rem;
      }
    }
  }
}
</style>
