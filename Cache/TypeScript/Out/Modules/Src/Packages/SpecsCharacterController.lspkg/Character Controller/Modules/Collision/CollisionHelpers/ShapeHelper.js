"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShapeType = void 0;
exports.getShapeType = getShapeType;
exports.getAxis = getAxis;
exports.getAxisDirection = getAxisDirection;
var ShapeType;
(function (ShapeType) {
    ShapeType["Sphere"] = "Sphere";
    ShapeType["Box"] = "Box";
    ShapeType["Cone"] = "Cone";
    ShapeType["Capsule"] = "Capsule";
    ShapeType["Cylinder"] = "Cylinder";
    ShapeType["Mesh"] = "Mesh";
    ShapeType["Unsupported"] = "Unsupported";
})(ShapeType || (exports.ShapeType = ShapeType = {}));
function getShapeType(collider) {
    const shapeData = "" + collider.shape.getTypeName();
    if (shapeData.indexOf("Sphere") >= 0) {
        return ShapeType.Sphere;
    }
    else if (shapeData.indexOf("Box") >= 0) {
        return ShapeType.Box;
    }
    else if (shapeData.indexOf("Cone") >= 0) {
        return ShapeType.Cone;
    }
    else if (shapeData.indexOf("Capsule") >= 0) {
        return ShapeType.Capsule;
    }
    else if (shapeData.indexOf("Cylinder") >= 0) {
        return ShapeType.Cylinder;
    }
    else if (shapeData.indexOf("Mesh") >= 0) {
        return ShapeType.Mesh;
    }
    else {
        return ShapeType.Unsupported;
    }
}
function getAxis(axis) {
    switch (axis) {
        case Axis.X:
            return "x";
        case Axis.Y:
            return "y";
        case Axis.Z:
            return "z";
    }
}
function getAxisDirection(axis) {
    switch (axis) {
        case Axis.X:
            return vec3.right();
        case Axis.Y:
            return vec3.up();
        case Axis.Z:
            return vec3.forward();
    }
}
//# sourceMappingURL=ShapeHelper.js.map