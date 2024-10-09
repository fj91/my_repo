let mover = (function () {
    let xy = [0, 0]
    return (function (dx, dy) {
        xy[0] += dx
        xy[1] += dy
        return xy
    })
}());
mover(100, 100)
mover(-10, 10)
mover(10, -10)
console.log(xy)
