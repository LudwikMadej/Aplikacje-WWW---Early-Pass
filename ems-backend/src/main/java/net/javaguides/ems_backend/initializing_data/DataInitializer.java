package net.javaguides.ems_backend.initializing_data;

import net.javaguides.ems_backend.dto.AppUserDto;
import net.javaguides.ems_backend.dto.BookDto;
import net.javaguides.ems_backend.dto.ProductDto;
import net.javaguides.ems_backend.entity.Product;
import net.javaguides.ems_backend.service.impl.AppUserServiceImpl;
import net.javaguides.ems_backend.service.impl.BookServiceImp;
import net.javaguides.ems_backend.service.impl.ProductServiceImp;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Random;

@Component
public class DataInitializer implements CommandLineRunner {

    private final AppUserServiceImpl appUserService;
    private final ProductServiceImp productServiceImp;
    private final BookServiceImp bookServiceImp;

    public DataInitializer(AppUserServiceImpl appUserService, ProductServiceImp productServiceImp, BookServiceImp bookServiceImp) {
        this.appUserService = appUserService;
        this.productServiceImp = productServiceImp;
        this.bookServiceImp = bookServiceImp;
    }

    @Override
    public void run(String... args) {
        if (appUserService.getAllAppUsers().isEmpty()){
            AppUserDto admin = new AppUserDto("admin", "admin","admin@admin", "ADMIN");
            AppUserDto user = new AppUserDto("user", "user", "user@user", "USER");

            appUserService.createAppUser(admin);
            appUserService.createAppUser(user);
        }

        System.out.println("Dodano użytkowników");

        if (productServiceImp.getAllProducts().isEmpty()) {
            for (int i = 1; i <= 100; i++) {
                productServiceImp.createProduct(
                        new ProductDto(
                                Long.valueOf("0"),
                                20f,
                                "Product " + i,
                                "Artificial Category"
                        )
                );
            }
            System.out.println("Dodano przykładowe produkty");
        }

        Random random = new Random();

        if (bookServiceImp.getAllBooks().isEmpty()) {
            for (int i = 1; i <= 100; i++) {
                bookServiceImp.createBook(
                        new BookDto(
                                Long.valueOf("0"),
                                "Book " + i,
                                "Unknown",
                                Math.round(random.nextDouble(0, 1000))*0.01,
                                "polish",
                                random.nextInt(1, 5000)
                        )
                );
            }
            System.out.println("Dodano przykładowe książki");
        }
    }
}

