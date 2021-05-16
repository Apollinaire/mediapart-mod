<script>
  import { configStore } from '../utils/store';
  import FormField from './Form/FormField.svelte';
  import FormInput from './Form/FormInput.svelte';
  import Switch from './Form/Switch.svelte';
  import Header from './UI/Header.svelte';
  import ThemeSwitch from './UI/ThemeSwitch.svelte';
</script>

<ThemeSwitch>
  <div class="layout">
    <Header />
    <div class="form-container">
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
      </FormField>
    </div>
  </div>
</ThemeSwitch>

<style>
  .layout {
    box-sizing: border-box;
    padding: 8px;
    min-height: 100vh;
  }
  .form-container {
    max-width: 700px;
    margin: auto;
  }
</style>
