const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = screen.width
canvas.height = screen.height

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 378) {
    collisionsMap.push(collisions.slice(i, 378 + i))
}

const boundaries = []
const offset = {
    x: -8275,
    y: -7912
}

collisionsMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 18641)
            boundaries.push(
                new Boundary({
                    position: {
                        x: j * Boundary.width + offset.x,
                        y: i * Boundary.height + offset.y
                    }
                })
            )
    })
})


const image = new Image()
image.src = './img/FPT.png'

const foregroundImage = new Image()
foregroundImage.src = './img/foregroundObjects.png'

const playerDownImage = new Image()
playerDownImage.src = './img/playerDown.png'

const playerUpImage = new Image()
playerUpImage.src = './img/playerUp.png'

const playerLeftImage = new Image()
playerLeftImage.src = './img/playerLeft.png'

const playerRightImage = new Image()
playerRightImage.src = './img/playerRight.png'

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 2
    },
    image: playerDownImage,
    frames: {
        max: 4,
        hold: 10
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage
    }
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: foregroundImage
})



const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

const movables = [background, ...boundaries,foreground]

function rectangularCollision({ rectangle1, rectangle2 }) {
    return (
        rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height >= rectangle2.position.y
    )
}

function animate() {
    const animationId = window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach((boundary) => {
        boundary.draw()
    })
    player.draw()
    foreground.draw()

    let moving = true
    player.animate = false

    if (movables[0].position.x == -8101 && movables[0].position.y == -7015) {
        window.open("/IntroGame/Intro.html", "_blank");
    }

    if (movables[0].position.x == -7015 && movables[0].position.y == -4807) {
        window.open("/RulesGame/rules.html", "_blank");
    }

    if (movables[0].position.x == -3913 &&  movables[0].position.y == -2536) {
        window.open("/MemoryGame/memory.html", "_blank");
    }

    if (keys.w.pressed && lastKey === 'w') {
        player.animate = true
        player.image = player.sprites.up

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y + 3
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }

        if (moving)
            movables.forEach((movable) => {
                movable.position.y += 3
            })
    } else if (keys.a.pressed && lastKey === 'a') {
        player.animate = true
        player.image = player.sprites.left

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x + 3,
                            y: boundary.position.y
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }

        if (moving)
            movables.forEach((movable) => {
                movable.position.x += 3
            })
    } else if (keys.s.pressed && lastKey === 's') {
        player.animate = true
        player.image = player.sprites.down

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x,
                            y: boundary.position.y - 3
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }

        if (moving)
            movables.forEach((movable) => {
                movable.position.y -= 3
            })
    } else if (keys.d.pressed && lastKey === 'd') {
        player.animate = true
        player.image = player.sprites.right

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (
                rectangularCollision({
                    rectangle1: player,
                    rectangle2: {
                        ...boundary,
                        position: {
                            x: boundary.position.x - 3,
                            y: boundary.position.y
                        }
                    }
                })
            ) {
                moving = false
                break
            }
        }

        if (moving)
            movables.forEach((movable) => {
                movable.position.x -= 3
            })
    } else if (keys.d.pressed && lastKey === 'd') {
      player.animate = true
      player.image = player.sprites.right

      for (let i = 0; i < boundaries.length; i++) {
          const boundary = boundaries[i]
          if (
              rectangularCollision({
                  rectangle1: player,
                  rectangle2: {
                      ...boundary,
                      position: {
                          x: boundary.position.x - 3,
                          y: boundary.position.y
                      }
                  }
              })
          ) {
              moving = false
              break
          }
      }

      if (moving)
          movables.forEach((movable) => {
              movable.position.x -= 3
          })
  }
}

let lastKey = ''
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break

        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break

        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break
    }
})

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
})
animate()
let clicked = false
addEventListener('click', () => {
    if (!clicked) {
        audio.Map.play()
        clicked = true
    }
})