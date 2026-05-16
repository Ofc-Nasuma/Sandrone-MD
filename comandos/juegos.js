const piropos = [
  'Si la belleza fuera un delito, tendrias cadena perpetua. 🖤',
  'Eres tan especial que hasta las estrellas te envidian. 🌟',
  'Tu sonrisa ilumina hasta los rincones mas oscuros. 🕯️',
  'Si fueras cancion, serias la mas hermosa jamas escrita. 🎵',
  'Tus ojos tienen mas profundidad que el oceano. 🌊',
  'Donde tu pisas, florecen las sombras mas elegantes. 🖤',
  'Eres la respuesta a preguntas que aun no se han hecho. ✨',
  'Tu presencia cambia el peso del aire a tu alrededor. 🌙'
]

const retos = [
  'Envia un mensaje de voz cantando una cancion. 🎤',
  'Escribe un poema corto para alguien del grupo. ✍️',
  'Di algo bonito a la persona de arriba. 🌸',
  'Cuenta un chiste en menos de 3 lineas. 😄',
  'Escribe tu nombre con los ojos cerrados. 👁️',
  'Di 3 cosas que te gustan de este grupo. 💬',
  'Haz una pregunta misteriosa al grupo. 🔮',
  'Describe tu dia en solo 5 palabras. 📝'
]

const acertijos = [
  { pregunta: 'Tengo ciudades pero no casas, bosques pero no arboles, agua pero no peces. Que soy?', respuesta: 'un mapa' },
  { pregunta: 'Cuanto mas me secas, mas mojado me pongo. Que soy?', respuesta: 'una toalla' },
  { pregunta: 'Siempre delante de ti pero no se puede ver. Que es?', respuesta: 'el futuro' },
  { pregunta: 'Tiene manos pero no puede aplaudir. Que es?', respuesta: 'un reloj' },
  { pregunta: 'Entre mas grande, menos pesa. Que es?', respuesta: 'un agujero' },
  { pregunta: 'Soy tuyo pero los demas lo usan mas que tu. Que soy?', respuesta: 'tu nombre' },
  { pregunta: 'Corro pero no tengo piernas, tengo boca pero no hablo. Que soy?', respuesta: 'un rio' },
  { pregunta: 'Me puedes romper sin tocarme. Que soy?', respuesta: 'el silencio' }
]

const palabrasAhorcado = [
  { palabra: 'elefante', pista: 'Animal grande con trompa' },
  { palabra: 'mariposa', pista: 'Insecto con alas coloridas' },
  { palabra: 'cascada', pista: 'Caida de agua natural' },
  { palabra: 'dinosaurio', pista: 'Animal prehistorico extinto' },
  { palabra: 'telescopio', pista: 'Instrumento para ver las estrellas' },
  { palabra: 'biblioteca', pista: 'Lugar lleno de libros' },
  { palabra: 'volcan', pista: 'Montana que escupe lava' },
  { palabra: 'chocolate', pista: 'Dulce hecho de cacao' },
  { palabra: 'submarino', pista: 'Vehiculo que viaja bajo el agua' },
  { palabra: 'piramide', pista: 'Construccion antigua de Egipto' },
  { palabra: 'dragon', pista: 'Criatura mitica que escupe fuego' },
  { palabra: 'galaxia', pista: 'Sistema de millones de estrellas' },
  { palabra: 'cocodrilo', pista: 'Reptil con grandes dientes' },
  { palabra: 'aventura', pista: 'Experiencia emocionante e inesperada' },
  { palabra: 'misterio', pista: 'Algo desconocido que hay que descubrir' },
  { palabra: 'cangrejo', pista: 'Animal marino con pinzas' },
  { palabra: 'fotografia', pista: 'Arte de capturar imagenes' },
  { palabra: 'murcielago', pista: 'Animal nocturno que vuela' }
]

