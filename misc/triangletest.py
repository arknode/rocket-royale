# function SameSide(p1,p2,a,b) {
#     crossProductOne = CrossProduct(b.sub(a),p1.sub(a))
#     crossProductTwo = CrossProduct(b.sub(a),p2.sub(a))
#     if (DotProduct(crossProductOne,crossProductTwo) >= 0) {
#         return True
#     } else {
#         return False
#     }
# }

# function PointInTriangle(p,a,b,c) {
#     if (SameSide(p,a,b,c) && SameSide(p,b,a,c) && SameSide(p,c,a,b)) {
#         return True
#     } else {
#         return False
#     }
# }

# function CrossProduct(p1,p2) {
#     return (p1.x * p2.y) - (p1.y * p2.x)
# }

# function DotProduct(p1,p2) {
#     return (p1.x * p2.x) + (p1.y * p2.y)
# }

class Vector:
    def __init__(self,x,y,z):
        self.x = x
        self.y = y
        self.z = z

    def sub(self,vector):
        return Vector(self.x - vector.x,self.y - vector.y,self.z - vector.z)

def SameSide(p1,p2,a,b):
    crossProductOne = CrossProduct(b.sub(a),p1.sub(a))
    crossProductTwo = CrossProduct(b.sub(a),p2.sub(a))
    if (DotProduct(crossProductOne,crossProductTwo) >= 0):
        return True
    else:
        return False

def PointInTriangle(p,a,b,c):
    if (SameSide(p,a,b,c) and SameSide(p,b,a,c) and SameSide(p,c,a,b)):
        return True
    else:
        return False

def CrossProduct(p1,p2):
    return Vector(0,0,(p1.x * p2.y) - (p1.y * p2.x))

def DotProduct(p1,p2):
    return (p1.x * p2.x) + (p1.y * p2.y) + (p1.z * p2.z) 

point = Vector(2,2,0)
A = Vector(0,0,0)
B = Vector(5,5,0)
C = Vector(10,0,0)

print(PointInTriangle(point,A,B,C))