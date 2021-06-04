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

<button
  class="keyboard-input"
  on:click={() => {
    if (!disabled) {
      setActiveId(id);
    }
  }}
>
  <div class="label-container">
    <span>{label}</span>
  </div>
  <div class="button-container">
    {#if ctrl}
      <KeyboardInputButton {active} {disabled}>Ctrl</KeyboardInputButton>
    {/if}
    {#if shift}
      <KeyboardInputButton {active} {disabled}>Maj</KeyboardInputButton>
    {/if}
    {#if alt}
      <KeyboardInputButton {active} {disabled}>Alt</KeyboardInputButton>
    {/if}
    <KeyboardInputButton {active} {disabled}>
      {value}
    </KeyboardInputButton>
  </div>
</button>

<style>
  .keyboard-input {
    cursor: pointer;
    width: 100%;
    display: flex;
    padding: 4px;
    border: none;
    background: none;
    font-size: 14px;
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
