<template>
  <div class="douze" @mousedown="clickin" @mouseup="unclickin">
    <div data-note="C"  @mouseover="overin" @mouseleave="leavin" class="blanche" :class="{ playing: playing['C']}"></div>
    <div data-note="C#" @mouseover="overin" @mouseleave="leavin" class="noire"   :class="{ playing: playing['C#']}"></div>
    <div data-note="D"  @mouseover="overin" @mouseleave="leavin" class="blanche" :class="{ playing: playing['D']}"></div>
    <div data-note="D#" @mouseover="overin" @mouseleave="leavin" class="noire"   :class="{ playing: playing['D#']}"></div>
    <div data-note="E"  @mouseover="overin" @mouseleave="leavin" class="blanche" :class="{ playing: playing['E']}"></div>
    <div data-note="F"  @mouseover="overin" @mouseleave="leavin" class="blanche" :class="{ playing: playing['F']}"></div>
    <div data-note="F#" @mouseover="overin" @mouseleave="leavin" class="noire"   :class="{ playing: playing['F#']}"></div>
    <div data-note="G"  @mouseover="overin" @mouseleave="leavin" class="blanche" :class="{ playing: playing['G']}"></div>
    <div data-note="G#" @mouseover="overin" @mouseleave="leavin" class="noire"   :class="{ playing: playing['G#']}"></div>
    <div data-note="A"  @mouseover="overin" @mouseleave="leavin" class="blanche" :class="{ playing: playing['A']}"></div>
    <div data-note="A#" @mouseover="overin" @mouseleave="leavin" class="noire"   :class="{ playing: playing['A#']}"></div>
    <div data-note="B"  @mouseover="overin" @mouseleave="leavin" class="blanche" :class="{ playing: playing['B']}"></div>
  </div>
</template>

<script>
export default {
  name: 'Douze',
  data () {
    return { playing: {} }
  },
  props: {
    octave: { default: 4, type: Number },
    play: { type: Function },
    stop: { type: Function }
  },
  methods: {
    overin (ev) {
      if (!ev.buttons) return
      let note = ev.target.dataset.note
      if (!note) return
      this.$set(this.playing, note, true)
      this.play(note, this.octave)
    },
    leavin (ev) {
      if (!ev.buttons) return
      let note = ev.target.dataset.note
      if (!note) return
      this.$set(this.playing, note, false)
      this.stop(note, this.octave)
    },
    clickin (ev) {
      let note = ev.target.dataset.note
      if (!note) return
      this.$set(this.playing, note, true)
      this.play(note, this.octave)
    },
    unclickin (ev) {
      let note = ev.target.dataset.note
      if (!note) return
      this.$set(this.playing, note, false)
      this.stop(note, this.octave)
    }
  }
}
</script>

<style lang="scss" scoped>
$light: #F2F1EF;
$dark: #22313F;
$height: 120px;
$bsize: 40px;
$nsize: 30px;
$border: 2px solid $dark;

.douze {
  height: $height;
  display: flex;
  flex-direction: row;
  border-left: $border;
  border-top: $border;
  border-bottom: $border;
  box-sizing: border-box;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:last-child {
    border-right: $border
  }

  .blanche {
    box-sizing: border-box;
    height: 100%;
    width: $bsize;
    background: $light;
    border-right: $border;
    z-index: 10;
    &:last-child { border-right: 0 }
    &.playing { background: darken($light, 25%); }
  }

  .noire {
    box-sizing: border-box;
    height: 70%;
    width: $nsize;
    background: $dark;
    margin-left: (-$nsize/2);
    margin-right: (-$nsize/2);
    z-index: 11;
    &.playing { background: lighten($dark, 25%); }

  }
}

</style>
