package main
import "fmt"

func readInt(n int) []int {
    input := make([]int, n)

    for i := range input {
        _, err := fmt.Scan(&input[i])
        if err != nil {
            return input[:i]
        }
    }

    return input
}

func main() {
    var num int
    fmt.Scanln(&num)

    toys := readInt(num)

    weights := make([]int, 10001)
    for _, weight := range(toys) {
        weights[weight] += 1
    }
    count := 0
    for i := 0; i < len(weights); {
        if weights[i] > 0 {
            count += 1
            i += 4
        }
        i++
    }

    fmt.Println(count)
}