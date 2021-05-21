<script>
  import { configStore } from '../../utils/store';

  $: dark = $configStore.darkTheme;
  $: light = !$configStore.darkTheme;
</script>

<div class:dark class:light><slot /></div>

<style>
  .dark {
    background-color: #292929;
    color: #b5b5b5;
  }
  :global(body) {
    margin: 0px;
  }
  :global(a) {
    color: currentColor;
  }
  :global(button:focus) {
    outline: solid 1px white;
  }
</style>
