function bindKeyboard (play, stop) {
  const keyNote = {
    'KeyA': '60',
    'KeyW': '61',
    'KeyS': '62',
    'KeyE': '63',
    'KeyD': '64',
    'KeyF': '65',
    'KeyT': '66',
    'KeyG': '67',
    'KeyY': '68',
    'KeyH': '69',
    'KeyU': '70',
    'KeyJ': '71',
    'KeyK': '72',
    'KeyO': '73',
    'KeyL': '74',
    'KeyP': '75',
    'Semicolon': '76'
  }

  window.addEventListener('keydown', (e) => { if (keyNote[e.code]) play(keyNote[e.code]) })

  window.addEventListener('keyup', (e) => { if (keyNote[e.code]) stop(keyNote[e.code]) })
}

export default bindKeyboard
