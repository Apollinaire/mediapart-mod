<script>
  import { actions } from '../interactions/hotkeys';
  import { DEFAULT_CONFIG } from '../utils/config';
  import { configStore } from '../utils/store';
  import FormField from './Form/FormField.svelte';
  import FormInput from './Form/FormInput.svelte';
  import KeyboardInput from './Form/KeyboardInput.svelte';
  import Switch from './Form/Switch.svelte';
  import About from './UI/About.svelte';
  import CategoryTitle from './UI/CategoryTitle.svelte';
  import Header from './UI/Header.svelte';
  import ThemeSwitch from './UI/ThemeSwitch.svelte';

  const ignoredKeys = [
    'Control',
    'Alt',
    'Shift',
    'Dead',
    'Unidentified',
    'AltGraph',
    'Fn',
    'FnLock',
    'Hyper',
    'Super',
    'Symbol',
    'SymbolLock',
  ];
  const isIgnoredMeta = key => {
    return key === 'Meta' && !window.navigator.userAgent.includes('Macintosh');
  };

  let activeId = null;
  const handleKeyDown = e => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.key || ignoredKeys.includes(e.key) || isIgnoredMeta(e.key)) {
      return;
    }
    const newKeySetting = $configStore.keySetting.map(hotkey => {
      if (hotkey.action === activeId) {
        return {
          action: hotkey.action,
          key: e.key.toLowerCase(),
          alt: e.altKey,
          ctrl: e.ctrlKey,
          shift: e.shiftKey,
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
  const resetDefaultKeybinds = () => {
    configStore.set({ keySetting: DEFAULT_CONFIG.keySetting });
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
          <Switch disabled={configStore.loading} bind:checked={$configStore.hotkeysActive} label="Raccourcis clavier" />
        </FormInput>
      </FormField>
    </div>
    <CategoryTitle>Raccourcis clavier</CategoryTitle>
    <div class="form-container">
      {#each $configStore.keySetting as keyBind}
        <FormInput>
          <KeyboardInput
            value={keyBind.key}
            ctrl={keyBind.ctrl}
            alt={keyBind.alt}
            shift={keyBind.shift}
            id={keyBind.action}
            label={actions[keyBind.action].label}
            active={keyBind.action === activeId}
            disabled={!!activeId || !$configStore.hotkeysActive}
            {setActiveId}
          />
        </FormInput>
      {/each}
    </div>
    <div class="text-container">
      <button
        class="default-keybinds"
        disabled={!!activeId || !$configStore.hotkeysActive}
        on:click={resetDefaultKeybinds}>rétablir les valeurs par défaut</button
      >
    </div>
    <CategoryTitle>À propos</CategoryTitle>
    <div class="form-container">
      <About />
    </div>
  </div>
</ThemeSwitch>

<style>
  .layout {
    box-sizing: border-box;
    padding: 8px 8px 64px;
    min-height: 100vh;
  }
  .form-container {
    max-width: 500px;
    font-size: 14px;
    margin: auto;
  }
  .text-container {
    text-align: center;
    margin-top: 12px;
    margin-bottom: 8px;
  }
  .default-keybinds {
    background: transparent;
    border: none;
    text-decoration: underline;
    color: currentColor;
    cursor: pointer;
  }
</style>