const preguntasTrivia = [
  { pregunta: 'Cual es el planeta mas grande del sistema solar?', opciones: ['A) Saturno', 'B) Jupiter', 'C) Neptuno', 'D) Urano'], respuesta: 'b', explicacion: 'Jupiter es el planeta mas grande.' },
  { pregunta: 'En que ano llego el hombre a la luna?', opciones: ['A) 1965', 'B) 1972', 'C) 1969', 'D) 1970'], respuesta: 'c', explicacion: 'Fue en 1969 con el Apollo 11.' },
  { pregunta: 'Cual es el pais mas grande del mundo?', opciones: ['A) China', 'B) Canada', 'C) Brasil', 'D) Rusia'], respuesta: 'd', explicacion: 'Rusia es el pais mas grande.' },
  { pregunta: 'Cuantos colores tiene el arcoiris?', opciones: ['A) 5', 'B) 6', 'C) 7', 'D) 8'], respuesta: 'c', explicacion: 'El arcoiris tiene 7 colores.' },
  { pregunta: 'Quien pinto la Mona Lisa?', opciones: ['A) Miguel Angel', 'B) Rafael', 'C) Da Vinci', 'D) Picasso'], respuesta: 'c', explicacion: 'Leonardo Da Vinci la pinto.' },
  { pregunta: 'Cual es el oceano mas grande?', opciones: ['A) Atlantico', 'B) Indico', 'C) Artico', 'D) Pacifico'], respuesta: 'd', explicacion: 'El oceano Pacifico es el mas grande.' },
  { pregunta: 'De que animal es la lana?', opciones: ['A) Cabra', 'B) Oveja', 'C) Vaca', 'D) Cerdo'], respuesta: 'b', explicacion: 'La lana viene de las ovejas.' },
  { pregunta: 'Cuantos lados tiene un hexagono?', opciones: ['A) 5', 'B) 7', 'C) 6', 'D) 8'], respuesta: 'c', explicacion: 'Un hexagono tiene 6 lados.' },
  { pregunta: 'Cual es el animal mas rapido del mundo?', opciones: ['A) Leon', 'B) Guepardo', 'C) Halcon', 'D) Caballo'], respuesta: 'b', explicacion: 'El guepardo alcanza 120 km/h.' },
  { pregunta: 'Cuantos huesos tiene el cuerpo humano adulto?', opciones: ['A) 206', 'B) 180', 'C) 250', 'D) 300'], respuesta: 'a', explicacion: 'El cuerpo humano tiene 206 huesos.' }
]

function getEstado(juego) {
  const oculta = juego.palabra.split('').map(l => juego.letrasAdivinadas.includes(l) ? l : '_').join(' ')
  const vidas = '❤️'.repeat(juego.vidas) + '🖤'.repeat(6 - juego.vidas)
  return oculta + '\n\n' + vidas + ' (' + (6 - juego.vidas) + '/6)\nLetras: ' + (juego.letrasUsadas.join(', ') || 'ninguna')
}

