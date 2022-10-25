let num = null;

const genNumber = () => {
    number = Math.floor(Math.random() * 100) + 1;
}

const getNumber = () => {
    return num;
}

export default {genNumber, getNumber}