<script>
  import { actions } from '../interactions/hotkeys';

  import { configStore } from '../utils/store';
  import FormField from './Form/FormField.svelte';
  import FormInput from './Form/FormInput.svelte';
  import KeyboardInput from './Form/KeyboardInput.svelte';
  import Switch from './Form/Switch.svelte';
  import CategoryTitle from './UI/CategoryTitle.svelte';
  import Header from './UI/Header.svelte';
  import ThemeSwitch from './UI/ThemeSwitch.svelte';

  let activeId = null;
  const handleKeyDown = e => {
    const newKeySetting = $configStore.keySetting.map(hotkey => {
      if (hotkey.action === activeId) {
        return {
          action: hotkey.action,
          key: e.key,
        };
      } else return hotkey;
    });
    if (e.key !== 'Escape') {
      configStore.set({ keySetting: newKeySetting });
    }
    activeId = null;
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('click', handleClick);
  };
  const handleClick = () => {
    document.removeEventListener('keydown', handleKeyDown);
    activeId = null;
    document.removeEventListener('click', handleClick);
  };
  const setActiveId = id => {
    activeId = id;
    document.addEventListener('keydown', handleKeyDown);
    setTimeout(() => {
      document.addEventListener('click', handleClick);
    }, 1);
  };
</script>

<ThemeSwitch>
  <div class="layout">
    <Header />
    <CategoryTitle>Paramètres généraux</CategoryTitle>
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
    <CategoryTitle>Raccourcis clavier</CategoryTitle>
    <div class="keybind-container">
      {#each $configStore.keySetting as keyBind}
        <KeyboardInput
          value={keyBind.key}
          id={keyBind.action}
          label={actions[keyBind.action].label}
          active={keyBind.action === activeId}
          disabled={!!activeId}
          {setActiveId}
        />
      {/each}
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
