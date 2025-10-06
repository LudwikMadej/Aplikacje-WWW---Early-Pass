package net.javaguides.ems_backend.service.impl;

import net.javaguides.ems_backend.dto.BookDto;
import net.javaguides.ems_backend.entity.Book;
import net.javaguides.ems_backend.exception.ResourceNotFoundException;
import net.javaguides.ems_backend.repository.BookRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

class BookServiceImpTest {

    @Mock
    private BookRepository bookRepository;

    @InjectMocks
    private BookServiceImp bookService;

    private Book book;
    private BookDto bookDto;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        book = new Book(1L, "Spring in Action", "Craig Walls", 4.5, "EN", 400);
        bookDto = new BookDto(1L, "Spring in Action", "Craig Walls", 4.5, "EN", 400);
    }

    @Test
    void testCreateBook() {
        when(bookRepository.save(any(Book.class))).thenReturn(book);

        BookDto result = bookService.createBook(bookDto);

        assertThat(result.getTitle()).isEqualTo("Spring in Action");
        verify(bookRepository).save(any(Book.class));
    }

    @Test
    void testGetBookByIdFound() {
        when(bookRepository.findById(1L)).thenReturn(Optional.of(book));

        BookDto result = bookService.getBookById(1L);

        assertThat(result.getTitle()).isEqualTo("Spring in Action");
    }

    @Test
    void testGetBookByIdNotFound() {
        when(bookRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> bookService.getBookById(99L));
    }

    @Test
    void testGetAllBooks() {
        Book book2 = new Book(2L, "Java Concurrency", "Brian Goetz", 4.7, "EN", 500);
        when(bookRepository.findAll()).thenReturn(Arrays.asList(book, book2));

        List<BookDto> books = bookService.getAllBooks();

        assertThat(books).hasSize(2);
        assertThat(books.get(0).getTitle()).isEqualTo("Spring in Action");
        assertThat(books.get(1).getTitle()).isEqualTo("Java Concurrency");
    }

    @Test
    void testUpdateBookFound() {
        BookDto updatedDto = new BookDto(1L, "Spring Boot Up", "Craig Walls", 4.8, "EN", 420);
        when(bookRepository.findById(1L)).thenReturn(Optional.of(book));
        when(bookRepository.save(any(Book.class))).thenReturn(book);

        BookDto result = bookService.updateBook(1L, updatedDto);

        assertThat(result.getTitle()).isEqualTo("Spring Boot Up");
        verify(bookRepository).save(any(Book.class));
    }

    @Test
    void testUpdateBookNotFound() {
        when(bookRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> bookService.updateBook(99L, bookDto));
    }

    @Test
    void testDeleteBookFound() {
        when(bookRepository.findById(1L)).thenReturn(Optional.of(book));

        bookService.deleteBook(1L);

        verify(bookRepository).delete(book);
    }

    @Test
    void testDeleteBookNotFound() {
        when(bookRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> bookService.deleteBook(99L));
    }
}
