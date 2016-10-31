const projects = (state = {}, action) => {
    switch (action.type) {
        case 'GET_PROJECTS':
            return {
                messsage: 'got projects'
            }
        default:
            return {};
    }
}

export default projects;
