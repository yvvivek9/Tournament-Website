var x = [1]

const add2 = async () => {
    x = [...x, 2]
    return Promise.resolve()
}

const add3 = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        x = [...x, 3]
        return resolve()
    }, 4000)
})

const final = async () => {
    console.log(x)
    await add2()
    console.log(x)
    await add3()
    console.log(x)
    console.log("half done")
    return Promise.resolve()
}

final().then(() => {console.log("All done")})