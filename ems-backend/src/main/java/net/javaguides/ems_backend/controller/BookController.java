package net.javaguides.ems_backend.controller;

import lombok.AllArgsConstructor;
import net.javaguides.ems_backend.dto.BookDto;
import net.javaguides.ems_backend.service.BookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("api/books")
public class BookController {

    private BookService bookService;

    @PostMapping("")
    public ResponseEntity<BookDto> createBook(@RequestBody BookDto bookDto){
        return new ResponseEntity<>(
                bookService.createBook(bookDto),
                HttpStatus.CREATED
        );
    }

    @GetMapping("{id}")
    public ResponseEntity<BookDto> getBookById(@PathVariable Long id){
        return ResponseEntity.ok(bookService.getBookById(id));
    }

    @GetMapping("getAll")
    public ResponseEntity<List<BookDto>> getBooks(){
        return ResponseEntity.ok(bookService.getAllBooks());
    }

    @PutMapping("{id}")
    public ResponseEntity<BookDto> updateBook(@PathVariable("id") Long id, @RequestBody BookDto bookDto){
        return ResponseEntity.ok(bookService.updateBook(id, bookDto));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteBook(@PathVariable("id") Long id){
        bookService.deleteBook(id);

        return ResponseEntity.ok("Book's been deleted successfully!");
    }

}
