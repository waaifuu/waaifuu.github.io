const { createApp } = Vue
var app = createApp({
  data() {
    return {
      turnAllGenresVar: 1,
      turnAllTypesVar: 1,
      genresListHeight: 35,
      genresHeight: 250,
      genresTop: 100,
      genresTitleAlignSelf: 'center',
      // remove i in the objects below
      genresSwitchers: [{name: 'all', transformValue: 34, type:'all', i:0},{name: 'waifu', transformValue: 34, type:'mixed', i:1},{name: 'neko', transformValue: 34,type:'mixed',i:2},{name: 'trap', transformValue: 0,type:'nsfw',i:3},{name: 'blowjob', transformValue: 0,type:'nsfw',i:4},{name: 'shinobu', transformValue: 34,type:'sfw',i:5},{name: 'megumin', transformValue: 34,type:'sfw',i:6},{name: 'bully', transformValue: 0,type:'sfw',i:7},{name: 'cuddle', transformValue: 0,type:'sfw',i:8},{name: 'cry', transformValue: 0,type:'sfw',i:9},{name: 'hug', transformValue: 0,type:'sfw',i:10},{name: 'awoo', transformValue: 0,type:'sfw',i:11},{name: 'kiss', transformValue: 0,type:'sfw',i:12},{name: 'lick', transformValue: 0,type:'sfw',i:13},{name: 'pat', transformValue: 0,type:'sfw',i:14},{name: 'smug', transformValue: 0,type:'sfw',i:15},{name: 'bonk', transformValue: 0,type:'sfw',i:16},{name: 'yeet', transformValue: 0,type:'sfw',i:17},{name: 'blush', transformValue: 0,type:'sfw',i:18},{name: 'smile', transformValue: 0,type:'sfw',i:19},{name: 'wave', transformValue: 0,type:'sfw',i:20},{name: 'highfive', transformValue: 0,type:'sfw',i:21},{name: 'handhold', transformValue: 0,type:'sfw',i:22},{name: 'nom', transformValue: 0,type:'sfw',i:23},{name: 'bite', transformValue: 0,type:'sfw',i:24},{name: 'glomp', transformValue: 0,type:'sfw',i:25},{name: 'slap', transformValue: 0,type:'sfw',i:26},{name: 'kill', transformValue: 0,type:'sfw',i:27},{name: 'kick', transformValue: 0,type:'sfw',i:28},{name: 'happy', transformValue: 0,type:'sfw',i:29},{name: 'wink', transformValue: 0,type:'sfw',i:30},{name: 'poke', transformValue: 0,type:'sfw',i:31},{name: 'dance', transformValue: 0,type:'sfw',i:32},{name: 'cringe', transformValue: 0,type:'sfw',i:33}],
      blockWaifu: false,
      typesHeight: 35,
      typesTop: 100,
      typesTitleAlignSelf: 'center',
      typesSwitchers: [34,34,0],
      pic: '',
      stepBack: 0,
      pics: [],
      loader: true,
    }
  },
  async mounted() {
    var pic = await axios.get(`https://api.waifu.pics/sfw/waifu`)
    this.pic = pic.data.url
    this.pics.push(this.pic)
    this.loader = false
    var genreSwitchersEls = document.getElementsByClassName('genreswitcher')
    for (i = 7; i < genreSwitchersEls.length; i++) {
      genreSwitchersEls[i].style.background = '#302f3d'
    }
    document.addEventListener("click", () => {
      if (this.genresListHeight = 280) {
        this.genresListHeight = 35
        this.genresTop = 100
        document.getElementsByClassName('genres-title')[0].style.alignSelf = 'center'
        this.$refs.arrowgenres.style.transform = 'rotate(180deg)'
      }
      if (this.typesHeight = 150) {
        this.typesHeight = 35
        this.typesTop = 100
        document.getElementsByClassName('types-title')[0].style.alignSelf = 'center'
        this.$refs.arrowtypes.style.transform = 'rotate(180deg)'
      }
    })
  },
  methods: {
    toggleGenres (e) {
      e.stopPropagation()
      if (this.genresListHeight === 35) {
        this.genresListHeight = 280
        this.genresTop = 0
        document.getElementsByClassName('genres-title')[0].style.alignSelf = 'flex-end'
        this.$refs.arrowgenres.style.transform = 'rotate(0deg)'
        if (this.typesSwitchers[2] === 34 && this.typesSwitchers[1] === 0) {
          this.genresListHeight = 230
          this.genresHeight = 200
        } else if (this.typesSwitchers[2] === 34) {
          this.genresListHeight = 280
          this.genresHeight = 250
        }
      } else {
        this.genresListHeight = 35
        this.genresTop = 100
        document.getElementsByClassName('genres-title')[0].style.alignSelf = 'center'
        this.$refs.arrowgenres.style.transform = 'rotate(180deg)'
      } 
    },
    toggleTypes (e) {
      e.stopPropagation()
      if (this.typesHeight === 35) {
        this.typesHeight = 150
        this.typesTop = 0
        document.getElementsByClassName('types-title')[0].style.alignSelf = 'flex-end'
        this.$refs.arrowtypes.style.transform = 'rotate(0deg)'
      } else {
        this.typesHeight = 35
        this.typesTop = 100
        document.getElementsByClassName('types-title')[0].style.alignSelf = 'center'
        this.$refs.arrowtypes.style.transform = 'rotate(180deg)'
      } 
    },
    stopPropagation (e) {
      e.stopPropagation()
    },
    turnGenres (switcherName) {
      var switcher = this.genresSwitchers.find(element => element.name === switcherName)
      var switcherIndex = this.genresSwitchers.indexOf(switcher)
      var typeOn = ''
      if (this.typesSwitchers[1] === 34 && this.typesSwitchers[2] === 34) typeOn = null 
      else if (this.typesSwitchers[1] === 34) typeOn = 'sfw'
      else if (this.typesSwitchers[2] === 34) typeOn = 'nsfw'
      var filteredGenres = typeOn ? this.genresSwitchers.filter(elem => elem.type === typeOn) : this.genresSwitchers
      if (switcher.transformValue > 0) {
        var sizesReduce = filteredGenres.reduce((accumulator, currentValue, currentIndex) => { 
          if (currentIndex >= 1) {
            return accumulator + currentValue.transformValue
          } else {
            return -1
          }
        }, 0)
        if (sizesReduce <= 34) {
          this.blockWaifu = false
          this.genresSwitchers[1].transformValue = 34
          document.getElementsByClassName('waifu')[0].style.background = '#ab88fd'
        } else {
          this.blockWaifu = true
        }
        if (switcherIndex === 1) {
          if (this.blockWaifu) {
            this.genresSwitchers[switcherIndex].transformValue = 0
            document.getElementsByClassName(switcherName)[0].style.background = '#302f3d'
            this.blockWaifu = false
          }
        } else {
          this.genresSwitchers[switcherIndex].transformValue = 0
          document.getElementsByClassName(switcherName)[0].style.background = '#302f3d'
        }
      } else {
        this.genresSwitchers[switcherIndex].transformValue = 34
        document.getElementsByClassName(switcherName)[0].style.background = '#ab88fd'
        this.blockWaifu = true
      }
    },
    turnTypes (val) {
      if (this.typesSwitchers[val] > 0) {
        var sizesReduce = this.typesSwitchers.reduce((accumulator, currentValue, currentIndex) => { 
          if (currentIndex >= 1) {
            return accumulator + currentValue
          } else {
            return -1
          }
        }, 0) 
        if (sizesReduce <= 34) {
          this.blockWaifu = false
          this.typesSwitchers[1] = 34
          document.getElementsByClassName('typesswitcher')[1].style.background = '#ab88fd'
        } else {
          this.blockWaifu = true
        }
        if (val === 1) {
          if (this.blockWaifu) {
            this.blockWaifu = false
            this.typesSwitchers[val] = 0
            document.getElementsByClassName('typesswitcher')[val].style.background = '#302f3d'
          }
        } else {
            this.typesSwitchers[val] = 0
            document.getElementsByClassName('typesswitcher')[val].style.background = '#302f3d'
        }
      } else {
        this.typesSwitchers[val] = 34
        document.getElementsByClassName('typesswitcher')[val].style.background = '#ab88fd'
        this.blockWaifu = true
      }
      if (this.typesSwitchers[2] === 34 && this.typesSwitchers[1] === 0 && this.genresListHeight > 35) {
        this.genresListHeight = 230
        this.genresHeight = 200
      } else if (this.typesSwitchers[2] === 34 && this.genresListHeight > 35) {
        this.genresListHeight = 280
        this.genresHeight = 250
      }
    },
    turnAllGenres () {
      if (this.turnAllGenresVar === 0) {
        this.turnAllGenresVar = 1
        this.genresSwitchers[0].transformValue = 34
        var genresswitcher = document.getElementsByClassName('genreswitcher')
        for (i = 0; i < genresswitcher.length; i++) {
          this.genresSwitchers[i].transformValue = 34
          document.getElementsByClassName(this.genresSwitchers[i].name)[0].style.background = '#ab88fd'
        }
      } else {
        this.turnAllGenresVar = 0
        this.genresSwitchers[0].transformValue = 0
        for (i = 0; i < this.genresSwitchers.length; i++) {
          if (i === 1) continue
          this.genresSwitchers[i].transformValue = 0
          document.getElementsByClassName(this.genresSwitchers[i].name)[0].style.background = '#302f3d'
        }
        this.genresSwitchers[1].transformValue = 34
        document.getElementsByClassName('waifu')[0].style.background = '#ab88fd'
      }
    },
    turnAllTypes () {
      if (this.turnAllTypesVar === 0) {
        this.turnAllTypesVar = 1
        for (i = 0; i < this.typesSwitchers.length; i++) {
          this.typesSwitchers[i] = 34
          document.getElementsByClassName('typesswitcher')[i].style.background = '#ab88fd'
        }
      } else {
        this.turnAllTypesVar = 0
        for (i = 0; i < this.typesSwitchers.length; i++) {
          if (i === 1) continue
          this.typesSwitchers[i] = 0
          document.getElementsByClassName('typesswitcher')[i].style.background = '#302f3d'
        }
        this.typesSwitchers[1] = 34
        document.getElementsByClassName('typesswitcher')[1].style.background = '#ab88fd'
      }
    },
    previousPic() {
      if (this.pics.length > 0 && this.pic !== this.pics[0]) {
        this.stepBack += 1
        this.pic = this.pics[this.pics.length - (1 + this.stepBack)]
      }
    },
    async nextPic () {
      if (this.stepBack > 0) {
        this.stepBack -= 1
        this.pic = this.pics[this.pics.length - this.stepBack - 1]
        return
      }
      //Below are activated types
      this.loader = true
      var activatedTypes = []
      for (i = 1; i < this.typesSwitchers.length; i++) {
        if (this.typesSwitchers[i] === 34) {
          activatedTypes.push(i)
        }
      }
      var type = ['sfw', 'nsfw'][activatedTypes[Math.floor(Math.random()*activatedTypes.length)] - 1]
      // Below are activated genres
      var activatedGenres = []
      if (type === 'sfw') {
        for (i = 1; i < this.genresSwitchers.length; i++) {
          if (this.genresSwitchers[i].transformValue === 34 && this.genresSwitchers[i].type == 'sfw' || this.genresSwitchers[i].type == 'mixed') {
            activatedGenres.push(this.genresSwitchers[i].name)
          }
        }
      } else if (type === 'nsfw') {
        for (i = 0; i < this.genresSwitchers.length; i++) {
          if (this.genresSwitchers[i].transformValue === 34 && (this.genresSwitchers[i].type === 'nsfw' || this.genresSwitchers[i].type == 'mixed')) {
            activatedGenres.push(this.genresSwitchers[i].name)
          }
        }
      }
      var genre = activatedGenres[Math.floor(Math.random()*activatedGenres.length)]
      var pic = await axios.get(`https://api.waifu.pics/${type}/${genre}`)
      if (pic.status === 200) {
        this.pic = pic.data.url
        this.loader = false
        this.pics.push(this.pic)
      } else {
        alert('Something went wrong :(')
      }
      this.activatedGenres = []
      this.activatedTypes = []
    }
  },
}).mount('#main')