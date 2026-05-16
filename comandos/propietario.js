module.exports = async (ctx) => {
  const { sock, from, nombre, cmd, args, s, isOwner } = ctx

  if (!cmd) return false

  if (cmd === 'apagar') {
    if (!isOwner) { await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n⛔ Solo *mi creador*, ' + nombre + '. 🖤\n\n> [ ✰ ] Sandrone-MD'); return true }
    await s('*︶︶︶ ⊹ ︶︶︶ ୨♡୧ ︶︶︶ ⊹ ︶︶︶*\n\n๑ " Me retiro en silencio... hasta pronto ❄ "\n\n🕯️ Hasta la proxima. 🖤\n\n> [ ✰ ] Sandrone-MD')
    process.exit(0)
    return true
  }

  return false
}
