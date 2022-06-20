// function solution(arr) {
//  const a = []
//     for(let i = 0 ;i<arr.length-1;i++){
//         a.push(arr[i]*arr[i+1])
//     }
//     return Math.max(...a)
// }
// console.log(solution([1, 2, 3, 4, 5]))
// solution([1, 2, 3, 4, 5])



function solution(n) {
    let a = 0
    for (let i = n; i > 0; i++) {
       a = i
       a = i*4 + i
       a = i*4 - i
    }
    return a

}

console.log(solution(3))

console.log(2**3 + 2*2+2)