const { default: makeWASocket, useMultiFileAuthState, downloadContentFromMessage } = require('@whiskeysockets/baileys')
const pino = require('pino')
const sharp = require('sharp')

const OWNER = ['51954507582', '527971165432', '259145894772784', '100026164445290']
const MENU_IMG = 'https://raw.githubusercontent.com/Ofc-Nasuma/Sandrone-MD/main/73790c757ba9bdbb8f1b331dc99e41ea.jpg'
const BIENVENIDA_IMG = 'https://raw.githubusercontent.com/Ofc-Nasuma/Sandrone-MD/main/a8ba730192c31074b72c982a63bb3e66.jpg'
const INICIO = Date.now()

const antispamActivo = {}
const advertencias = {}
const mensajesRecientes = {}
const juegoAhorcado = {}
const juegoTrivia = {}
const juegoNumero = {}
const juegoPPT = {}

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

const NO_DISPONIBLE = (cmd, nombre) => '*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n๑ " El comando *' + cmd + '* aun esta en desarrollo... ❄ "\n︶ ⏝ ︶ ୨୧ ︶ ⏝ ︶\n\n🕯️ Vuelve pronto, *' + nombre + '*...\nSandrone esta trabajando en ello. 🖤\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD'

function getEstadoAhorcado(juego) {
  const letrasOcultas = juego.palabra.split('').map(l => juego.letrasAdivinadas.includes(l) ? l : '_').join(' ')
  const intentos = '❤️'.repeat(juego.vidas) + '🖤'.repeat(6 - juego.vidas)
  return letrasOcultas + '\n\n' + intentos + ' (' + (6 - juego.vidas) + '/6 fallos)\nLetras usadas: ' + (juego.letrasUsadas.join(', ') || 'ninguna')
}

function formatRuntime(ms) {
  const s = Math.floor(ms / 1000)
  const m = Math.floor(s / 60)
  const h = Math.floor(m / 60)
  const d = Math.floor(h / 24)
  return d + 'd ' + (h % 24) + 'h ' + (m % 60) + 'm ' + (s % 60) + 's'
}

