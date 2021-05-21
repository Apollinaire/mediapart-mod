<script>
  import { configStore } from '../../utils/store';

  $: dark = $configStore.darkTheme;
  $: light = !$configStore.darkTheme;
</script>

<div class:dark class:light><slot /></div>

<style>
  :global(body) {
    margin: 0px;
  }
  .dark {
    background-color: #292929;
    color: #b5b5b5;
  }
  :global(a) {
    color: currentColor;
  }
</style>
