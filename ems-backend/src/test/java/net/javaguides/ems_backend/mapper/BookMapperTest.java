package net.javaguides.ems_backend.mapper;

import net.javaguides.ems_backend.dto.BookDto;
import net.javaguides.ems_backend.entity.Book;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class BookMapperTest {

    @Test
    void testMapToBookDto() {
        Book book = new Book(1L, "Spring in Action", "Craig Walls", 4.5, "EN", 400);

        BookDto dto = BookMapper.mapToBookDto(book);

        assertThat(dto.getId()).isEqualTo(1L);
        assertThat(dto.getTitle()).isEqualTo("Spring in Action");
        assertThat(dto.getAuthor()).isEqualTo("Craig Walls");
        assertThat(dto.getAverageRating()).isEqualTo(4.5);
        assertThat(dto.getLanguage()).isEqualTo("EN");
        assertThat(dto.getNumberOfPages()).isEqualTo(400);
    }

    @Test
    void testMapToBook() {
        BookDto dto = new BookDto(1L, "Spring in Action", "Craig Walls", 4.5, "EN", 400);

        Book book = BookMapper.mapToBook(dto);

        assertThat(book.getId()).isEqualTo(1L);
        assertThat(book.getTitle()).isEqualTo("Spring in Action");
        assertThat(book.getAuthor()).isEqualTo("Craig Walls");
        assertThat(book.getAverageRating()).isEqualTo(4.5);
        assertThat(book.getLanguage()).isEqualTo("EN");
        assertThat(book.getNumberOfPages()).isEqualTo(400);
    }
}
