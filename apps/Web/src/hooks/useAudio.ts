export interface Audio {
    rate?: number;//语速
    pitch?: number;//音调
    volume?: number;//音量
    lang?: string;//语言
}

export const useAudio = (options: Audio) => {
    const audio = new SpeechSynthesisUtterance();
    const { rate = 0.7, pitch = 1, volume = 1, lang = 'en-US' } = options;
    audio.rate = rate;
    audio.pitch = pitch;
    audio.volume = volume;
    audio.lang = lang;
    const playAudio = (word: string) => {
        audio.text = word;  
        console.log(audio,'audio');
        speechSynthesis.speak(audio);
        // console.log(speechSynthesis,'speechSynthesis');
    }
    return {
        playAudio,
    }
}


// export interface Options {
//     rate?: number //语速0-1
//     volume?: number //音量0-1
//     pitch?: number //音调0-2
//     lang?: string //语言
// }
// let instance: SpeechSynthesisUtterance | null = null
// const getInstance = (options: Options) => {
//     if(!instance){
//         instance = new SpeechSynthesisUtterance()
//         const { rate = 0.7, volume = 1, pitch = 1, lang = 'en-US' } = options
//         instance.rate = rate
//         instance.volume = volume
//         instance.pitch = pitch
//         instance.lang = lang
//     }
//     return instance
// }
// export const useAudio = (options: Options) => {
//     const pronounce  = getInstance(options)
//     const playAudio = (word: string) => {
//         pronounce.text = word //设置发音的单词
//         speechSynthesis.speak(pronounce) // 播放发音
//     }

//     return {
//         playAudio
//     }
// }

