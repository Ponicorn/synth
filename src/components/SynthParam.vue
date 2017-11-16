<template>
  <div class="synthParam">
    <div class="topbar">
      <div class="delete" @click="remove(number - 1)">X</div>
    </div>

    <!-- <h2>Synth {{ number }}</h2> -->
    <div class="waveform">
      <div @click="synth.type = 'sine'" :class="{ selected: synth.type=== 'sine' }"><img src="../assets/sine.svg" alt="sine wave"> </div>
      <div @click="synth.type = 'square'" :class="{ selected: synth.type=== 'square' }"><img src="../assets/square.svg" alt="square wave"> </div>
      <div @click="synth.type = 'sawtooth'" :class="{ selected: synth.type=== 'sawtooth' }"><img src="../assets/sawtooth.svg" alt="sawtooth wave"> </div>
      <div @click="synth.type = 'triangle'" :class="{ selected: synth.type=== 'triangle' }"><img src="../assets/triangle.svg" alt="triangle wave"> </div>
    </div>

    <div class="row">
      <div class="attack">
        <div class="lib">⬈</div>
        <div><input type="number" value="0" step="0.1" min="0" v-model="synth.attack"></div>
      </div>
      <div class="release">
        <div class="lib">⬊</div>
        <div><input type="number" value="0" step="0.1" min="0" v-model="synth.release"></div>
      </div>
    </div>

    <div class="row">
      <div class="detune">
        <div class="lib">#</div>
        <div><input type="number" value="0" step="1" min="-11" max="11" v-model="synth.detune"></div>
      </div>
      <div class="octave">
        <div class="lib">O</div>
        <div><input type="number" value="0" step="1" min="-3" max="3" v-model="synth.octave"></div>
      </div>
    </div>

    <div class="row">
      <div class="volume">
        <div class="lib">&#128266;</div>
        <div><input type="number" value="0" step="0.1" min="0" max="1" v-model="synth.volume"></div>
      </div>
    </div>


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
$border: 4px solid $dark;


.synthParam {
  background: $light;
  padding: 0 10px 10px 10px;
  border: $border;
  position: relative;
  margin: 10px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .topbar {
    background: $dark;
    color: $light;
    margin: 0 -10px 10px -10px;
    padding-bottom: 4px;
    display: flex;
    justify-content: flex-end;
    height: 20px;
    .delete {
      height: 20px;
      width: 20px;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .waveform {
    display: flex;
    justify-content: space-between;
    &>div {
      // flex-grow: 1;
      height: 30px;
      width:  30px;
      padding: 5px;
      margin-right: 10px;
      border: 2px solid darken($light, 10%);
      cursor: pointer;
      &:last-child {
        margin: 0;
      }
      &.selected {
        border-color: $dark;;
      }
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
  }

  .row {
    margin: 10px 0;
    display: flex;
    justify-content: space-between;

    .attack, .release, .detune, .octave, .volume {
      display: flex;
      align-items: center;
      font-weight: 600;
      font-size: 1.2rem;
      .lib {
        height: 30px;
        width: 20px;
        margin-right: 10px;
        display: flex;
        align-items: center;
      }
      input {
        border:none;
        background-image:none;
        background-color:transparent;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
        width: 60px;
        height: 30px;
        background: #fff;
        box-sizing: border-box;
        padding: 0 5px;
        text-align: center;
        color: $dark;
        font-weight: 600;
        font-size: 1rem;
        display: flex;
        align-items: center;
      }
    }
  }

}
</style>
