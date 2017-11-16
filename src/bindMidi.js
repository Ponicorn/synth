
// On va essayer de recuperer une interface midi, si elle existe
async function bindMidi (onMidiInput) {
  // Si n'y a meme pas la fonction on peut s'arreter tout de suite
  if (!navigator.requestMIDIAccess) {
    console.log('Try with chrome')
    return
  }

  // On récupère le midi input
  let midi
  try {
    midi = await navigator.requestMIDIAccess()
  } catch (err) {
    console.error('oops', err)
    return
  }

  // On va parcourir l'inputs midi
  let input = midi.inputs.values()
  for (let touch = input.next(); !touch.done; touch = input.next()) {
    touch.value.onmidimessage = onMidiInput
  }
}

export default bindMidi
