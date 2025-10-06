package net.javaguides.ems_backend.mapper;

import net.javaguides.ems_backend.dto.BookDto;
import net.javaguides.ems_backend.entity.Book;

public class BookMapper {
    public static BookDto mapToBookDto(Book book){
        return new BookDto(
                book.getId(),
                book.getTitle(),
                book.getAuthor(),
                book.getAverageRating(),
                book.getLanguage(),
                book.getNumberOfPages()
        );
    }

    public static Book mapToBook(BookDto bookDto){
        return new Book(
                bookDto.getId(),
                bookDto.getTitle(),
                bookDto.getAuthor(),
                bookDto.getAverageRating(),
                bookDto.getLanguage(),
                bookDto.getNumberOfPages()
        );
    }
}
