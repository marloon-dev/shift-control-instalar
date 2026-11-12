// Shift Control · site de lançamento: destaca a instalação do telemóvel de quem visita e anima a entrada das secções.
(() => {
  const ua = navigator.userAgent
  const ios = /iPhone|iPad|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  const android = /Android/i.test(ua)
  const dica = document.getElementById('dica-plataforma')

  if (ios || android) {
    const id = ios ? 'iphone' : 'android'
    document.getElementById(id)?.classList.add('sugerido')
    if (dica) dica.textContent = ios ? 'Detetámos um iPhone: siga os passos do cartão iPhone.' : 'Detetámos um Android: descarregue o APK abaixo.'
    // Põe primeiro o botão e o cartão do telemóvel de quem visita.
    if (ios) {
      const ctas = document.getElementById('ctas')
      const btnIos = ctas?.querySelector('[data-plataforma="ios"]')
      if (ctas && btnIos) {
        ctas.prepend(btnIos)
        btnIos.classList.remove('btn-contorno')
        ctas.querySelector('[data-plataforma="android"]')?.classList.add('btn-contorno')
      }
      const grelha = document.querySelector('.instalar')
      const cartao = document.getElementById('iphone')
      if (grelha && cartao) grelha.prepend(cartao)
    }
  }

  // Computador: as miniaturas trocam o ecrã grande.
  const ecra = document.getElementById('ecra-pc')
  document.querySelectorAll('.miniaturas button').forEach(b => b.addEventListener('click', () => {
    if (!ecra) return
    ecra.src = b.dataset.ecra
    ecra.alt = b.dataset.alt
    document.querySelectorAll('.miniaturas button').forEach(x => x.setAttribute('aria-pressed', String(x === b)))
  }))

  // Secções aparecem suavemente ao entrar no ecrã (só se o utilizador não pediu menos movimento).
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches && 'IntersectionObserver' in window) {
    const alvos = document.querySelectorAll('.destaque, .grelha-funcoes li, .cartao-instalar, .acesso, .faq details, .final, .secao-cabeca, .navegador, .pc-instalar')
    const obs = new IntersectionObserver(entradas => {
      for (const e of entradas) if (e.isIntersecting) { e.target.classList.add('visivel'); obs.unobserve(e.target) }
    }, { rootMargin: '0px 0px -8% 0px' })
    alvos.forEach(el => { el.classList.add('revelar'); obs.observe(el) })
  }
})()
