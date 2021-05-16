<script>
  import { configStore } from '../utils/store';
  import Switch from './Switch.svelte';
</script>

<Switch disabled={configStore.loading} bind:checked={$configStore.darkTheme} label="darktheme" />
<Switch disabled={configStore.loading} bind:checked={$configStore.zenMode} label="zen" />
<Switch disabled={configStore.loading} bind:checked={$configStore.fullPage} label="fullPage" />
