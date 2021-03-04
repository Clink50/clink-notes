<template>
  <div>
    <div class="progress__bg"></div>
    <div class="progress" :style="progress"></div>
  </div>
</template>

<script>
export default {
  props: {
    completed: {
      type: Number,
      required: false,
      default: 0,
    },
    total: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  computed: {
    progress() {
      return `width: ${(this.completed / this.total) * 100}%`;
    },
  },
};
</script>

<style lang="scss" scoped>
.progress__bg {
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  height: 4px;
  background-color: var(--progress-bg);
  z-index: -1;
}

.progress {
  position: absolute;
  top: 40px;
  left: 0;
  width: 0%;
  height: 4px;
  background-color: var(--dark-blue);
  transition: width 0.2s;
}
</style>
