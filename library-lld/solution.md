# Library Management System Design

I'll design a comprehensive library management system that meets all the requirements while being modular, extensible, and thread-safe. The system will be implemented in Node.js with proper separation of concerns.

## System Architecture

- **Book**: Represents book metadata.
- **BookCopy**: Represents individual copies of books.
- **Rack**: Manages book copies on physical racks.
- **User**: Represents library users.
- **Library**: Main class managing all library operations.
- **LibraryService**: Service layer handling commands.
- **CLI**: Command-line interface for user interaction.

## Design Patterns and Principles

- **Single Responsibility Principle**: Each class has a single responsibility.
- **Observer Pattern**: Could be added for notifications (e.g., due date reminders).
- **Factory Pattern**: Used in book and user creation.
- **Strategy Pattern**: Different search strategies could be implemented.
- **Open/Closed Principle**: Easy to extend with new features.

## Thread Safety Considerations

To make the system thread-safe:

- **Mutex Locks**: Use Node's `worker_threads` or external libraries like `async-mutex`.
- **Immutable Data**: Use immutable data structures where possible.
- **Atomic Operations**: Ensure critical sections are atomic.

### Example with Mutex

```javascript
const { Mutex } = require('async-mutex');
const mutex = new Mutex();

// In LibraryService methods:
async function borrowBook(bookId, userId, dueDate) {
    const release = await mutex.acquire();
    try {
        // ... existing code ...
    } finally {
        release();
    }
}
```

## Extensibility Points

- **Change Book Limit**:
  - Modify `User` class constructor to accept different `maxBooks`.
  - Add a configuration option.

- **Additional Book Attributes**:
  - Extend `Book` class with new properties.
  - Update search functionality.

- **Multiple Libraries**:
  - Change `LibraryService` to manage multiple libraries.
  - Add library ID to commands.

- **New Search Attributes**:
  - Extend `searchByAttribute` method in `Library` class.
  - Add new search strategies.

## Sample Execution

```bash
$ node app.js
create_library lib1 10
Created library with 10 racks
add_book 1 book1 author1,author2 publisher1 book_copy1,book_copy2,book_copy3
Added Book to racks: 1,2,3
search book_id 1
Book Copy: book_copy1 1 book1 author1,author2 publisher1 1
Book Copy: book_copy2 1 book1 author1,author2 publisher1 2
Book Copy: book_copy3 1 book1 author1,author2 publisher1 3
borrow_book 1 user1 2023-12-31
Borrowed Book from rack: 1
print_borrowed user1
Book Copy: book_copy1 2023-12-31
exit
```

This implementation provides a robust, modular, and extensible library management system that meets all requirements while following software design best practices.
