<script>
  import { configStore } from '../utils/store';
  import FormDescription from './Form/FormDescription.svelte';
  import FormField from './Form/FormField.svelte';
  import FormInput from './Form/FormInput.svelte';
  import Switch from './Form/Switch.svelte';
  import Header from './UI/Header.svelte';
  import ThemeSwitch from './UI/ThemeSwitch.svelte';
  const onOpenOptions = () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
  };
</script>

<ThemeSwitch>
  <div class="popup">
    <Header />
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
        <Switch disabled={configStore.loading} bind:checked={$configStore.hotkeysActive} label="Raccourcis clavier" />
      </FormInput>
      <FormDescription>
        Le détail des raccourcis clavier ainsi qu'un configurateur sont disponibles sur <button
          class="link-button"
          on:click={onOpenOptions}
          role="link">la page d'options</button
        >
      </FormDescription>
    </FormField>
  </div>
</ThemeSwitch>

<style>
  .popup {
    padding: 8px;
    width: 300px;
  }

  button.link-button {
    text-decoration: underline;
  }
</style>
