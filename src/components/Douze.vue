<template>
  <div class="douze" @mousedown="clickin" @mouseup="unclickin">
    <div :data-note="60"  @mouseover="overin" @mouseleave="leavin" class="blanche" :class="{ playing: playing[60]}"></div>
    <div :data-note="61"  @mouseover="overin" @mouseleave="leavin" class="noire"   :class="{ playing: playing[61]}"></div>
    <div :data-note="62"  @mouseover="overin" @mouseleave="leavin" class="blanche" :class="{ playing: playing[62]}"></div>
    <div :data-note="63"  @mouseover="overin" @mouseleave="leavin" class="noire"   :class="{ playing: playing[63]}"></div>
    <div :data-note="64"  @mouseover="overin" @mouseleave="leavin" class="blanche" :class="{ playing: playing[64]}"></div>
    <div :data-note="65"  @mouseover="overin" @mouseleave="leavin" class="blanche" :class="{ playing: playing[65]}"></div>
    <div :data-note="66"  @mouseover="overin" @mouseleave="leavin" class="noire"   :class="{ playing: playing[66]}"></div>
    <div :data-note="67"  @mouseover="overin" @mouseleave="leavin" class="blanche" :class="{ playing: playing[67]}"></div>
    <div :data-note="68"  @mouseover="overin" @mouseleave="leavin" class="noire"   :class="{ playing: playing[68]}"></div>
    <div :data-note="69"  @mouseover="overin" @mouseleave="leavin" class="blanche" :class="{ playing: playing[69]}"></div>
    <div :data-note="70"  @mouseover="overin" @mouseleave="leavin" class="noire"   :class="{ playing: playing[70]}"></div>
    <div :data-note="71"  @mouseover="overin" @mouseleave="leavin" class="blanche" :class="{ playing: playing[71]}"></div>
  </div>
</template>

<script>
export default {
  name: 'Douze',
  data () {
    return { playing: {} }
  },
  props: {
    octave: { default: 0, type: Number },
    play: { type: Function },
    stop: { type: Function }
  },
  methods: {
    overin (ev) {
      if (!ev.buttons) return
      this.clickin(ev)
    },
    leavin (ev) {
      if (!ev.buttons) return
      this.unclickin(ev)
    },
    clickin (ev) {
      let note = ev.target.dataset.note
      if (!note) return
      this.$set(this.playing, note, true)
      note = Number(note) + this.octave * 12
      this.play(note)
    },
    unclickin (ev) {
      let note = ev.target.dataset.note
      if (!note) return
      this.$set(this.playing, note, false)
      note = Number(note) + this.octave * 12
      this.stop(note)
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
$border: 4px solid $dark;

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
    margin-left: (-($nsize + 3)/2);
    margin-right: (-($nsize - 3)/2);
    z-index: 11;
    border-right: $border;
    border-left: $border;
    border-bottom: $border;
    &.playing { background: lighten($dark, 25%); }

  }
}

</style>
