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
