document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const character = document.createElement('div')
  let charLeft = 50
  let charBottom = 150
  let platformz = 5
  let platforms = []
  let upTimeId
  let downTimeId
  let isGameOver = false
  function buildCharacter() {
    grid.appendChild(character)
    character.classList.add('character')
    charLeft = platforms[0].left
    character.style.left = charLeft + 'px'
    character.style.bottom = charBottom + 'px'
  }
  class Platform {
    constructor(newPlatBottom) {
      this.bottom = newPlatBottom
      this.left = Math.random() * 315

      this.visual = document.createElement('div')
      const visual = this.visual
      visual.classList.add('platform')
      visual.style.left = this.left + 'px'
      visual.style.bottom = this.bottom + 'px'
      grid.appendChild(visual)
    }
  }

  function createPlaforms() {
    for (let i = 0; i < platformz; i++) {
      let platformGap = 600 / platformz
      let newPlatBottom = 100 + i * platformGap
      let newPlat = new Platform(newPlatBottom)
      platforms.push(newPlat)
      console.log(platforms)
    }
  }

  function movePlatform() {
    if (charBottom > 200) {
      platforms.forEach((platform) => {
        platform.bottom -= 4
        let visual = platform.visual
        visual.style.bottom = platform.bottom + 'px'
      })
    }
  }

  function jump() {
    clearInterval(downTimeId)
    upTimeId = setInterval(function () {
      charBottom += 20
      character.style.bottom = charBottom + 'px'
      if (charBottom > 350) {
        fall()
      }
    }, 30)
  }
  function fall() {
    clearInterval(upTimeId)
    downTimeId = setInterval(function () {
      charBottom -= 5
      character.style.bottom = charBottom + 'px'
      if (charBottom <= 0) {
        gameOver()
      }
    }, 30)
  }

  function gameOver() {
    console.log('game Over !')
    isGameOver = true
    clearInterval(upTimeId)
    clearInterval(downTimeId)
  }

  function Start() {
    if (!isGameOver) {
      createPlaforms()
      buildCharacter()
      setInterval(movePlatform, 30)
      jump()
    }
  }

  Start()
})
