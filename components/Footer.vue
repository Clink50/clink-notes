<template>
  <footer>
    <p>
      Design from
      <a href="https://bigsondev.com/projects/notes-app-project/" target="_blank">BigsonDev</a>.
      Coded by Travis Clinkscales.
    </p>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
footer {
  display: flex;
  justify-content: center;
  padding: 4rem 0;
  font-family: var(--main-font);
  letter-spacing: 1px;

  p a {
    color: var(--blue);
    text-decoration: none;
    transition: color 0.2s ease-out;

    &:hover {
      color: var(--purple);
    }
  }
}
</style>
