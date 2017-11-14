<template>
  <div class="synthParam">
    <h2>Synth {{ number }}</h2>
    <div class="type">
      <label for="type">Wave:</label>
      <select id="type" v-model="synth.type">
        <option value="sine">Sine</option>
        <option value="square">Square</option>
        <option value="sawtooth">Sawtooth</option>
        <option value="triangle">Triangle</option>
      </select>
    </div>
    <div class="attack">
      <label for="attack">Attack: </label>
      <input type="range" id="attack" max="2" min="0" step="0.01" v-model="synth.attack">
      <div>{{ synth.attack }}</div>
    </div>
    <div class="release">
      <label for="release">Release: </label>
      <input type="range" id="release" max="2" min="0" step="0.01" v-model="synth.release">
      <div>{{ synth.release }}</div>
    </div>
    <div class="volume">
      <label for="volume">Volume: </label>
      <input type="range" id="volume" max="1" min="0" step="0.1" v-model="synth.volume">
      <div>{{ synth.volume }}</div>
    </div>

    <div class="delete" @click="remove(number - 1)">X</div>
  </div>
</template>

<script>
export default {
  name: 'SynthParam',
  props: ['synth', 'number', 'remove']
}
</script>

<style lang="scss">
$light: #ECECEC;
$dark: #22313F;

.synthParam {
  background: $light;
  padding: 1em;
  border: 2px solid $dark;
  position: relative;
  margin: 10px;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  h2 {
    margin-bottom: 10px;
  }
  &>div {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    label {
      width: 80px;
      margin-right: 10px;
      display: block;
      text-align: right;
    }
    input, select {
      width: 150px;
      margin-right: 10px;
    }
    div {
      width: 40px;
      text-align: left;
    }
  }

  .delete {
    position: absolute;
    top:   0.5em;
    right: 0.5em;
    cursor: pointer;
  }
}
</style>
