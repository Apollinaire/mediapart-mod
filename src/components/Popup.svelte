<script>
  import { configStore } from '../utils/store';
  import FormDescription from './Form/FormDescription.svelte';
  import FormField from './Form/FormField.svelte';
  import FormInput from './Form/FormInput.svelte';
  import Switch from './Form/Switch.svelte';

  const toOptionsPage = e => {
    e.preventDefault();
    chrome.tabs.create({ url: 'chrome://extensions/?options=' + chrome.runtime.id });
  };
</script>

<div class="popup">
  <div class="header">
    <img src="mediapart-mod-48.png" alt="logo mediapart mod" />
    <span> Mediapart Mod </span>
  </div>
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
      <Switch disabled={configStore.loading} bind:checked={$configStore.fullPage} label="Lecture sur une page" />
    </FormInput>
  </FormField>
  <FormField>
    <FormInput>
      <Switch disabled={configStore.loading} bind:checked={$configStore.hotkeysActive} label="Raccourcis clavier" />
    </FormInput>
    <FormDescription>
      Le détail des raccourcis clavier ainsi qu'un configurateur est disponible sur <a
        href="options.html"
        on:click={toOptionsPage}>la page d'options</a
      >
    </FormDescription>
  </FormField>
</div>

<style>
  .popup {
    padding: 8px;
    width: 300px;
  }
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 48px;
    font-size: 22px;
    height: 48px;
    padding-bottom: 12px;
  }
</style>
