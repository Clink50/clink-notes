<template>
  <div class="search">
    <input type="search" :placeholder="placeholder" />
    <i class="fas fa-search"></i>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  margin: 6.4rem 0 2.4rem;
  font-size: 1.8rem;
  position: relative;

  input {
    width: 100%;
    padding: 1.8rem;
    font-size: inherit;
    padding-left: calc(2rem + 3rem);
    border: none;
    outline: none;
    box-shadow: 0px 3px 6px $gray;
    font-family: $main-font;
    opacity: 0.6;

    &:focus {
      @include input-focus;
    }

    &::placeholder {
      color: $input-color;
    }
  }

  i {
    position: absolute;
    top: 50%;
    left: 2rem;
    transform: translateY(-50%);
    opacity: 0.3;
  }
}
</style>
