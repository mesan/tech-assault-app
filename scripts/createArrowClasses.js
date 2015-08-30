const arrowCount = 8;

for (let i = 0; i < 255; i++) {
    const bin = dec2bin(i);

    const images = [];

    const className = `arrows-${i}`;

    const binArray = bin.split('');

    while (binArray.length < 8) {
        binArray.unshift(0);
    }

    for (let j = 0; j < binArray.length; j++) {
        if (binArray[j] === '1') {
            images.push(j);
        }
    }

    if (images.length === 0) {
        continue;
    }

    const templ = `.${className} {
    background-image: ${images.map(url => `url(/assets/ca${url}.png)`).join(', ')};
}
`;

    console.log(templ);
}

function dec2bin(dec){
    return dec.toString(2);
    //return (dec >>> 0).toString(2);
}