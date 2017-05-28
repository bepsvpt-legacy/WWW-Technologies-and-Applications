const game = {
  width: 640,
  height: 600,
  began: false,
  pause: false,
  falling: {
    width: 64,
    height: 64,
    max: 10,
    distance: 2,
    interval: 12
  },
  role: {
    width: 95,
    height: 130,
    frames: 3
  },
  images: {
    bomb: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjEwMPRyoQAAE0dJREFUeF7tnHdwVNUXx+0FQSzBrlFRMSq2VUQUe8WGiD0ioiwgCIqiUkRAgoVi6GwoBoMUNRgj9jrRscY6ujrWWEfNXzrz+/v8zufO3jOX5SVbUoCYM3NmNye77737fad8z7kv2UJE2rUJGmls1+w10tiu2WuksV2z12hju2QUwyoEzoxtSJYsWVIwZcqU+KBBg+KLFi2Kp8xNFsMqBM6MbUiGDRtWeemll8qVV14pl1xyiZxxxhmJsrKy4tSv8xbDKgTOjG1Exo0bV3HwwQfLPffcI0899ZQ8/PDDctZZZ0ksFqvvp5L6WF5iWIXAmXEjiHpF4aRJk2IaarH+/fvHdKGxU089NaZeEysuLo6NGjUqNmvWrNi6deuKUl9pUKqqqgoUvMpTTjlFTjzxRLnzzjvlpZdekurqalm5cqWMuO022XPPPWXLLbfM2xMNqxA4M7aCLFiwoPeIESPi3bp1i2+//fbxCy+8sIYQY9HqIXL44YfLIYccIkcffbScdNJJcvbZZ7swvPnmm+u6dOkSP/fcc+PkttTh1pM77riD48n06dNFgXffXb16tTz99NOydOlS0bwoQwcNlM6dOsqRRx4Zf+ihh3qnvpq1GFYhcGZsQRk/fnxCwUl07949qRcvu+yyi2y99dacNCtVr5EddthB9ttvPznhhBOkc+fOicsuuyxx7733OhB69uxZqDegBuAI22nTpsnxxx8vY8aMkcrKSgcgWl62SAYPGeZulN64BN/NRQyrEDgzNrNo6PTTBdbutddetXvvvbcDACD0V+41H+W7KOBzE3beeec6Dfna8847L6mAyvLlyyWRSIh6qVx00UVy1FFHyfz582X1mjWybOkSB2LZkqVy0003AWL9Oeeck1NONKxC4MzYTHLaaacV3XXXXbLPPvvYgr1GgZKvhscl7OfMmSNKWWTy5MkyfPhwufrqq+XQQw8VTRdStnixrFi1RpaWLxfNuzJ37ly5+OKLRVOCaMWO6TGyEsMqBM6MTRQtBEXkNq2Adfrjegv0C+YV79lmm22cbrXVVmbPR/139dzO8wBv5MiRDjz1LpdLd9ppJzn55JPlkUcecR4KgPPmzRNNK+73SndK9DhZiWEVAmfGJkhpaWlC73YNYaU/mrI4zVdy7LHHioaZW9iNN97IXacwyFVXXSXnn3++HHfccUKYb7vttva9bJTP7rHHHq5wPPDAAw6866+/3oHHOcmZpA6Oe8wxxzhqs1i9UYuZaHV3n+O69DhZiWEVAmfGPOX222+v2H///Z1H6Y9Ot9tuO1dVtTJKeXm5oxNvvPGGvPbaa+690hJZu3atoxePPfaY8wi8B0+i+mqFdseJAi1UPqMkWbSiGnjcEA9ehw4d7LN4PmBffvnlMmPGDBfGMACAffLJJyv0WBnFsAqBM2OOonmnQD2nkovUHx2A8Czlqg6gn376Serq6iSZTEptba28++678tZbb8mrr74qzz33nAMQmlFRUeEoBl7BotSbZfTo0dKrVy/nvYR5CFqonPO6666T25Tj+bAFPC1cVrTSlWslUg477DD3OahPqwOod7dAT16x4447ugvq2LGj9O3b1wHy22+/yd9//+0A/Oabb+SLL76Qjz76yAB85ZVX1gPw8ccfd2FFtXz00Udd51BSUiL33Xef44CFhYXuHFFgcN5rrrlGrr322g3CNurzoZIb4Z9KfSrdorIQwyoEzow5SKdOnSp9mO2+++6Od3377bfy77//Sn19vfzyyy/yww8/yNdffy2ff/65fPjhh/LOO+/Im2++ad0BBJcQ9tSDMCYvEY7QEAAcO3asoxyAwrnSQdDrcB4UgheGbUPK93r37u3Oo0Wldauw0pMKXz0POOAAWbZsmQPun3/+ceD98ccfLnQB9KuvvpJPP/1UPvjgA3n77bfl9ddflxdffFGeffZZR3ifeOIJlwOhH4TvzJkz5cEHHxRt71yVvPvuu10442EUGc4ZAkFxgFhThLIFj89ccMEFolSrUj2fNrGDW1gWYliFwJkxgyhhLdBwquSiScj0my+//LIB99dff8nvv/8uP//8s3z33Xfmfen57/nnn5dnnnlG1ii5Jf9BbhcuXCizZ8921ZTwvf/++0X7WhbpigNVmxSBt4dg6GXJbrvt5jhnprDlsyhpR4tNLWvKVQyrEDgzNiJDhw4tUIJcoczfXQTkdNWqVfLnn386jwO4X3/91Xne999/78Aj93388cfO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',
    treasure: 'data:image/png;base64,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'
  }
}

