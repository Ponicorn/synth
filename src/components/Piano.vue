<template>
  <div class="Piano">
    <!-- Le clavier visuel et interactif -->
    <div class="clavierWrap">
      <Douze :octave="octave - 1" :play="play" :stop="stop"/>
      <Douze :octave="octave"     :play="play" :stop="stop"/>
      <Douze :octave="octave + 1"  :play="play" :stop="stop"/>
    </div>

    <!-- Les quelques options "global" -->
    <div class="options">
      <div class="octave">
        <div class="text">Octave {{ octave }}</div>
        <div class="button" @click="octave++" >+</div>
        <div class="button" @click="octave--" >-</div>
      </div>
      <div class="addsynth">
        <div class="text">Add synth</div>
        <div class="button" @click="addSynth()">+</div>
        <div class="button" @click="removeSynth(synth.length - 1)">-</div>
      </div>
    </div>

    <!-- La configuration de chaque osciallateurs -->
    <div class="synthParamWrap">
      <SynthParam v-for="(s, key) in synth" :synth="s" :number="key + 1" :remove="removeSynth" :key="key" />
    </div>
  </div>
</template>

<script>
import Douze from '@/components/Douze'
import SynthParam from '@/components/SynthParam'
import Synth from '@/Synth'
import bindMidi from '@/bindMidi'

export default {
  name: 'Piano',
  components: { Douze, SynthParam },
  data () {
    return {
      synth: [ new Synth({}) ],
      octave: 0,
      notebase: 60
    }
  },
  computed: {
    note () { return this.notebase + this.octave * 12 }
  },
  created () {
    bindMidi(this.midiEvent)
  },
  methods: {
    play (note, velocite) { this.synth.forEach(s => s.play(note, velocite)) },
    stop (note) { this.synth.forEach(s => s.stop(note)) },
    addSynth () { this.synth.push(new Synth({})) },
    removeSynth (index) { this.synth.splice(index, 1) },
    midiEvent (ev) {
      let action = ev.data[0] // 144 -> appuyer | 128 -> relacher
      let note = ev.data[1]
      let velocite = ev.data[2]
      if (action === 144) return this.play(note, velocite)
      if (action === 128) return this.stop(note)
      console.log(ev.data) // DEV: On log l'event si il est inconnu
    }
  }
}
</script>

<style lang="scss" scoped>
$light: #ECECEC;
$dark: #22313F;

.clavierWrap {
  display: flex;
  flex-direction: row;
  padding: 2em 2em 10px 2em;
  justify-content: center;
}

.options {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 1.4em;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  &>div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 1em;
  }
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: $light;
    border: 2px solid $dark;
    height: 35px;
    width:  35px;
    margin: 0 5px;
    cursor: pointer;
  }
}

.synthParamWrap {
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
