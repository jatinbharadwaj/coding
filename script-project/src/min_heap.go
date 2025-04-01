package main

import "fmt"

// MinHeap represents a min-heap data structure
type MinHeap struct {
    heap []int
}

// Insert adds an element to the heap
func (h *MinHeap) Insert(val int) {
    h.heap = append(h.heap, val)
    h.heapifyUp(len(h.heap) - 1)
}

// RemoveMin removes and returns the smallest element from the heap
func (h *MinHeap) RemoveMin() (int, bool) {
    if len(h.heap) == 0 {
        return 0, false // Heap is empty
    }

    // Swap the first and last elements, then remove the last element
    min := h.heap[0]
    h.heap[0] = h.heap[len(h.heap)-1]
    h.heap = h.heap[:len(h.heap)-1]

    // Restore the heap property
    h.heapifyDown(0)

    return min, true
}

// Peek returns the smallest element without removing it
func (h *MinHeap) Peek() (int, bool) {
    if len(h.heap) == 0 {
        return 0, false // Heap is empty
    }
    return h.heap[0], true
}

// heapifyUp restores the heap property by moving the element at index up
func (h *MinHeap) heapifyUp(index int) {
    for index > 0 {
        parent := (index - 1) / 2
        if h.heap[index] >= h.heap[parent] {
            break
        }
        h.heap[index], h.heap[parent] = h.heap[parent], h.heap[index]
        index = parent
    }
}

// heapifyDown restores the heap property by moving the element at index down
func (h *MinHeap) heapifyDown(index int) {
    lastIndex := len(h.heap) - 1
    for {
        leftChild := 2*index + 1
        rightChild := 2*index + 2
        smallest := index

        if leftChild <= lastIndex && h.heap[leftChild] < h.heap[smallest] {
            smallest = leftChild
        }
        if rightChild <= lastIndex && h.heap[rightChild] < h.heap[smallest] {
            smallest = rightChild
        }
        if smallest == index {
            break
        }

        h.heap[index], h.heap[smallest] = h.heap[smallest], h.heap[index]
        index = smallest
    }
}

// Size returns the number of elements in the heap
func (h *MinHeap) Size() int {
    return len(h.heap)
}

// Example usage
func main() {
    h := &MinHeap{}

    h.Insert(10)
    h.Insert(5)
    h.Insert(20)
    h.Insert(2)

    fmt.Println("Min:", h.Peek()) // Output: Min: 2

    fmt.Println("RemoveMin:", h.RemoveMin()) // Output: RemoveMin: 2
    fmt.Println("RemoveMin:", h.RemoveMin()) // Output: RemoveMin: 5

    h.Insert(1)
    fmt.Println("Min:", h.Peek()) // Output: Min: 1
}