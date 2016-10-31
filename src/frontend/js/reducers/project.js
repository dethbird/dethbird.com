const project = (state = {}, action) => {
    switch (action.type) {
        case 'GET_PROJECT':
            return {
                messsage: 'got project'
            }
        default:
            return {};
    }
}

export default project;
