<script>
  import { configStore } from '../utils/store';
  import FormDescription from './FormDescription.svelte';
  import FormField from './FormField.svelte';
  import FormInput from './FormInput.svelte';
  import Switch from './Switch.svelte';

  const toOptionsPage = () => {
    chrome.tabs.create({ url: 'chrome://extensions/?options=' + chrome.runtime.id });
  };
</script>

<div class="popup">
  <FormField>
    <FormInput>
      <Switch disabled={configStore.loading} bind:checked={$configStore.darkTheme} label="Thème sombre" />
    </FormInput>
  </FormField>
  <FormField>
    <FormInput>
      <Switch disabled={configStore.loading} bind:checked={$configStore.zenMode} label="Lecture zen" />
    </FormInput>
  </FormField>
  <FormField>
    <FormInput>
      <Switch disabled={configStore.loading} bind:checked={$configStore.fullPage} label="Lecture en page entière" />
    </FormInput>
  </FormField>
  <FormField>
    <FormInput>
      <Switch disabled={configStore.loading} bind:checked={$configStore.hotkeysActive} label="Raccourcis clavier" />
    </FormInput>
    <FormDescription>
      Le détail des raccourcis clavier ainsi qu'un configurateur est disponible sur <a href="#" on:click={toOptionsPage}
        >la page d'options</a
      >
    </FormDescription>
  </FormField>
</div>

<style>
  .popup {
    padding: 16px;
    width: 300px;
  }
</style>
