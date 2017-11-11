export const compileStyle = (object) => {
    let style = {};
    if (object.dimensions)
        style = {
            ...style,
            width: object.dimensions.width,
            height: object.dimensions.height
        };
    if (object.position)
        style = {
            ...style,
            left: object.position.left,
            top: object.position.top
        };
    return style;
};


export const computeStyleWithParams = (object, params) => {
    let style = { ... object };
    if (params.scale)
        if (style.height && !isNaN(style.height))
            style.height = style.height * params.scale;
        if (style.width)
            style.width = style.width * params.scale;
        if (style.top)
            style.top = style.top * params.scale;
        if (style.left)
            style.left = style.left * params.scale;
    if (params.panLeft)
        if (style.left)
            style.left = style.left + params.panLeft; // negative value
    if (params.panTop)
        if (style.top)
            style.top = style.top + params.panTop; // negative value
    return style;
};