async function startSandrone() {
  const { state, saveCreds } = await useMultiFileAuthState('session')
  const sock = makeWASocket({
    auth: state,
    logger: pino({ level: 'silent' }),
    printQRInTerminal: false
  })
  sock.ev.on('creds.update', saveCreds)
  sock.ev.on('connection.update', async ({ connection, qr }) => {
    if (connection === 'open') console.log('🖤 Sandrone en linea.')
    if (connection === 'close') { console.log('Reconectando...'); startSandrone() }
    if (qr) {
      try {
        const code = await sock.requestPairingCode('527971165432')
        console.log('🖤 Codigo: ' + code)
      } catch(e) {}
    }
  })

  sock.ev.on('group-participants.update', async ({ id, participants, action }) => {
    if (action !== 'add') return
    for (const participant of participants) {
      try {
        const jid = typeof participant === 'string' ? participant : participant.id
        const nombre = jid.split('@')[0]
        let imgBuffer = null
        try {
          const ppUrl = await sock.profilePictureUrl(jid, 'image')
          const res = await fetch(ppUrl)
          imgBuffer = Buffer.from(await res.arrayBuffer())
        } catch(e) { imgBuffer = null }
        const caption = '*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n๑ " Bienvenido al grupo *@' + nombre + '* ❄ "\n︶ ⏝ ︶ ୨୧ ︶ ⏝ ︶\n\nੈ✰ֵ‧₊˚ 🖤 Que tu estancia sea agradable\nੈ✿ֵ‧₊˚ 🕯️ Estamos felices de tenerte\nੈ❀ֵ‧₊˚ ✨ Bienvenido a las sombras\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD'
        if (imgBuffer) {
          await sock.sendMessage(id, { image: imgBuffer, caption, mentions: [jid] })
        } else {
          await sock.sendMessage(id, { image: { url: BIENVENIDA_IMG }, caption, mentions: [jid] })
        }
      } catch(e) {}
    }
  })

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0]
    if (!msg.message || msg.key.fromMe) return

    const textoRaw = (msg.message.conversation || msg.message.extendedTextMessage?.text || '').trim()
    const from = msg.key.remoteJid
    const nombre = msg.pushName || 'visitante'
    const sender = msg.key.participant || msg.key.remoteJid
    const senderNum = sender.replace('@s.whatsapp.net', '').replace('@lid', '').replace(/[^0-9]/g, '')
    const isOwner = OWNER.includes(senderNum)
    const isGroup = from.endsWith('@g.us')
    const s = async (t) => await sock.sendMessage(from, { text: t })

    const prefijos = ['#', '/', '.']
    const tienePrefijo = prefijos.some(p => textoRaw.startsWith(p))
    const cmd = tienePrefijo ? textoRaw.slice(1).split(' ')[0].toLowerCase() : ''
    const args = tienePrefijo ? textoRaw.slice(1 + cmd.length).trim() : ''

    let isAdmin = false
    let botIsAdmin = false
    if (isGroup) {
      try {
        const meta = await sock.groupMetadata(from)
        const adminIds = meta.participants.filter(p => p.admin).map(p => p.id.replace('@s.whatsapp.net','').replace('@lid','').replace(/[^0-9]/g,''))
        const senderClean = sender.replace('@s.whatsapp.net','').replace('@lid','').replace(/[^0-9]/g,'')
        const botLid = sock.user.lid ? sock.user.lid.split(':')[0].replace(/[^0-9]/g,'') : ''
        const botNum = sock.user.id.split(':')[0].replace(/[^0-9]/g,'')
        isAdmin = adminIds.includes(senderClean) || isOwner
        botIsAdmin = adminIds.includes(botNum) || adminIds.includes(botLid)
      } catch(e) {}
    }

    if (isGroup && antispamActivo[from] && !isAdmin) {
      const ahora = Date.now()
      if (!mensajesRecientes[sender]) mensajesRecientes[sender] = []
      mensajesRecientes[sender] = mensajesRecientes[sender].filter(t => ahora - t < 5000)
      mensajesRecientes[sender].push(ahora)
      const esSticker = !!msg.message.stickerMessage
      const conteo = mensajesRecientes[sender].length
      if (conteo >= 5 || (esSticker && conteo >= 3)) {
        if (!advertencias[sender]) advertencias[sender] = 0
        advertencias[sender]++
        if (advertencias[sender] >= 3) {
          if (botIsAdmin) {
            await sock.sendMessage(from, { text: '*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n🚨 *' + nombre + '* ha sido eliminado por spam.\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD' })
            await sock.groupParticipantsUpdate(from, [sender], 'remove')
            delete advertencias[sender]
            delete mensajesRecientes[sender]
          }
        } else {
          await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ ⚠️ *Advertencia ' + advertencias[sender] + '/3*\nੈ✿ֵ‧₊˚ 👤 Para: *' + nombre + '*\nੈ❀ֵ‧₊˚ 🚫 Evita el spam\n\n🕯️ A la tercera seras retirado...\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD')
          mensajesRecientes[sender] = []
        }
        return
      }
    }

    if (juegoAhorcado[from] && !tienePrefijo && textoRaw.length === 1) {
      const juego = juegoAhorcado[from]
      const letra = textoRaw.toLowerCase()
      if (juego.letrasUsadas.includes(letra)) return await s('🕯️ Ya usaste la letra *' + letra + '*, ' + nombre + '. Intenta con otra. 🖤')
      juego.letrasUsadas.push(letra)
      if (juego.palabra.includes(letra)) {
        juego.letrasAdivinadas.push(letra)
        const completa = juego.palabra.split('').every(l => juego.letrasAdivinadas.includes(l))
        if (completa) {
          delete juegoAhorcado[from]
          return await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n🎉 Ganaste, *' + nombre + '*!\nLa palabra era *' + juego.palabra + '* ✨\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD')
        }
        return await s('✅ La letra *' + letra + '* esta en la palabra.\n\n' + getEstadoAhorcado(juego))
      } else {
        juego.vidas--
        if (juego.vidas <= 0) {
          delete juegoAhorcado[from]
          return await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n💀 Perdiste, *' + nombre + '*...\nLa palabra era *' + juego.palabra + '* 🖤\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD')
        }
        return await s('❌ La letra *' + letra + '* no esta en la palabra.\n\n' + getEstadoAhorcado(juego))
      }
    }

    if (juegoTrivia[from] && !tienePrefijo && ['a','b','c','d'].includes(textoRaw.toLowerCase())) {
      const juego = juegoTrivia[from]
      delete juegoTrivia[from]
      if (textoRaw.toLowerCase() === juego.respuesta) {
        return await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n🎉 Correcto, *' + nombre + '*! ✨\n\n📖 ' + juego.explicacion + '\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD')
      } else {
        return await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n❌ Incorrecto, *' + nombre + '*...\nLa respuesta era *' + juego.respuesta.toUpperCase() + '* 🖤\n\n📖 ' + juego.explicacion + '\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD')
      }
    }

    if (juegoPPT[from] && !tienePrefijo) {
      const opciones = ['piedra', 'papel', 'tijera']
      const eleccionUser = textoRaw.toLowerCase()
      if (!opciones.includes(eleccionUser)) return
      const eleccionBot = opciones[Math.floor(Math.random() * 3)]
      delete juegoPPT[from]
      let resultado = ''
      if (eleccionUser === eleccionBot) resultado = '🤝 Empate!'
      else if ((eleccionUser === 'piedra' && eleccionBot === 'tijera') || (eleccionUser === 'papel' && eleccionBot === 'piedra') || (eleccionUser === 'tijera' && eleccionBot === 'papel')) resultado = '🎉 Ganaste!'
      else resultado = '😈 Gane yo!'
      return await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ ✊ Tu: *' + eleccionUser + '*\nੈ✿ֵ‧₊˚ 🤖 Yo: *' + eleccionBot + '*\n\n' + resultado + ' 🖤\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD')
    }

    if (juegoNumero[from] && !tienePrefijo && !isNaN(textoRaw) && textoRaw !== '') {
      const juego = juegoNumero[from]
      const intento = parseInt(textoRaw)
      juego.intentos++
      if (intento === juego.numero) {
        delete juegoNumero[from]
        return await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n🎉 Correcto, *' + nombre + '*!\nEra el *' + juego.numero + '* en *' + juego.intentos + '* intentos ✨\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD')
      } else if (intento < juego.numero) {
        return await s('📈 El numero es *mayor* que ' + intento + '... Sigue, ' + nombre + '! 🖤')
      } else {
        return await s('📉 El numero es *menor* que ' + intento + '... Sigue, ' + nombre + '! 🖤')
      }
    }

    if (!tienePrefijo) return

    if (cmd === 'menu') {
      await sock.sendMessage(from, {
        image: { url: MENU_IMG },
        caption: '*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n๑ " Hola *' + nombre + '* soy *Sandrone*, espero que tengas un lindo dia ❄ "\n︶ ⏝ ︶ ୨୧ ︶ ⏝ ︶\n  ░  ׅ 🖤  *Sandrone-MD* ֺ 🕯️\nੈ✰ֵ‧₊˚ 🖤 *Motor* ꢁ *Baileys Multi Device*\nੈ✿ֵ‧₊˚ ✨ *Modo* ꢁ *Publico*\nੈ❀ֵ‧₊˚ 👑 *Creador* ꢁ *Ofic_Nasuma*\n*───────────୨ৎ───────────*\n\n*─ׄ─ׅ─ׄ─⭒ Comandos Del Bot ⭒─ׄ─ׅ─ׄ─*\n\n          ִ ࣪ ˖ ࣪ `Iꭇꭉꬻꬽ` ! ᰔ ִ ׄ\n‧₊˚🖤 *::* menu\n‧₊˚🖤 *::* infomenu\n‧₊˚🖤 *::* info\n‧₊˚🖤 *::* ping\n‧₊˚🖤 *::* runtime\n‧₊˚🖤 *::* hora\n‧₊˚🖤 *::* creador\n\n‿    ׅ   𝆬     ε🖤з   𝆬     ׅ      ‿\n\n          ִ ࣪ ˖ ࣪ `Gᵃᵐᵉˢ` ! ᰔ ִ ׄ\n‧₊˚🖤 *::* ahorcado\n‧₊˚🖤 *::* trivia\n‧₊˚🖤 *::* numero\n‧₊˚🖤 *::* ppt\n‧₊˚🖤 *::* coinflip\n‧₊˚🖤 *::* acertijo\n‧₊˚🖤 *::* piropo\n‧₊˚🖤 *::* reto\n‧₊˚🖤 *::* dado\n‧₊˚🖤 *::* saludo\n\n‿    ׅ   𝆬     ε🖤з   𝆬     ׅ      ‿\n\n          ִ ࣪ ˖ ࣪ `Tᵒᵒˡˢ` ! ᰔ ִ ׄ\n‧₊˚🖤 *::* s *<imagen>*\n‧₊˚🖤 *::* imgs *<sticker>*\n‧₊˚🖤 *::* wikipedia *<tema>*\n\n‿    ׅ   𝆬     ε🖤з   𝆬     ׅ      ‿\n\n          ִ ࣪ ˖ ࣪ `Gʳᵒᵘᵖˢ` ! ᰔ ִ ׄ\n‧₊˚🖤 *::* ban *@usuario*\n‧₊˚🖤 *::* agregar *<numero>*\n‧₊˚🖤 *::* anuncio *<mensaje>*\n‧₊˚🖤 *::* tagall\n‧₊˚🖤 *::* link\n‧₊˚🖤 *::* onantispam\n‧₊˚🖤 *::* offantispam\n\n‿    ׅ   𝆬     ε🖤з   𝆬     ׅ      ‿\n\n          ִ ࣪ ˖ ࣪ `Pʳᵒᵖⁱᵉᵗᵃʳⁱᵒ` ! ᰔ ִ ׄ\n‧₊˚🖤 *::* apagar\n\n‿    ׅ   𝆬     ε🖤з   𝆬     ׅ      ‿\n\n          ִ ࣪ ˖ ࣪ `Pʳᵒˣⁱᵐᵃᵐᵉⁿᵗᵉ` ! ᰔ ִ ׄ\n‧₊˚🖤 *::* play\n‧₊˚🖤 *::* tiktok\n‧₊˚🖤 *::* trad\n‧₊˚🖤 *::* ia\n‧₊˚🖤 *::* clima\n‧₊˚🖤 *::* y mas...\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD | Ofic_Nasuma'
      })
    }

    else if (cmd === 'infomenu') {
      await sock.sendMessage(from, {
        image: { url: MENU_IMG },
        caption: '*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n๑ " Guia completa de comandos ❄ "\n︶ ⏝ ︶ ୨୧ ︶ ⏝ ︶\n\n*─ׄ─ׅ─ׄ─⭒ Guia Del Bot ⭒─ׄ─ׅ─ׄ─*\n\n          ִ ࣪ ˖ ࣪ `Iꭇꭉꬻꬽ` ! ᰔ ִ ׄ\n‧₊˚🖤 *::* menu — Menu principal con imagen\n‧₊˚🖤 *::* infomenu — Esta guia\n‧₊˚🖤 *::* info — Sobre Sandrone\n‧₊˚🖤 *::* ping — Velocidad del bot\n‧₊˚🖤 *::* runtime — Tiempo encendida\n‧₊˚🖤 *::* hora — Hora actual\n‧₊˚🖤 *::* creador — Info del creador\n\n‿    ׅ   𝆬     ε🖤з   𝆬     ׅ      ‿\n\n          ִ ࣪ ˖ ࣪ `Gᵃᵐᵉˢ` ! ᰔ ִ ׄ\n‧₊˚🖤 *::* ahorcado — Adivina la palabra con pista\n‧₊˚🖤 *::* trivia — Pregunta de cultura general\n‧₊˚🖤 *::* numero — Adivina el numero del 1 al 100\n‧₊˚🖤 *::* ppt — Piedra papel tijera\n‧₊˚🖤 *::* coinflip — Cara o cruz\n‧₊˚🖤 *::* acertijo — Resuelve el acertijo\n‧₊˚🖤 *::* piropo — Recibe un piropo\n‧₊˚🖤 *::* reto — Recibe un reto\n‧₊˚🖤 *::* dado — Lanza un dado del 1 al 6\n‧₊˚🖤 *::* saludo — Saludo especial\n\n‿    ׅ   𝆬     ε🖤з   𝆬     ׅ      ‿\n\n          ִ ࣪ ˖ ࣪ `Tᵒᵒˡˢ` ! ᰔ ִ ׄ\n‧₊˚🖤 *::* s — Responde imagen para hacer sticker\n‧₊˚🖤 *::* imgs — Responde sticker para hacer imagen\n‧₊˚🖤 *::* wikipedia <tema> — Busca en Wikipedia\n\n‿    ׅ   𝆬     ε🖤з   𝆬     ׅ      ‿\n\n          ִ ࣪ ˖ ࣪ `Gʳᵒᵘᵖˢ` ! ᰔ ִ ׄ\n‧₊˚🖤 *::* ban @usuario — Expulsa miembro\n‧₊˚🖤 *::* agregar numero — Agrega miembro\n‧₊˚🖤 *::* anuncio mensaje — Anuncio oficial\n‧₊˚🖤 *::* tagall — Menciona a todos\n‧₊˚🖤 *::* link — Link del grupo\n‧₊˚🖤 *::* onantispam — Activa antispam\n‧₊˚🖤 *::* offantispam — Desactiva antispam\n\n‿    ׅ   𝆬     ε🖤з   𝆬     ׅ      ‿\n\n          ִ ࣪ ˖ ࣪ `Pʳᵒᵖⁱᵉᵗᵃʳⁱᵒ` ! ᰔ ִ ׄ\n‧₊˚🖤 *::* apagar — Apaga el bot\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD | Ofic_Nasuma'
      })
    }

    else if (cmd === 'ping') {
      const inicio = Date.now()
      await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 🏓 *Pong!*\nੈ✿ֵ‧₊˚ ⚡ *Velocidad:* ' + (Date.now() - inicio) + 'ms\n\n🕯️ Sandrone sigue en las sombras, ' + nombre + '...\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD')
    }

    else if (cmd === 'runtime') {
      await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ ⏱️ *Runtime*\nੈ✿ֵ‧₊˚ ⏰ *Tiempo:* ' + formatRuntime(Date.now() - INICIO) + '\n\n🕯️ Siempre en las sombras...\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD')
    }

    else if (cmd === 'info') await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n๑ " Soy *Sandrone*, una presencia silenciosa ❄ "\n︶ ⏝ ︶ ୨୧ ︶ ⏝ ︶\nੈ✰ֵ‧₊˚ 👤 *Creadora:* Ofic_Nasuma\nੈ✿ֵ‧₊˚ 🔖 *Version:* 2.0\nੈ❀ֵ‧₊˚ ⚙️ *Motor:* Baileys + Node.js\nੈ✰ֵ‧₊˚ 📱 *Plataforma:* WhatsApp\n\n🕯️ Estoy aqui para acompanarte con calma...\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD')

    else if (cmd === 'hora') {
      const h = new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' })
      await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 🕰️ *Hora actual*\nੈ✿ֵ‧₊˚ ⏰ *' + h + '*\n\n🕯️ El tiempo nunca se detiene, ' + nombre + '... 🖤\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD')
    }

    else if (cmd === 'dado') {
      const n = Math.floor(Math.random() * 6) + 1
      await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 🎲 *Dado del Destino*\nੈ✿ֵ‧₊˚ 🎯 *Resultado:* ' + n + '\n\n🕯️ El destino hablo, ' + nombre + '... 🖤\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD')
    }

    else if (cmd === 'saludo') await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n๑ " Un saludo especial para ti ❄ "\n︶ ⏝ ︶ ୨୧ ︶ ⏝ ︶\n\nੈ✰ֵ‧₊˚ 🌸 Bienvenido, *' + nombre + '*\nੈ✿ֵ‧₊˚ 🕯️ Es un placer tenerte aqui\nੈ❀ֵ‧₊˚ ✨ Que tu estancia sea agradable\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD')

    else if (cmd === 'coinflip') {
      const resultado = Math.random() < 0.5 ? 'CARA 👑' : 'CRUZ 🌑'
      await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 🪙 *CoinFlip*\nੈ✿ֵ‧₊˚ ✨ *Resultado:* ' + resultado + '\n\n🕯️ El destino ha decidido, ' + nombre + '... 🖤\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD')
    }

    else if (cmd === 'acertijo') {
      const a = acertijos[Math.floor(Math.random() * acertijos.length)]
      await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 🔮 *Acertijo*\n\n❓ *' + a.pregunta + '*\n\n🕯️ Piensa bien, ' + nombre + '...\n💡 Respuesta: ||' + a.respuesta + '||\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD')
    }

    else if (cmd === 'piropo') {
      const p = piropos[Math.floor(Math.random() * piropos.length)]
      await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 🌹 *Piropo para ' + nombre + '*\n\n🖤 ' + p + '\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD')
    }

    else if (cmd === 'reto') {
      const r = retos[Math.floor(Math.random() * retos.length)]
      await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 🎯 *Reto para ' + nombre + '*\n\n⚡ ' + r + '\n\n🕯️ Acepta el desafio... 🖤\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD')
    }

    else if (cmd === 'wikipedia') {
      if (!args) return await s('🕯️ Escribe el tema asi:\n*#wikipedia* dinosaurios 🖤')
      try {
        const url = 'https://es.wikipedia.org/api/rest_v1/page/summary/' + encodeURIComponent(args)
        const res = await fetch(url)
        const data = await res.json()
        if (data.extract) {
          const resumen = data.extract.slice(0, 500)
          await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 📚 *Wikipedia*\nੈ✿ֵ‧₊˚ 🔎 *' + (data.title || args) + '*\n\n' + resumen + '...\n\n🔗 ' + (data.content_urls?.mobile?.page || '') + '\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD')
        } else {
          await s('🕯️ No encontre informacion sobre *' + args + '*... intenta con otro termino. 🖤')
        }
      } catch(e) {
        await s('🕯️ No pude conectarme a Wikipedia ahora mismo... intenta mas tarde. 🖤')
      }
    }

    else if (cmd === 's') {
      const quoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage
      const imgMsg = quoted?.imageMessage
      if (!imgMsg) return await s('🕯️ Responde una imagen con *#s* para convertirla en sticker, ' + nombre + '. 🖤')
      try {
        const stream = await downloadContentFromMessage(imgMsg, 'image')
        let buffer = Buffer.from([])
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk])
        const webp = await sharp(buffer).webp().toBuffer()
        await sock.sendMessage(from, { sticker: webp })
      } catch(e) {
        await s('🕯️ No pude convertir esa imagen... intenta con otra. 🖤')
      }
    }

    else if (cmd === 'imgs') {
      const quoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage
      const stickerMsg = quoted?.stickerMessage
      if (!stickerMsg) return await s('🕯️ Responde un sticker con *#imgs* para convertirlo en imagen, ' + nombre + '. 🖤')
      try {
        const stream = await downloadContentFromMessage(stickerMsg, 'sticker')
        let buffer = Buffer.from([])
        for await (const chunk of stream) buffer = Buffer.concat([buffer, chunk])
        const png = await sharp(buffer).png().toBuffer()
        await sock.sendMessage(from, { image: png, caption: '*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n🖼️ Aqui esta tu imagen, ' + nombre + '. 🖤\n\n> [ ✰ ] Sandrone-MD' })
      } catch(e) {
        await s('🕯️ No pude convertir ese sticker... intenta con otro. 🖤')
      }
    }

    else if (cmd === 'creador') {
      try {
        const ppUrl = await sock.profilePictureUrl('51954507582@s.whatsapp.net', 'image')
        const res = await fetch(ppUrl)
        const imgBuffer = Buffer.from(await res.arrayBuffer())
        await sock.sendMessage(from, {
          image: imgBuffer,
          caption: '*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n๑ " La mente detras de las sombras ❄ "\n︶ ⏝ ︶ ୨୧ ︶ ⏝ ︶\nੈ✰ֵ‧₊˚ 👑 *Ofic_Nasuma*\nੈ✿ֵ‧₊˚ 📱 *+51 954 507 582*\nੈ❀ֵ‧₊˚ 🎮 *Sandrone-MD*\nੈ✰ֵ‧₊˚ 🌐 *GitHub:* Ofc-Nasuma\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD',
          buttons: [{ buttonId: 'btn_creador', buttonText: { displayText: '💬 Enviar Mensaje' }, type: 1 }],
          footer: '🖤 Sandrone-MD | Ofic_Nasuma'
        })
      } catch(e) {
        await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n๑ " La mente detras de las sombras ❄ "\n︶ ⏝ ︶ ୨୧ ︶ ⏝ ︶\nੈ✰ֵ‧₊˚ 👑 *Ofic_Nasuma*\nੈ✿ֵ‧₊˚ 📱 *+51 954 507 582*\nੈ❀ֵ‧₊˚ 🎮 *Sandrone-MD*\nੈ✰ֵ‧₊˚ 🌐 *GitHub:* Ofc-Nasuma\n\n*───────────୨ৎ───────────*\n> [ ✰ ] Sandrone-MD')
      }
    }

    else if (cmd === 'ahorcado') {
      const item = palabrasAhorcado[Math.floor(Math.random() * palabrasAhorcado.length)]
      juegoAhorcado[from] = { palabra: item.palabra, pista: item.pista, letrasAdivinadas: [], letrasUsadas: [], vidas: 6 }
      const oculta = item.palabra.split('').map(() => '_').join(' ')
      await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 🎮 *Ahorcado*\nੈ✿ֵ‧₊˚ 💡 *Pista:* ' + item.pista + '\n\n📝 ' + oculta + '\n\n❤️❤️❤️❤️❤️❤️ (0/6)\n\n🕯️ Envia una letra, ' + nombre + '! 🖤\n\n> [ ✰ ] Sandrone-MD')
    }

    else if (cmd === 'trivia') {
      const p = preguntasTrivia[Math.floor(Math.random() * preguntasTrivia.length)]
      juegoTrivia[from] = p
      await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 🧠 *Trivia*\n\n❓ *' + p.pregunta + '*\n\n' + p.opciones.join('\n') + '\n\n🕯️ Responde A, B, C o D, ' + nombre + '! 🖤\n\n> [ ✰ ] Sandrone-MD')
    }

    else if (cmd === 'numero') {
      const n = Math.floor(Math.random() * 100) + 1
      juegoNumero[from] = { numero: n, intentos: 0 }
      await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 🔢 *Adivina el Numero*\n\n🎯 Pienso en un numero del *1 al 100*...\n\n🕯️ Cual crees, ' + nombre + '? 🖤\n\n> [ ✰ ] Sandrone-MD')
    }

    else if (cmd === 'ppt') {
      juegoPPT[from] = true
      await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ ✊ *Piedra Papel Tijera*\n\n🪨 *piedra*\n📄 *papel*\n✂️ *tijera*\n\n🕯️ Elige tu jugada, ' + nombre + '! 🖤\n\n> [ ✰ ] Sandrone-MD')
    }

    else if (cmd === 'tagall') {
      if (!isAdmin) return await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n⛔ Solo *administradores*, ' + nombre + '. 🖤\n\n> [ ✰ ] Sandrone-MD')
      try {
        const meta = await sock.groupMetadata(from)
        const participantes = meta.participants.map(p => p.id)
        const menciones = participantes.map(p => '@' + p.split('@')[0]).join(' ')
        await sock.sendMessage(from, { text: '*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 📢 *Tag All*\n\n' + menciones + '\n\n' + (args || '🕯️ Sandrone los convoca... 🖤') + '\n\n> [ ✰ ] Sandrone-MD', mentions: participantes })
      } catch(e) {
        await s('🕯️ No pude mencionar a todos... intenta de nuevo. 🖤')
      }
    }

    else if (cmd === 'link') {
      if (!isAdmin) return await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n⛔ Solo *administradores*, ' + nombre + '. 🖤\n\n> [ ✰ ] Sandrone-MD')
      try {
        const code = await sock.groupInviteCode(from)
        await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 🔗 *Link del Grupo*\n\nhttps://chat.whatsapp.com/' + code + '\n\n🕯️ Comparte con cuidado... 🖤\n\n> [ ✰ ] Sandrone-MD')
      } catch(e) {
        await s('🕯️ No pude obtener el link... asegurate de que soy admin. 🖤')
      }
    }

    else if (cmd === 'onantispam') {
      if (!isAdmin) return await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n⛔ Solo *administradores*, ' + nombre + '. 🖤\n\n> [ ✰ ] Sandrone-MD')
      if (!botIsAdmin) return await s('⚠️ Necesito ser *admin* del grupo para el antispam. 🖤')
      antispamActivo[from] = true
      await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 🛡️ *Antispam Activado*\n\n👁️ Vigilando el grupo...\n⚠️ 3 advertencias = expulsion\n\n> [ ✰ ] Sandrone-MD')
    }

    else if (cmd === 'offantispam') {
      if (!isAdmin) return await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n⛔ Solo *administradores*, ' + nombre + '. 🖤\n\n> [ ✰ ] Sandrone-MD')
      antispamActivo[from] = false
      await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 🔕 *Antispam Desactivado*\n\n😴 Sin vigilancia por ahora...\n\n> [ ✰ ] Sandrone-MD')
    }

    else if (cmd === 'anuncio') {
      if (!isAdmin) return await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n⛔ Solo *administradores*, ' + nombre + '. 🖤\n\n> [ ✰ ] Sandrone-MD')
      if (!args) return await s('🕯️ Escribe: *#anuncio* Tu mensaje aqui 🖤')
      await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\nੈ✰ֵ‧₊˚ 📢 *Anuncio Oficial*\n\n' + args + '\n\n*───────────୨ৎ───────────*\n✦ _Ofic_Nasuma_ 🖤\n> [ ✰ ] Sandrone-MD')
    }

    else if (cmd === 'apagar') {
      if (!isOwner) return await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n⛔ Solo *mi creador*, ' + nombre + '. 🖤\n\n> [ ✰ ] Sandrone-MD')
      await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n๑ " Me retiro en silencio... hasta pronto ❄ "\n\n🕯️ Hasta la proxima. 🖤\n\n> [ ✰ ] Sandrone-MD')
      process.exit(0)
    }

    else if (cmd === 'ban') {
      if (!isAdmin) return await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n⛔ Solo *administradores*, ' + nombre + '. 🖤\n\n> [ ✰ ] Sandrone-MD')
      if (!botIsAdmin) return await s('⚠️ Necesito ser *admin* para expulsar miembros. 🖤')
      const mentioned = msg.message.extendedTextMessage?.contextInfo?.mentionedJid
      if (!mentioned || mentioned.length === 0) return await s('🕯️ Menciona al usuario: *#ban @usuario* 🖤')
      const botNum = sock.user.id.split(':')[0].replace(/[^0-9]/g,'')
      const filtrados = mentioned.filter(m => m.replace('@s.whatsapp.net','').replace('@lid','').replace(/[^0-9]/g,'') !== botNum)
      if (filtrados.length === 0) return await s('🖤 No me puedo eliminar a mi misma...')
      await sock.groupParticipantsUpdate(from, filtrados, 'remove')
      await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n🚪 El visitante ha sido retirado... 🖤\n\n> [ ✰ ] Sandrone-MD')
    }

    else if (cmd === 'agregar') {
      if (!isAdmin) return await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n⛔ Solo *administradores*, ' + nombre + '. 🖤\n\n> [ ✰ ] Sandrone-MD')
      if (!botIsAdmin) return await s('⚠️ Necesito ser *admin* para agregar miembros. 🖤')
      const numero = args.replace(/[^0-9]/g, '')
      if (!numero) return await s('🕯️ Escribe: *#agregar 521234567890* 🖤')
      try {
        await sock.groupParticipantsUpdate(from, [numero + '@s.whatsapp.net'], 'add')
        await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n🌸 Un nuevo visitante ha sido invitado... 🖤\n\n> [ ✰ ] Sandrone-MD')
      } catch(e) {
        await s('🕯️ No pude agregar ese numero... verifica que sea correcto. 🖤')
      }
    }

    else if (['play','tiktok','clima','ytmp3','ytmp4','spotifydl','fb','instagram','ia','trad','sticker','emojimix','tweet','gay','kill','kiss','love','dance','top','totalfunciones','dashboard','grouplist','grupos','suggest','bots','serbot','qr','set','ainfo','claimwf','miswaifus','harem','ginfo','gachainfo','sell','vender','haremshop','tiendawaifus','comprarwaifu','buycharacter','darwf','rollwaifu','vote','wfinfo','wimage','pokemon','mispokemon','toppokemon','bank','claim','crimen','depositar','lb','levelup','minar','retirar','buycoins','balance','work','marry','divorce','reg','perfil','sn','setbirth','unreg','morse','ss','ssweb','style','tts','zodiac','afk','neko','waifu','pinterest','iqtest','mates','apostar','ruleta','slot'].includes(cmd)) {
      await s(NO_DISPONIBLE(cmd, nombre))
    }

    else await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n๑ " Ese comando aun no lo conozco, ' + nombre + '... ❄ "\n\n🕯️ Escribe *#menu* para ver lo disponible. 🖤\n\n> [ ✰ ] Sandrone-MD')
  })
}
startSandrone()
