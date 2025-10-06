package net.javaguides.ems_backend.service.impl;
import lombok.AllArgsConstructor;
import net.javaguides.ems_backend.dto.BookDto;
import net.javaguides.ems_backend.entity.Book;
import net.javaguides.ems_backend.exception.ResourceNotFoundException;
import net.javaguides.ems_backend.mapper.BookMapper;
import net.javaguides.ems_backend.repository.BookRepository;
import net.javaguides.ems_backend.service.BookService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class BookServiceImp implements BookService {
    private BookRepository bookRepository;

    @Override public BookDto createBook(BookDto bookDto) {
        return BookMapper.mapToBookDto( bookRepository.save(BookMapper.mapToBook(bookDto)) ); }

    @Override public BookDto getBookById(Long id) {
        return BookMapper.mapToBookDto( bookRepository.
                findById(id).
                orElseThrow( () -> new ResourceNotFoundException("There's no book with given id: " + id) ) ); }

    @Override public List<BookDto> getAllBooks() {
        return bookRepository
                .findAll()
                .stream()
                .map(BookMapper::mapToBookDto)
                .collect(Collectors.toList());
    }

    @Override public BookDto updateBook(long id, BookDto updatedBookDto) {
        Book book = bookRepository
                .findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("There's no book with given id: " + id));

        book.setAuthor(updatedBookDto.getAuthor());
        book.setAverageRating(updatedBookDto.getAverageRating());
        book.setTitle(updatedBookDto.getTitle());
        book.setNumberOfPages(updatedBookDto.getNumberOfPages());
        book.setLanguage(updatedBookDto.getLanguage());
        return BookMapper.mapToBookDto(bookRepository.save(book));
    }

    @Override public void deleteBook(long bookID) {
        bookRepository.delete(
                bookRepository
                        .findById(bookID)
                        .orElseThrow(() -> new ResourceNotFoundException("There's no book with given id: " + bookID)) );
    }
}