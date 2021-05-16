<script>
  export let label;
  export let checked;
  export let disabled = false;
</script>

<label class="switch">
  <span class="label">
    {label}
  </span>
  <input type="checkbox" bind:checked {disabled} />
  <span class="slider round" />
</label>

<style>
  .switch {
    cursor: pointer;
    position: relative;
    display: flex;
    height: 24px;
    line-height: 24px;
  }

  .label {
    font-size: 14px;
    flex-grow: 1;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    width: 48px;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: relative;
    display: block;
    content: '';
    height: 22px;
    width: 22px;
    left: 1px;
    top: 1px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:checked + .slider {
    background-color: red;
  }

  input:focus + .slider {
    box-shadow: 0 0 3px red;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(24px);
    -ms-transform: translateX(24px);
    transform: translateX(24px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
</style>