module.exports = async (ctx) => {
  const { sock, msg, from, nombre, cmd, args, s, config, textoRaw, tienePrefijo } = ctx
  const { juegoAhorcado, juegoTrivia, juegoNumero, juegoPPT } = config

  if (juegoAhorcado[from] && !tienePrefijo && textoRaw.length === 1) {
    const juego = juegoAhorcado[from]
    const letra = textoRaw.toLowerCase()
    if (juego.letrasUsadas.includes(letra)) { await s('🕯️ Ya usaste *' + letra + '*, ' + nombre + '. Intenta otra. 🖤'); return true }
    juego.letrasUsadas.push(letra)
    if (juego.palabra.includes(letra)) {
      juego.letrasAdivinadas.push(letra)
      if (juego.palabra.split('').every(l => juego.letrasAdivinadas.includes(l))) {
        delete juegoAhorcado[from]
        await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n🎉 Ganaste, *' + nombre + '*!\nLa palabra era *' + juego.palabra + '* ✨\n\n> [ ✰ ] Sandrone-MD')
        return true
      }
      await s('✅ La letra *' + letra + '* esta en la palabra.\n\n' + getEstado(juego))
    } else {
      juego.vidas--
      if (juego.vidas <= 0) {
        delete juegoAhorcado[from]
        await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n💀 Perdiste, *' + nombre + '*...\nLa palabra era *' + juego.palabra + '* 🖤\n\n> [ ✰ ] Sandrone-MD')
        return true
      }
      await s('❌ La letra *' + letra + '* no esta.\n\n' + getEstado(juego))
    }
    return true
  }

  if (juegoTrivia[from] && !tienePrefijo && ['a','b','c','d'].includes(textoRaw.toLowerCase())) {
    const juego = juegoTrivia[from]
    delete juegoTrivia[from]
    if (textoRaw.toLowerCase() === juego.respuesta) {
      await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n🎉 Correcto, *' + nombre + '*! ✨\n\n📖 ' + juego.explicacion + '\n\n> [ ✰ ] Sandrone-MD')
    } else {
      await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n❌ Incorrecto...\nEra *' + juego.respuesta.toUpperCase() + '* 🖤\n\n📖 ' + juego.explicacion + '\n\n> [ ✰ ] Sandrone-MD')
    }
    return true
  }

  if (juegoPPT[from] && !tienePrefijo) {
    const opciones = ['piedra', 'papel', 'tijera']
    const eleccionUser = textoRaw.toLowerCase()
    if (!opciones.includes(eleccionUser)) return false
    const eleccionBot = opciones[Math.floor(Math.random() * 3)]
    delete juegoPPT[from]
    let resultado = eleccionUser === eleccionBot ? '🤝 Empate!' : ((eleccionUser === 'piedra' && eleccionBot === 'tijera') || (eleccionUser === 'papel' && eleccionBot === 'piedra') || (eleccionUser === 'tijera' && eleccionBot === 'papel')) ? '🎉 Ganaste!' : '😈 Gane yo!'
    await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ ✊ Tu: *' + eleccionUser + '*\nੈ✿ֵ‧₊˚ 🤖 Yo: *' + eleccionBot + '*\n\n' + resultado + ' 🖤\n\n> [ ✰ ] Sandrone-MD')
    return true
  }

  if (juegoNumero[from] && !tienePrefijo && !isNaN(textoRaw) && textoRaw !== '') {
    const juego = juegoNumero[from]
    const intento = parseInt(textoRaw)
    juego.intentos++
    if (intento === juego.numero) {
      delete juegoNumero[from]
      await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n🎉 Correcto, *' + nombre + '*!\nEra el *' + juego.numero + '* en *' + juego.intentos + '* intentos ✨\n\n> [ ✰ ] Sandrone-MD')
    } else {
      await s(intento < juego.numero ? '📈 El numero es *mayor* que ' + intento + '... Sigue! 🖤' : '📉 El numero es *menor* que ' + intento + '... Sigue! 🖤')
    }
    return true
  }

  if (!cmd) return false

  if (cmd === 'ahorcado') {
    const item = palabrasAhorcado[Math.floor(Math.random() * palabrasAhorcado.length)]
    juegoAhorcado[from] = { palabra: item.palabra, pista: item.pista, letrasAdivinadas: [], letrasUsadas: [], vidas: 6 }
    await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 🎮 *Ahorcado*\nੈ✿ֵ‧₊˚ 💡 *Pista:* ' + item.pista + '\n\n📝 ' + item.palabra.split('').map(() => '_').join(' ') + '\n\n❤️❤️❤️❤️❤️❤️ (0/6)\n\n🕯️ Envia una letra, ' + nombre + '! 🖤\n\n> [ ✰ ] Sandrone-MD')
    return true
  }

  if (cmd === 'trivia') {
    const p = preguntasTrivia[Math.floor(Math.random() * preguntasTrivia.length)]
    juegoTrivia[from] = p
    await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 🧠 *Trivia*\n\n❓ *' + p.pregunta + '*\n\n' + p.opciones.join('\n') + '\n\n🕯️ Responde A, B, C o D, ' + nombre + '! 🖤\n\n> [ ✰ ] Sandrone-MD')
    return true
  }

  if (cmd === 'numero') {
    const n = Math.floor(Math.random() * 100) + 1
    juegoNumero[from] = { numero: n, intentos: 0 }
    await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 🔢 *Adivina el Numero*\n\n🎯 Pienso en un numero del *1 al 100*...\n\n🕯️ Cual crees, ' + nombre + '? 🖤\n\n> [ ✰ ] Sandrone-MD')
    return true
  }

  if (cmd === 'ppt') {
    juegoPPT[from] = true
    await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ ✊ *Piedra Papel Tijera*\n\n🪨 *piedra*\n📄 *papel*\n✂️ *tijera*\n\n🕯️ Elige, ' + nombre + '! 🖤\n\n> [ ✰ ] Sandrone-MD')
    return true
  }

  if (cmd === 'coinflip') {
    await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 🪙 *CoinFlip*\nੈ✿ֵ‧₊˚ ✨ *Resultado:* ' + (Math.random() < 0.5 ? 'CARA 👑' : 'CRUZ 🌑') + '\n\n🕯️ El destino decidio, ' + nombre + '... 🖤\n\n> [ ✰ ] Sandrone-MD')
    return true
  }

  if (cmd === 'acertijo') {
    const a = acertijos[Math.floor(Math.random() * acertijos.length)]
    await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 🔮 *Acertijo*\n\n❓ *' + a.pregunta + '*\n\n💡 Respuesta: ||' + a.respuesta + '||\n\n> [ ✰ ] Sandrone-MD')
    return true
  }

  if (cmd === 'piropo') {
    await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 🌹 *Piropo para ' + nombre + '*\n\n🖤 ' + piropos[Math.floor(Math.random() * piropos.length)] + '\n\n> [ ✰ ] Sandrone-MD')
    return true
  }

  if (cmd === 'reto') {
    await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 🎯 *Reto para ' + nombre + '*\n\n⚡ ' + retos[Math.floor(Math.random() * retos.length)] + '\n\n🕯️ Acepta el desafio... 🖤\n\n> [ ✰ ] Sandrone-MD')
    return true
  }

  if (['iqtest','mates','apostar','ruleta','slot','gay','kill','kiss','love','dance','top'].includes(cmd)) {
    await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n🚧 *' + cmd + '* proximamente, ' + nombre + '... 🖤\n\n> [ ✰ ] Sandrone-MD')
    return true
  }

  return false
}
