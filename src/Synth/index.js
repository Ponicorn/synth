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
  constructor ({ type = 'sine', release = 0, attack = 0, volume = 1, detune = 0, octave = 0 }) {
    // TODO: Check les valeurs
    this.context = context
    this.gainNode = this.context.createGain()
    this.gainNode.connect(context.destination)
    this.type = type
    this.attack = attack
    this.release = release
    this.notes = notes
    this.detune = detune
    this.octave = octave
    this.volume = volume
    this.playing = {}
  }

  get attack () { return this._attack }
  set attack (val) { this._attack = Number(val) }

  get release () { return this._release }
  set release (val) { this._release = Number(val) }

  get volume () { return this._volume }
  set volume (val) {
    this._volume = Number(val) || 0.001
    this.gainNode.gain.value = this._volume
  }

  get detune () { return this._detune }
  set detune (val) {
    this._detune = Number(val)
    this.clear()
  }

  get octave () { return this._octave }
  set octave (val) {
    this._octave = Number(val)
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
  play (note, velocite = 127) {
    note = Number(note)

    // Si la note n'existe pas, on la crée
    if (!this.playing[note]) this.createNote(note)

    // On annule tout eventuel slide vers le bas prévu
    this.playing[note].gainNode.gain.cancelScheduledValues(0)

    // On joue la note, avec les parametre du synthé
    let atk = this.attack || 0.01
    let time = this.context.currentTime + atk
    let volume = Math.round((velocite / 12.8)) / 10 || 0.1
    this.playing[note].gainNode.gain.exponentialRampToValueAtTime(volume, time)
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

    let rlz = this.release || 0.01
    let time = this.context.currentTime + rlz
    // On stop la note, avec les parametre du synthé
    this.playing[note].gainNode.gain.exponentialRampToValueAtTime(0.00001, time)
  }

  /**
   * [createNote description]
   * @method createNote
   * @param  {String}   note
   */
  createNote (note) {
    // Oscillateur et noeds de gain pour la note
    let oscillator = context.createOscillator()
    let gainNode = context.createGain()

    // Paramtetrage de l'Oscillateur
    oscillator.type = this.type
    oscillator.frequency.value = this.notes[note]
    oscillator.detune.value = this.detune * 100 + this.octave * 1200

    // On fait les connections
    oscillator.connect(gainNode)
    gainNode.connect(this.gainNode)
    // gainNode.connect(this.context.destination)

    gainNode.gain.value = 0.0001
    oscillator.start(0)
    this.playing[note] = { oscillator, gainNode }
  }
}
