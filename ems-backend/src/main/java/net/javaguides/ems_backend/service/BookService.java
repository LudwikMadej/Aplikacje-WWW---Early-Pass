package net.javaguides.ems_backend.service;

import net.javaguides.ems_backend.dto.BookDto;

import java.util.List;

public interface BookService {
    BookDto createBook(BookDto bookDto);

    BookDto getBookById(Long id);

    List<BookDto> getAllBooks();

    BookDto updateBook(long id, BookDto updatedBookDto);

    void deleteBook(long bookID);
}
