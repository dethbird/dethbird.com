import util from 'util';

export const log = (message) => {
    console.log(util.inspect(message, false, null));
};
