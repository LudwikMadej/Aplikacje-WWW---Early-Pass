package net.javaguides.ems_backend.controller;
import net.javaguides.ems_backend.dto.BookDto;
import net.javaguides.ems_backend.service.BookService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class BookControllerTest {

    @Mock
    private BookService bookService;

    @InjectMocks
    private BookController bookController;

    private BookDto bookDto;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        bookDto = new BookDto();
        bookDto.setId(1L);
        bookDto.setTitle("Test Book");
    }

    @Test
    void testCreateBook() {
        when(bookService.createBook(any(BookDto.class))).thenReturn(bookDto);

        ResponseEntity<BookDto> response = bookController.createBook(bookDto);

        assertThat(response.getBody().getTitle()).isEqualTo("Test Book");
        assertThat(response.getStatusCodeValue()).isEqualTo(201);
    }

    @Test
    void testGetBookById() {
        when(bookService.getBookById(1L)).thenReturn(bookDto);

        ResponseEntity<BookDto> response = bookController.getBookById(1L);

        assertThat(response.getBody().getTitle()).isEqualTo("Test Book");
        verify(bookService).getBookById(1L);
    }

    @Test
    void testGetBooks() {
        when(bookService.getAllBooks()).thenReturn(Arrays.asList(bookDto));

        ResponseEntity<List<BookDto>> response = bookController.getBooks();

        assertThat(response.getBody()).hasSize(1);
        verify(bookService).getAllBooks();
    }

    @Test
    void testDeleteBook() {
        doNothing().when(bookService).deleteBook(1L);

        ResponseEntity<String> response = bookController.deleteBook(1L);

        assertThat(response.getBody()).contains("deleted successfully");
    }
}