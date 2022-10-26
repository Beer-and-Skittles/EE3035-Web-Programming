let num = null;

const genNumber = () => {
    num = Math.floor(Math.random() * 100) + 1;
    console.log(num);
    return num;
}

const getNumber = () => {
    return num;
}

export {genNumber, getNumber}