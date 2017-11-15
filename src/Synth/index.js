// Les notes correspondes au note en MIDI
// Référence: http://subsynth.sourceforge.net/midinote2freq.html
import notes from './notes'

// On definie le contexte audio, en fonction de ce qu'on trouve
let context = null
if (typeof AudioContext !== 'undefined') {
  context = new AudioContext()
} else if (typeof webkitAudioContext !== 'undefined') {
  context = new webkitAudioContext() // eslint-disable-line
}

/**
 * Permet de constuire un synthé, parametrable.
 * Chaque note sera un Oscillateur, generer pour l'occasion (à verifier si c'est bien malin)
 * @class
 */
export default class Synth {
  /**
   * Un constructeur, il construit pardi !
   * @param {String} object.type
   * @param {number} object.release
   * @param {number} object.attack
   * @param {number} object.volume
   * @return Synth
   */
  constructor ({ type = 'sine', release = 0.01, attack = 0.01, volume = 1, detune = 0 }) {
    // TODO: Check les valeurs
    this.context = context
    this.type = type
    this.attack = attack
    this.release = release
    this.volume = volume
    this.notes = notes
    this.detune = detune
    this.playing = {}
  }

  get attack () { return this._attack }
  set attack (val) { this._attack = Number(val) || 0.001 }

  get release () { return this._release }
  set release (val) { this._release = Number(val) || 0.001 }

  get volume () { return this._volume }
  set volume (val) { this._volume = Number(val) || 0.001 }

  get detune () { return this._detune }
  set detune (val) {
    this._detune = Number(val)
    this.clear()
  }

  get type () { return this._type }
  set type (val) {
    this._type = val
    this.clear()
  }

  /**
   * Coupe toute les notes, puis remet this.playing vide
   * Notamenet utilisé quand on change le type
   */
  clear () {
    // TODO: Il existerai pas un close() ?
    for (let p in this.playing) {
      this.playing[p].oscillator.stop()
    }
    this.playing = {}
  }

  /**
   * Joue une note, a une octave
   * @method play
   * @param {String} note, La note, parfois avec l'octave déjà renseigné. Note en anglais (C, D, E, etc.)
   * @param {String} octave, Octave de la note, si elle n'est pas déjà renseigné dans la note
   */
  play (note, volume) {
    note = Number(note)

    // Si la note n'existe pas, on la crée
    if (!this.playing[note]) this.createNote(note)

    // On annule tout eventuel slide vers le bas prévu
    this.playing[note].gainNode.gain.cancelScheduledValues(0)

    // On joue la note, avec les parametre du synthé
    this.playing[note].gainNode.gain.exponentialRampToValueAtTime(this.volume, this.context.currentTime + this.attack)
  }

  /**
   * Stop une note qui est en train d'être joué
   * @method stop
   * @param  {String} note
   * @param  {String} octave
   */
  stop (note) {
    note = Number(note)

    // Si il y a pas de note, pas la peine de continué
    if (!this.playing[note]) return

    // On annule tout eventuel slide vers le bas prévu
    this.playing[note].gainNode.gain.cancelScheduledValues(0)

    // On stop la note, avec les parametre du synthé
    this.playing[note].gainNode.gain.exponentialRampToValueAtTime(0.0001, this.context.currentTime + this.release)
  }

  /**
   * [createNote description]
   * @method createNote
   * @param  {String}   note
   */
  createNote (note) {
    let oscillator = context.createOscillator()
    let gainNode = context.createGain()
    oscillator.type = this.type
    oscillator.frequency.value = this.notes[note]
    oscillator.detune.value = this.detune * 100
    gainNode.connect(this.context.destination)
    oscillator.connect(gainNode)
    gainNode.gain.value = 0.0001
    oscillator.start(0)
    this.playing[note] = { oscillator, gainNode }
  }
}
