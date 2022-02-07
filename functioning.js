document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const character = document.createElement('div')
  let charLeft = 50
  let platformz = 5
  let platforms = []
  let upTimeId
  let downTimeId
  let startPoint = 150
  let isGameOver = false
  let charBottom = startPoint
  let isJumping = true
  let score = 0
  let isGoingLeft = false
  let isGoingRight = false

  let leftTimerId
  let rightTimerId
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

        if (platform.bottom < 10) {
          let firstPlatform = platforms[0].visual
          firstPlatform.classList.remove('platform')
          platforms.shift()
          score++
          let newPlat = new Platform(600)
          platforms.push(newPlat)
        }
      })
    }
  }

  function jump() {
    clearInterval(downTimeId)
    isJumping = true
    upTimeId = setInterval(function () {
      charBottom += 20
      character.style.bottom = charBottom + 'px'
      if (charBottom > startPoint + 200) {
        fall()
      }
    }, 30)
  }
  function fall() {
    clearInterval(upTimeId)
    isJumping = false
    downTimeId = setInterval(function () {
      charBottom -= 5
      character.style.bottom = charBottom + 'px'
      if (charBottom <= 0) {
        gameOver()
      }
      platforms.forEach((platform) => {
        if (
          charBottom >= platform.bottom &&
          charBottom <= platform.bottom + 15 &&
          charLeft + 60 >= platform.left &&
          charLeft <= platform.left + 85 &&
          !isJumping
        ) {
          console.log('landed')
          startPoint = charBottom
          jump()
        }
      })
    }, 30)
  }

  function gameOver() {
    console.log('game Over !')
    isGameOver = true

    while (grid.firstChild) {
      grid.removeChild(grid.firstChild)
    }
    grid.innerHTML = score
    clearInterval(upTimeId)
    clearInterval(downTimeId)
    clearInterval(leftTimerId)
    clearInterval(rightTimerId)
  }

  function control(e) {
    if (e.key === 'ArrowLeft') {
      movingLeft()
    } else if (e.key === 'ArrowRight') {
      movingRight()
    } else if (e.key === 'ArrowUp') {
      moveStraight()
    } else if (e.key === 'ArrowDown') {
    }
  }

  function movingLeft() {
    if (isGoingRight) {
      clearInterval(rightTimerId)
      isGoingRight = false
    }
    isGoingLeft = true
    leftTimerId = setInterval(function () {
      if (charLeft >= 0) {
        charLeft -= 5
        character.style.left = charLeft + 'px'
      } else {
        movingRight()
      }
    }, 30)
  }

  function movingRight() {
    if (isGoingLeft) {
      clearInterval(leftTimerId)
      isGoingLeft = false
    }
    isGoingRight = true
    rightTimerId = setInterval(function () {
      if (charLeft <= 340) {
        charLeft += 5
        character.style.left = charLeft + 'px'
      } else {
        movingLeft()
      }
    }, 30)
  }

  function moveStraight() {
    isGoingRight = false
    isGoingLeft = false
    clearInterval(rightTimerId)
    clearInterval(leftTimerId)
  }

  function Start() {
    if (!isGameOver) {
      createPlaforms()
      buildCharacter()
      setInterval(movePlatform, 30)
      jump()
      document.addEventListener('keyup', control)
    }
  }

  Start()
})
