<script>
  import KeyboardInputButton from './KeyboardInputButton.svelte';

  export let value;
  export let ctrl;
  export let shift;
  export let alt;
  export let label;
  export let active = false;
  export let disabled;
  export let id;
  export let setActiveId;
</script>

<div class="keyboard-input">
  <div class="button-container">
    {#if ctrl}
      <KeyboardInputButton {active} {disabled} {id} {setActiveId}>Ctrl</KeyboardInputButton>
    {/if}
    {#if shift}
      <KeyboardInputButton {active} {disabled} {id} {setActiveId}>Maj</KeyboardInputButton>
    {/if}
    {#if alt}
      <KeyboardInputButton {active} {disabled} {id} {setActiveId}>Alt</KeyboardInputButton>
    {/if}
    <KeyboardInputButton {active} {disabled} {id} {setActiveId}>
      {value}
    </KeyboardInputButton>
  </div>
  <div class="label-container">
    <span>{label}</span>
  </div>
</div>

<style>
  .keyboard-input {
    width: 100%;
    display: flex;
    margin-bottom: 4px;
  }
  .label-container {
    flex-basis: 50%;
    text-align: left;
  }
  .button-container {
    flex-basis: 50%;
    text-align: right;
  }
  span {
    flex-grow: 1;
    line-height: 32px;
  }
</style>