const renderer = PIXI.autoDetectRenderer(game.width, game.height)
const stage = new PIXI.Container()
const loader = PIXI.loader
const resources = PIXI.loader.resources
const Sprite = PIXI.Sprite

function random (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function isOverlapping (x1, x2, y1, y2) {
  return Math.max(x1, y1) <= Math.min(x2, y2)
}

function keyboard (keyCode) {
  const key = {}

  key.code = keyCode
  key.press = undefined

  key.downHandler = function (event) {
    if (event.keyCode === key.code) {
      if (key.press) {
        key.press()
      }
    }

    event.preventDefault()
  }

  window.addEventListener('keydown', key.downHandler.bind(key), false)

  return key
}

function addFalling (img) {
  const falling = new Sprite(resources[img].texture)

  falling.width = game.falling.width
  falling.height = game.falling.height

  falling.x = random(0, game.width - falling.width)
  falling.y = -1 * falling.height

  return falling
}

Vue.component('role', {
  props: ['role', 'selected'],

  methods: {
    link (name) {
      return `images/roles/${name}.png`
    },

    changeRole () {
      if (game.began) {
        return
      }

      this.$emit('update:selected', this.role)
    }
  },

  template: `
<div class="col-xs-6">
  <div class="role clickable" @click="changeRole()">
    <img :src="link(role)">

    <div class="check" :class="{ hidden: role !== selected }">
      <span class="fa-stack fa-lg">
        <i class="fa fa-circle fa-stack-2x text-success"></i>
        <i class="fa fa-check fa-stack-1x fa-inverse"></i>
      </span>
    </div>
  </div>
</div>
`
})

Vue.component('change-image', {
  props: ['title', 'type'],

  data() {
    return {
      image: '',

      hovering: false
    }
  },

  methods: {
    changeImage (e) {
      const files = e.target.files || e.dataTransfer.files

      if (files.length) {
        this.encodeImage(files[0])
      }
    },

    encodeImage (file) {
      const reader = new FileReader()

      reader.onload = e => {
        this.image = e.target.result

        try {
          loader.add(this.image).load(() => {
            game.images[this.type] = this.image
          })
        } catch (e) {
          game.images[this.type] = this.image
        }
      }

      reader.readAsDataURL(file)
    }
  },

  template: `
<div class="dropzone-area" @dragenter="hovering = true" @dragleave="hovering = false" :class="{ hovered: hovering }">
  <div v-if="! image" class="dropzone-text">{{ title }}</div>

  <div v-else class="dropzone-preview">
    <img :src="image">
  </div>

  <input type="file" accept="image/*" @change="changeImage">
</div>
`

});

new Vue({
  el: '#app',

  data: {
    pause: false,
    score: 0,
    scores: [],
    role: null,
    roles: ['1', '2', '3', '4', '5', '6'],
    pos: {
      x: [(game.width - game.role.width) / 2, (game.width + game.role.width) / 2]
    },
    sounds: {
      bomb: {},
      menu: {},
      play: {}
    },
    intervals: []
  },

  methods: {
    initBackground () {
      const background = new Sprite(resources['images/backgrounds/game.png'].texture)

      background.width = game.width
      background.height = game.height

      stage.addChild(background)
    },

    initFalling () {
      const falling = {
        bomb: [],
        treasure: []
      }

      // falling bombs and treasures
      const id = setInterval(() => {
        if (! game.began || game.pause) {
          return
        }

        Object.keys(falling).forEach(type => {
          const max = game.falling.max + parseInt(game.role.frames / 10)
          const probability = random(0, Math.max(100 - parseInt(game.role.frames / 5), 1))

          // add object
          if (falling[type].length < max && probability === 0) {
            const temp = addFalling(game.images[type])

            stage.addChild(temp)
            falling[type].push(temp)
          }

          // fall the objects
          falling[type].forEach((temp, index) => {
            if (temp.y + temp.height - 20 >= game.height - game.role.height && temp.y + temp.height + 20 < game.height) {
              if (isOverlapping(this.pos.x[0] + 10, this.pos.x[1] - 10, temp.x + 10, temp.x + temp.width - 10)) {
                if ('treasure' === type) {
                  this.score += max

                  stage.removeChild(temp)
                  falling[type].splice(index, 1)
                } else {
                  game.began = false
                  game.pause = false
                  this.pause = false

                  this.showBomb()
                }

                return
              }
            }

            temp.y += game.falling.distance

            // remove if out of screen
            if (temp.y > game.height) {
              stage.removeChild(temp)
              falling[type].splice(index, 1)
            }
          })
        })

        renderer.render(stage)
      }, game.falling.interval)

      this.intervals.push(id)
    },

    initRole () {
      const instance = (direction, index) => {
        const path = `images/moves/${direction}/${this.role}/${index}.png`

        return new Sprite(resources[path].texture)
      }

      const role = {
        left: [
          instance('left', 0),
          instance('left', 1),
          instance('left', 2)
        ],
        right: [
          instance('right', 0),
          instance('right', 1),
          instance('right', 2)
        ]
      };

      ['left', 'right'].forEach(val => {
        role[val].forEach(r => {
          r.width = game.role.width
          r.height = game.role.height
          r.x = (game.width - r.width) / 2
          r.y = game.height - r.height

          if ('right' === val) {
            r.visible = false
          }

          stage.addChild(r)
        })
      })

      return role
    },

    listenMove (role) {
      const left = keyboard(37)
      const right = keyboard(39)

      const move = (left = true, distance) => {
        if (! game.began || game.pause) {
          return
        }

        if (left && 0 > (role.left[0].x + distance)) {
          return
        } else if (! left && game.width <= (role.left[0].x + role.left[0].width + distance)) {
          return
        }

        role.left[0].x += distance
        this.pos.x = [role.left[0].x, role.left[0].x + game.role.width];

        ['left', 'right'].forEach(val => {
          role[val].forEach((r, index) => {
            r.x = role.left[0].x

            r.visible = false

            if (index === (game.role.frames % 3)) {
              if ((left && 'left' === val) || (! left && 'right' === val)) {
                r.visible = true
              }
            }
          })
        })

        ++game.role.frames

        renderer.render(stage)
      }

      left.press = () => {
        move(true, -20)
      }

      right.press = () => {
        move(false, 20)
      }
    },

    listenPause () {
      keyboard(80).press = () => {
        if (! game.began) {
          return
        }

        game.pause = true
        this.pause = true

        this.sounds.play.pause()
      }
    },

    showBomb () {
      this.sounds.bomb.play()

      let index = 0
      let last = null

      const b = () => {
        const bomb = new Sprite(resources[`images/explosions/${index}.png`].texture)

        bomb.x = (this.pos.x[0] + this.pos.x[1] - bomb.width) / 2
        bomb.y = (game.height - game.role.height + game.height - bomb.height) / 2

        stage.addChild(bomb)

        renderer.render(stage)

        if (++index < 10) {
          if (last) {
            stage.removeChild(last)
          }

          last = bomb

          setTimeout(b, 100)
        } else {
          stage.removeChild(last)
          stage.removeChild(bomb)

          renderer.render(stage)

          setTimeout(this.ended, 50)
        }
      }

      b()
    },

    begin () {
      if (game.began) {
        return alert('遊戲已開始')
      }

      if (null === this.role) {
        return alert('請選擇角色')
      }

      this.sounds.menu.pause()
      this.sounds.play.play()

      this.score = 0

      stage.removeChildren()

      this.initBackground()
      this.initFalling()
      this.listenMove(this.initRole())
      this.listenPause()

      game.began = true

      renderer.render(stage)
    },

    ended () {
      this.sounds.play.pause()

      const message = new PIXI.Text(
        "Game Over \n\nScore: "+this.score,
        {fontSize: 48, fill: 'white', align : 'center'}
      )

      message.x = (game.width - message.width) / 2
      message.y = (game.height - message.height) / 2

      stage.addChild(message)

      renderer.render(stage)

      const name = prompt('Your name:') || 'Anonymous'
      const scores = store.get('scores') || []

      scores.push({name: name, score: this.score})

      store.set('scores', scores)

      this.intervals.forEach(id => {
        clearInterval(id)
      })

      this.sounds.menu.play()
    },

    playGame () {
      game.pause = false
      this.pause = false

      this.sounds.play.play()
    },

    showScore () {
      this.scores = (store.get('scores') || []).sort((a, b) => b.score - a.score)

      $('#scores-modal').modal()
    },

    showRule () {
      $('#rule-modal').modal()
    }
  },

  created () {
    const images = [
      'images/backgrounds/game.png'
    ]

    for (let m = 1; m <= 6; ++m) {
      for (let n = 0; n <= 2; ++n) {
        ['left', 'right'].forEach(val => {
          images.push(`images/moves/${val}/${m}/${n}.png`)
        })
      }
    }

    for (let m = 0; m <= 9; ++m) {
      images.push(`images/explosions/${m}.png`)
    }

    loader.add(images.concat(Object.values(game.images))).load()

    sounds.load([
      'audio/bomb.mp3',
      'audio/menu.mp3',
      'audio/play.mp3'
    ])

    sounds.whenLoaded = () => {
      this.sounds.bomb = sounds['audio/bomb.mp3']
      this.sounds.menu = sounds['audio/menu.mp3']
      this.sounds.play = sounds['audio/play.mp3']

      this.sounds.play.loop = true
      this.sounds.menu.loop = true

      this.sounds.menu.play()
    }
  },

  mounted () {
    document.querySelector('#gaming').appendChild(renderer.view)
  }
})
