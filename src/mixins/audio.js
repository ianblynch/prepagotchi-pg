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
        loadSound(id, assetPath, successCallback, errorCallback) {
            let wna = window.plugins.NativeAudio
            wna.preloadSimple(id, assetPath, successCallback, errorCallback)
        },
        play(id, successCallback, errorCallback, completeCallback) {
            let wna = window.plugins.NativeAudio
            wna.play(
                id, successCallback, errorCallback, completeCallback
            )
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
    },
}
