<template>
  <div class="popover">
    <p class="popover__description">Delete note?</p>
    <div class="btn-group">
      <button @click="$emit('close')">Cancel</button>
      <button @click="$emit('delete', noteId)">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    noteId: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.popover {
  width: 70%;
  height: 10rem;
  position: absolute;
  top: -10rem;
  right: 0;
  padding: 1.6rem;
  color: var(--input-color);
  font-size: 1.6rem;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  box-shadow: 0 3px 6px var(--gray);
  background: var(--white);

  @media screen and (min-width: 1440px) {
    width: 36rem;
    right: -15.4rem;
  }

  &::after {
    content: '';
    position: absolute;
    right: 5px;
    bottom: -15px;
    width: 20px;
    height: 20px;
    transform: translate(-50%, -50%) rotate(45deg);
    background-color: var(--white);
    z-index: 1;

    @media screen and (min-width: 1440px) {
      left: 50%;
      right: initial;
    }
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
      color: var(--blue);
      font-size: 1.4rem;
      font-family: var(--main-font);
      padding: 1rem 0.8rem;
      cursor: pointer;

      &:not(:last-child) {
        margin-right: 1rem;
      }
    }
  }
}
</style>
