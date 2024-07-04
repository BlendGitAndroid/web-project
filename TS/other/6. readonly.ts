function reverseSorted(input: number[]) : number[] {
    return input.sort().reverse()
}

const start = [1,2,3,4,5]
const result2 = reverseSorted(start);

console.log(result2)
console.log(start)

// readonly，只读属性，不可修改
function reverseSorted2(input: readonly number[]) : number[] {
    // return input.slice().sort().reverse()
    return [...input].sort().reverse();
}
