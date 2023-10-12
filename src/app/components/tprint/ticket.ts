export class Ticket {

    main(): number[][][] {
        const first = permute('222111').concat(permute('321111'))
        const middle = permute('331111').concat(permute('322111')).concat(permute('222211'))
        const last = permute('332111').concat(permute('322211')).concat(permute('222221'))
        const myArray1: number[][][] = Array.from({ length: 6 }, () => Array.from({ length: 3 }, () => Array(9).fill(0)));

        updateBingoSerie();

        function updateBingoSerie() {
            const afirst = permute('222111').concat(permute('321111'))
            const amiddle = permute('331111').concat(permute('322111')).concat(permute('222211'))
            const alast = permute('332111').concat(permute('322211')).concat(permute('222221'))
            const bingoSerie = new Serie()
            generateSerie(0, bingoSerie)
            const serie = new BingoSerie()
            for (let e = 0; e < 6; e++) {
                const ticket = new BingoTicket(bingoSerie.data[e])
                ticket.data.forEach((row, i) => {
                    row.forEach((item, j) => {
                        const index = i * 9 + j
                        if (item === 0) {
                        } else {
                            myArray1[e][i][j] = serie.selectNext(j);
                        }
                    })
                })
            }
            // console.log(myArray1);                        
        }

        function random(maxValue) {
            return Math.floor(Math.random() * maxValue)
        }

        function BingoSerie() {
            this.data = [
                [1, 2, 3, 4, 5, 6, 7, 8, 9],
                [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
                [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
                [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
                [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
                [50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
                [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
                [70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
                [80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90]
            ]
            this.selectNext = function (column) {
                const arr = this.data[column]
                const index = random(arr.length)
                this.data[column] = arr.slice(0, index).concat(arr.slice(index + 1))
                return arr[index]
            }
        }

        function BingoTicket(ticket) {
            this.data = [
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]
            ]

            function selectRandomRow(obj, rowControl, col) {
                const candidates = rowControl.available(obj, col)
                const selection = Number(candidates[random(candidates.length)])
                obj.data[selection][col] = 1
                rowControl.increase(selection)
            }

            function init(obj) {
                const arr = ticket.slice(0)
                const rows = {
                    one: 0,
                    two: 0,
                    three: 0,
                    available: function (obj, col) {
                        let s = ''
                        if (this.one < 5 && obj.data[0][col] === 0) s = '0'
                        if (this.two < 5 && obj.data[1][col] === 0) s = s + '1'
                        if (this.three < 5 && obj.data[2][col] === 0) s = s + '2'
                        return s
                    },
                    increase: function (value) {
                        if (value === 0) {
                            this.one++
                        } else if (value === 1) {
                            this.two++
                        } else if (value === 2) {
                            this.three++
                        }
                    }
                }
                // Process Number 3
                arr.forEach((element, index) => {
                    if (element === 3) {
                        for (let i = 0; i < 3; i++) {
                            selectRandomRow(obj, rows, index)
                        }
                    }
                })
                // Process Number 2
                arr.forEach((element, index) => {
                    if (element === 2) {
                        for (let i = 0; i < 2; i++) {
                            selectRandomRow(obj, rows, index)
                        }
                    }
                })
                // Process Number 1
                arr.forEach((element, index) => {
                    if (element === 1) {
                        selectRandomRow(obj, rows, index)
                    }
                })
                // console.log(arr);

            }

            init(this)
        }

        function Serie() {
            this.data = []
            function init(obj) {
                for (let i = 0; i < 6; i++) {
                    obj.data.push(Array(9).fill(0))
                }
            }
            this.fillColumn = function (col, arr) {
                arr.forEach((v, i) => { this.data[i][col] = Number(v) })
            }
            this.cleanColumn = function (col) {
                for (let i = 0; i < 6; i++) {
                    this.data[i][col] = 0
                }
            }
            this.isValid = function (index) {
                return !this.data.some((row, ri) => {
                    let sum = row.reduce((total, v) => {
                        return total + v
                    }, 0)
                    if ((sum + 8 - index) > 15) return true
                    return false
                })
            }
            this.toString = function () {
                return this.data.reduce((arr, v) => {
                    arr.push(v.join(''))
                    return arr
                }, [])
            }

            init(this)
        }

        function permute(str) {
            const arrPermutes = []
            const obj = str.split('').reduce((o, v) => {
                if (o.hasOwnProperty(v)) {
                    o[v]++
                } else {
                    o[v] = 1
                }
                return o
            }, {})
            function permutes(result, elements) {
                if (Object.keys(elements).length === 1 && Object.values(elements)[0] === 1) {
                    arrPermutes.push(result + Object.keys(elements)[0])
                } else {
                    const local = Object.assign({}, elements)
                    const arr = Object.keys(elements)
                    arr.forEach(k => {
                        const v = local[k]
                        if (v === 1) {
                            delete local[k]
                        } else {
                            local[k]--
                        }
                        permutes(result + k, local)
                        local[k] = v
                    })
                }
            }
            permutes('', obj)
            return arrPermutes
        }

        function generateSerie(index, serie) {
            let local = []
            switch (index) {
                case 0:
                    local = first.slice(0)
                    break
                case 8:
                    local = last.slice(0)
                    break
                default:
                    local = middle.slice(0)
            }

            let result = false
            while (!result && local.length > 0) {
                const test = local.splice(random(local.length), 1)[0]
                serie.fillColumn(index, test.split(''))
                if (serie.isValid(index)) {
                    if (index === 8) return true
                    result = generateSerie(index + 1, serie)
                } else {
                    serie.cleanColumn(index)
                }
            }
            return result
        }

        function countNonZeroElements(arr: number[][][]): number {
            let count = 0;

            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr[i].length; j++) {
                    for (let k = 0; k < arr[i][j].length; k++) {
                        if (arr[i][j][k] !== 0) {
                            count++;
                        }
                    }
                }
            }
            return count;
        }
        
        if (countNonZeroElements(myArray1)!==90)
            return this.main();
        else
            return myArray1;
    }
}
