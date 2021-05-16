<script>
  import { configStore } from '../utils/store';
  import FormDescription from './Form/FormDescription.svelte';
  import FormField from './Form/FormField.svelte';
  import FormInput from './Form/FormInput.svelte';
  import Switch from './Form/Switch.svelte';
import Header from './UI/Header.svelte';
  import ThemeSwitch from './UI/ThemeSwitch.svelte';
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
        <Switch disabled={configStore.loading} bind:checked={$configStore.fullPage} label="Lecture sur une page" />
      </FormInput>
    </FormField>
    <FormField>
      <FormInput>
        <Switch disabled={configStore.loading} bind:checked={$configStore.hotkeysActive} label="Raccourcis clavier" />
      </FormInput>
      <FormDescription>
        Le détail des raccourcis clavier ainsi qu'un configurateur est disponible sur <a
          href="chrome-extension://addenbcmfpfhmmoobmdgnjdbmfgoioda/options.html"
          target="_blank">la page d'options</a
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
</style>
