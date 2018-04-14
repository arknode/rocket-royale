function SameSide(p1,p2,a,b) {
    crossProductOne = CrossProduct(b.sub(a),p1.sub(a))
    crossProductTwo = CrossProduct(b.sub(a),p2.sub(a))
    if (DotProduct(crossProductOne,crossProductTwo) >= 0) {
        return True
    } else {
        return False
    }
}

function PointInTriangle(p,a,b,c) {
    if (SameSide(p,a,b,c) && SameSide(p,b,a,c) && SameSide(p,c,a,b)) {
        return True
    } else {
        return False
    }
}

function CrossProduct(p1,p2) {
    return (p1.x * p2.y) - (p1.y * p2.x)
    // return Vector(0,0,(p1.x * p2.y) - (p1.y * p2.x))
}

function DotProduct(p1,p2) {
    return p1 * p2
    // return (p1.x * p2.x) + (p1.y * p2.y) + (p1.z * p2.z)
}

