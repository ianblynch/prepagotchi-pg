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
const sfxMap = {
    //TamaNexus
    nexusLeft: 'sfx0',
    nexusCenter: 'sfx1',
    nexusRight: 'sfx2',
    nexusPrimeSwitch: 'sfx0',
    nexusLastSwitch: 'sfx4',
    //ScoreTransCard
    scoreTransPlus: 'sfx1',
    scoreTransReturn: 'sfx0',
    //DribbleCard
    dribbleTouchBall: 'sfx1',
    dribbleTouchMiss: 'sfx3',
    //LeadCard
    leadEncouragement0: 'sfx3',
    leadEncouragement1: 'sfx3',
    leadEncouragement2: 'sfx3',
    leadEncouragement3: 'sfx3',
    leadEncouragement4: 'sfx3',
    //PowerStartAndStop
    powerPush: 'sfx4',
    powerStop: 'sfx0',
    //SocializeCard
    socializeOneCorrect: 'sfx0',
    socializeTwoCorrect: 'sfx0',
    socializeThreeCorrect: 'sfx0',
    socializeMiss: 'sfx1',
    //EatCard
    eatTouchFood: 'sfx1',
    eatTouchMiss: 'sfx3',
    eatTouchBounce: 'sfx4',
    //ShootCard
    shootPower0: 'sfx2',
    shootPower1: 'sfx2',
    shootPower2: 'sfx2',
    shootPower3: 'sfx2',
    shootPower4: 'sfx2',
    shootPower5: 'sfx2',
    shootPower6: 'sfx2',
    shootPower7: 'sfx2',
    shootPower8: 'sfx2',
    shootPower9: 'sfx2',
    shootPowerReset: 'sfx3',
    shootShoot: 'sfx0',
    shootMake: 'sfx4',
    shootMiss: 'sfx1',
    //LiftCard
    liftOneCorrect: 'sfx0',
    liftTwoCorrect: 'sfx0',
    liftThreeCorrect: 'sfx0',
    liftMiss: 'sfx1',
    //StatsCard
    statsPressHome: 'sfx1',
    statsPressCWB: 'sfx4'
}
const toLoad = [
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
            let wna = window.plugins.NativeAudio
            wna.play(id, successCallback, errorCallback, completeCallback)
        },
        loop(id, successCallback, errorCallback) {
            let wna = window.plugins.NativeAudio
            wna.loop(id, successCallback, errorCallback)
        },
        stop(id, successCallback, errorCallback) {
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
            let newScreen = store.getValue('currentGameScreen')
            if (Object.keys(screenSongs).indexOf(newScreen) > -1) {
                let oldSong = store.getValue('loopingSong')
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
                undefined,
                err => console.log(err)
            )
            //then start looping newSong
            this.loop(
                newSong,
                undefined,
                err => console.log(err)
            )
            //then set oldSong to newSong value
            store.setValue('loopingSong', newSong)
        },
        loadAllAudio() {
            // let list = songs.concat(sfx)
            toLoad.forEach(song => {
                let ap = `audio/${song}.mp3`
                this.loadSong(
                    song,
                    ap,
                    0.03,
                    1,
                    0,
                    undefined,
                    err => console.log(err)
                )
            })
        },
        playSfx(id) {
            let sound = id
            //assign id to sound
            //check if is a key of sfxMap
            //if is a key of sfxMap, use that val as id
            if ( Object.keys(sfxMap).indexOf(id) > -1 ) {
                sound = sfxMap[id]
            }
            // console.log('id: '+id)
            // console.log('sound: '+sound)

            // console.log('running play sfx')
            this.stop(
                sound,
                undefined,
                err => console.log(err)
            )
            this.play(
                sound,
                ()=>{console.log(sound+' played')},
                err => console.log(err)
            )
        },
    },
}
