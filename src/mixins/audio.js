import { store } from '../data/store.js'
const screenSongs = {
    TamaNexus: 'amore',
    EggCard: 'the-nose',
    GraveScreen: 'the-nose',
    DribbleCard: 'alien',
    LeadCard: 'mindshaft',
    PowerStartAndStopCard: 'mountain',
    SocializeCard: 'mushroom',
    EatCard: 'roll',
    ShootCard: 'epilogue-snare',
    LiftCard: 'thunk',
    StatsCard: 'time',
    ClassicBall: 'victory',
}
const songs = [
    'alien',
    'amore',
    'epilogue-snare',
    'mindshaft',
    'mountain',
    'mushroom',
    'roll',
    'the-nose',
    'thunk',
    'time',
    'victory',
    'sfx0',
    'sfx1',
    'sfx2',
    'sfx3',
    'sfx4',
]
export const audio = {
    methods: {
        loadSong(
            id,
            assetPath,
            volume,
            voices,
            delay,
            successCallback,
            errorCallback
        ) {
            let wna = window.plugins.NativeAudio
            console.log('loading song: ' + id + ' from ' + assetPath)
            wna.preloadComplex(
                id,
                assetPath,
                volume,
                voices,
                delay,
                successCallback,
                errorCallback
            )
        },
        loadSound(
            id,
            assetPath,
            volume,
            voices,
            delay,
            successCallback,
            errorCallback
        ) {
            let wna = window.plugins.NativeAudio
            wna.preloadComplex(
                id,
                assetPath,
                volume,
                voices,
                delay,
                successCallback,
                errorCallback
            )
        },
        play(id, successCallback, errorCallback, completeCallback) {
            console.log('running play')
            let wna = window.plugins.NativeAudio
            wna.play(id, successCallback, errorCallback, completeCallback)
        },
        loop(id, successCallback, errorCallback) {
            let wna = window.plugins.NativeAudio
            wna.loop(id, successCallback, errorCallback)
        },
        stop(id, successCallback, errorCallback) {
            console.log('running stop')
            let wna = window.plugins.NativeAudio
            wna.stop(id, successCallback, errorCallback)
        },
        unload(id, successCallback, errorCallback) {
            let wna = window.plugins.NativeAudio
            wna.unload(id, successCallback, errorCallback)
        },
        setVolumeForComplexAsset(id, volume, successCallback, errorCallback) {
            let wna = window.plugins.NativeAudio
            wna.setVolumeForComplexAsset(
                id,
                volume,
                successCallback,
                errorCallback
            )
        },
        checkIfShouldChangeSong() {
            console.log('cheking if should change song')
            let newScreen = store.getValue('currentGameScreen')
            console.log('screen to check: ' + newScreen)
            if (Object.keys(screenSongs).indexOf(newScreen) > -1) {
                console.log('screen has song')
                let oldSong = store.getValue('loopingSong')
                console.log('oldSong: ' + oldSong)
                console.log('newSong: ' + screenSongs[newScreen])
                if (screenSongs[newScreen] !== oldSong) {
                    store.setValue('newLoopingSong', screenSongs[newScreen])
                }
            }
        },
        handleSongChange() {
            let oldSong = store.getValue('loopingSong')
            let newSong = store.getValue('newLoopingSong')
            //first stop oldSong
            this.stop(
                oldSong,
                () => console.log(oldSong + ' stopped successfully'),
                err => console.log(err)
            )
            //then start looping newSong
            this.loop(
                newSong,
                () => console.log(newSong + ' looping successfully'),
                err => console.log(err)
            )
            //then set oldSong to newSong value
            store.setValue('loopingSong', newSong)
        },
        loadAllAudio() {
            // let list = songs.concat(sfx)
            songs.forEach(song => {
                let ap = `audio/${song}.mp3`
                this.loadSong(
                    song,
                    ap,
                    0.03,
                    1,
                    0,
                    () => console.log(song + ' loaded successfully'),
                    err => console.log(err)
                )
            })
        },
        loadAllSfx() {
            sfx.forEach(sound => {
                let ap = `audio/${sound}.mp3`
                this.loadSong(
                    sound,
                    ap,
                    0.03,
                    1,
                    0,
                    () => console.log(sound + ' loaded successfully'),
                    err => console.log(err)
                )
            })
        },
        playSfx(id) {
            console.log('running play sfx')
            this.stop(
                id,
                () => console.log(id + ' stopped successfully'),
                err => console.log(err)
            )
            this.play(
                id,
                () => console.log(id + ' started successfully'),
                err => console.log(err),
                () => console.log(id + ' completed successfully')
            )
        },
    },
}
